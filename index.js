const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const userRouter = require("./controller/user")
<<<<<<< HEAD
const session = require("express-session")
const passport = require("passport")

require("dotenv").config()
=======
>>>>>>> master

app.set("view engine", "ejs")
app.use(express.static("public"))

<<<<<<< HEAD
app.use(session({
    secret: "muanya",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly : true,
      secure: false
     }
}));

app.use(passport.initialize())
app.use(passport.session())


app.use("/", userRouter)


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    
      done(null, id);
    
});

=======
app.use("/", userRouter)
>>>>>>> master

app.listen(PORT, () => console.log("current listening at port " + PORT))