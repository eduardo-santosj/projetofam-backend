var buscaCep = require('busca-cep');

async function getAddresCep(req, res){
    var resposta = buscaCep(req.params.cep, {sync: true, timeout: 1000});
    if (!resposta.erro) {
        return res.status(200).json({ success: true, address: resposta});

    } else {
        console.log(`Erro: statusCode ${resposta.statusCode} e mensagem ${resposta.message}`);
        return res.status(400).json({ success: false, message: "Endereço não encontrado"});
    }
}

module.exports = {
    getAddresCep
}