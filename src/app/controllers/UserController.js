const UserService = require("../../middleware/UserService");
const createUser = async (req, res) => {
  try {
    // register;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const {
      name,
      cccd,
      dob,
      sdt,
      password,
      retypePassword,
      gender,
      marriageStatus,
      email,
      province,
      district,
      village,
      street,
      homeAddress,
      stayPeriod,
      workField,
      company,
      role,
      exp,
      salary,
      relativesName,
      relativesType,
      relativesPhone,
      colleagueName,
      colleaguePhone,
      //   bankName,
      //   bankNum,
      //   momoNum,
    } = req.body;

    const isEmail = emailRegex.test(email);
    const isPhone = phoneRegex.test(sdt);

    if (
      !name ||
      !cccd ||
      !dob ||
      !sdt ||
      !password ||
      !retypePassword ||
      !gender ||
      !marriageStatus ||
      !email ||
      !province ||
      !district ||
      !village ||
      !street ||
      !homeAddress ||
      !stayPeriod ||
      !workField ||
      !company ||
      !role ||
      !exp ||
      !salary ||
      !relativesName ||
      !relativesType ||
      !relativesPhone ||
      !colleagueName ||
      !colleaguePhone
      //   || !bankName ||
      //   !bankNum
      //    ||momoNum
    ) {
      console.log("missed field");
      return res.status(200).json({
        status: "error",
        messege: "missing field. Check again",
      });
    } else if (!isEmail || !isPhone) {
      console.log("wrong format email / phone");
      return res.status(200).json({
        status: "error",
        messege: "Email / Phone invalid. Check again",
      });
    } else if (password !== retypePassword) {
      console.log("no match pw");
      return res.status(200).json({
        status: "error",
        messege: "Password not match. Check again",
      });
    }

    console.log(isEmail, isPhone);

    const response = await UserService.createUser(req.body);
    if (response.status === "OK") {
      res.redirect(302, "/");
    } else {
      // Handle error response
      return res.status(400).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messege: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  try {
    // login
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const { sdt, password } = req.body;

    const isPhone = phoneRegex.test(sdt);

    if (!sdt || !password) {
      console.log("missed field");
      return res.status(200).json({
        status: "error",
        messege: "missing field. Check again",
      });
    } else if (!isPhone) {
      console.log("wrong format email / phone");
      return res.status(200).json({
        status: "error",
        messege: "Phone number invalid. Check again",
      });
    }

    const response = await UserService.logIn(req.body);
    if (response.status === "OK") {
      res.redirect(302, "/");
      //   return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messege: "Internal server error" });
  }
};

const indexLogIn = async (req, res) => {
  res.render("login", {
    style: "login.css",
  });
};

const indexRegister = async (req, res) => {
  res.render("./register/step1", {
    style: "step1.css",
  });
};

const getUser = async (req, res) => {
  res.render("userInfo", {
    style: "user.css",
  });
};

module.exports = { createUser, getUser, indexRegister, indexLogIn, logIn };
