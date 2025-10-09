const { conectarDb } = require('./database');
const { ObjectId } = require('mongodb'); 
class Tarefa {
    db = conectarDb();
    collection = this.db.then(db => db.collection('tarefas'));

    constructor(nome, concluida = false) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = null;
    }

    async inserir() {
        const collection = await this.collection;

        const resultado = await collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });

        this.id = resultado.insertedId;
        return this.id;
    }

    async alterar() {
        const collection = await this.collection;

        const resultado = await collection.updateOne(
            { _id: this.id },
            { $set: { nome: this.nome, concluida: this.concluida } }
        );
        return resultado.modifiedCount;
    }

    async deletar() {
        const collection = await this.collection;

        const resultado = await collection.deleteOne({ nome: this.nome });
        return resultado.deletedCount;
    }

    async buscar() {
        const collection = await this.collection;

        const resultado = await collection.findOne({ nome: this.nome });

        if (resultado) {
            this.id = resultado._id;
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
            return true;
        }
        return false;
    }
}

module.exports = { Tarefa };