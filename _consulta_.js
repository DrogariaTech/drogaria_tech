//CODIGO NEON

const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const usuarios = [];

// Listar todos os usuários
app.get("/usuarios", (_, res) => {
  res.send(usuarios);
});

// Cadastrar um novo usuário
app.post("/usuarios", (req, res) => {
  const express = require("express");
  const { v4: uuidv4 } = require("uuid");
  
  const app = express();
  
  app.use(express.json());
  
  const usuarios = [];
  
  // Listar todos os usuários
  app.get("/usuarios", (_, res) => {
    res.send(usuarios);
  });
  
  // Cadastrar um novo usuário
  app.post("/usuarios", (req, res) => {
    const emailAlreadyRegistered =
      usuarios.filter((usuario) => usuario.email === req.body.email.toLowerCase())
        .length !== 0;
  
    if (!emailAlreadyRegistered) {
      usuarios.push({
        id: uuidv4(),
        nome: req.body.nome,
        email: req.body.email.toLowerCase(),
      });
  
      res.status(201);
    } else {
      res.status(400).json({
        status: 400,
        title: "Ocorreu um erro de validação",
        message: "O e-mail informado já está em uso",
      });
    }
  
    res.end();
  });
  
  app.listen(3000, () => {
    console.log("Aplicação rodando...");
  });
  

  if (!emailAlreadyRegistered) {
    usuarios.push({
      id: uuidv4(),
      nome: req.body.nome,
      email: req.body.email.toLowerCase(),
    });

    res.status(201);
  } else {
    res.status(400).json({
      status: 400,
      title: "Ocorreu um erro de validação",
      message: "O e-mail informado já está em uso",
    });
  }

  res.end();
});

app.listen(3000, () => {
  console.log("Aplicação rodando...");
});

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------

//Observacoes
const express = require ('express')
const app = express()
const axios = require('axios');
//erro comum: esquecer de chamar a função
//json 
//não faça isso: app.use(express.json)
app.use(express.json())

const {v4 : uuidv4} = require('uuid');

const observacoesPorLembreteId = {};

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = 
            observacoesPorLembreteId[observacao.lembreteId];
        let obsParaAtualizar = observacoes.find(o => o.id === observacao.id);
        obsParaAtualizar = observacao.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        });
    }
}

//localhost:5000/lembretes/123456/observacoes
app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const observacoesDoLembrete = 
        observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({
      id: idObs, 
      texto, 
      status: 'aguardando'
    });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {
            id: idObs,
            texto,
            lembreteId: req.params.id,
            status: 'aguardando'
        }
    })
    res.status(201).send(observacoesDoLembrete);
})

//localhost:5000/lembretes/abcd/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
})

app.post('/eventos', (req, res) => {
  try{
    funcoes[req.body.tipo](req.body.dados);  
  }
  catch (ex){
    console.log(ex)
    console.log(req.body)
  }
  res.status(200).send({msg: 'ok'})
})
  
app.listen(5000, () => console.log('Observações. Porta 5000.'))


//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
//Lembretes

const express = require ('express')
const app = express()
const axios = require('axios')
//estamos aplicando um middleware
app.use(express.json())


const lembretes = {}
let contador = 0

//GET obter a lista de lembretes
//localhost:4000/lembretes
app.get('/lembretes', (req, res) => {
  res.send(lembretes)
})

//POST cadastrar um lembrete novo
//localhost:4000/lembretes
// {texto: 'Fazer café'}
app.post('/lembretes', async (req, res) => {
  contador++
  // const texto = req.body.texto  
  const { texto } = req.body;
  lembretes[contador] = {contador, texto};
  await axios.post("http://localhost:10000/eventos", {
    tipo: "LembreteCriado",
    dados: {
      contador,
      texto,
    },
  });
  res.status(201).send(lembretes[contador]);
})

app.post('/eventos', (req, res) => {
  console.log(req.body);
  res.status(200).send({msg: 'ok'});
})

app.listen(4000, () => console.log ('Lembretes. Porta 4000'))

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
//consulta

const express = require ('express')
const app = express()
const axios = require('axios')
//estamos aplicando um middleware
app.use(express.json())


const lembretes = {}
let contador = 0

//GET obter a lista de lembretes
//localhost:4000/lembretes
app.get('/lembretes', (req, res) => {
  res.send(lembretes)
})

//POST cadastrar um lembrete novo
//localhost:4000/lembretes
// {texto: 'Fazer café'}
app.post('/lembretes', async (req, res) => {
  contador++
  // const texto = req.body.texto  
  const { texto } = req.body;
  lembretes[contador] = {contador, texto};
  await axios.post("http://localhost:10000/eventos", {
    tipo: "LembreteCriado",
    dados: {
      contador,
      texto,
    },
  });
  res.status(201).send(lembretes[contador]);
})

app.post('/eventos', (req, res) => {
  console.log(req.body);
  res.status(200).send({msg: 'ok'});
})

app.listen(4000, () => console.log ('Lembretes. Porta 4000'))

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
//classificacao

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

palavraChave = "importante";
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave)
            ? "importante"
            : "comum";
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    },
};

app.post('/eventos', (req, res) => {
  try{
    funcoes[req.body.tipo](req.body.dados);
  }
  catch (ex){
    console.log(ex)
    console.log(req.body)
  }
  res.status(200).send({msg: "ok"});
});

app.listen(7000, async() => {
  try{
    console.log("Classificação. Porta 7000")
    const resp = await axios.get('http://localhost:10000/eventos')
    resp.data.forEach((valor, indice, colecao) => {
      try{
        funcoes[valor.tipo](valor.dados)
      }
      catch (e){}
    })

  }
  catch (e){
    console.log(e)
  }

});

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
//barramento

const express = require('express');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const app= express();
app.use(express.json());

const eventos  = []

app.get('/eventos', (req, res)=> {
  res.send(eventos)
})
app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento)
    //envia o evento para o microsserviço de lembretes
    axios.post('http://localhost:4000/eventos', evento)
    .catch((err) => {
        console.log("Microsserviço de lembretes fora do ar.")
    });
    //envia o evento para o microsserviço de observações
    axios.post('http://localhost:5000/eventos', evento)
    .catch((err) => {
        console.log("Microsserviço de observações fora do ar.")
    });
    //envia o evento para o microsserviço de consulta
    axios.post('http://localhost:6000/eventos', evento)
    .catch((err) => {
        console.log("Microsserviço de consultas fora do ar.")
    });
    //envia o evento para o microsserviço de classificação
    axios.post('http://localhost:7000/eventos', evento)
    .catch((err) => {
        console.log("Microsserviço de classificação fora do ar.")
    });

    res.status(200).send({msg: 'ok'});
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
})