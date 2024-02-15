import { conectaApi } from "./conectaAPI.js";

const formulario = document.querySelector('#popup');
const generoOpcao = document.querySelectorAll('[data-genero]');
const generoEspecifico = document.querySelector('#gen-outro');

const btnPoltrona = document.querySelectorAll('.btn-poltrona');
const btnReserva = document.querySelector('.btn-reserva');
const selecionar = document.querySelector('.selecionar');
const qtPoltronas = document.querySelector('#qt-poltronas');
const btnEscolha = document.querySelectorAll('.btn-escolha');
let contadorPoltrona = 0;
let lugarReservado = [];
let generoEscolhido = ""; 

generoOpcao.forEach((elemento) => {    
    elemento.addEventListener("change", () => {
        generoEspecifico.style.display = 'none';
        if (elemento.checked) {
            if (elemento.value === "Outro") {
                generoEspecifico.style.display = 'block';
                generoEscolhido = generoEspecifico.value;                
            } else {
                generoEscolhido = elemento.value;
            }            
        }
    });        
});

function dadosFormulario() {
    const poltronas = JSON.stringify(lugarReservado);
    const nome = document.querySelector('[data-nome]').value;
    const email = document.querySelector('[data-email]').value;
    const genero = generoEscolhido;
    const data = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});

    return { poltronas, nome, email, genero, data };
}

async function criarReserva(evento) {
    //preventDefault() só será chamado se for enviado o formulário
    if (evento) {
        evento.preventDefault();
    }
    const { poltronas, nome, email, genero, data } = dadosFormulario();
    
    await conectaApi.criaReserva(poltronas, nome, email, genero, data, false);    
    formulario.style.display = 'none';
}

btnEscolha.forEach((opcao) => {
    opcao.addEventListener("click", async () => {        
        if (opcao.value === 'Enviar') {
            try {
                formulario.addEventListener("submit", evento => criarReserva(evento));		
            } catch (error) {
                console.error('Erro ao enviar reserva:', error);
				alert('Ocorreu um erro ao enviar a reserva. Por favor, tente novamente.');
            }
            
        } else if (opcao.value === 'Cancelar') {
            const evento = null;
            const { poltronas, nome, email, genero, data } = dadosFormulario();
            criarReserva(evento);            
            await conectaApi.criaReserva(poltronas, nome, email, genero, data, true);            
            formulario.style.display = 'none';		
        }
    });
});

btnReserva.addEventListener("click", () => {
    formulario.style.display = 'block';
});

btnPoltrona.forEach((poltrona) => {
    poltrona.addEventListener("click", () => {
        let corAtual = getComputedStyle(poltrona).backgroundColor; //Cor verde
        if (corAtual == 'rgb(6, 185, 117)') { //Cor verde        
            poltrona.style.backgroundColor = 'rgb(250, 215, 0)';
            contadorPoltrona++;
            qtPoltronas.textContent = contadorPoltrona;
            selecionar.style.display = 'block';
            verificarPoltronas(poltrona, corAtual);

        } else if (corAtual == 'rgb(250, 215, 0)') { //Cor amarelo
            poltrona.style.backgroundColor = 'rgb(6, 185, 117)';
            contadorPoltrona--;
            qtPoltronas.textContent = contadorPoltrona;
            verificarPoltronas(poltrona, corAtual);
            if (contadorPoltrona == 0) {
                selecionar.style.display = 'none';
            }
        }
    });
});

function verificarPoltronas(poltrona, corAtual) {
    if (corAtual === 'rgb(6, 185, 117)') {
        lugarReservado.push(parseInt(poltrona.textContent));
    } else if (corAtual === 'rgb(250, 215, 0)') {
        let eliminar = parseInt(poltrona.textContent);
        if (lugarReservado.includes(eliminar)) {
            let indice = lugarReservado.indexOf(eliminar);
            lugarReservado.splice(indice, 1);
        }
    }
}


