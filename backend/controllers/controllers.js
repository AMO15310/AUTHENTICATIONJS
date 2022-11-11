const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const { sighn_up_schema, log_in_schema } = require("../validators/schemas");
require("dotenv").config();

const db = mysql.createConnection(connection);

const signUp = async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    const { error, value } = sighn_up_schema.validate(await req.body);
    if (error) {
      res.status(401).json(error);
      return;
    }

    const query_1 = `SELECT * FROM users WHERE email = "${email}"`;
    db.query(query_1, async (err, user) => {
      if (err) {
        res.json(err);
        return;
      }
      if (user[0]) {
        res.json({ message: "Account exists log in to gain access" });
        return;
      }
      const id = uuidv4();
      //   const hashed_pass = "520255";
      const hashed_pass = await bcrypt.hash(password, 10);
      const query_2 = `INSERT INTO users VALUES ("${id}","${name}","${email}","${hashed_pass}") `;
      db.query(query_2, async (error, succes) => {
        if (error) {
          res.json(error);
          return;
        }
        res.json({ message: "Account successfully created" });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { password, email } = await req.body;
    const { error, values } = log_in_schema.validate(await req.body);
    if (error) {
      res.json(error);
      return;
    }
    const query_3 = `SELECT * FROM users WHERE email = "${email}"`;
    db.query(query_3, async (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!user[0]) {
        res
          .status(200)
          .json({ message: "Account doesn't exist sign up to create one!" });
        return;
      }
      const legit_pass = await bcrypt.compare(password, user[0].password);
      if (!legit_pass) {
        res.json({ message: "Please check your password and try again" });
        return;
      }
      const payload = user.map((data) => {
        const { password, ...rest } = data;
        return rest;
      });
      const token = await jwt.sign(payload[0], process.env.JWT_SIGNATURE, {
        expiresIn: "3600s",
      });
      res.status(200).json({ message: "Log in Succesful", token });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signUp, login };
