/**
 * Extract tags from all arguments.
 * @param {Array} args
 */
const extractTags = args => {
  // extract tags
  let tags = [];
  // if tags are string or array:
  let filteredArgs = args.filter(arg => {
    // Array is assumed to be array of string
    if (Array.isArray(arg)) {
      tags = tags.concat(arg);
    }
    // Simple string
    else if (typeof arg === "string") {
      tags.push(arg);
    }
    // Parameters
    else if (arg && arg.tags) {
      tags = tags.concat(arg.tags);
      delete arg.tags;
    }
    // Not a tag
    else {
      return true;
    }
    // all checked cases are false:
    return false;
  });
  return [filteredArgs, tags];
};

/**
 * Merge all provided arguments into a single object. It is assumed that `args`
 * is an array of Objects.
 *
 * Check if object if empty: https://stackoverflow.com/a/32108184/4906586
 * @param {Array} args
 */
const mergeArgs = args => {
  if (args.length) {
    let mergedArgs = {};
    args.forEach(arg => (mergedArgs = Object.assign(mergedArgs, arg)));
    return mergedArgs;
  }
  return undefined;
};

/**
 *
 * @param {String} msg main log message
 * @param {Array} args optional log arguments
 * @param {function} consoleLog console logging function
 */
const formatLogs = (msg, args, consoleLog) => {
  let tags;
  // extract tags
  [args, tags] = extractTags(args);

  // merge args
  if (args.length) {
    args = mergeArgs(args);
  }

  // Format tags
  const formattedTags = tags.map(tag => `[${tag}]`).join("");
  // timestamp
  const time = new Date().toLocaleTimeString("en", { hour12: false });
  // Log message
  const formattedMsg = `${time} ${formattedTags} ${msg}`;

  // Console logging
  if (args && Object.keys(args).length > 0) {
    consoleLog(formattedMsg, args);
  } else {
    consoleLog(formattedMsg);
  }
};

/**
 * Logging class. To be filled by appropriate logging methods.
 *
 * Inspired from [how to use `debug` library](https://levelup.gitconnected.com/step-up-your-console-messaging-game-in-your-react-app-42eee17659ec)
 *
 * In typescript, `?:` means the parameter cannot be null.
 */
const Log = {
  debug: (msg, ...args) => {
    formatLogs(msg, args, console.debug);
  },

  info: (msg, ...args) => {
    formatLogs(msg, args, console.info);
  },

  warn: (msg, ...args) => {
    formatLogs(msg, args, console.warn);
  },

  error: (msg, ...args) => {
    formatLogs(msg, args, console.error);
  }
};

export default Log;
