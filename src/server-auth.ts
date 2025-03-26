import express, {request} from "express";
import { seedUserStore, users } from "./database";

const port = 3333;
const app = express();

app.use(express.json());

seedUserStore();

app.post('/sessions', (request, response) => {
    const { email, password } = request.body;

    const user = users.get(email);
    if (!user || password != user.password) {
        return response.status(401).json({
            error: true,
            message: "E-mail or Password incorrect.",
        });
    }

    return response.json({
        token: "teste",
        refreshToken: "teste",
    });
    // Pegar o Usuario e Senha
    // Buscar no banco o usuario
    // Erro 401 quando não encontrar usuario
    // Descriptografar a senha 
    // Verificar a senha informada com a senha do banco
    // Erro 401 quando a senha do usuario nao esta valida
    // Gerar o Token e o Refresh Token
    // Retornar Token e Refresh Token
});

app.listen(port, () => (
    console.log(`Listening on port ${port}`)
));