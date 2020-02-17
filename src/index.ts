import 'regenerator-runtime/runtime';
import express from 'express';
import UgoStatus from './controllers/slack/ugo_status';
import { initDirectivesJobs } from './utils/directives';
import GetPrs from './controllers/slack/pr_reminder';

const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/ugo_status', UgoStatus);
app.use('/get_prs', GetPrs);

//App init
app.listen(port, async function() {
  console.log(`Energy Bot succesfully up and running in port ${port}`);
  initDirectivesJobs();
});
