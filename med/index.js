//MEDICAMENTOS/PRODUTOS: http://localhost:4000/med
const express = require("express")
const axios = require("axios")

const { v4: uuidv4  } = require("uuid")

const app = express()
app.use(express.json())

//----------------------------------------------------
//BASE

medprod = []
 
//----------------------------------------------------

app.get('/medicamento', (req,res)=>{
    res.send(medprod)
})

app.post('/medicamento', (req,res)=>{
    try{
        medprod.push({
            nome: req.body.nome,
            nivel: req.body.nivel,
            empresa: req.body.empresa,
            estoque: req.body.estoque
        })
    }catch(err){console.log(err)}
   
})

app.listen(4000,() => {
    console.log('PORTA 4000')
})