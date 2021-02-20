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
    var url = `mongodb://${process.env.HOSTMONGO}:${process.env.PORTMONGO}`;
    let d = await mc.connect(url);

    return d.db(dbName);
}

function redisDb() {
    const rc = redis.createClient({
        host : process.env.HOSTREDIS,
        port : process.env.PORTREDIS
    });

    rc.on("error", (err) => {
        console.log('error redis =>', err);
    });

    return rc;
}

export { mongoDb as db, redisDb as redis }