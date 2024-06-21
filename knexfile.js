import path from "path";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME, 
        },
        migrations: {
            directory: path.join(__dirname, 'src', 'database', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname,'src', 'database', 'seeds'),
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            databse: DB_NAME,
        },
        migrations: {
            directory: path.join(__dirname, 'build', 'database', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'build', 'database', 'seeds'),
        },
    },
};