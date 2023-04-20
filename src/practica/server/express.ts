import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  addFunko,
  removeFunko,
  listFunkos,
  readFunko,
  updateFunko,
} from "./server_operations.js";
import bp from "body-parser";
import { Funko } from "../classes/funko.js";

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../public");
app.use(express.static(__dirname));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.post("/funkos", (req, res) => {
  addFunko(
    req.body.user as string,
    Funko.funkoFromJSON(req.body.funko),
    (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        res.send({
          success: data!.success,
        });
      }
    }
  );
});

app.patch("/funkos", (req, res) => {
  updateFunko(
    req.body.user as string,
    Funko.funkoFromJSON(req.body.funko),
    (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        res.send({
          success: data!.success,
        });
      }
    }
  );
});

app.delete("/funkos", (req, res) => {
  removeFunko(req.body.user as string, req.body.id as string, (err, data) => {
    if (err) {
      res.send({
        error: err,
      });
    } else {
      res.send({
        success: data!.success,
      });
    }
  });
});

app.get("/funkos", (req, res) => {
  if (!req.query.id) {
    listFunkos(req.query.user as string, (err, data) => {
      if (err) {
        console.log("1");
        res.send({
          error: err,
        });
      } else if (!data!.success) {
        console.log("12");
        res.send({
          error: `No se pudo encontrar la colección de Funkos de ${req.query.user}`,
        });
      } else {
        console.log("123");
        res.send({
          funkos: data!.funkos,
        });
      }
    });
  } else {
    readFunko(req.query.user as string, req.query.id as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (!data!.success) {
        res.send({
          error: `No se pudo encontrar el Funko`,
        });
      } else {
        res.send({
          funkos: data!.funkos,
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
