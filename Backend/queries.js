/*
source: https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
In a production environment, you would want to
put your configuration details in a separate file
with restrictive permissions that is not accessible from version control
*/

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IssaDB',
  password: 'bigdickboys',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM Users ORDER BY users.userid ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers,
  }