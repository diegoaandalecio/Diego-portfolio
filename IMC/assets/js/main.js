const form = document.querySelector('#formulario'); //SELECIONOU O FORMULÁRIO E ATRIBUIU NA VARIAVEL FORM

form.addEventListener('submit', function (evento) {
    evento.preventDefault();        //preventDefault para garantir que irá recarregar a página após o envio
    // console.log('Evento previnido');
    // setResultado ('Ola Mundo');
    const inputPeso = evento.target.querySelector('#formulario-peso');  //Pega todo o input do peso
    const inputAltura = evento.target.querySelector('#formulario-altura');//Pega todo o input da altura
    
    const peso = Number(inputPeso.value);   //Pega o valor que está no input
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResultado("Peso Inválido", false);
        return;
    }

    if (!altura) {
        setResultado("Altura Inválida", false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc})`;
    setResultado(msg, true);

    // console.log(imc);
    // console.log(nivelImc);
});

function getNivelImc(imc) {
    const nivel = ['Abaixo do Peso', 'Peso Normal', 'Sobrepeso', 'Obesidade grau 1', 'Obsesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return nivel [5];      //Como há o return, a execução irá parar, portanto, não é necessário ELSE IF
    if (imc >= 34.9) return nivel [4]; 
    if (imc >= 29.9) return nivel [3];
    if (imc >= 24.9) return nivel [2];
    if (imc >= 18.5) return nivel [1]; 
    if (imc < 18.5) return nivel [0];  
}

function getImc(peso, altura) {
    const imc = peso/altura ** 2;
    return imc.toFixed(2);
}

function criaP () {
    const parag = document.createElement('p');  //Criou um novo elemento (parágrafo) e atribuiu a parag
    return parag
    // parag.classList.add('nomeClasse'); //Criou a classe (PARAGRAFO-RESULTADO) para a constante p atribuida anteriormente
    // parag.innerHTML = 'Filho da DIV';         //Mostrar no elemento P escrito 'Qualquer Coisa'
}

function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado'); //SELECIONOU A DIV COM ID RESULTADO E ATRIBUIU EM UMA VARIÁVEL
    resultado.innerHTML = '';       //innerHTML para ser mostrado no HTML atribuido ao #resultado
    
    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg
    resultado.appendChild(p);           //Colocou o elemento P como filho do resultado (div do html)
}