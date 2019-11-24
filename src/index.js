// import "regenerator-runtime/runtime";

// import dotenv from 'dotenv';
// import { run } from './utils/directives';

// dotenv.config();

// run();

import express from 'express';
import bodyParser from 'body-parser';
import { createEventAdapter } from '@slack/events-api';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORT || 3000
const app = express();
const slackEvents = createEventAdapter(slackSigningSecret);

app.use('/slack/events', slackEvents.requestListener());

app.use(bodyParser());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});
