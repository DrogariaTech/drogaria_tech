//USUARIOS: http://localhost:2000/usu
const express = require("express")
const axios = require("axios")

const { v4: uuidv4  } = require("uuid")

const app = express()
app.use(express.json())

//----------------------------------------------------
//BASE

usuarios = []

//----------------------------------------------------

app.get("/usuario", (req,res)    =>  {
    res.send(usuarios)
});


//CRIAR NOVO USUARIO

/*
const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
*/

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

app.put("/usuario/:id",(req,res)=>{

})

app.delete("/usuario/:id",(req,res)=>{
    
})

app.listen(2000,() => {
    console.log('PORTA 2000')
})



//---------------------------------------------------------------
//---------------------------------------------------------------
