const { createLogger, format, transports } = require('winston');
const constants = require('../../config/logger.json');

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, logTime }) => {
  return `${logTime} [${level}]: ${message}`;
});

const consoleFormat = printf(({ level, message }) => {
  return `[${level}]: ${message}`;
});

function makeLogger() {
  global.logger = createLogger({
    level: constants.LOG_LEVEL,
    format: combine(timestamp(), logFormat),
    transports: [
      new transports.File({ filename: '../../logs/error.log', level: 'error' }),
      new transports.File({
        filename: '../../logs/log.log',
        maxsize: 10000000,
        maxFiles: 5,
      }),
      new transports.Console({ format: consoleFormat, level: 'info' }),
    ],
  });
}

module.exports = {
  makeLogger,
};
