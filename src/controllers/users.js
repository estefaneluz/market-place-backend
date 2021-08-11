const connection = require("../connection");
const securePassword = require("secure-password");

const pwd = securePassword();

const registerUser = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    
    if(!nome) return res.status(400).json("O nome precisa ser informado.");
    if(!email) return res.status(400).json("O e-mail precisa ser informado.");
    if(!senha) return res.status(400).json("A senha precisa ser informada.");
    if(!nome_loja) return res.status(400).json("O nome da loja precisa ser informada");

    try {

    } catch(error){
        return res.status(400).json(error.message);
    }
}

const getUser = async (req, res) => {

}

const editUser = async (req, res) => {

}

module.exports = { registerUser, getUser, editUser }