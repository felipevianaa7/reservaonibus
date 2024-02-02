async function listaReserva() {
    //sem especificar o método por padrão a requisição será GET
    const conexao = await fetch("http://localhost:3000/reservas");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaReserva(poltronas, nome, email, genero) {
    console.log('Função criaReserva chamada');

    try {
        const poltronasArray = JSON.parse(poltronas);

        //Array reservas
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
                const endpoint = `http://localhost:3000/reservas/${reservaEncontrada.id}`;
                console.log('Endpoint:', endpoint);

                try {
                    // Atualiza os dados da reserva encontrada
                    reservaEncontrada.nome = nome;
                    reservaEncontrada.email = email;
                    reservaEncontrada.genero = genero;

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
    criaReserva, listaReserva
}