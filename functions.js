const registerData = require("./Model/Register");

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

module.exports = { login, register };
