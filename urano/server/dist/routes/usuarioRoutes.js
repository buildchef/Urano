"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioController_1 = require("../controllers/usuarioController");
const router = express_1.default.Router();
const usuarioController = new usuarioController_1.UsuarioController();
router.get('/criar', (req, res) => {
    res.json('Nesta rota, criaremos usuarios.').status(200);
});
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map