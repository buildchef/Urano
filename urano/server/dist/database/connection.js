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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const environment_1 = require("../environment");
let db;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(environment_1.environment.db.uri);
        try {
            yield client.connect();
            db = client.db(environment_1.environment.db.db_name);
            console.log('Connection made successfully.');
        }
        catch (error) {
            console.log("Error: Couldn't connect to the database.");
        }
    });
}
exports.connect = connect;
function getDb() {
    return db;
}
exports.getDb = getDb;
connect().catch(console.error);
//# sourceMappingURL=connection.js.map