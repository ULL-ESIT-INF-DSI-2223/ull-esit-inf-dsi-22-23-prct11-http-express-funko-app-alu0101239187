import "mocha";
import { expect } from "chai";
import request from "request";

const url = `http://localhost:3000/execmd`;

describe("execmd server tests", () => {
  it("Code 404 on default", (done) => {
    request({ url: `http://localhost:3000`, json: true }, (_, response) => {
      if (response) {
        expect(response.statusCode).to.be.equal(404);
      }
    });

    request(
      { url: `http://localhost:3000/hello`, json: true },
      (_, response) => {
        if (response) {
          expect(response.statusCode).to.be.equal(404);
          done();
        }
      }
    );
  });

  it("Code 400 on no cmd ", (done) => {
    request({ url: url, json: true }, (_, response) => {
      if (response) {
        expect(response.statusCode).to.be.equal(400);
        done();
      }
    });
  });

  it("Code 500 on error", (done) => {
    request({ url: url + `?cmd=wca`, json: true }, (_, response) => {
      if (response) {
        expect(response.statusCode).to.be.equal(500);
        expect(response.body.error).to.be.not.equal("");
      }
    });

    request({ url: url + `?cmd=wc`, json: true }, (_, response) => {
      if (response) {
        expect(response.statusCode).to.be.equal(500);
        expect(response.body.error).to.be.not.equal("");
      }
    });

    request(
      { url: url + `?cmd=wc&args=undefined.json`, json: true },
      (_, response) => {
        if (response) {
          expect(response.statusCode).to.be.equal(500);
          expect(response.body.error).to.be.not.equal("");
          done();
        }
      }
    );
  });

  it("Code 200 on success", (done) => {
    request(
      { url: url + `?cmd=wc&args=-l package.json`, json: true },
      (_, response) => {
        if (response) {
          expect(response.statusCode).to.be.equal(200);
          expect(response.body.success).to.be.true;
        }
      }
    );

    request({ url: url + `?cmd=tree`, json: true }, (_, response) => {
      if (response) {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.success).to.be.true;
        done();
      }
    });
  });
});
