class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');    //Selecionando o formulário na classe
        this.eventos();     //Iniciando a busca do formulário
    }
  
    eventos() {
        this.formulario.addEventListener('submit', e => {   //Buscando o formulário para o submit
        this.handleSubmit(e);   //Previni o não envio do formulário
      });
    }
  
    handleSubmit(e) {
        e.preventDefault();     //Previni o não envio do formulário
        const camposValidos = this.camposSaoValidos();         //Checando se os campos são válidos
        const senhasValidas = this.senhasSaoValidas();         //Método para checagem de senhas

        if(camposValidos && senhasValidas) {        //Se todos campos estão corretos
            alert('Formulário enviado');
            this.formulario.submit();           //Dar o submit no formulário
        }
    }

    senhasSaoValidas() {        //Método para verificação de senhas
        let valid = true;       //criando flag

        const senha = this.formulario.querySelector('.senha');      //Atribuindo a senha à variável
        const repetirSenha = this.formulario.querySelector('.repetir-senha');   //Atribuindo a repetir senha à variável
    
        if(senha.value !== repetirSenha.value) {            //IF para verificar se senha e repetirSenha são iguais  
            valid = false;                              //Flag para não enviar o formulário
            this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');  //Retorno do erro
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');   //Retorno do erro
        }

        if(senha.value.length < 6 || senha.value.length > 12) {     //If para verificar o tamanho da senha
            valid = false;                                      //Flag para não enviar o formulário
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');   //Retorno do erro
          }

        return valid;       //Retorno da flag true após passar pelas IF's.
    }

    camposSaoValidos() {
        let valid = true;   //criação de flag. Caso true, o formulário pode ser enviado

        for(let textoErro of this.formulario.querySelectorAll('.error-text')) {      //For para remover o texto de erro toda vez que reenviar o formulário
            textoErro.remove();                                                 //remove() em todos os textos dos .error-text
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;       //pegando o texto (innerText) do campo (label) anterior (previousElementSibling)
            if (!campo.value) {                         //Se no campo não há valor...
                this.criaErro(campo, `Campo ${label} não pode estar em branco`);    //Passar o erro de campo em branco
                valid = false;                      //Mudando a flag para false para que o formulário não seja enviado
            }
            
            if(campo.classList.contains('cpf')) {   //Pegando a classe cpf para realizar o if
                if(!this.validaCPF(campo)){              //Se o campo está vazio
                    valid = false;                  //Não enviar o formulário
                }
            }   

            if(campo.classList.contains('usuario')) {   //Pegando a classe usuario para realizar o if
                if(!this.validaUsuario(campo)){              //Se o campo está vazio
                    valid = false;                  //Não enviar o formulário
                }
            } 
        }

        return valid;       //Se passar por todos os if's, retornar o valid true
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');  //Criando uma div para mostrar a mensagem de erro
        div.innerHTML = msg;                //Inserindo a mensagem de erro no HTML
        div.classList.add('error-text');    //Criando uma classe para a div
        campo.insertAdjacentElement('afterend', div);    //método insertAdjacentElement para inserir a div depois após o campo 'afterend' 
    }
    
    validaCPF(campo) {      //Método para validação do CPF
        const cpf = new ValidaCPF(campo.value); //Criando CPF com método do arquivo classValidaCPF

        if(!cpf.valida()) {         //Método do classValidaCPF
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }
        return true;
    }

    validaUsuario(campo) {          //Método para validação do usuário
        const usuario = campo.value;    //Alocando valor do campo na variável usuário
        let valid = true;       //flag para validação

        if(usuario.length > 12 || usuario.length < 3) { //If para quantidade de caracteres
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) { //If para expressões regulares
            this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números');
            valid = false;
        }

        return true         //Caso não entre nos if's, dar submit
    }

}

const valida = new ValidaFormulario();