const express = require ('express')
const router = express.Router()



router.get('', (req, res) => {
    Cliente.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            mensagem: "Tudo OK",
            clientes: documents
        })
    })
})

router.get('/:id', (req, res) => {
    
    Cliente.findById(req.params.id).then(cli => {
        if (cli)
            res.status(200).json(cli)
        else
            res.status(404).json({mensagem: "Cliente não encontrado!"})
    })
})

router.put('/:id', (req, res) => {
    const cliente = new Cliente({
        ...req.body,
        _id: req.params.id
    })
    Cliente.updateOne(
        {_id: req.params.id },
        cliente
    )
    .then(mongoResponse => {
        console.log(mongoResponse)
        res.status(200).json({
            mensagem: 'Concluido'
        })
    })
})


router.post('', (req, res) => {
    
    const cliente = new login({
        nome: req.body.nome,
        fone: req.body.senha,
        
    })
    
    console.log(cliente)
    //armazenar no mongodb
    cliente.save().then((loginFeito) => {
        res.status(201).json({
            mensagem: 'Cliente inserido',
            id: loginFeito
        })
    })
})



module.exports = router