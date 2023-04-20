import request from "request";
import { Funko } from "../classes/funko.js";

const url = `http://localhost:3000/funkos`;

export const addFunko = (
  user: string,
  funko: Funko,
  callback: (
    err: string | undefined,
    data: request.Response | undefined
  ) => void
) => {
  request.post(
    {
      url: url,
      body: {
        user: user,
        funko: funko,
      },
      json: true,
    },
    (error: Error, response) => {
      if (error) {
        callback(`Ha ocurrido un error: ${error.message}`, undefined);
      } else if (response.body.error) {
        callback(`Ha ocurrido un error: ${response.body.error}`, undefined);
      } else {
        callback(undefined, response);
      }
    }
  );
};

export const updateFunko = (
  user: string,
  funko: Funko,
  callback: (
    err: string | undefined,
    data: request.Response | undefined
  ) => void
) => {
  request.patch(
    {
      url: url,
      body: {
        user: user,
        funko: funko,
      },
      json: true,
    },
    (error: Error, response) => {
      if (error) {
        callback(`Ha ocurrido un error: ${error.message}`, undefined);
      } else if (response.body.error) {
        callback(`Ha ocurrido un error: ${response.body.error}`, undefined);
      } else {
        callback(undefined, response);
      }
    }
  );
};

export const removeFunko = (
  user: string,
  id: number,
  callback: (
    err: string | undefined,
    data: request.Response | undefined
  ) => void
) => {
  request.delete(
    {
      url: url,
      body: {
        user: user,
        id: id,
      },
      json: true,
    },
    (error: Error, response) => {
      if (error) {
        callback(`Ha ocurrido un error: ${error.message}`, undefined);
      } else if (response.body.error) {
        callback(`Ha ocurrido un error: ${response.body.error}`, undefined);
      } else {
        callback(undefined, response);
      }
    }
  );
};

export const readFunko = (
  user: string,
  id: number,
  callback: (
    err: string | undefined,
    data: request.Response | undefined
  ) => void
) => {
  request(
    { url: url + `?user=${user}&id=${id}`, json: true },
    (error: Error, response) => {
      if (error) {
        callback(`Ha ocurrido un error: ${error.message}`, undefined);
      } else if (response.body.error) {
        callback(`Ha ocurrido un error: ${response.body.error}`, undefined);
      } else {
        callback(undefined, response);
      }
    }
  );
};

export const listFunkos = (
  user: string,
  callback: (
    err: string | undefined,
    data: request.Response | undefined
  ) => void
) => {
  request(
    { url: url + `?user=${user}`, json: true },
    (error: Error, response) => {
      if (error) {
        callback(`Ha ocurrido un error: ${error.message}`, undefined);
      } else if (response.body.error) {
        callback(`Ha ocurrido un error: ${response.body.error}`, undefined);
      } else {
        callback(undefined, response);
      }
    }
  );
};
