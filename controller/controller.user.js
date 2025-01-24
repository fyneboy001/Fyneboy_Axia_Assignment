const userModel = require("../model/model.user");
const bcrypt = require("bcryptjs");

//Create a user function
const createUser = async (req, res) => {
  const { password, ...others } = req.body;
  const salt = bcrypt.genSaltSync(10);

  //Harsh password
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);

  //validating user credentials by checking if their email exist
  const checkUserEmail = await userModel.findOne({ email: others.email });
  if (checkUserEmail) {
    return res.json("message: user already exist");
  }
  //Creating user login
  try {
    const newUser = new userModel({ password: hashPassword, ...others });
    await newUser.save();
    return res.json("user succcefully created");
  } catch (error) {
    return res.json("Unable to create user");
  }
};

//creating user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return res.json({ message: "provide valid information" });
  }

  //check for user existence
  const checkUser = await userModel.findOne(email);
  if (!checkUser) {
    return res.json({ message: "User not found" });
  }

  //check if password is correct
  const checkPassword = bcrypt.compareSync(password, checkUser.password);
  if (!checkPassword) {
    return res.json({ message: "Invalid password" });
  }
  return res.json(checkUser);
};

//Delete Account function
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.send("Account Deleted Successfully");
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
};

module.exports = { createUser, userLogin, deleteUser };
