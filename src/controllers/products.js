const connection = require("../connection");

const getAllProducts = async (req, res) => {
    const { id } = req.usuario; 
    const { categoria } = req.query;
    try {
        const query = `SELECT p.id, u.nome as usuario, p.* FROM produtos p JOIN usuarios u ON p.usuario_id = $1`
        let { rows: produtos } = await connection.query(query, [id]);

        if(categoria){
            produtos = produtos.filter(
                produto => produto.categoria.toLowerCase() === categoria.toLowerCase()
            );
        }

        return res.status(200).json(produtos);
    } catch(error){
        return res.status(400).json(error.message);
    }
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
    const { id: user_id } = req.usuario; 
    const { id } = req.params;
    try {
        const query = `SELECT p.id, u.nome as usuario, p.* FROM produtos p JOIN usuarios u ON p.id = $1 AND p.usuario_id = $2`
        const product = await connection.query(query, [id, user_id]);
        if(!product.rowCount) 
            return res.status(404).json("Não foi possível encontrar o produto.");
        
        return res.status(200).json(product.rows[0]);
    } catch(error){
        return res.status(400).json(error.message);
    }
}

const updateProduct = async (req, res) => {
    const { id: user_id } = req.usuario;
    const { id } = req.params;
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

    if(!nome) return res.status(400).json("É necessário informar o nome do produto.");
    if(!estoque) return res.status(400).json("É necessário informar o estoque.");
    if(!preco) return res.status(400).json("É necessário informar o preço.");
    if(!descricao) return res.status(400).json("É necessário informar a descrição.");

    try {
        const { rowCount } = await connection.query("SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2", [id, user_id]);
        if(!rowCount) 
            return res.status(404).json("Não foi possível encontar o produto.");

        const query = `UPDATE produtos SET nome = $1, estoque = $2, categoria = $3, 
        preco = $4, descricao = $5, imagem = $6 WHERE id = $7 AND usuario_id = $8`
        const produto = await connection.query(query, [nome, estoque, categoria, preco, descricao, imagem, id, user_id]);

        if(!produto.rowCount) 
            return res.status(400).json("Não foi possível atualizar o produto.");
        
        return res.status(200).json("Produto atualizado com sucesso!");
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

const deleteProduct = async (req, res) => {
    const { id: user_id } = req.usuario;
    const { id } = req.params;

    try {
        const { rowCount } = await connection.query("SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2", [id, user_id]);
        if(!rowCount) 
            return res.status(404).json("Produto não encontrado.");

        const product = await connection.query("DELETE FROM produtos WHERE id = $1 AND usuario_id = $2", [id, user_id]); 
        if(!product.rowCount)
            return res.status(400).json("Não foi possível deletar o produto.");

        return res.status(200).json("Produto deletado com sucesso!");
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { getAllProducts, registerProduct, getProduct, updateProduct, deleteProduct }