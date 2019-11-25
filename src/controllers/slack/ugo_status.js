import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async function(req, res) {
  const ugo_res = await fetch('https://utilitygo-api-dev.widergydev.com/health_check/all');

  const ugo_data = await ugo_res.json();  

  res.send(ugo_data.status === 200 ? 'La API de UGO está funcionando correctamente!' : 'La API de UGO se encuentra caida :(' );
});

export default router;
