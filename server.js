const express = require('express');
const app = express();
const data = require('./down-count.json');

app.use(express.json());

app.get('/', function (req, res) {
  res.send(`Server rodando! \n
  Contador atual: ${data.contador} - Última data: ${data.ultimaDataDownload || 'Sem data'}`);

  res.json(data);

});

app.put('/', function (req, res) {
    
    try {
        ++data.contador;

        data.ultimaDataDownload = new Date().toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

        data[`historico-${data.contador}`] = {
            dataDownloadHistorico: new Date().toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}),
            contadorHistorico: data.contador
        }

    } catch (erro) {
        console.log(`Não foi possível incremetar o contador! Erro: ${erro.message}`);
        return res.status(500).json();
    };
    
    res.json(data);

});

app.listen(3000);