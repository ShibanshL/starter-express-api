const registerData = require("./Model/Register");
const Built_Data = require("./Model/Build");
const form_sub_Data = require("./Model/FormSubmission");
const chartData = require("./Model/ChartData");

const login = async (req, res) => {
  try {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (!String(req.body.name).search(filter)) {
      const registerCheck = await registerData.findOne({
        email: req.body.name,
      });
      if (!registerCheck) {
        return res.status(400).json({ message: "No such user exist" });
      }
      if (registerCheck) {
        const newUser = await registerData.findOne({
          email: req.body.name,
          password: req.body.password,
        });

        if (newUser) res.status(201).json({ id: newUser._id });
        else res.status(400).json({ message: "incorrect email/password" });
      }
    } else {
      const registerCheck = await registerData.findOne({ name: req.body.name });
      if (!registerCheck) {
        return res.status(400).json({ message: "No such user exist" });
      }
      if (registerCheck) {
        const newUser = await registerData.findOne({
          name: req.body.name,
          password: req.body.password,
        });

        if (newUser) res.status(201).json({ id: newUser._id });
        else res.status(400).json({ message: "incorrect username/password" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const register = async (req, res) => {
  try {
    const registerCheck = await registerData.find({ name: req.body.name });
    if (registerCheck.length > 0) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const emailCheck = await registerData.find({ email: req.body.email });
    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email already exist" });
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
    const param = req.params.id;
    const page = req.query.page;
    const skip = (page - 1) * 10;
    const builtData = await Built_Data.find({
      [`data.subData.userUID`]: { $in: [`${param}`] },
    });

    res.status(201).json(builtData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const formSubData = async (req, res) => {
  console.log(req.body);

  try {
    const builtData = await form_sub_Data.create(req.body);
    res.status(201).json(builtData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUserFormData = async (req, res) => {
  try {
    const param = req.params.id;
    const formParam = req.params.f_Id;
    const page = req.query.page;
    const skip = (page - 1) * 10;
    const builtData = await form_sub_Data.find({
      [`sub.data.userFormAc`]: { $in: [`${param}`] },
      [`sub.data.userFormId`]: { $in: [`${formParam}`] },
    });

    res.status(201).json({ data: builtData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const addResponses = async (req, res) => {
  try {
    const param = req.params.id;
    const builtData = await Built_Data.updateOne(
      {
        "data.subData.formData.formUID": param,
      },
      { $inc: { "data.subData.response": 1 } }
    );

    res.status(201).json({ data: builtData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const postIndividualResperDay = async (req, res) => {
  try {
    const chart_data = await chartData.create(req.body);
    res.status(201).json(chart_data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateIndividualResperDay = async (req, res) => {
  try {
    const param = req.params.id;
    const data_rec = req.body;

    const chart_data = await chartData.find({
      ["formID"]: param,
      ["chartData.date"]: [data_rec.date],
    });

    if (chart_data.length > 0) {
      const chart_data_update = await chartData.updateOne(
        {
          ["formID"]: param,
          ["chartData.date"]: [data_rec.date],
        },
        { $inc: { "chartData.$.res": 1 } }
      );
      console.log("This is something", chart_data_update);
    }
    if (chart_data.length == 0) {
      const chart_data_update = await chartData.updateOne(
        {
          ["formID"]: param,
        },
        {
          $push: {
            ["chartData"]: { $each: [{ date: data_rec.date, res: 1 }] },
          },
        }
      );
      console.log("This is something if 0", chart_data_update);
    }

    res.status(201).json({ data: param, details: chart_data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getIndividualResperDay = async (req, res) => {
  try {
    const param = req.params.id;

    const chart_data = await chartData.find({
      ["formID"]: param,
    });

    res.status(201).json(chart_data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
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
};
