const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'makalu',   
  password: 'needtolive', 
  port: 5432,      
});


module.exports = pool;
