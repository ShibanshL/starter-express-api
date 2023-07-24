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

app.get("/products", async (req, res) => {
  try {
    const testT = await Details.find({});
    res.status(200).json(testT);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    console.log(req.body);
    const product = await Details.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Details.findById(id);
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Details.findById(id).deleteOne();
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body, "&&", id);
    const products = await Details.findByIdAndUpdate(id, {
      name: req.body.name.current,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.MONGO_URI}`, {
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
