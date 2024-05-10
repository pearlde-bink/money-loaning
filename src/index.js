const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
// const initAPIs = require("../src/routes/api");
// const bcrypt = require("bcrypt");
// const { clients } = require("./config/db");
// const { addresses } = require("./config/db");
// const { workplaces } = require("./config/db");
// const { relatives } = require("./config/db");
// const { payments } = require("./config/db");
// const { colleagues } = require("./config/db");

const db = require("./config/db");
// connect DB
db.connect();

const route = require("./routes");

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

// init API
// initAPIs(app);

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

app.use(bodyParser.json());
// route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
