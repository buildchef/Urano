import { Db, MongoClient } from "mongodb";
import { environment } from "../environment";

let db: Db;

export async function connect(): Promise<void>{
   const client: MongoClient = new MongoClient(environment.db.uri);
   try{
    await client.connect();
    db = client.db(environment.db.db_name);
    console.log('Connection made successfully.')
   }catch(error){
    console.log("Error: Couldn't connect to the database.");
   }
}

export function getDb(): Db{
    return db;
}

connect().catch(console.error);