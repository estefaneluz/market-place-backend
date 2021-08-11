const connection = require("../connection");
const securePassword = require("secure-password");

const pwd = securePassword();

const registerUser = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    
    if(!nome) return res.status(400).json("O nome precisa ser informado.");
    if(!email) return res.status(400).json("O e-mail precisa ser informado.");
    if(!senha) return res.status(400).json("A senha precisa ser informada.");
    if(!nome_loja) return res.status(400).json("O nome da loja precisa ser informado.");

    try {

        const uniqueEmail = await connection.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if(uniqueEmail.rowCount) 
            return res.status(400).json("E-mail já cadastrado.");
        
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const user = await connection.query("INSERT INTO usuarios(nome, email, nome_loja, senha) VALUES($1, $2, $3, $4)", [nome, email, nome_loja, hash]);
        
        if(!user.rowCount) 
            return res.status(400).json("Não foi possível cadastrar o usuário.");

        return res.status(200).json("Usuário cadastrado com sucesso.");

    } catch(error){
        return res.status(400).json(error.message);
    }
}

const getUser = async (req, res) => {
    const { id } = req.usuario;
    
    try {
        const { rows } = await connection.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        const {senha, ...user } = rows[0];
        return res.status(200).json(user);
    } catch(error){
        return res.status(400).json(error.message);
    }

}

const editUser = async (req, res) => {
    const { nome, email, nome_loja, senha } = req.body;
    const { id } = req.usuario;

    if(!nome) return res.status(400).json("O nome precisa ser informado.");
    if(!email) return res.status(400).json("O email precisa ser informado.");
    if(!nome_loja) return res.status(400).json("O nome da loja precisa ser informado.");
    if(!senha) return res.status(400).json("A senha precisa ser informada.");

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

        const user = await connection.query("UPDATE usuarios SET nome = $1, email = $2, nome_loja = $3, senha = $4 WHERE id = $5", [nome, email, nome_loja, hash, id]);
        if(!user.rowCount)
            return res.status(400).json("Não foi possível editar o usuário.");
        
        return res.status(200).json("Usuário atualizado com sucesso!");   
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { registerUser, getUser, editUser }