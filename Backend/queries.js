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
  post: prep("INSERT INTO public.posts(text, date) VALUES (${text}, ${date})"),
  getAll: prep("SELECT * FROM public.posts"),
  incrementLike: prep(
    "UPDATE public.posts SET likes = likes + 1 WHERE id = ${id}"
  ),
  decrementLike: prep(
    "UPDATE public.posts SET likes = likes - 1 WHERE id = ${id}"
  ),
};

const postPost = (request, response) => {
  const insertion = {
    text: request.body.text,
    date: request.body.date,
  };
  pool.query(queries.post(insertion), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAllPosts = (request, response) => {
  pool.query(queries.getAll(), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateLike = (request, response) => {
  console.log(request.body.liked)
  const insertion = {id :  request.body.id}
  pool.query(
    request.body.liked === true
    ? queries.incrementLike(insertion)
    : queries.decrementLike(insertion),
    (error, results) => {
      if (error) {
        response.status(400).json("Error could not insert")
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  postPost,
  getAllPosts,
  updateLike,
};
