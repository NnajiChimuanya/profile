const Router = require("express").Router()
const passport = require("passport")
const GitHubStrategy = require('passport-github')
const TwitterStrategy = require("passport-twitter")

require("dotenv").config()
//setting up github strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
 console.log(profile)
 cb(null, profile)
}
));


//twitter

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APIKEY,
  consumerSecret: process.env.TWITTER_KEYSECRET,
  callbackURL: process.env.TWITTER_CALLBACK
},
function(token, tokenSecret, profile, cb) {
 console.log(profile)
 cb(null, profile)
}
));







// const isAuthenticated = (req, res, next) => {
//   if(req.user) {
//     next()
//   } else {
//     res.redirect("login")
//   }
// }



Router.get("/",  (req, res) => res.send("Logged in"))

Router.get("/login", (req, res) => res.render("signup"))

Router.get('/auth/github', passport.authenticate('github'));

Router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

Router.get('/auth/twitter', passport.authenticate('twitter'));

Router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});




module.exports = Router