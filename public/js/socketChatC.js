const socket = io();
//referencias html

//* code
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre es necesario!!");
}
const usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};


//code here
socket.on("connect", function () {
  console.log("Conectado al servidor");
  //* retorna los usuarios conectados
  socket.emit("entrar-char", usuario, (payload) => {
    if (payload.error) {
      throw new Error(payload.mensaje);
    }
    // console.log("Usuarios Conectados: ", payload);
    rederzarUsuarios(payload)
  });
});

socket.on("crear-mensaje", (payload) => {
  rederzarUsuarios(payload);
});

//escuchar cambios de usuarios, cuando entra o sale
socket.on("lista-personas", (personas) => {
  rederzarUsuarios( personas);
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// *Mensajes privados
socket.on("mensajes-privado", (data) => {
  console.log("mensaje privado: " + data.mensaje);
});

// socket.emit("mensajes-privado",{para: "USXaFjtd5NdAwsOeAAAn", mensaje:"asdasdasdasdsadasda"})

// *Mensajes publicos
// socket.emit("crear-mensaje", { mensaje: "Mensaje de ejemplo" });
