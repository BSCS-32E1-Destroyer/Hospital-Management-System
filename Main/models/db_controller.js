var mysql = require("mysql");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hms",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected to the database");
  }
});

module.exports.signup = function (username, email, password, status, callback) {
  con.query("SELECT email FROM users WHERE email = `${email}`"),
    function (err, result) {
      if (result[0] == undefined) {
        var query =
          "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES(`${username},${email},${password}, $`)";
        console.log(query);
      } else {
        console.log("User already Exists");
      }
    };
};

module.exports.verify = function (username, email, token, callback) {
  var query =
    "INSERT INTO `verify`(`username`,`email`,`token`) VALUES (`${username}`,`${email}`,`${token}`)";
  con.query(query, callback);
};

module.exports.verify = function (email, callback) {
  var query = "SELECT *FROM verify WHERE email = `${email}`";
  con.query(query, callback);
};
