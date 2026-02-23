import { Router } from "express";
import categoriaController from "../controllers/categoria.controllers.js";

const router = Router();

router.post("/categoria", categoriaController.cadastrar);
router.get("/categoria", categoriaController.selecionar);
router.put("/categoria/:id", categoriaController.editar);
router.delete("/categoria/:id", categoriaController.excluir);

export default router;