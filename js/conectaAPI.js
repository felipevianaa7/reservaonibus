async function listaReserva() {
    //sem especificar o método por padrão a requisição será GET
    const conexao = await fetch("https://json-server-alpha-gules.vercel.app/reservas");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function apagaReserva(poltronas) {
    try {
        const poltronasArray = JSON.parse(poltronas);
        const reservas = await listaReserva();

        for (const poltrona of poltronasArray) {
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
        }

        location.reload();
    } catch (error) {
        console.error('Erro durante a exclusão:', error);
        throw error;
    }
}

//função que cria a reserva ou a pré reserva

async function criaReserva(poltronas, nome, email, genero, data, criarPreReserva) {
    try {
        const poltronasArray = JSON.parse(poltronas);
        const reservas = await listaReserva();

        for (const poltrona of poltronasArray) {
            const reservaEncontrada = reservas.find(reserva => reserva.poltrona === poltrona);

            if (reservaEncontrada) {
                const endpoint = `https://json-server-alpha-gules.vercel.app/reservas/${reservaEncontrada.id}`;

                if (criarPreReserva) {
                    reservaEncontrada.nome = nome;
                    reservaEncontrada.email = email;
                    reservaEncontrada.genero = genero;
                    reservaEncontrada.data = data;
                    reservaEncontrada.preReserva = false;
                } else {
                    reservaEncontrada.nome = nome;
                    reservaEncontrada.email = email;
                    reservaEncontrada.genero = genero;
                    reservaEncontrada.data = data;
                    reservaEncontrada.disponivel = false;
                    reservaEncontrada.preReserva = false;
                }

                await fetch(endpoint, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(reservaEncontrada)
                });
            }
        }

        location.reload();
        return { status: "Atualização bem-sucedida" };
    } catch (error) {
        console.error('Erro na função criaReserva:', error);
        throw error;
    }
}

export const conectaApi = {
    criaReserva, listaReserva, apagaReserva
}
