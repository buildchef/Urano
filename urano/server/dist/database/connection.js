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
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../environment");
class Database {
    static conectar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(environment_1.environment.db.uri, {
                    user: environment_1.environment.db.db_user,
                    pass: environment_1.environment.db.db_pwd,
                    dbName: environment_1.environment.db.db_name
                });
                if (this.verificarConexao() === 1) {
                    console.log('Mongo DB conectado com sucesso!');
                    return 1;
                }
                return 0;
            }
            catch (error) {
                console.log('Erro ao conectar ao banco de dados.');
                return 0;
            }
        });
    }
    static verificarConexao() {
        return mongoose_1.default.connection.readyState;
    }
}
exports.default = Database;
//# sourceMappingURL=connection.js.map