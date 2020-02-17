import client from './WebClient';

export const postMessage = async (text: string, channel: string, blocks: Array<any>) => {
  try {
    await client.chat.postMessage({
      channel,
      text,
      blocks,
      as_user: true
    });
  } catch (error) {
    console.log(error);
  }
};
