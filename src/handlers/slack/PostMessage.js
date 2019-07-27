import client from "./WebClient";

export const postMessage = async (text, channel) => {
  try {
    await client.chat.postMessage({
      channel,
      text
    });
  } catch (error) {
    console.log(error);
  }
};
