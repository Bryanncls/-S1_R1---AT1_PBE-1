import express from "express";
import produtoRoutes from "./routes/produtos.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import "dotenv/config";

const app = express();
const PORT = 8081;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(produtoRoutes);
app.use(categoriaRoutes);

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});