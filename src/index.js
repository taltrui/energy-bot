import "regenerator-runtime/runtime";
import express from 'express';
import UgoStatus from './controllers/slack/ugo_status';

const port = process.env.PORT || 3000
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/ugo_status', UgoStatus)

//App init
app.listen(port, function() {
  console.log(`Energy Bot succesfully up and running in port ${port}`);
});
