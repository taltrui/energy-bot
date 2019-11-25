import "regenerator-runtime/runtime";

// import dotenv from 'dotenv';
// import { run } from './utils/directives';

// dotenv.config();

// run();

import express from 'express';
import bodyParser from 'body-parser';
import { postMessage } from './handlers/slack/PostMessage';

const port = process.env.PORT || 3000
const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/hello', (req, res) => {
  console.log(req.body);

  res.send('');
})

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});
