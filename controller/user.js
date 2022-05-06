const Router = require("express").Router()
const { default: mongoose } = require("mongoose");
const passport = require("passport")
const GitHubStrategy = require('passport-github')
const TwitterStrategy = require("passport-twitter")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require("../model/User")

try {
  mongoose.connect(`mongodb+srv://Muanyachi:Muanyachi50@profile.yc1mj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
  console.log("connection successful")
} catch (error) {
  if(err) throw err
}


require("dotenv").config()
//setting up github strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
 console.log(profile)
 User.findOne({clientId : profile.id}, async (err, user) => {
  if(err) throw err

  if(user !== null) {
    done(null, profile)
  } else {
     const newUser = await new User({
       name : profile.displayName,
       clientId : profile.id,
       image : profile.photos[0].value,
       provider : profile.provider
     })
     newUser.save((err, user) => {
       if(err) throw err
     })
     done(null, profile)
  }
})
}
));


//google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTKEY,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  User.findOne({clientId : profile.id}, async (err, user) => {
    if(err) throw err
  
    if(user !== null) {
      done(null, profile)
    } else {
       const newUser = await new User({
         name : profile.displayName,
         clientId : profile.id,
         image : profile.photos[0].value,
         provider : profile.provider
       })
       newUser.save((err, user) => {
         if(err) throw err
       })
       done(null, profile)
    }
  })
  
}
));


//twitter

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APIKEY,
  consumerSecret: process.env.TWITTER_KEYSECRET,
  callbackURL: process.env.TWITTER_CALLBACK
},
function(token, tokenSecret, profile, done) {
 console.log(profile)
 User.findOne({clientId : profile.id}, async (err, user) => {
  if(err) throw err

  if(user !== null) {
    done(null, profile)
  } else {
     const newUser = await new User({
       name : profile.displayName,
       clientId : profile.id,
       image : profile.photos[0].value,
       provider : profile.provider
     })
     newUser.save((err, user) => {
       if(err) throw err
     })
     done(null, profile)
  }
})
}
));


//linkedin
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENTID,
  clientSecret: process.env.LINKEDIN_CLIENTSECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    User.findOne({clientId : profile.id}, async (err, user) => {
      if(err) throw err
    
      if(user !== null) {
        done(null, profile)
      } else {
         const newUser = await new User({
           name : profile.displayName,
           clientId : profile.id,
           image : profile.photos[0].value,
           provider : profile.provider
         })
         newUser.save((err, user) => {
           if(err) throw err
         })
         done(null, profile)
      }
    })
  });
}));






const isAuthenticated = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    res.redirect("login")
  }
}



Router.get("/", isAuthenticated,  (req, res) => {
  User.findOne({clientId : req.user}, (err, user) => {
    if(err) throw err
    res.render("home", {user : user})
  })
})

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


Router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

Router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});


Router.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

Router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

Router.get("/logout", (req, res) => {
  req.logOut()
  res.redirect("/login")
})




module.exports = Router