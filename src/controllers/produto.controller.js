import produtoModel from "../models/produto.models.js";

const produtoController = {

    cadastrar: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem não enviada"
                });
            }

            const { idCategoria, nomeProduto, valorProduto } = req.body;

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios"
                });
            }

            const vinculoImagem = req.file.filename;

            await produtoModel.cadastrar(
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem
            );

            return res.status(201).json({
                message: "Produto cadastrado com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    },

    selecionar: async (req, res) => {
        try {

            const produtos = await produtoModel.selecionar();

            return res.status(200).json(produtos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar produtos"
            });
        }
    },

    buscarProdutoPorID: async (req, res) => {
        try {

            const id = Number(req.params.id);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "Informe um identificador (ID) válido"
                });
            }

            const rows = await produtoModel.buscarProdutoPorID(id);

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
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
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const resultado = await produtoModel.editar(
                id,
                idCategoria,
                nomeProduto,
                valorProduto
            );

            if (resultado[0].affectedRows === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            return res.status(200).json({
                message: "Produto atualizado com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao atualizar produto"
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

            const resultado = await produtoModel.excluir(id);

            if (resultado[0].affectedRows === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            return res.status(200).json({
                message: "Produto excluído com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao excluir produto"
            });
        }
    }

};

export default produtoController;