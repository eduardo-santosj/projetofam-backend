var buscaCep = require('busca-cep');

async function getAddresCep(req, res){
    buscaCep(req.params.cep, {sync: false, timeout: 1000})
        .then(endereco => {
            return res.status(200).json({ success: true, address: endereco});
        })
    .catch(erro => {
        console.log(`Erro: statusCode ${erro.statusCode} e mensagem ${erro.message}`);
    });
}

module.exports = {
    getAddresCep
}