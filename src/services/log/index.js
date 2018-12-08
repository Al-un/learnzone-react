/**
 * Extract tags from all arguments.
 * @param {String} msg
 * @param {Array} args
 */
const extractTags = (msg, args) => {
  // extract tags
  let tags = [];
  args.forEach(arg => {
    if (arg.tags) {
      tags = tags.concat(arg.tags);
      delete arg.tags;
    }
  });

  // Format tags
  tags = tags.map(tag => `[${tag}]`).join('');
  msg = `${tags} ${msg}`;

  return [msg, args];
};

/**
 * Merge all provided arguments into a single object. It is assumed that `args`
 * is an array of Objects.
 *
 * Check if object if empty: https://stackoverflow.com/a/32108184/4906586
 * @param {String} msg
 * @param {Array} args
 */
const mergeArgs = (msg, args) => {
  const mergedArgs = args.length
    ? args.reduce((prevObj, nextObj) => {
        return Object.keys(nextObj).length > 0
          ? Object.assign(prevObj, nextObj)
          : prevObj;
      })
    : undefined;

  return [msg, mergedArgs];
};

const formatLogs = (msg, args, callback) => {
  // extract tags
  [msg, args] = extractTags(msg, args);

  // merge args
  [msg, args] = mergeArgs(msg, args);

  // timestamp
  const time = new Date().toLocaleTimeString("en", { hour12: false });
  msg = `${time}${msg}`;

  if (args && Object.keys(args).length > 0) {
    callback(msg, args);
  } else {
    callback(msg);
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
