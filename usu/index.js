//USUARIOS: http://192.168.0.20:1000/usu

//BIBLIOTECAS  ------------------------------------
require("dotenv").config()
const {
    USER_DB,
    HOST_DB,
    DATABASE_DB,
    PASSWORD_DB,
    PORT_DB
} = process.env

const { Client } = require('pg')

const express = require("express");
const axios = require("axios");

const { v4: uuidv4  } = require("uuid");

const app = express();
app.use(express.json());

//BANCO DE DADOS----------------------------------- PLACEHOLDER

function getClientDb(){
    return new Client({
      user:     USER_DB,
      host:     HOST_DB,
      database: DATABASE_DB,
      password: PASSWORD_DB,
      port:     PORT_DB
    });
}


//----------------------------------------------------

app.get("/usuario", (req,res)    =>  {
    res.send(usuarios)
});


//CRIAR NOVO USUARIO

app.post("/usuario",(req,res)=>{
    try{
        const email_em_usuarios = usuarios.filter((usuario) => usuario.email === req.body.email.toLowerCase())
      .length !== 0;

    if(!email_em_usuarios){
        usuarios.push({
            id: uuidv4(),
            nome: req.body.nome,
            email: req.body.email,
        })

        res.status(201)
    }else{
        res.status(400).send({msg:"erro"})
     }
    }catch(err){console.log(err)}

    res.end()
})

app.post('/eventos',(req,res)=>{
    console.log(req.body);
    res.status(200).send({msg: 'WORKING'});
})


app.put("/usuario/:id",(req,res)=>{})
app.delete("/usuario/:id",(req,res)=>{})


app.listen(1000,() => {
    console.log('PORTA 1000')
})



//---------------------------------------------------------------
//---------------------------------------------------------------
