const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
};

app.use(express.json());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(cors());

const Details = require("./Model/Amazon");

const { login, register } = require("./functions");
// const register = require("./funtions");

const registerData = require("./Model/Register");

app.get("/products", async (req, res) => {
  try {
    const testT = await registerData.find();
    res.status(200).json(testT);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", login);

app.post("/register", register);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
