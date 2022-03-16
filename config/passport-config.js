const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../model/user");

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    //{ usernameField: "username" }),
    // const hashedPassword = bcrypt.hash(password, 10);
    User.findOne({ username: username }, async function (err, user) {
      if (err) {
        console.log("error in finding user");
        return done(err);
      }
      if (!user) {
        // console.log(hashedPassword, user.password);
        console.log("Invalid credentials");
        return done(null, false, { message: "Invalid credentials" });
      } else {
        await bcrypt.compare(password, user.password, function (err, res) {
          if (!res) {
            console.log("in");
            return done(null, false, { message: "Invalid credentials" });
          } else if (err) {
            console.log("Invalid");
            return done(err);
          } else return done(null, user);
        });
      }
    });
  })
);

//Serialize -Taking out userid and putting it in cookie
//Deserialize -Taking out id from cookie to find user in db,when cookie is sent back to server.

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user");
      return done(err);
    } else return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  //   console.log(req);
  //if user is signed in,then pass on the req to next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  } //isAuthenticated is added by passport

  //if user not signed in
  return res.redirect("/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.User has current signed in user
    // console.log(req);
    // console.log(req.user, "a");
    // console.log(req.User, "b");
    res.locals.userr = req.user;
  }
  next();
};

module.exports = passport;
