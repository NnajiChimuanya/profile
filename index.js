const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const userRouter = require("./controller/user")

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/", userRouter)

app.listen(PORT, () => console.log("current listening at port " + PORT))