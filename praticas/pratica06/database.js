const { MongoClient } = require('mongodb');
const url = "mongodb+srv://kaya:kaya190@kayavieira.djiq1tw.mongodb.net/";
const client = new MongoClient(url);

async function conectarDb() {
    try {
        await client.connect();
        console.log("Acesso liberado ao MongoDb!")
        return client.db("agenda");
    } catch (error) {
        console.log("Atenção erro ao conectar!")
        process.exit(1);
    }
}

module.exports = {conectarDb};