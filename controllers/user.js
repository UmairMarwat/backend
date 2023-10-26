const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signupPost = (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;

    console.log(username, email, phoneNo, password);

    const newUser = new User({
      username,
      email,
      phoneNo,
      password: bcrypt.hashSync(password, 10),
    });
    console.log(newUser);

    let token = jwt.sign({ id: newUser._id }, "JWT_SECRET", {
      expiresIn: 60 * 60,
    });

    newUser.save();

    res.status(200).send({
      error: false,
      success: true,
      message: "User Sinup successfuly!",
      token: token,
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

exports.signupGet = async (req, res) => {
  try {
    const userData = await User.find();
    console.log(userData);
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
};
exports.signupGetById = async (req, res) => {
  try {
    console.log("qwertyu");
    const id = req.params.id; // Corrected typo: req.params.id
    console.log(id);
    const userData = await User.find({ _id: id });
    console.log(userData);
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
};

exports.loginpost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userData = await User.findOne({ email });
    console.log(userData);
    if (!userData) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    let token = jwt.sign({ id: userData._id }, "JWT_SECRET", {
      expiresIn: 60 * 60,
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "User logged in successfully!!",
      token: token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      success: false,
      message: "An error occurred while logging in",
    });
  }
};
