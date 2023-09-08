import express from "express";

const app = express();
const port = 6666;

app.get('/', (req, res) => {
    res.json('Funcionando.').status(200);
});

app.listen(port, ()=> {
    console.log('Rodando na porta =>', port);
});