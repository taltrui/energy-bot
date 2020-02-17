import yargs from 'yargs';
import {
  ID_SHORT,
  ID_LONG,
  CHANNEL_LONG,
  CHANNEL_SHORT,
  CURRENT_CHANNEL_LONG,
  CURRENT_CHANNEL_SHORT,
  CONFIG_CHANNEL_SHORT,
  CONFIG_CHANNEL_LONG,
  REPOS
} from '../constants/cli';

yargs.alias(ID_SHORT, ID_LONG);
yargs.alias(CHANNEL_LONG, CHANNEL_SHORT);
yargs.alias(CURRENT_CHANNEL_LONG, CURRENT_CHANNEL_SHORT);
yargs.alias(CONFIG_CHANNEL_LONG, CONFIG_CHANNEL_SHORT);
yargs.array(REPOS);

export default yargs;
