// Update with your config settings.
require('dotenv').config()

module.exports = {

  client: 'sqlite3',
  connection: {
    filename: './data/foodtruck.db3'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }

};
