const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

(db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "loginsystem",
  port: 3306,
})),
  db.connect(function (err) {
    // connected! (unless `err` is set)
    if (err) {
      console.log(err);
    }
  });
db.query("select * from loginsystem.users;", (err, result) => {
  if (err) {
    //res.send({ err: err });
  }
  if (result.length > 0) {
    //res.send(result);
    console.log(result);
  } else {
    //res.send({ message: "buruu" });
    console.log("buruu");
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const igName = req.body.igName;
  db.query(
    "insert into users(firstName,email,pass,instagram_name) values(?,?,?,?)",
    [username, email, password, igName],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "select * from users where email = ? and pass = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "user not found" });
      }
    }
  );
});

app.post("/getUser", (req, res) => {
  const id = req.body.id;
  db.query("select * from users where id = ?", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});
app.post("/setUser", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;
  const igName = req.body.igName;
  db.query(
    "UPDATE users SET firstName = ?,pass=?,instagram_name=? WHERE id = ?;",
    [name, password, igName, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
//
app.post("/getSavedReply", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "select * from autoReply where userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
app.post("/setSavedReply", (req, res) => {
  const userId = req.body.userId;
  const input = req.body.inputText;
  const reply = req.body.replyText;
  db.query(
    "insert into autoReply(userId,inputText,replyText) values(?,?,?);",
    [userId, input, reply],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
app.post("/deleteSavedReply", (req, res) => {
  const id = req.body.id;
  db.query("delete from autoReply where id=?", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});
//

app.post("/getDidAutoReply", (req, res) => {
  const id = req.body.commentId;
  db.query("select * from didAutoReply", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});
app.post("/setDidAutoReply", (req, res) => {
  const commendId = req.body.commendId;
  const autoId = req.body.autoId;
  db.query(
    "insert into didAutoReply(commendId,autoReplyId) values(?,?);",
    [commendId, autoId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

//

app.post("/getDidReply", (req, res) => {
  const id = req.body.id;
  db.query("select * from didreply", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});
app.post("/setDidReply", (req, res) => {
  const commentId = req.body.commentId;
  const text = req.body.repliedText;
  db.query(
    "insert into didreply(commentId,repliedText) values(?,?);",
    [commentId, text],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

//

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
