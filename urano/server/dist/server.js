"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("./environment");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const connection_1 = __importDefault(require("./database/connection"));
const pecasRoutes_1 = __importDefault(require("./routes/pecasRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/urano/usuario', usuarioRoutes_1.default);
app.use('/urano/pecas', pecasRoutes_1.default);
app.listen(environment_1.environment.app.port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Api rodando na porta => ${environment_1.environment.app.port}`);
    yield connection_1.default.conectar();
}));
//# sourceMappingURL=server.js.map