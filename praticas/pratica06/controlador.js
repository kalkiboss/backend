const { Tarefa } = require('./modelo');

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    await tarefa.inserir();
    console.log(`Tarefa '${tarefa.nome}' adicionada com sucesso! (ID: ${tarefa.id})`);
}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        return {
            id: tarefa.id,
            nome: tarefa.nome,
            concluida: tarefa.concluida
        };
    }
    return null;
}

async function atualizarTarefa(nome, concluidaStatus) {
    const tarefa = new Tarefa(nome);
    const statusBooleano = concluidaStatus.toLowerCase() === 'sim';

    const encontrada = await tarefa.buscar();
    if (encontrada) {
        tarefa.nome = nome;
        tarefa.concluida = statusBooleano;

        await tarefa.alterar();
        console.log(`Tarefa '${nome}' atualizada para concluída: ${statusBooleano}.`);
        return true;
    }
    console.log(`Tarefa '${nome}' não encontrada para atualização.`);
    return false;
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome);

    const encontrada = await tarefa.buscar();
    if (encontrada) {
        await tarefa.deletar();
        console.log(`Tarefa '${nome}' removida com sucesso.`);
        return true;
    }
    console.log(`Tarefa '${nome}' não encontrada para remoção.`);
    return false;
}
module.exports = {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa
};