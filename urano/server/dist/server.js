"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 6666;
app.get('/', (req, res) => {
    res.json('Funcionando.').status(200);
});
app.listen(port, () => {
    console.log('Rodando na porta =>', port);
});
//# sourceMappingURL=server.js.map