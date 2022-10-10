//MEDICAMENTOS/PRODUTOS: http://192.168.0.26:2000/med
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
            id:      req.body.id ,
            nome:    req.body.nome,
            nivel:   req.body.nivel, //se o produto requer prescrição ou não
            empresa: req.body.empresa,
            estoque: req.body.estoque
        })

        res.send(201)
    }catch(err){console.log(err)}   

    res.end()
    
})

app.put('/medicamento',(req,res)=>{

})

app.delete('/medicamento',(req,res)=>{

})

app.listen(2000,() => {
    console.log('PORTA 2000')
})