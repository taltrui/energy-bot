import { getPrs } from "./queries/github";
import { formatPRData } from "./utils/github";

const test = async () => {
  let data = '';
  try {
    data = await getPrs("widergy");
  } catch (error) {
    console.log(error);
  } 
  formatPRData(data);

};

test();
