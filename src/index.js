// import "regenerator-runtime/runtime";

// import dotenv from 'dotenv';
// import { run } from './utils/directives';

// dotenv.config();

// run();

import express from 'express';

const app = express();

const port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});
