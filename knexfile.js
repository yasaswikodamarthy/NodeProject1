'use strict'

// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'yashu',
            database: 'users'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + "/migrations",
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'yashu',
            database: 'users'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};