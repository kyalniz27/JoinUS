import express from "express";
import * as mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("public"));
// app.get("/public.app.css", (req, res) => {
//   res.sendFile(__dirname + "");
// });

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "join_us",
});

app.get("/", function (req, res) {
  var q = "SELECT COUNT(*) as total FROM users";
  connection.query(q, function (error, results) {
    if (error) throw error;
    var msg = "We have " + results[0].total + " users";
    //res.send(msg);
    var count = results[0].total;
    res.render("home", { data: count });
  });
});

app.get("/joke", (req, res) => {
  res.send("Tell me a joke!");
});

app.get("/random", function (req, res) {
  var num = Math.floor(Math.random() * 10 + 1);
  res.send("Your lucky number is " + num);
});

app.post("/register", (req, res) => {
  //console.log(`Registered email is ${req.body.email}`);
  var person = {
    email: req.body.email,
  };

  connection.query("insert into users set ? ", person, (err, result) => {
    if (err) throw err;
    // console.log(result);
    //res.send("Thanks for joining us!");
    res.redirect("/");
  });
});

app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
