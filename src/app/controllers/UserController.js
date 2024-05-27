const UserService = require("../../middleware/UserService");
const Client = require("../models/Client");
const {
  multipleMongooseToObject,
  singleMongooseToObject,
} = require("../../util/mongoose");
// const { generateAccessToken, generateRefreshToken } = require("./JwtService");
// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

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
      // return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messege: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const clientId = req.params.id;
    const data = req.body;
    if (!clientId) {
      return res.status(200).json({
        status: "error",
        messege: "clientId is required",
      });
    }
    const response = await UserService.updateUser(clientId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ messege: e });
  }
};

const deleteUser = async (req, res) => {
  try {
    const clientId = req.params.id;
    if (!clientId) {
      return res.status(200).json({
        status: "error",
        messege: "clientId is required",
      });
    }
    const response = await UserService.deleteUser(clientId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ messege: e });
  }
};

//NO NEED
const deleteManyUser = async (req, res) => {
  try {
    const clientIds = req.body.ids;
    if (!clientIds) {
      return res.status(200).json({
        status: "error",
        messege: "clientIds is required",
      });
    }
    const response = await UserService.deleteManyUser(clientIds);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ messege: e });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const clientId = req.params.id;
    if (!clientId) {
      return res.status(200).json({
        status: "ERR",
        message: "User not found",
      });
    }
    const response = await UserService.getDetailsUser(clientId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.redirect(302, "/");
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
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
  console.log("hi");
  try {
    //
    const client = await Client.findById(req.params._id);
    res.render("userInfo", {
      style: "user.css",
      client: singleMongooseToObject(client),
    });
    console.log(client);
  } catch (error) {
    console.error("Error retrieving client:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateBlock = async (req, res) => {
  try {
    const updatedClient = await Client.updateOne(
      { _id: req.params.id },
      { $set: { isBlocked: true } }
    );

    console.log("Update result:", updatedClient);
    if (updatedClient.nModified > 0) {
      return res
        .status(200)
        .json({ success: true, message: "User blocked successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User block failed" });
    }
  } catch (e) {
    return res.status(500).json({ messege: e.message });
  }
};
const unBlock = async (req, res) => {
  try {
    const updatedClient = await Client.updateOne(
      { _id: req.params.id },
      { $set: { isBlocked: false } }
    );

    console.log("Update result:", updatedClient);
    if (updatedClient.nModified > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Unblocked user successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Unblock user failed" });
    }
  } catch (e) {
    return res.status(500).json({ messege: e.message });
  }
};

const getBlocked = async (req, res) => {
  try {
    const blocked = await Client.find({ isBlocked: true });
    return res.status(200).json(blocked);
  } catch (e) {
    return res.status(500).json({ messege: e.message });
  }
};

const getUnblocked = async (req, res) => {
  try {
    const unblocked = Client.find({ isBlock: false });
    return res.status(200).json(unblocked);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
  indexRegister,
  indexLogIn,
  logIn,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
  refreshToken,
  logoutUser,
  updateBlock,
  unBlock,
  getBlocked,
  getUnblocked,
};
