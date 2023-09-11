export interface IEnvironment {
    app: {
        port: number;
    };
    db: {
        uri: string;
        db_name: string;
        db_user: string;
        db_pwd: string;
    };
}
export declare const environment: IEnvironment;
