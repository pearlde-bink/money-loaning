const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const port = 3000;
const bcrypt = require("bcrypt");
const { clients } = require("./config/db");
const { addresses } = require("./config/db");
const { workplaces } = require("./config/db");
const { relatives } = require("./config/db");
const { payments } = require("./config/db");
const { colleagues } = require("./config/db");

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

//set the MIME type for JS files to 'application/javascript'
app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
    res.set("Content-Type", "application/javascript");
  }
  next();
});

// convert data to json format
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

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
  const dataUser = {
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
  // const dataAddress = {
  //   client_Id: dataUser._id,
  //   province: req.body.province,
  //   district: req.body.district,
  //   village: req.body.village,
  //   street: req.body.road,
  //   homeAddress: req.body.home,
  //   stayPeriod: req.body.addressTime,
  // };
  // const dataWorkplace = {
  //   client_Id: dataUser._id,
  //   workField: req.body.field,
  //   company: req.body.company,
  //   role: req.body.role,
  //   exprerience: req.body.exp,
  //   salary: req.body.income,
  // };
  // const dataRelatives = {
  //   client_Id: dataUser._id,
  //   name: req.body.relativesName,
  //   relationship: req.body.relativesType,
  //   phone: req.body.relatives__phone,
  // };
  // const dataColleague = {
  //   client_Id: dataUser._id,
  //   name: req.body.colleagueName,
  //   phone: req.body.colleague__phone,
  // };
  // const dataPayment = {
  //   client_Id: dataUser._id,
  //   paymentMethod: {
  //     bank: {
  //       bankName: req.body.bankName,
  //       stk: req.body.bankNum,
  //     },
  //     momo: {
  //       momoNumber: req.body.momoNum,
  //     },
  //   },
  // };

  // check existing user
  const existingUser = await clients.findOne({ sdt: dataUser.sdt });
  if (existingUser) {
    res.send("phone number already exist.");
  } else {
    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dataUser.password, saltRounds);
    dataUser.password = hashedPassword; //replace user pw with hashed one

    const newUser = await clients.create(dataUser);
    if (!newUser) {
      return res.status(500).send("Failed to create user");
    }
    const userId = newUser._id;

    const dataAddress = {
      client_Id: userId,
      province: req.body.province,
      district: req.body.district,
      village: req.body.village,
      street: req.body.road,
      homeAddress: req.body.home,
      stayPeriod: req.body.addressTime,
    };
    const dataWorkplace = {
      client_Id: userId,
      workField: req.body.field,
      company: req.body.company,
      role: req.body.role,
      exprerience: req.body.exp,
      salary: req.body.income,
    };
    const dataRelatives = {
      client_Id: userId,
      name: req.body.relativesName,
      relationship: req.body.relativesType,
      phone: req.body.relativesPhone,
    };
    const dataColleague = {
      client_Id: userId,
      name: req.body.colleagueName,
      phone: req.body.colleaguePhone,
    };
    const dataPayment = {
      client_Id: userId,
      paymentMethod: {
        bank: {
          bankName: req.body.bankName,
          stk: req.body.bankNum,
        },
        momo: {
          momoNumber: req.body.momoNum,
        },
      },
    };

    const addressdata = await addresses.create(dataAddress);
    const workplacedata = await workplaces.create(dataWorkplace);
    const relativesdata = await relatives.create(dataRelatives);
    const paymentdata = await payments.create(dataPayment);
    const colleaguedata = await colleagues.create(dataColleague);
    res.redirect(302, "/");
    // console.log("user: ", newUser);
    // console.log("address :", addressdata);
    // console.log("workplace: ", workplacedata);
    // console.log("relatives: ", relativesdata);
    // console.log("payment: ", paymentdata);
    // console.log("colleague: ", colleaguedata);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const check = await clients.findOne({ sdt: req.body.sdtNumber });
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
