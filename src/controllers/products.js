const connection = require("../connection");

const getAllProducts = async (req, res) => {

}

const registerProduct = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { id: user_id } = req.usuario;

    if(!nome) return res.status(400).json("É necessário informar o nome do produto.");
    if(!estoque) return res.status(400).json("É necessário informar o estoque.");
    if(!preco) return res.status(400).json("É necessário informar o preço.");
    if(!descricao) return res.status(400).json("É necessário informar a descrição.");

    try {

        const query = `INSERT INTO produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7)`
        const product = await connection.query(query, [user_id, nome, estoque, categoria, preco, descricao, imagem]);
        if(!product.rowCount) 
            return res.status(400).json("Não foi possível cadastrar o produto.");

         return res.status(200).json("Produto cadastrado com sucesso!");   
    } catch(error) {
        return res.status(400).json(error.message);
    }
} 

const getProduct = async (req, res) => {

}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {

}

module.exports = { getAllProducts, registerProduct, getProduct, updateProduct, deleteProduct }