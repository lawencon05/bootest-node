import pg from 'pg';
import md from 'mongodb';
import redis from 'redis';

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

    // create collections or comment it when you already add manually
    // await db.createCollection("users");
    // another collection here

    return db;
}

function redisDb() {
    const rp = 6379;
    const rc = redis.createClient(rp);
  
    rc.on('ready', () => {
        console.log(`connected to redis with port ${rp}`);
    });
    rc.on("error", (err) => {
        console.log('error redis =>', err);
    });

    return rc;
}

export { mongoDb as db, redisDb as redis }