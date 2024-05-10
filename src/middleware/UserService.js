const Client = require("../app/models/Client");
const Address = require("../app/models/Address");
const Colleague = require("../app/models/Colleague");
const Relatives = require("../app/models/Relatives");
const Workplace = require("../app/models/Workplace");
// const Payment = require("../app/models/Payment");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      sdt,
      email,
      dob,
      password,
      retypePassword,
      gender,
      marriageStatus,
      cccd,
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
      colleagueName,
      colleaguePhone,
      relativesName,
      relativesType,
      relativesPhone,
      //   bankName,
      //   bankNum,
      //   momoNum,
    } = newUser;
    try {
      const checkUser = await Client.findOne({ sdt: sdt });
      if (checkUser) {
        resolve({
          status: "OK",
          message: "phone number already exists",
        });
      } else {
        // hash password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedPassword; //replace user pw with hashed one
        newUser.retypePassword = hashedPassword; //replace user pw with hashed one
        const createdUser = await Client.create({
          name,
          cccd,
          dob,
          sdt,
          password: newUser.password,
          retypePassword: newUser.retypePassword,
          gender,
          marriageStatus,
          email,
        });
        const clientId = createdUser._id;

        const dataAddress = {
          client_Id: clientId,
          province: province,
          district: district,
          village: village,
          street: street,
          homeAddress: homeAddress,
          stayPeriod: stayPeriod,
        };
        const dataWorkplace = {
          client_Id: clientId,
          workField: workField,
          company: company,
          role: role,
          exp: exp,
          salary: salary,
        };
        const dataRelatives = {
          client_Id: clientId,
          relativesName: relativesName,
          relativesType: relativesType,
          relativesPhone: relativesPhone,
        };
        const dataColleague = {
          client_Id: clientId,
          colleagueName: colleagueName,
          colleaguePhone: colleaguePhone,
        };
        // const dataPayment = {
        //   client_Id: clientId,
        //   paymentMethod: {
        //     bank: {
        //   bankName: bankName,
        //   bankNum: bankNum,
        // },
        // momo: {
        //   momoNumber: momoNum,
        // },
        //   },
        // };

        const createdAddress = await Address.create(dataAddress);
        const createdWorkplace = await Workplace.create(dataWorkplace);
        const createdRelatives = await Relatives.create(dataRelatives);
        // const createdPayment = await Payment.create(dataPayment);
        const createdColleague = await Colleague.create(dataColleague);
        // if (
        //   createdUser &&
        //   createdAddress &&
        //   createdWorkplace &&
        //   createdRelatives &&
        //   createdPayment &&
        //   createdColleague
        // ) {
        console.log("created");
        resolve({
          status: "OK",
          message: "success",
          data: createdUser,
        });
        // }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const logIn = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { sdt, password } = userLogin;
    try {
      const checkUser = await Client.findOne({ sdt: sdt });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "No user found",
        });
      } else {
        const comparePassword = await bcrypt.compareSync(
          password,
          checkUser.password
        );
        if (!comparePassword) {
          resolve({
            status: "OK",
            message: "Wrong password",
          });
        }
        const access_token = await generalAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin,
        });

        const refresh_token = await generalRefreshToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin,
        });

        resolve({
          status: "OK",
          message: "Success",
          access_token,
          refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createUser, logIn };
