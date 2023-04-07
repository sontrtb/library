const express = require("express")
const cors = require("cors")
require("dotenv").config()
const routers = require("./src/routers")
require("./src/connect_db")

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"]
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routers(app)

const Port = process.env.POST || 3001;

const listener = app.listen(Port, () => {
    console.log("Server is running on the port "+ listener.address().port)
})