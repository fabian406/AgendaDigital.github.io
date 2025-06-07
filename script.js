// Función para mostrar solo la sección activa
function mostrarSeccion(id) {
  document.getElementById("seccionAgregar").classList.add("hidden");
  document.getElementById("seccionBuscar").classList.add("hidden");
  document.getElementById("seccionListar").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}

// Botones de navegación
document.getElementById("btnAgregar").onclick = () => mostrarSeccion("seccionAgregar");
document.getElementById("btnBuscar").onclick = () => mostrarSeccion("seccionBuscar");
document.getElementById("btnListar").onclick = () => mostrarSeccion("seccionListar");

// Agregar persona
document.getElementById("formAgregar").onsubmit = function (e) {
  e.preventDefault();
  const persona = {
    documento: document.getElementById("documento").value.trim(),
    nombres: document.getElementById("nombres").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    telefono: document.getElementById("telefono").value.trim()
  };

  let personas = JSON.parse(localStorage.getItem("personas")) || [];
  personas.push(persona);
  localStorage.setItem("personas", JSON.stringify(personas));

  alert("Persona registrada con éxito.");
  this.reset();
};

// Buscar persona
document.getElementById("formBuscar").onsubmit = function (e) {
  e.preventDefault();
  const criterio = document.getElementById("criterio").value;
  const valor = document.getElementById("valorBuscar").value.trim().toLowerCase();

  const personas = JSON.parse(localStorage.getItem("personas")) || [];
  const resultados = personas.filter(p =>
    p[criterio].toLowerCase().includes(valor)
  );

  const contenedor = document.getElementById("resultadoBusqueda");
  contenedor.innerHTML = resultados.length
    ? crearTabla(resultados)
    : "No se encontraron resultados.";
};

// Cargar lista completa
document.getElementById("btnCargarLista").onclick = function () {
  const personas = JSON.parse(localStorage.getItem("personas")) || [];
  document.getElementById("listaPersonas").innerHTML = crearTabla(personas);
};

// Crear tabla HTML para mostrar resultados
function crearTabla(personas) {
  let html = `<table>
    <tr><th>Documento</th><th>Nombres</th><th>Apellidos</th><th>Dirección</th><th>Teléfono</th></tr>`;
  for (let p of personas) {
    html += `<tr>
      <td>${p.documento}</td>
      <td>${p.nombres}</td>
      <td>${p.apellidos}</td>
      <td>${p.direccion}</td>
      <td>${p.telefono}</td>
    </tr>`;
  }
  html += `</table>`;
  return html;
}
