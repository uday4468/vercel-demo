const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {

if (req.method !== "POST") {
return res.status(405).send("Method Not Allowed");
}

let body = "";

req.on("data", chunk => {
body += chunk.toString();
});

req.on("end", async () => {

const params = new URLSearchParams(body);

const name = params.get("name");
const upi = params.get("upi");
const policy = params.get("policy");
const amount = params.get("amount");

const id = uuidv4();

const upiLink = `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR`;

const qr = await QRCode.toDataURL(upiLink);

res.setHeader("Content-Type", "text/html");

res.end(`
<h2>Payment QR Generated</h2>

<p><b>Name:</b> ${name}</p>
<p><b>Policy:</b> ${policy}</p>
<p><b>Amount:</b> ₹${amount}</p>

<img src="${qr}" width="250"/>

<p>Scan this QR using any UPI app.</p>
`);

});

};