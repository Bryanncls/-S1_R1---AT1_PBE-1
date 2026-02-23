import { Router } from "express";
import produtoController from "../controllers/produto.controller.js";
import uploadImage from "../middlewares/produto.middlewares.js";

const router = Router();

router.post("/produto", uploadImage, produtoController.cadastrar);
router.get("/produto", produtoController.selecionar);
router.put("/produto/:id", produtoController.editar);
router.delete("/produto/:id", produtoController.excluir);

export default router;