import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async function(req, res) {
  const ugo_response = await fetch('https://utilitygo-api-dev.widergydev.com/health_check/all');

  console.log(ugo_response);
  

  res.send('Huesaaaa');
});

export default router;
