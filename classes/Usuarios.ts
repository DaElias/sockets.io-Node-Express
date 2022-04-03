class Usuarios implements IUsuarios {
  personas: datosPersonas[];

  constructor() {
    this.personas = [];
  }

  agregarPersonas(id: string, nombre: string, sala: string): datosPersonas[] {
    const persona: datosPersonas = {
      id,
      nombre,
      sala,
    };
    this.personas.push(persona);
    return this.personas;
  }

  getPersona(id: string) {
    const persona = this.personas.filter(
      (user: datosPersonas) => user.id === id
    )[0];
    return persona;
  }

  getPersonasPorSala(sala: string): datosPersonas[] {
    //TODO
    return this.personas.filter(
      (persona: datosPersonas) => persona.sala === sala
    );
  }

  borrarPersona(id: string) {
    const personaBorrada = this.getPersona(id);

    this.personas = this.personas.filter(
      (persona: datosPersonas) => persona.id != id
    );
    return personaBorrada;
  }
}

export default Usuarios;
