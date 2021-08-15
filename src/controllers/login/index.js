const connection = require("../../connection");
const securePassword = require("secure-password");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../jwt_secret");

const pwd = securePassword();

const login = async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha ) return res.status(400).json("É preciso informar o email e a senha.");

    try {
        const { rows, rowCount } = await connection.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if(!rowCount) return res.status(400).json("E-mail ou senha incorretos.");

        const user = rows[0];
        const result = await pwd.verify(Buffer.from(senha), Buffer.from(user.senha, "hex"));

        switch(result){
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json("E-mail ou senha incorretos.");
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    await conexao.query("UPDATE usuarios SET senha = $1 WHERE email = $2", [hash, email]);
                } catch { }
                break;
        }

        const token = jwt.sign({
            id: user.id
        }, jwtSecret);

        const {senha: password, ...userData} = user;

        return res.status(200).json({
            usuario: userData,
            token
        });
    } catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = { login }