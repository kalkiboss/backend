const readline = require('readline-sync');
const controlador = require("./controlador");

function menu() {
    console.log("\n Gerenciador de Tarefas");
    console.log("[1] ADICIONAR TAREFA");
    console.log("[2] BUSCAR TAREFA");
    console.log("[3] ATUALIZAR TAREFA");
    console.log("[4] REMOVER TAREFA");
    console.log("[5] SAIR");
}

async function escolherOpcao(opcao) {
    let nome, concluidaStatus, tarefa;

    switch (opcao) {
        case "1":
            nome = readline.question("Digite o nome da tarefa: ");
            await controlador.adicionarTarefa(nome);
            break;
        case "2":
            nome = readline.question("Digite o nome da tarefa para encontrar: ");
            tarefa = await controlador.buscarTarefa(nome);
            if (tarefa) {
                console.log("\n--- Tarefa Encontrada ---");
                console.log(`ID: ${tarefa.id}`);
                console.log(`Nome: ${tarefa.nome}`);
                console.log(`Concluída: ${tarefa.concluida ? 'Sim' : 'Não'}`);
            } else {
                console.log(`Tarefa '${nome}' não encontrada.`);
            }
            break;
        case '3':
            nome = readline.question("Digite o nome da tarefa para atualizar: ");
            concluidaStatus = readline.question("Concluída? (sim/nao): ");
            await controlador.atualizarTarefa(nome, concluidaStatus);
            break;
        case '4':
            nome = readline.question("Digite o nome da tarefa para remover: ");
            await controlador.removerTarefa(nome);
            break;
        case '5':
            console.log("Encerrando o programa...");
            process.exit(0); // Código 0 indica sucesso
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}

async function main() {
    while (true) {
        menu();
        const opcao = readline.question("Escolha uma opção: ");
        await escolherOpcao(opcao); 
    }
}
main();
