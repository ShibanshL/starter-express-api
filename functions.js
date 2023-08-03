const registerData = require("./Model/Register");
const Built_Data = require("./Model/Build");

const login = async (req, res) => {
  try {
    const registerCheck = await registerData.findOne({ name: req.body.name });
    if (!registerCheck) {
      return res.status(400).json({ message: "No such user exist" });
    }
    const newUser = await registerData.findOne({ name: req.body.name });
    res.status(201).json({ id: newUser._id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const register = async (req, res) => {
  try {
    const registerCheck = await registerData.find({ name: req.body.name });
    if (registerCheck.length > 0) {
      return res.status(400).json({ message: "email already exist" });
    }
    const newUser = await registerData.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const buildData = async (req, res) => {
  console.log(req.body);

  try {
    const builtData = await Built_Data.create(req.body);

    res.status(201).json(builtData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getData = async (req, res) => {
  try {
    const page = req.query.page;
    const skip = (page - 1) * 10;
    const builtData = await Built_Data.find({});
    res.status(201).json(builtData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { login, register, buildData, getData };
