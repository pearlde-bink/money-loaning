const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const port = 3000

const route = require("./routes");

const db = require("./config/db");
// connect DB
db.connect();

const app = express();

// http logger
app.use(morgan("combined"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
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

// route init
route(app);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})