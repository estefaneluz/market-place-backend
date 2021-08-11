const jwt = require("jsonwebtoken");
const connection = require("../connection");
const secret = require("../jwt_secret");

const authLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization)
        return res.status(404).json("Token não informado.");
    
    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, secret);

        const {rows, rowCount} = await connection.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if(!rowCount) 
            return res.status(404).json("Usuário não encontrado.");
        
        const {senha, ...usuario} = rows[0];
        req.usuario = usuario;
        next();
    } catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = { authLogin }