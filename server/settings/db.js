require('dotenv').config()


const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
  },
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


module.exports={pool}