const temas = _.shuffle(["DOM", "CSSOM", "Render Tree", "Layout", "Paint"]);

const lista = document.querySelector("#lista-temas");
temas.forEach((tema) => {
  const li = document.createElement("li");
  li.textContent = tema;
  lista.appendChild(li);
});
