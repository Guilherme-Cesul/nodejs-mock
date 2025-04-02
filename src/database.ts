export const users = new Map();

export function seedUserStore() {
users.set("guilherme@alunocesul.com.br", {
    password: "123456",
    permissions: ["users.read", "users.create", "users.write"],
    roles: ["administrador"]
    });
}