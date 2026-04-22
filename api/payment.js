const QRCode = require("qrcode")
const data = require("../data")

module.exports = async (req, res) => {

const { id } = req.query

if (!data[id]) {
return res.end("Invalid Payment Request")
}

const { name, upi, amount, policy } = data[id]

const upiLink = `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR`

const qr = await QRCode.toDataURL(upiLink)

res.setHeader("Content-Type", "text/html")

res.end(`

<h2>Payment Details</h2>

<p>Name: ${name}</p>
<p>Policy: ${policy}</p>
<p>Amount: ₹${amount}</p>

<img src="${qr}" width="250">

<p>Scan this QR to pay.</p>

`)

}