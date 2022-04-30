const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => res.render("signup"))

app.listen(PORT, () => console.log("current listening at port " + PORT))