const data = require("../data")

module.exports = async (req, res) => {

let body = ""

for await (const chunk of req) {
body += chunk
}

const params = new URLSearchParams(body)

const id = params.get("id")
const policy = params.get("policy")

if (!data[id]) {
res.statusCode = 400
return res.end("Invalid request")
}

if (data[id].policy !== policy) {
return res.end("Policy number incorrect")
}

res.writeHead(302, {
Location: `/api/payment?id=${id}`
})

res.end()

}