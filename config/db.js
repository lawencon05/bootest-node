import pg from 'pg';
import md from 'mongodb';

const dbName = "bootest";

async function postgreSQL() {
    const client = new pg.Client({
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        database: dbName,
        port: 5432,
    });

    await client.connect();

    return client;
}

async function mongoDb() {
    let mc = md.MongoClient;
    var url = `mongodb://localhost:27017`;
    let d = await mc.connect(url);
    
    let db = d.db(dbName);

    // create collections
    //await db.createCollection("users");
    //another collection here

    return db;
}


export { mongoDb as db }