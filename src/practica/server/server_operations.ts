import fs from "fs";
import { FunkoType, ResponseType } from "../types/types.js";
import { Funko } from "../classes/funko.js";

/**
 * Adds a Funko to a collection
 * @param user Owner of the Funko
 * @param funko Funko to add
 * @param cb Callback with the result
 */
export const addFunko = (
  user: string,
  funko: Funko,
  cb: (err: string | undefined, res: ResponseType | undefined) => void
) => {
  fs.access(`funkos/${user}/${funko.id}.json`, (error) => {
    if (error) {
      fs.access(`funkos/${user}`, function (error) {
        if (error) {
          fs.mkdir(`funkos/${user}`, (error) => {
            if (error) {
              cb(
                `No se pudo crear una colección para el usuario ${user}`,
                undefined
              );
            } else {
              fs.writeFile(
                `funkos/${user}/${funko.id}.json`,
                JSON.stringify(funko, null, 2),
                (error) => {
                  if (error) {
                    cb(
                      `Ocurrió un error añadiendo el Funko a la colección de ${user}`,
                      undefined
                    );
                  } else {
                    const response: ResponseType = {
                      success: true,
                    };
                    cb(undefined, response);
                  }
                }
              );
            }
          });
        } else {
          fs.writeFile(
            `funkos/${user}/${funko.id}.json`,
            JSON.stringify(funko, null, 2),
            (error) => {
              if (error) {
                cb(
                  `Ocurrió un error añadiendo el Funko a la colección de ${user}`,
                  undefined
                );
              } else {
                const response: ResponseType = {
                  success: true,
                };
                cb(undefined, response);
              }
            }
          );
        }
      });
    } else {
      cb(`El Funko ya existe en la colección de ${user}`, undefined);
    }
  });
};

/**
 * Updates a Funko in a collection
 * @param user Owner of the Funko
 * @param funko Funko to update
 * @param cb Callback with the result
 */
export const updateFunko = (
  user: string,
  funko: Funko,
  cb: (err: string | undefined, res: ResponseType | undefined) => void
) => {
  fs.access(`funkos/${user}`, function (error) {
    if (error) {
      cb(`La colección del usuario ${user} no existe`, undefined);
    } else {
      fs.access(`funkos/${user}/${funko.id}.json`, (error) => {
        if (error) {
          cb(`El Funko no existe en la colección de ${user}`, undefined);
        } else {
          fs.writeFile(
            `funkos/${user}/${funko.id}.json`,
            JSON.stringify(funko, null, 2),
            (error) => {
              if (error) {
                cb(
                  `No se pudo actualizar el Funko en la colección de ${user}`,
                  undefined
                );
              } else {
                const response: ResponseType = {
                  success: true,
                };
                cb(undefined, response);
              }
            }
          );
        }
      });
    }
  });
};

/**
 * Removes a Funko from a collection
 * @param user Owner of the Funko
 * @param id ID of the Funko to remove
 * @param cb Callback with the result
 */
export const removeFunko = (
  user: string,
  id: string,
  cb: (err: string | undefined, res: ResponseType | undefined) => void
) => {
  fs.access(`funkos/${user}`, function (error) {
    if (error) {
      cb(`La colección del usuario ${user} no existe`, undefined);
    } else {
      fs.unlink(`funkos/${user}/${id}.json`, (error) => {
        if (error) {
          cb(`Este Funko no existe en la colección de ${user}`, undefined);
        } else {
          const response: ResponseType = {
            success: true,
          };
          cb(undefined, response);
        }
      });
    }
  });
};

/**
 * Reads a Funko from a collection
 * @param user Owner of the Funko
 * @param id ID of the Funko to read
 * @param cb Callback with the result
 */
export const readFunko = (
  user: string,
  id: string,
  cb: (err: string | undefined, res: ResponseType | undefined) => void
) => {
  fs.access(`funkos/${user}`, function (err) {
    if (err) {
      cb(`La colección del usuario ${user} no existe`, undefined);
    } else {
      fs.readFile(`funkos/${user}/${id}.json`, (err, data) => {
        if (err) {
          cb(
            `No existe el Funko con ID ${id} en la colección del usuario ${user}`,
            undefined
          );
        } else {
          const funko: FunkoType = JSON.parse(data.toString());
          const response: ResponseType = {
            success: funko ? true : false,
            funkos: funko ? [funko] : undefined,
          };
          cb(undefined, response);
        }
      });
    }
  });
};

/**
 * Lists the Funkos from a collection
 * @param user Owner of the Funkos
 * @param cb Callback with the result
 */
export const listFunkos = (
  user: string,
  cb: (err: string | undefined, res: ResponseType | undefined) => void
) => {
  loadFunkos(user, (err, data) => {
    if (err) {
      cb(err, undefined);
    } else if (data) {
      const funkos: FunkoType[] = data;

      const response: ResponseType = {
        success: funkos ? true : false,
        funkos: funkos ? funkos : undefined,
      };
      cb(undefined, response);
    }
  });
};

/**
 * Loads the Funkos from a collection
 * @param user Owner of the Funkos
 * @param cb Callback with the result
 */
const loadFunkos = (
  user: string,
  cb: (err: string | undefined, data: FunkoType[] | undefined) => void
) => {
  fs.readdir(`funkos/${user}`, function (error, files) {
    if (error) {
      cb(`La colección del usuario ${user} no existe`, undefined);
    } else {
      const funkos: FunkoType[] = [];
      files.forEach((file, index) => {
        fs.readFile(`funkos/${user}/${file}`, (_, data) => {
          funkos.push(JSON.parse(data.toString()));
          if (index === files.length - 1) {
            cb(undefined, funkos);
          }
        });
      });
    }
  });
};
