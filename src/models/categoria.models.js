import pool from "../config/db.js";

const categoriaModel = {

    cadastrar: async (descricaoCategoria) => {
        const sql = "INSERT INTO categorias (descricaoCategoria) VALUES (?);";
        return await pool.query(sql, [descricaoCategoria]);
    },

    listar: async () => {
        const sql = "SELECT * FROM categorias;";
        const [rows] = await pool.query(sql);
        return rows;
    },

    buscarCategoriaPorID: async (id) => {
        const sql = "SELECT * FROM categorias WHERE idCategoria = ?;";
        const [rows] = await pool.query(sql, [id]);
        return rows;
    },

    editar: async (id, descricaoCategoria) => {
        const sql = "UPDATE categorias SET descricaoCategoria = ? WHERE idCategoria = ?;";
        return await pool.query(sql, [descricaoCategoria, id]);
    },

    excluir: async (id) => {
        const sql = "DELETE FROM categorias WHERE idCategoria = ?;";
        return await pool.query(sql, [id]);
    }

};

export default categoriaModel;