//MEDICAMENTOS/PRODUTOS: http://192.168.0.20:2000/med
const express = require("express")
const axios = require("axios")

const { v4: uuidv4  } = require("uuid")

const app = express()
app.use(express.json())

//----------------------------------------------------
//BASE

medprod = []
 
//----------------------------------------------------

const funcoes = {
    
}

app.get('/medicamento', (req,res)=>{
    res.send(medprod)
})

app.post('/medicamento', (req,res)=>{
    try{
        medprod.push({
            id:      req.body.id      || "ND",
            nome:    req.body.nome    || "ND",
            nivel:   req.body.nivel   || "ND", //se o produto requer prescrição ou não
            empresa: req.body.empresa || "ND",
            estoque: req.body.estoque || "ND"
        })

        res.send(201)
    }catch(err){console.log(err)}   

    res.end()
    
})

app.post('/eventos',(req,res)=>{
    console.log(req.body);
    res.status(200).send({msg: 'WORKING'});
})


app.put('/medicamento',(req,res)=>{})
app.delete('/medicamento',(req,res)=>{})


app.listen(2000,() => {    console.log('PORTA 2000')    })