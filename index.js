/*  files import */
const normalizer = require("normalizr");
const util = require("util");
const { holding } = require("./holding.json");

/*  normalizer variables */
const Schema = normalizer.schema;
const normalize = normalizer.normalize;
const denormalize = normalizer.denormalize;

/*  print data function */
const print = function (Obj) {
  console.log(util.inspect(Obj, false, 12, true));
};

/*  schema */
// const person = new schema.Entity("person");
const person = new Schema.Entity("person");
const company = new Schema.Entity("company", {
  gerente: { person },
  encargado: { person },
  empleados: [person],
});
const group = new Schema.Entity("holding", {
  empresas: [company],
});

/*  original data */
const dataLength = JSON.stringify(holding).length;
// print(holding);

/*  modified data */
const normalized = normalize(holding, group);
const modifiedLength = JSON.stringify(normalized).length;
print(normalized);

const denormalized = denormalize(normalized.result, group, normalized.entities);
const denormalizedLength = JSON.stringify(denormalized).length;
// print(denormalized);

/*  comparison */
console.log("Normalized data length:\n", modifiedLength);
console.log("Original data length:\n", dataLength);
// console.log('Denormalized data length:\n', JSON.stringify(denormalized).length);
console.log("Difference:\n", dataLength - modifiedLength);

/* EXPECTED OUTPUT:
=====================
{ 
  the normalized json code
}

Normalized data length:
2134
Original data length:
2907
Difference:
773

*/
