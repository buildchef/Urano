export interface IEnvironment{
    app: {
        port: number,
    },
    db: {
        uri: string,
        db_name: string,
        db_user: string,
        db_pwd: string
    }
};

export const environment: IEnvironment = {
    app: {
        port: 6666,
    },
    db: {
        uri: "mongodb+srv://fabriciojosejunior:1234a5678b@usuarios.maqph2s.mongodb.net/?retryWrites=true&w=majority",
        db_name: "Urano",
        db_user: "fabriciojosejunior",
        db_pwd: "1234a5678b" 
    }
} 