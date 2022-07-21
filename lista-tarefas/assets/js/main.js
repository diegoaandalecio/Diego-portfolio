const inputTarefas = document.querySelector('.input-nova-tarefa');
const btnTarefas = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

inputTarefas.addEventListener('keypress', function(e){  //Adicionando o evento de dar ENTER para adicionar a tarefa
    // 13 é keycode (código) do botão ENTER
    if (e.keyCode === 13){      //Se o botão é enter, fazer...
        if (!inputTarefas.value) return;    //Conferir se há algo
        criaTarefa(inputTarefas.value);     //Inputar valor na lista
    }
});

function limpaInput() {
    inputTarefas.value = '';   //Limpar o input
    inputTarefas.focus();
}

function criaBotaoApagar(li) {    //Função para criar o botão apagar das listas
    li.innerText += ' ';    //dando espaço do texto li para o botão
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // botaoApagar.classList.add('apagar');    //Adicionando uma classe ao botão
    botaoApagar.setAttribute('class', 'apagar');    //Com o setAttribute também é possível adicionar a classe
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {       //Função para inserir a tarefa como LI no HTML
    const li = document.createElement('li');
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefas.addEventListener('click', function(){    //Clique do botão
    if (!inputTarefas.value) return;    //Se não há nada no inputTarefas fazer um return
    criaTarefa(inputTarefas.value);     //Se há, executa a função criaTarefa
});

document.addEventListener('click', function(e){     //Evento para apagar o elemento
    const el = e.target;            //criando constante para reconher onde é o clique

    if(el.classList.contains('apagar')) {       //se onde clicou tem a classe 'apagar'...
        el.parentElement.remove();         //remover o pai do elemento de onde foi o clique (li)
        salvarTarefas();        //Deixando as tarefas salvas em localStorage
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');   //Selecionando todas as li's
    const listaDeTarefas = [];  //Criando array para guardar os textos

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText; //Criando variável para guardar o texto da .tarefa
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();    //substituindo o 'Apagar' por vazio
        listaDeTarefas.push(tarefaTexto);      //Jogando os textos no array
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); //Transformando o array em JSON para salvar em cache
    localStorage.setItem('tarefas', tarefasJSON);    //localStorage é o banco do navegador (cache)
    //setItem utiliza dois param. 1 - local de onde pegará os itens. 2 - os dados já em JSON
    console.log(tarefasJSON)
}

function adicionaTarefasSalvas() {      //Função para buscar as tarefas do cache
    //getItem para buscar as tarefas salvas no localStorage
    const tarefas = localStorage.getItem('tarefas');    //atribuindo as tarefas salvas na varivel
    const listaDeTarefas = JSON.parse(tarefas);     //JSON.parse converte o JSON para objeto JS

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);     //Recriou as tarefas que estão guardadas em listaDeTarefas
    }
}

adicionaTarefasSalvas();
