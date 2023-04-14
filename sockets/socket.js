const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");
const {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  console.log(client.handshake.headers["x-token"]);
  const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valido) client.disconnect();

  // Cliente autenticado
  usuarioConectado(uid);

  // Ingresar al usuario a una sala en particular
  client.join(uid);//TODO: sale de grupos para entrar a salas
  //Escuchar del cliente el mensaje-personal
  client.on("mensaje-personal", async (payload) => {
    await grabarMensaje(payload);
    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    usuarioDesconectado(uid);
    console.log("Cliente desconectado");
  });

});
