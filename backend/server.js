const express = require("express");
const createServer = require("./lib/boot");
const cors = require("cors");
const router = require("./routes/routes");
const verifyToken = require("./middleware/middleware");
require("dotenv").config();

app = express();
app.use(cors());
app.use(express.json());
app.use("", router);

app.get("/assets", verifyToken, (req, res) => {
  res.send(`<h1>Shoes</h1>`);
});

createServer(app);
