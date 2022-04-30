const Router = require("express").Router()


Router.get("/", (req, res) => res.render("signup"))

module.exports = Router