import express from 'express';
import fetch from 'node-fetch';
import cliHandler from '../../cli/pr_reminder';
import { getCollectionWithQuery } from '../../queries/firestore/utils';
import { getDirective } from '../../models/config';
import { runStandaloneDirective } from '../../utils/directives';

const router = express.Router();

router.post('/', async function(req, res) {
  const { text, user_id, channel_id } = req.body;

  const { channel, on, current, id, repos } = cliHandler.parse(text);

  if (!id) return res.send('No se encontró el ID de la configuración...');

  const directive = await getDirective('PRReminder');

  if (!directive) return res.send(`Hubo un error al obtener la directiva...`);

  const config = directive[0].config.find(config => config.id === id);

  if (!config) return res.send(`La configuración ${id} no existe...`);

  const channelToPost = on ? on : channel ? config.channel : current ? channel_id : user_id;
  const repositories = repos && repos.length > 0 ? repos : config.repositories
  console.log(repositories);
  const configToRun = {...config, channel: channelToPost, repositories}

  res.send('Un segundo por favor!');

  runStandaloneDirective('PRReminder', configToRun);
});

export default router;
