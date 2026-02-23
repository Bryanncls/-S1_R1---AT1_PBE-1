import categoriaModel from "../models/categoria.models.js";

const categoriaController = {

    cadastrar: async (req, res) => {
        try {

            const descricaoCategoria = req.body.descricaoCategoria;

            await categoriaModel.cadastrar(descricaoCategoria);

            res.status(200).json({
                message: "Categoria cadastrada com sucesso"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor"
            });
        }
    },

    selecionar: async (req, res) => {
        try {

            const [rows] = await categoriaModel.listar();

            res.status(200).json(rows);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao buscar categorias"
            });
        }
    },

    editar: async (req, res) => {
        try {

            const id = req.params.id;
            const descricaoCategoria = req.body.descricaoCategoria;

            await categoriaModel.editar(id, descricaoCategoria);

            res.status(200).json({
                message: "Categoria atualizada com sucesso"
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao atualizar categoria"
            });
        }
    },

    excluir: async (req, res) => {
        try {

            const id = req.params.id;

            await categoriaModel.excluir(id);

            res.status(200).json({
                message: "Categoria excluída com sucesso"
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao excluir categoria"
            });
        }
    }

};

export default categoriaController;