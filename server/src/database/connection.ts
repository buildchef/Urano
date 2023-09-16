import mongoose from "mongoose";
import { environment } from "../environment";

class Database {
    static async conectar(): Promise<number> {
        try{
            await mongoose.connect(
                environment.db.uri,
                {
                    user: environment.db.db_user,
                    pass: environment.db.db_pwd,
                    dbName: environment.db.db_name
                });

            if (this.verificarConexao() === 1){
                console.log('Mongo DB conectado com sucesso!');
                return 1;
            }

            return 0;
        }catch(error) {
            console.log('Erro ao conectar ao banco de dados.');
            return 0;
        }
    }

    static verificarConexao(): number {
        return mongoose.connection.readyState;
    }
}

export default Database;