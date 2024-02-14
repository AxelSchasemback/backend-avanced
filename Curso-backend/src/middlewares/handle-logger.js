import { logger } from '../utils/logger.js';

export const logResponseStatus = (req, res, next) => {

  const statusCode = res.status;

  let statusMessage;
  if (statusCode >= 200 && statusCode < 300) {
    statusMessage = 'Success';
    logger.succes(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage})`);
  } else if (statusCode >= 400 && statusCode < 500) {
    statusMessage = 'Client Error';
    logger.error(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage})`);
  } else if (statusCode >= 500) {
    statusMessage = 'Server Error';
    logger.fatal(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage})`);
  } else {
    statusMessage = 'Unknown';
    logger.fatal(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage})`);
  }

  next();
};
