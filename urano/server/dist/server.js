"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("./environment");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const app = (0, express_1.default)();
app.use('/urano/usuario', usuarioRoutes_1.default);
app.listen(environment_1.environment.app.port, () => {
    console.log(`Api rodando na porta => ${environment_1.environment.app.port}`);
});
//# sourceMappingURL=server.js.map