
const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "boq",
    port: 5432,
    password: "12345678",
    database: "boq"
})

module.exports = client
