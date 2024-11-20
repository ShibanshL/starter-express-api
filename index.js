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

const corsConfig = {
  origin : "*",
  credential:true,
  methods:["GET","PUT","POST","DELETE","PATCH"]
}

app.use(cors(corsConfig));


const Details = require("./Model/Amazon");

const {
  login,
  register,
  buildData,
  addResponses,
  getData,
  formSubData,
  getUserFormData,
  postIndividualResperDay,
  updateIndividualResperDay,
  getIndividualResperDay,
} = require("./functions");
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

app.post("/build/:id", buildData);

app.patch("/getbuild/:id", addResponses);

app.get("/data/:id", getData);

app.post("/formSub/:id", formSubData);

app.get("/formSub/:id/:f_Id", getUserFormData);

app.post("/indRes/:id", postIndividualResperDay);

app.patch("/indRes/:id", updateIndividualResperDay);

app.get("/indRes/:id", getIndividualResperDay);

app.get("/testing", async (req, res) => {
  try {
    res.status(201).json({name:"It's working for now it seems."});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


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

export default app;

// // Export as a Vercel serverless function
// export default (req, res) => {
//   app(req, res);
// };

