import { getPrs } from "./queries/github";
import { WebClient } from "@slack/web-api";

const web = new WebClient(
  "xoxb-707111782768-707139060213-atiBoYKKsZAEdhFhCRkhkac6"
);

const asd = async () => {
  let res = null;
  try {
    res = await getPrs(
      "widergy",
      "UtilityGO-Energy-Simulator-Metrogas",
      10,
      "OPEN"
    );
  } catch (error) {
    console.log(error);
  }

  const repo = res.data.repository.pullRequests.edges[0].node;

  const { title, url } = repo;

  return `Hola Sebastian, el PR "${title}" en ${url} se encuentra abierto`;
};

(async () => {
  const data = await asd();

  await web.chat.postMessage({
    channel: "general",
    text: data
  });

  console.log("Message posted!");
})();
