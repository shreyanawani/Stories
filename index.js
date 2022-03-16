const express = require("express");
// const { route } = require("express/lib/application");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const posts = require("./routes/post");
const authen = require("./routes/authen");
const path = require("path");
const flash = require("connect-flash");

//used for session cookie
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const passportLocal = require("./config/passport-config");

// console.log(process.env);
const url = `mongodb+srv://shreya_nawani:Onecallaway11*@cluster0.vxw1w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //parse cookie
app.use(express.static("views"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware to take in session cookie and encrypt it
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat", //any string TODO CHANGE BEFORE DEPLOY
    resave: false, //if user loggedIn dont save cookie data if its not
    saveUninitialized: false, //don't add any data to cookie if user not loggedIn
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({ mongoUrl: url, autoRemove: false }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", authen); //sequence is important.
app.use("/posts", posts); //sequence is important.
app.get("*", (req, res) => {
  res.render("err");
});

// const Storage = multer.diskStorage({
//   destination: "./views/uploads/",
//   filename: (req, res, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     ); //
//   },
// });
// const upload = multer({
//   storage: Storage,
// }).single("file");

const connectionParams = {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
