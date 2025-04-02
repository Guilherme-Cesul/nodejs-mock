import express, {NextFunction, Request, Response} from "express";
import { seedUserStore, users } from "./database";
import { generateJwtAndRefreshToken } from "./auth";
import jwt from "jsonwebtoken";
import { auth } from "./config";
import { DecodedToken } from "./types";

const port = 3333;
const app = express();

app.use(express.json());

seedUserStore();

function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: true, code: "token.invalid", message: "Token does not exists" });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
        return response
            .status(401)
            .json({ error: true, code: "token.invalid", message: "Token does not exists"});
    }

    try {
        const decoded = jwt.verify(token, auth.secret) as DecodedToken;

        request.user = decoded.sub;

        return next();
    } catch (error) {
        return response
            .status(401)
            .json({ error: true, code: "token.invalid", message: "Token does not exists"});
    }

    console.log(authorization);

    return next();
}

app.post('/sessions', (request, response) => {
    const { email, password } = request.body;

    const user = users.get(email);
    if (!user || password != user.password) {
        return response.status(401).json({
            error: true,
            message: "E-mail or Password incorrect.",
        });
    }

    const { token } = generateJwtAndRefreshToken (email, {
        permissions: user.permissions,
        roles: user.roles,
    });

    return response.json({
        token

    });
});

app.get('/me', checkAuthMiddleware, (request, response) => {
    const email = request.user;

    const user = users.get(email);

    if(!user) {
        return response
            .status(404)
            .json({ error: true, message: "User not Found."});
    }

    return response.json({
        email,
        permissions: user.permissions,
        roles: user.roles,
    })
})

app.listen(port, () => (
    console.log(`Listening on port ${port}`)
));