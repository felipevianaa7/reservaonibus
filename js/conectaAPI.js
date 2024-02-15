async function listaReserva() {
    //sem especificar o método por padrão a requisição será GET
    const conexao = await fetch("https://json-server-alpha-gules.vercel.app/reservas");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function apagaReserva(poltronas) {
    try {
        //converte de volta para array
        const poltronasArray = JSON.parse(poltronas);

        //Acessa reserva do db.json
        const reservas = await listaReserva();
        console.log('Reservas:', reservas); // Adicione este log para verificar as reservas

        poltronasArray.forEach(async poltrona => {
            const reservaEncontrada = reservas.find(reserva => reserva.poltrona === poltrona);
            const endpoint = `https://json-server-alpha-gules.vercel.app/reservas/${reservaEncontrada.id}`;

            reservaEncontrada.nome = "";
            reservaEncontrada.email = "";
            reservaEncontrada.genero = "";
            reservaEncontrada.data = "";
            reservaEncontrada.disponivel = true;
            reservaEncontrada.preReserva = true;

            await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(reservaEncontrada)
            });
        });

    } catch (error) {
        console.error('Erro durante a exclusão:', error);
        throw error;
    }
}

//função que cria a reserva ou a pré reserva
async function criaReserva(poltronas, nome, email, genero, data, criarPreReserva) {

    try {
        //converte de volta para array
        const poltronasArray = JSON.parse(poltronas);

        //Acessa reserva do db.json
        const reservas = await listaReserva();
        console.log('Reservas:', reservas); // Adicione este log para verificar as reservas

        //Percorrer o array poltronasArray
        poltronasArray.forEach(async poltrona => {
            console.log('Poltrona:', poltrona);
            // Encontra o objeto de reserva correspondente
            const reservaEncontrada = reservas.find(reserva => reserva.poltrona === poltrona);
            console.log('Reserva encontrada:', reservaEncontrada);

            if (reservaEncontrada) {
                // Log do endpoint antes da requisição
                const endpoint = `https://json-server-alpha-gules.vercel.app/reservas/${reservaEncontrada.id}`;
                console.log('Endpoint:', endpoint);

                try {
                    if (criarPreReserva) {
                        reservaEncontrada.nome = nome;
                        reservaEncontrada.email = email;
                        reservaEncontrada.genero = genero;
                        reservaEncontrada.data = data;
                        reservaEncontrada.preReserva = false;
                    } else {
                        // Atualiza os dados da reserva encontrada
                        reservaEncontrada.nome = nome;
                        reservaEncontrada.email = email;
                        reservaEncontrada.genero = genero;
                        reservaEncontrada.data = data;
                        reservaEncontrada.disponivel = false;
                        reservaEncontrada.preReserva = false;
                    }

                    // Atualiza a reserva no servidor
                    console.log('Antes da requisição PUT');

                    await fetch(endpoint, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(reservaEncontrada)
                    });

                    console.log('Atualização bem-sucedida');
                } catch (error) {
                    console.error('Erro durante a atualização:', error);
                }
            }
        });
        return { status: "Atualização bem-sucedida" };
    } catch (error) {
        console.error('Erro na função criaReserva:', error);
        throw error;
    }
}

export const conectaApi = {
    criaReserva, listaReserva, apagaReserva
}
