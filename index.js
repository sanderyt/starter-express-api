const express = require("express");
const app = express();
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("This is and api endpoint with deployment on cyclic.sh");
});
app.listen(process.env.PORT || 3000);
