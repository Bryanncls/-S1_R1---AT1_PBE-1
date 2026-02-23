import produtoModel from "../models/produto.models.js";

const produtoController = {

    cadastrar: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({ message: "Imagem não enviada" });
            }

            const { idCategoria, nomeProduto, valorProduto } = req.body;
            const vinculoImagem = req.file.filename;

            await produtoModel.cadastrar(
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem
            );

            res.status(200).json({ message: "Produto cadastrado com sucesso" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    },

    selecionar: async (req, res) => {
        try {
            const produtos = await produtoModel.selecionar();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar produtos" });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            await produtoModel.editar(id, idCategoria, nomeProduto, valorProduto);

            res.status(200).json({ message: "Produto atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar produto" });
        }
    },

    excluir: async (req, res) => {
        try {
            const id = req.params.id;

            await produtoModel.excluir(id);

            res.status(200).json({ message: "Produto excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir produto" });
        }
    }

};

export default produtoController;