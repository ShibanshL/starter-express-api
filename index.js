const express = require("express");
const app = express();
app.all("/", (req, res) => {
  res.send("Yeesh!");
});
app.listen(process.env.PORT || 3000);
