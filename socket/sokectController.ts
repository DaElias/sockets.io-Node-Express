import { Socket } from "socket.io";
import Usuarios from "../classes/Usuarios";

const usuarios = new Usuarios();

const sokectController = (io: Socket) => {
  io.on("connection", (cliente: Socket) => {
    cliente.on("entrar-char", (usuario: payloadUsuario, callBack: Function) => {
      if (!usuario.nombre || !usuario.sala) {
        return callBack({
          error: true,
          mensaje: "El nombre es necesario",
        });
      }
      //* para unirse a una sala!!  
      cliente.join(usuario.sala);

      const personas = usuarios.agregarPersonas(
        cliente.id,
        usuario.nombre,
        usuario.sala
      );

      cliente.broadcast
        .to(usuario.sala)
        .emit("lista-personas", usuarios.getPersonasPorSala(usuario.sala));
      // console.log("Connection",usuario.sala);
      callBack(usuarios.getPersonasPorSala(usuario.sala));
    });

    cliente.on("crear-mensaje", (data: crearMensajeT) => {
      const persona: datosPersonas = usuarios.getPersona(cliente.id);
      cliente.broadcast
        .to(persona.sala)
        .emit("crear-mensaje", crearMensaje(persona.nombre, data.mensaje));
    });

    cliente.on("mensajes-privado", (data: mensajesPrivado) => {
      const personas: datosPersonas = usuarios.getPersona(cliente.id);
      cliente.broadcast
        .to(data.para)
        .emit("mensajes-privado", crearMensaje(personas.nombre, data.mensaje));
    });

    cliente.on("disconnect", () => {
      const personaBorrada: datosPersonas = usuarios.borrarPersona(cliente.id);
      cliente.broadcast
        .to(personaBorrada.sala)
        .emit(
          "crear-mensaje",
          crearMensaje(
            "Administrador",
            `${personaBorrada.nombre} abandono el chat!!`
          )
        );

      cliente.broadcast
        .to(personaBorrada.sala)
        .emit(
          "lista-personas",
          usuarios.getPersonasPorSala(personaBorrada.sala)
        );
    });
  });
  // end code
};

type payloadUsuario = {
  nombre: string | undefined;
  sala?: string;
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
