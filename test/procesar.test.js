import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
  resultado: "Nombre procesado: JUAN",
  longitud: 4
  });

});


test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});

test("regla de calidad: estructura JSON consistente", () => {
  const req = { query: { nombre: "JuAn" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };

  handler(req, res);

  // 1) keys exactas (sin extras)
  assert.deepEqual(Object.keys(res.body).sort(), ["longitud", "resultado"]);

  // 2) tipos correctos
  assert.equal(typeof res.body.resultado, "string");
  assert.equal(typeof res.body.longitud, "number");

  // 3) regla numérica simple
  assert.ok(Number.isInteger(res.body.longitud));
  assert.ok(res.body.longitud >= 0);
});

