// Funciones para render users
const params = new URLSearchParams(window.location.search);
//* referencias
const divUsuarios = document.getElementById("divUsuarios");

function rederzarUsuarios(personas = []) {
  console.log("render usuarios ", personas);
  var html = `
    <li>
        <a href="javascript:void(0)" class="active"> Chat de 
        <span> ${params.get("sala")}</span></a>
    </li>
  `;

  for (var i = 0; i < personas.length; i++) {
    html += `
    <li>
        <a 
        data-id="${personas[i].id}"  
        href="javascript:void(0)"><img src="assets/images/users/1.jpg" 
        alt="user-img" class="img-circle"> 
        <span> ${personas[i].nombre} 
        <small class="text-success">online</small></span></a>
    </li>
    `;
  }

  divUsuarios.innerHTML = html;
}
