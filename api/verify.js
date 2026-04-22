const data = require("../data")

module.exports = async (req, res) => {

let body = ""

req.on("data", chunk => {
body += chunk.toString()
})

req.on("end", () => {

const params = new URLSearchParams(body)

const id = params.get("id")
const policy = params.get("policy")

if (!data[id]) {
return res.end("Invalid Request")
}

if (data[id].policy !== policy) {
return res.end("Policy Number Incorrect")
}

res.writeHead(302, {
Location: `/api/payment?id=${id}`
})

res.end()

})

}