import 'regenerator-runtime/runtime';
import express from 'express';
import UgoStatus from './controllers/slack/ugo_status';
import { initDirectivesJobs } from './utils/directives';
import GetPrs from './controllers/slack/pr_reminder';
import { createProbot, createNodeMiddleware } from 'probot';
// import { findPrivateKey } from 'probot/lib/private-key';
import probotApp from './probotApp';

const port = parseInt(process.env.PORT || '8080', 10);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routess
app.use('/ugo_status', UgoStatus);
app.use('/get_prs', GetPrs);
app.use('/probot', createNodeMiddleware(probotApp, { probot: createProbot() }));

//App init
app.listen(port, async function () {
  console.log(`Energy Bot succesfully up and running in port ${port}`);
  initDirectivesJobs();
});
