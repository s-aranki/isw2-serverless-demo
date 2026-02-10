export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";

  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toUpperCase()}`
    // resultado: `Nombre procesado: ${nombre.toLowerCase()}`
  });
}

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
