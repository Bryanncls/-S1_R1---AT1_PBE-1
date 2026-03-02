import categoriaModel from "../models/categoria.models.js";

const categoriaController = {

    cadastrar: async (req, res) => {
        try {

            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({
                    message: "A descrição da categoria é obrigatória"
                });
            }

            await categoriaModel.cadastrar(descricaoCategoria);

            return res.status(201).json({
                message: "Categoria cadastrada com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor"
            });
        }
    },

    selecionar: async (req, res) => {
        try {

            const rows = await categoriaModel.listar();

            return res.status(200).json(rows);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar categorias"
            });
        }
    },

    buscarCategoriaPorID: async (req, res) => {
        try {

            const id = Number(req.params.id);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "Informe um identificador (ID) válido"
                });
            }

            const rows = await categoriaModel.buscarCategoriaPorID(id);

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            return res.status(200).json(rows[0]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {
        try {

            const id = Number(req.params.id);
            const { descricaoCategoria } = req.body;

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            if (!descricaoCategoria) {
                return res.status(400).json({
                    message: "A descrição da categoria é obrigatória"
                });
            }

            const resultado = await categoriaModel.editar(id, descricaoCategoria);

            if (resultado[0].affectedRows === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            return res.status(200).json({
                message: "Categoria atualizada com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao atualizar categoria"
            });
        }
    },

    excluir: async (req, res) => {
        try {

            const id = Number(req.params.id);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const resultado = await categoriaModel.excluir(id);

            if (resultado[0].affectedRows === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            return res.status(200).json({
                message: "Categoria excluída com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao excluir categoria"
            });
        }
    }

};

export default categoriaController;