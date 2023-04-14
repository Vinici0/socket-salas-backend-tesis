const Sala = require("../models/sala");
const Mensaje = require("../models/mensaje");

const obtenerMensajesSala = async (req, res) => {
  const { codigo } = req.params;

  try {
    const sala = await Sala.findOne({ codigo }).populate("mensajes");
    if (!sala) {
      return res.status(404).json({
        ok: false,
        msg: "Sala no encontrada",
      });
    }

    res.json({
      ok: true,
      mensajes: sala.mensajes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const crearSala = async (req, res) => {
  const { nombre, codigo } = req.body;

  try {
    const sala = new Sala({ nombre, codigo });
    await sala.save();

    res.json({
      ok: true,
      sala,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const unirseSala = async (req, res) => {
  const { codigo } = req.body;
  const uid = req.uid;

  try {
    const sala = await Sala.findOne({ codigo });
    if (!sala) {
      return res.status(404).json({
        ok: false,
        msg: "Sala no encontrada",
      });
    }

    sala.usuarios.push(uid);
    await sala.save();

    res.json({
      ok: true,
      sala,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const grabarMensajeSala = async (req, res) => {
  const { codigo, mensaje } = req.body;
  const uid = req.uid;

  try {
    const sala = await Sala.findOne({ codigo });
    if (!sala) {
      return res.status(404).json({
        ok: false,
        msg: "Sala no encontrada",
      });
    }

    // <-- Check if user is a member of the room
    if (!sala.usuarios.includes(uid)) {
      return res.status(403).json({
        ok: false,
        msg: "No eres miembro de esta sala",
      });
    }

    const nuevoMensaje = new Mensaje({
      de: uid,
      mensaje,
    });
    await nuevoMensaje.save();

    sala.mensajes.push(nuevoMensaje._id);
    await sala.save();

    res.json({
      ok: true,
      mensaje: nuevoMensaje,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
//traer todas las salas creadas
const getSalas = async (req, res) => {
  const salas = await Sala.find();
  res.json({
    ok: true,
    salas,
  });
};

const obtenerSalasMensajesUsuario = async (req, res) => {
  const uid = req.uid;

  try {
    const salas = await Sala.find({ usuarios: uid }).populate("mensajes");
    res.json({
      ok: true,
      salas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

//getsalasUsuario
const obtenerSalasUsuario = async (req, res) => {
    const uid = req.uid;

    try {
        const salas = await Sala.find({ usuarios: uid }).populate("mensajes");
        res.json({
            ok: true,
            salas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};


module.exports = {
  crearSala,
  unirseSala,
  obtenerMensajesSala,
  grabarMensajeSala,
  getSalas,
  obtenerSalasMensajesUsuario,
    obtenerSalasUsuario,
};
