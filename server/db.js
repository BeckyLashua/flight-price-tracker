require('dotenv').config();
const { Pool } = require('pg');

/*
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);
*/

const pool = new Pool({
  user: "rlashua",//process.env.DB_USER,
  host: "localhost",//process.env.DB_HOST,
  database: "flightapp",//process.env.DB_DATABASE,
  password: 'Orphan718', //process.env.DB_PASSWORD,
  port: 5432 //process.env.DB_PORT,
});

module.exports = pool;