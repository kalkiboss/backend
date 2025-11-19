const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const usuariosRouter = require('./routes/usuariosRouter');
const apidocsRouter = require('/routes/apidocsRouter');
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(err => console.error("Erro ao conectar no Mongo:", err));

app.use('/usuarios', usuariosRouter);    
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', apidocsRouter)

module.exports = app;
