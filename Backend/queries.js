/*
source: https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
In a production environment, you would want to
put your configuration details in a separate file
with restrictive permissions that is not accessible from version control
*/

const dotenv = require("dotenv");
dotenv.config();
const buf = Buffer.from("BASIC=basic");
const config = dotenv.parse(buf); // will return an object
console.log(typeof config, config); // object { BASIC : 'basic' }
const Pool = require("pg").Pool;
const prep = require("pg-prepared");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: 5432,
});

const queries = {
  Post: prep("INSERT INTO public.posts(post, date) VALUES (${post}, ${date})"),
};

const postPost = (request, response) => {
  const insertion = {
       post : request.body.post,
       date: request.body.date
    }
    pool.query(queries.Post(insertion), (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
};

const getPost = (request, response) => {
  console.log("get post called");
  response.status(200);
  response.json({ info: 'getPost' })
};

module.exports = {
  postPost,
  getPost,
};
