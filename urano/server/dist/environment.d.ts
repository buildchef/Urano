export interface IEnvironment {
    app: {
        port: number;
    };
    db: {
        uri: string;
        db_name: string;
    };
}
export declare const environment: IEnvironment;
