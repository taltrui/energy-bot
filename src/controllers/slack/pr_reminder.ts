import express from 'express';
import cliHandler from '../../cli/pr_reminder';
import { getDirective } from '../../models/config';
import { runStandaloneDirective } from '../../utils/directives';
import { Config, CLIOptions } from 'pr_reminder';

const router = express.Router();

router.post('/', async function(req, res) {
  const { text, user_id, channel_id } = req.body;

  const { channel, on, current, id, repos }: CLIOptions = (cliHandler.parse(text) as unknown) as CLIOptions;

  if (!id) return res.send('No se encontró el ID de la configuración...');

  const directive = await getDirective('PRReminder');

  if (!directive) return res.send(`Hubo un error al obtener la directiva...`);

  const config = directive[0].config.find((config: Config) => config.id === id);

  if (!config) return res.send(`La configuración ${id} no existe...`);

  const channelToPost = on ? on : channel ? config.channel : current ? channel_id : user_id;
  const repositories = repos?.length > 0 ? repos : config.repositories;
  console.log(repositories);
  const configToRun = { ...config, channel: channelToPost, repositories };

  res.send('Un segundo por favor!');

  runStandaloneDirective('PRReminder', configToRun);
});

export default router;
