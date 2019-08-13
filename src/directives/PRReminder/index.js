import { postMessage } from '../../handlers/slack/PostMessage';
import { formatPRData } from '../../utils/github';
import { getPrs } from '../../queries/github';
import config from '../../utils/config';
import { createMessage } from './utils';

const execute = async () => {
  let data = '';
  try {
    data = await getPrs('widergy');
  } catch (error) {
    console.log(error);
  }

  console.log(data);
  const formattedData = formatPRData(data);

  postMessage(
    'Llegaron los PRs!',
    config.channel,
    createMessage(formattedData)
  );
};

export { execute };
