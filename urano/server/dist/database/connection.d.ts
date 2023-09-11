declare class Database {
    static conectar(): Promise<number>;
    static verificarConexao(): number;
}
export default Database;
