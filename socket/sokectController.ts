import { Socket } from "socket.io";
import Usuarios from "../classes/Usuarios";

const usuarios = new Usuarios();

const sokectController = (io: Socket) => {
  io.on("connection", (cliente: Socket) => {
    cliente.on("entrar-char", (usuario: payloadUsuario, callBack: Function) => {
      if (!usuario.nombre) {
        return callBack({
          error: true,
          mensaje: "El nombre es necesario",
        });
      }
      const personas = usuarios.agregarPersonas(cliente.id, usuario.nombre);

      cliente.broadcast.emit("lista-personas", usuarios.personas);
      callBack(personas);
    });

    cliente.on("crear-mensaje", (data: crearMensajeT) => {
      const persona: datosPersonas = usuarios.getPersona(cliente.id);

      cliente.broadcast.emit(
        "crear-mensaje",
        crearMensaje(persona.nombre, data.mensaje)
      );
    });

    cliente.on("mensajes-privado", (data:mensajesPrivado) => {
      const personas:datosPersonas = usuarios.getPersona(cliente.id);

      cliente.broadcast
        .to(data.para)
        .emit("mensajes-privado", crearMensaje(personas.nombre, data.mensaje));
    });

    cliente.on("disconnect", () => {
      const personaBorrada: datosPersonas = usuarios.borrarPersona(cliente.id);
      cliente.broadcast.emit(
        "crear-mensaje",
        crearMensaje(
          "Administrador",
          `${personaBorrada.nombre} abandono el chat!!`
        )
      );

      cliente.broadcast.emit("lista-personas", usuarios.personas);
    });
  });

  // end code
};

type payloadUsuario = {
  nombre: string | undefined;
};
type mensajesPrivado = {
  mensaje: string;
  para: string;
};

export default sokectController;

const crearMensaje = (nombre: string, mensaje: string): crearMensajeT => {
  return {
    nombre,
    mensaje,
    fecha: new Date().getTime(),
  };
};
