const util = require('util');

export const logObject = (object: any) => console.log(util.inspect(object, {showHidden: false, depth: null}))