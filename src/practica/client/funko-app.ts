import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Funko } from "../classes/funko.js";
import {
  addFunko,
  listFunkos,
  readFunko,
  removeFunko,
  updateFunko,
} from "./client_operations.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Añade un Funko",
    {
      user: {
        description: "Usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Nombre",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Descripción",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Tipo",
        type: "string",
        demandOption: true,
      },
      genre: {
        description: "Género",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franquicia",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Número",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusivo",
        type: "boolean",
        demandOption: true,
      },
      characteristics: {
        description: "Características especiales",
        type: "string",
      },
      value: {
        description: "Valor de mercado",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const params: string[] = [
        "" + argv.id,
        argv.name.replace(/[\n,]/g, ""),
        argv.description.replace(/[\n,]/g, ""),
        argv.type.replace(/[\n,]/g, ""),
        argv.genre.replace(/[\n,]/g, ""),
        argv.franchise.replace(/[\n,]/g, ""),
        "" + argv.number,
        "" + argv.exclusive,
        argv.characteristics ? argv.characteristics.replace(/[\n,]/g, "") : "",
        "" + argv.value,
      ];
      addFunko(argv.user, Funko.instanceFromParams(params), (error, data) => {
        if (error) {
          console.log(chalk.red(error));
        } else if (data) {
          console.log(
            chalk.green(`Funko añadido a la colección de ${argv.user}`)
          );
        }
      });
    }
  )
  .command(
    "update",
    "Actualiza un Funko",
    {
      user: {
        description: "Usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Nombre",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Descripción",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Tipo",
        type: "string",
        demandOption: true,
      },
      genre: {
        description: "Género",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franquicia",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Número",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusivo",
        type: "boolean",
        demandOption: true,
      },
      characteristics: {
        description: "Características especiales",
        type: "string",
      },
      value: {
        description: "Valor de mercado",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const params: string[] = [
        "" + argv.id,
        argv.name.replace(/[\n,]/g, ""),
        argv.description.replace(/[\n,]/g, ""),
        argv.type.replace(/[\n,]/g, ""),
        argv.genre.replace(/[\n,]/g, ""),
        argv.franchise.replace(/[\n,]/g, ""),
        "" + argv.number,
        "" + argv.exclusive,
        argv.characteristics ? argv.characteristics.replace(/[\n,]/g, "") : "",
        "" + argv.value,
      ];
      updateFunko(
        argv.user,
        Funko.instanceFromParams(params),
        (error, data) => {
          if (error) {
            console.log(chalk.red(error));
          } else if (data) {
            console.log(
              chalk.green(`Funko actualizado en la colección de ${argv.user}`)
            );
          }
        }
      );
    }
  )
  .command(
    "remove",
    "Elimina un Funko",
    {
      user: {
        description: "Usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      removeFunko(argv.user, argv.id, (error, data) => {
        if (error) {
          console.log(chalk.red(error));
        } else if (data) {
          console.log(
            chalk.green(`Funko eliminado de la colección de ${argv.user}`)
          );
        }
      });
    }
  )
  .command(
    "read",
    "Muestra un Funko",
    {
      user: {
        description: "Usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      readFunko(argv.user, argv.id, (error, data) => {
        if (error) {
          console.log(chalk.red(error));
        } else if (data) {
          printFunko(Funko.funkoFromJSON(data.toJSON().body.funkos[0]));
        }
      });
    }
  )
  .command(
    "list",
    "Lista los Funkos del usuario",
    {
      user: {
        description: "Usuario",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      listFunkos(argv.user, (err, data) => {
        if (err) {
          console.log(chalk.red(err));
        } else if (data) {
          for (
            let index = 0;
            index < data.toJSON().body.funkos.length;
            index++
          ) {
            printFunko(Funko.funkoFromJSON(data.toJSON().body.funkos[index]));
            console.log(chalk.white("--------------------------------"));
          }
        }
      });
    }
  )
  .strict(true)
  .help().argv;

/**
 * Shows the info of a Funko
 * @param funko Funko to show
 */
function printFunko(funko: Funko): void {
  console.log(
    chalk.white(
      `ID: ${funko.id}\nNombre: ${funko.name}\nDescripción: ${funko.description}\nTipo: ${funko.type}\nGénero: ${funko.genre}\nFranquicia: ${funko.franchise}\nNúmero identificativo: ${funko.number}`
    )
  );
  if (funko.exclusive) {
    console.log(chalk.green("Exclusivo"));
  } else {
    console.log(chalk.red("Común"));
  }
  console.log(
    chalk.white(`Características especiales: ${funko.characteristics}`)
  );

  if (funko.value < 15) {
    console.log(
      chalk.white(`Valor de mercado: `) + chalk.red(funko.value.toFixed(2))
    );
  } else if (funko.value < 25) {
    console.log(
      chalk.white(`Valor de mercado: `) + chalk.yellow(funko.value.toFixed(2))
    );
  } else if (funko.value < 40) {
    console.log(
      chalk.white(`Valor de mercado: `) + chalk.green(funko.value.toFixed(2))
    );
  } else {
    console.log(
      chalk.white(`Valor de mercado: `) + chalk.cyan(funko.value.toFixed(2))
    );
  }
}
