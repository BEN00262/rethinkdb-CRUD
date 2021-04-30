require('dotenv').config();

const express = require('express');
const consola = require('consola');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/',require('./routes'));

app.listen(PORT,() => {
    consola.info(`Server started on port ${PORT}`);
})