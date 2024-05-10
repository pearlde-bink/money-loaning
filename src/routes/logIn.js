// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const collection = require("../config/db");

// const logInController = require("../app/controllers/LogInController");

// router.get("/", logInController.index);

// //login
// router.post("/", async (req, res) => {
//   try {
//     const check = await collection.findOne({ sdt: req.body.sdtNumber });
//     if (!check) {
//       res.send("User not found.");
//     }

//     // compare hashed password from db with plain text
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );
//     if (isPasswordMatch) {
//       console.log("login successfully");
//       res.redirect(302, "/");
//     } else {
//       res.send("Wrong password.");
//     }
//   } catch {
//     res.send("wrong details.");
//   }
// });

// module.exports = router;
