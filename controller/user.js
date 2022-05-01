const Router = require("express").Router()
const passport = require("passport")
const GitHubStrategy = require('passport-github').Strategy


require("dotenv").config()
//setting up github strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));







const isAuthenticated = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    res.redirect("login")
  }
}



Router.get("/", isAuthenticated, (req, res) => res.send("Logged in"))

Router.get("/login", (req, res) => res.render("signup"))

Router.get('/auth/github', passport.authenticate('github'));

Router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect : "/login"}), (req, res) => {
  res.redirect("/")
})




module.exports = Router