export interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

export function createConnection(config: DatabaseConfig) {
    const { Client } = require('pg'); // Assuming you're using pg for PostgreSQL
    const client = new Client({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
    });

    client.connect(err => {
        if (err) {
            console.error('Connection error', err.stack);
        } else {
            console.log('Connected to the database');
        }
    });

    return client;
}