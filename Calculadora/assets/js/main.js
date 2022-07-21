function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        bntCelar: document.querySelector('.btn-clear'),


        inicia() {      //função para iniciar a calculadora. Está sendo inicado na constante 'calculadora'
            this.cliqueBotoes();
            this.pressionaEnter();
            this.pressionaBackSpace();
        },

        btnParaDisplay(valor) {     //Função para pegar o valor do display e juntar ao próprio valor. Ex(9+6)
            this.display.value += valor;
            this.display.focus();       //Display focus() para retirar o foco do botão que foi clicado por ultimo
        },

        clearDisplay() {            //Função para apagar o display
            this.display.value = '';
        },

        apagaUm() {                 //Função para apagar um número
            this.display.value = this.display.value.slice(0, -1);   //slice(stringInicioEFim, qtdadeApagada)
        },

        realizaConta() {
            let conta = this.display.value;

            try {
                conta = eval(conta);        //Eval é um método do JS para que pegue as strings e tente realizar uma conta

                if(!conta) {
                    alert('Conta Inválida');
                    return;
                }

            this.display.value = String(conta);
            } catch (e) {
                alert('Conta Inválida');
                return;
            }
        },

        pressionaEnter() {
            this.display.addEventListener('keyup', e => {   //keyup irá dar o clique ao soltar a tecla
              if (e.keyCode === 13) {
                this.realizaConta();
              }
            });
        },

        pressionaBackSpace() {
            this.display.addEventListener('keydown', e => {     //keydown irá retirar tudo ao clicar. keypress irá retirar um por um
              if (e.keyCode === 8) {        //keyCode 8 para utilizar o backspace
                e.preventDefault();     //Cancela o evento, caso seja cancelável
                this.clearDisplay();
              }
            });
          },

        cliqueBotoes() {        //Função para o evento de clique na calculadora => el = e.target
            document.addEventListener('click', function(e){
                const el = e.target;

                if(el.classList.contains('btn-num')) {      //if para clique nos botões de número
                    this.btnParaDisplay(el.innerText);      //Trazerndo função de valor do display
                }

                if(el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }

                if(el.classList.contains('btn-del')) {
                    this.apagaUm();
                }

                if(el.classList.contains('btn-eq')){
                    this.realizaConta();
                }

            }.bind(this));  //bind(this) para que a função não utilize o seu this, mas sim, o this da função "pai" 
        },

    };
}

const calculadora = criaCalculadora();
calculadora.inicia();