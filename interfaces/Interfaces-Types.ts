type datosPersonas = {
  id: string;
  nombre: string;
  sala?: string;
};

interface IUsuarios {
  personas: datosPersonas[];
  agregarPersonas: (id: string, nombre: string) => datosPersonas[];
  getPersona: (id: string) => datosPersonas | undefined;
  borrarPersona: (id: string) => datosPersonas | undefined;
}

type crearMensajeT = {
  nombre: string;
  mensaje: string;
  fecha?: number;
};
