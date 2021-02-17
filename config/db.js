import pg from 'pg';

const client = new pg.Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'bootest',
    port: 5432,
});

client.connect();

export { client as db }