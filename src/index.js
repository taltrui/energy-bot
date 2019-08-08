import { getPrs } from "./queries/github";
import { postMessage } from "./handlers/slack/PostMessage";

const test = async () => {
  let data = '';
  try {
    data = await getPrs("widergy");
  } catch (error) {
    console.log(error);
  } 
  
  postMessage(data, "general");

};

test();
