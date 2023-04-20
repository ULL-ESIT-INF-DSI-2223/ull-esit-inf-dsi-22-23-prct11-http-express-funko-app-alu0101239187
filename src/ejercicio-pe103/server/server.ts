import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/execmd", (req, res) => {
  if (!req.query.cmd) {
    res.sendStatus(400);
  } else {
    console.log("Cliente conectado");
    console.log("Comando: " + req.query.cmd + " " + req.query.args);
    exec(req.query.cmd + " " + req.query.args, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send({
          error: error.message,
        });
      } else if (stderr.toString() !== "") {
        res.status(500).send({
          error: stderr.toString(),
        });
      } else {
        res.status(200).send({
          success: true,
          result: stdout.toString(),
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
