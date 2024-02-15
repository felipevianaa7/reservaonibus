import { conectaApi } from "./conectaAPI.js";

const btnPoltrona = document.querySelectorAll('.btn-poltrona');
const lugarOcupado = []; //Array das vagas ocupadas


async function atualizarReserva() {
    const poltronas = JSON.stringify(lugarOcupado);
    await conectaApi.apagaReserva(poltronas);
}

async function listarReserva() {
    const reservas = await conectaApi.listaReserva();


    // Iterar sobre a coleção NodeList usando forEach
    btnPoltrona.forEach((poltrona) => {
        const numeroPoltrona = parseInt(poltrona.textContent);

        const reserva = reservas.find(reserva => reserva.poltrona === numeroPoltrona);

        //Obter data, hora e minutos dos lugares pré reservados
        let data = new Date(reserva.data);
        let hora = data.getHours();
        let minutos = data.getMinutes();

        //Obter data, hora e minutos em tempo real
        let dataAtual = new Date();
        let horaAtual = dataAtual.getHours();
        let minutosAtual = dataAtual.getMinutes();

        //Verificar se já passaram mais de 2 minutos
        let diferencaHoras = horaAtual - hora;
        let diferencaMinutos = minutosAtual - minutos;
        let diferencaTotalMinutos = diferencaHoras * 60 + diferencaMinutos;

        if (reserva) {
            if (!reserva.disponivel) {
                poltrona.style.backgroundColor = 'rgb(255, 0, 0)';
            } else if (reserva.disponivel && !reserva.preReserva) {
                lugarOcupado.push(reserva.poltrona); // Adicionando para ver as vagas
                poltrona.style.backgroundColor = 'rgb(255, 0, 0)';

                if (diferencaTotalMinutos > 2) {
                    atualizarReserva();
                }
            } else if (reserva.disponivel) {
                if (diferencaTotalMinutos > 10) {
                    atualizarReserva();
                }
            }
        }
    });

    console.log(lugarOcupado); // Mostrar apenas as vagas pré reservadas    
}

listarReserva();