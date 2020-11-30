let dbConfig = {};
try {
  const config = require('../config');
  dbConfig = {
    user: process.env.POSTGRES_USER || config.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || config.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD || config.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE || config.POSTGRES_DATABASE,
  };
} catch(error) {
  //no config found
  dbConfig.connectionString = process.env.DATABASE_URL || config.DATABASE_URL;
}

module.exports = dbConfig;