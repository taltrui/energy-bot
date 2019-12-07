import { postMessage } from '../../handlers/slack/PostMessage';
import { formatPRData } from '../../utils/github';
import { createMessage } from './utils';
import { getPrs } from '../../models/github';

const execute = async config => {
  const { channel, repositories, labelsToAvoid } = config;

  let data = '';
  try {
    data = await getPrs('widergy');
  } catch (error) {
    console.log(error);
  }

  const formattedData = formatPRData(data, repositories, labelsToAvoid);

  postMessage('Llegaron los PRs!', channel, await createMessage(formattedData));
};

export { execute };
