//TBA - Esse microserviço não está planejado ser adicionado na versão final

const express = require('express');
const axios = require('axios');

const app= express();
app.use(express.json());


//----------------------------------------------------
//BASE

const eventos  = []

//----------------------------------------------------

app.get('/eventos', (req, res)=> {
  res.send(eventos)
})

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento);

    axios.post('http://192.168.0.20:1000/eventos', evento)
    .catch((err) => {console.log("Microsserviço de Usuarios fora do ar.")});

    axios.post('http://192.168.0.20:2000/eventos', evento)
    .catch((err) => {console.log("Microsserviço de Produtos fora do ar.")});


    res.status(200).send({msg: 'ok'});
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
})