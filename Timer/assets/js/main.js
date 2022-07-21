function criaHoraDosSegundos(segundos) {
  const data = new Date(segundos * 1000);
  return data.toLocaleTimeString('pt-br', {
    hour12:false,
    timeZone: 'GMT'
  });
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let segundos = 0;
let timer;

function iniciaRelogio() {
  timer = setInterval(function() {
    segundos++;
    relogio.innerHTML = criaHoraDosSegundos(segundos);
  }, 1000);
}

//AQUI ESTÁ APLICADO O EVENT LISTENER UM POR UM

// iniciar.addEventListener('click', function(event){
//   relogio.classList.remove('pausado');      //Remove a classe '.pausado' para tirar a cor red.
//   clearInterval(timer);     //Limpa o timer para não duplicar ao clicar novamente
//   iniciaRelogio();
// });

// pausar.addEventListener('click', function(event){
//   clearInterval(timer);
//   relogio.classList.add('pausado');   //Insere a classe '.pausado' para colocar a cor red.
// });

// zerar.addEventListener('click', function(event){
//   clearInterval(timer);
//   relogio.innerHTML = '00:00:00'    //Insere o texto do relógio zerado ao clicar
//   segundos = 0;         //Zera o segundos para começar novamente a contar
//   relogio.classList.remove('pausado');      //Remove a classe '.pausado' para tirar a cor red.
// });


//AQUI ESTÁ APLICADO AO DOCUMENT, E FOI UTILIZADO OS IF'S PARA DETERMINAR ONDE ESTÁ SENDO CLICADO.

document.addEventListener('click', function(e) {
   
  const el = e.target;  //e.target traz onde está sendo clicado. Adicionamos isto a uma variável

  if (el.classList.contains('iniciar')) { //Se onde foi clicado contém a classe iniciar...
    relogio.classList.remove('pausado');     
    clearInterval(timer);    
    iniciaRelogio();
  }

  if (el.classList.contains('pausar')) {  //Se onde foi clicado contém a classe pausar...
    clearInterval(timer);
    relogio.classList.add('pausado'); 
  }

  if (el.classList.contains('zerar')) { //Se onde foi clicado contém a classe zerar...
    clearInterval(timer);
    relogio.innerHTML = '00:00:00'   
    segundos = 0;         
    relogio.classList.remove('pausado');  
  }
});