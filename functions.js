const login = async (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "OK" });
};

const registerData = require("./Model/Register");

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
