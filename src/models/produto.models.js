import pool from "../config/db.js";

const produtoModel = {

    cadastrar: async (idCategoria, nomeProduto, valorProduto, vinculoImagem) => {
        const sql = `
            INSERT INTO produtos 
            (idCategoria, nomeProduto, valorProduto, vinculoImagem) 
            VALUES (?,?,?,?)
        `;
        return await pool.query(sql, [idCategoria, nomeProduto, valorProduto, vinculoImagem]);
    },

    selecionar: async () => {
        const sql = "SELECT * FROM produtos;";
        const [rows] = await pool.query(sql);
        return rows;
    },

    editar: async (id, idCategoria, nomeProduto, valorProduto) => {
        const sql = `
            UPDATE produtos 
            SET idCategoria = ?, nomeProduto = ?, valorProduto = ? 
            WHERE idProduto = ?
        `;
        return await pool.query(sql, [idCategoria, nomeProduto, valorProduto, id]);
    },

    excluir: async (id) => {
        const sql = "DELETE FROM produtos WHERE idProduto = ?;";
        return await pool.query(sql, [id]);
    }

};

export default produtoModel;