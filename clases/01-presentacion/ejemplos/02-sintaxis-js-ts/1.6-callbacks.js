// Antes de que existieran las Promises, lo asíncrono se resolvía con un
// callback: una función que se pasa como argumento y se ejecuta recién
// cuando termina la tarea. Es "old school" — todavía aparece en APIs
// viejas de Node (por ejemplo fs.readFile) — solo para que sepan que
// existe: no hace falta usarlo hoy, en 1.7 está la alternativa moderna.
// Correr con: node 1.6-callbacks.js

function esperarConCallback(ms, valor, callback) {
  setTimeout(() => callback(valor), ms);
}

// Encadenar dos pasos asíncronos con callbacks obliga a anidar uno
// dentro del otro: el segundo paso solo puede arrancar dentro del
// callback del primero. Con más pasos, esto se profundiza cada vez más
// ("callback hell") — es la parte "menos legible" que 1.7 resuelve.
esperarConCallback(300, "primer paso", (primero) => {
  console.log("1.", primero);

  esperarConCallback(300, "segundo paso", (segundo) => {
    console.log("2.", segundo);
  });
});
