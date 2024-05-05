const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const port = 3000;
const bcrypt = require("bcrypt");
const collectionUser = require("./config/db");

const route = require("./routes");

// const db = require("./config/db");

// connect DB
// db.connect();

const app = express();

// http logger
app.use(morgan("combined"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// convert data to json format
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//set the MIME type for JS files to 'application/javascript'
app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
    res.set("Content-Type", "application/javascript");
  }
  next();
});

// template engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// register;
app.post("/register", async (req, res) => {
  const data = {
    name: req.body.name,
    cccd: req.body.cccdNumber,
    dob: req.body.dob,
    sdt: req.body.sdtNumber,
    password: req.body.password,
    gender: req.body.sex,
    marriageStatus: req.body.marriage,
    email: req.body.email,
    slug: req.body.slug,
  };

  // check existing user
  const existingUser = await collectionUser.findOne({ sdt: data.sdt });
  if (existingUser) {
    res.send("phone number already exist.");
  } else {
    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; //replace user pw with hashed one

    const userdata = await collectionUser.insertMany(data); //add if user not in db
    res.redirect(302, "/");
    console.log(userdata);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const check = await collectionUser.findOne({ sdt: req.body.sdtNumber });
    if (!check) {
      res.send("User not found.");
    } else {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (isPasswordMatch) {
        console.log("log in oke");
        res.redirect(302, "/");
      } else {
        res.send("Wrong password.");
      }
    }

    // compare hashed password from db with plain text
  } catch {
    res.send("wrong details.");
  }
});

// route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
