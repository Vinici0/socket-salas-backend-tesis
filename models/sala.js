const { Schema, model } = require("mongoose");

const SalaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
    mensajes: [{ type: Schema.Types.ObjectId, ref: "Mensaje" }],
  },

  {
    timestamps: true,
  }
);

SalaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("Sala", SalaSchema);