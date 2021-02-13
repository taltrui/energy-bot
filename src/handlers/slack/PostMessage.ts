import client from './WebClient';

export const postMessage = async (
  text: string,
  channel: string,
  blocks: Array<{ type: string; text?: { type: string; text: string } }>
): Promise<void> => {
  try {
    await client.chat.postMessage({
      channel,
      text,
      blocks,
      as_user: true,
    });
  } catch (error) {
    console.log(error);
  }
};
