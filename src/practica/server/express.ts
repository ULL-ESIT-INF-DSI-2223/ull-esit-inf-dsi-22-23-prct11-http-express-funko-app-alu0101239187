import express from "express";
import fs from "fs";
import {
  addFunko,
  removeFunko,
  listFunkos,
  readFunko,
  updateFunko,
} from "./server_operations.js";
import bp from "body-parser";
import { Funko } from "../classes/funko.js";
import { exit } from "process";

/*
 * Creates the collections directory in case it doesn't exists
 * Is synchronous because it must be done before starting the server
 */
try {
  fs.accessSync(`funkos`);
} catch (access_error) {
  try {
    fs.mkdirSync(`funkos`);
  } catch (mkdir_error) {
    console.log("Ha ocurrido un error creando la carpeta de las colecciones");
    exit();
  }
}

const app = express();

/*
 * Parser for the message body, without the body will be undefined
 */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

/*
 * With POST the server adds a Funko
 */
app.post("/funkos", (req, res) => {
  console.log("Cliente conectado, operación add");
  if (!req.body.user || !req.body.funko) {
    res.status(400).send({
      error: `Se deben enviar el nombre de usuario y los datos del Funko`,
    });
  } else {
    try {
      addFunko(
        req.body.user as string,
        Funko.funkoFromJSON(req.body.funko),
        (err, data) => {
          if (err) {
            res.status(500).send({
              error: err,
            });
          } else {
            res.status(200).send({
              success: data!.success,
              message: `Funko añadido a la colección de ${req.body.user}`,
            });
          }
        }
      );
    } catch (err) {
      res.status(500).send({
        error: "El formato del Funko es incorrecto",
      });
    }
  }
});

/*
 * With PATCH the server adds a Funko
 */
app.patch("/funkos", (req, res) => {
  console.log("Cliente conectado, operación update");
  if (!req.body.user || !req.body.funko) {
    res.status(400).send({
      error: `Se deben enviar el nombre de usuario y los datos del Funko`,
    });
  } else {
    try {
      updateFunko(
        req.body.user as string,
        Funko.funkoFromJSON(req.body.funko),
        (err, data) => {
          if (err) {
            res.status(500).send({
              error: err,
            });
          } else {
            res.status(200).send({
              success: data!.success,
              message: `Funko actualizado en la colección de ${req.body.user}`,
            });
          }
        }
      );
    } catch (err) {
      res.status(500).send({
        error: "El formato del Funko es incorrecto",
      });
    }
  }
});

/*
 * With DELETE the server adds a Funko
 */
app.delete("/funkos", (req, res) => {
  console.log("Cliente conectado, operación delete");
  if (!req.body.user || !req.body.id) {
    res.status(400).send({
      error: `Se deben enviar el nombre de usuario y el ID del Funko`,
    });
  } else {
    removeFunko(req.body.user as string, req.body.id as string, (err, data) => {
      if (err) {
        res.status(500).send({
          error: err,
        });
      } else {
        res.status(200).send({
          success: data!.success,
          message: `Funko eliminado de la colección de ${req.body.user}`,
        });
      }
    });
  }
});

/*
 * With GET the server adds a Funko
 */
app.get("/funkos", (req, res) => {
  if (!req.query.user) {
    res.status(400).send({
      error: `Se debe enviar el nombre de usuario`,
    });
  } else {
    if (!req.query.id) {
      console.log("Cliente conectado, operación list");
      listFunkos(req.query.user as string, (err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else if (!data!.success) {
          res.status(500).send({
            error: `No se pudo encontrar la colección de Funkos de ${req.query.user}`,
          });
        } else {
          res.status(200).send({
            funkos: data!.funkos,
          });
        }
      });
    } else {
      console.log("Cliente conectado, operación read");
      readFunko(
        req.query.user as string,
        req.query.id as string,
        (err, data) => {
          if (err) {
            res.status(500).send({
              error: err,
            });
          } else if (!data!.success) {
            res.status(500).send({
              error: `No se pudo encontrar el Funko`,
            });
          } else {
            res.status(200).send({
              funkos: data!.funkos,
            });
          }
        }
      );
    }
  }
});

/*
 * By default the server responds with status 404
 */
app.all("*", (req, res) => {
  res.sendStatus(404);
});

/*
 * Starts the server
 */
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
