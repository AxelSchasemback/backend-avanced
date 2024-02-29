// @ts-nocheck
import { logger } from '../utils/logger.js';

export const logResponseStatus = (req, res, next) => {
  const statusCode = res.statusCode;

  // Excluir solicitudes a recursos estáticos en la carpeta 'static'
  if (req.url.startsWith('/static')) {
    return next();
  }

  let statusMessage;

  if (statusCode >= 200 && statusCode < 300) {
    statusMessage = 'Success';
    logger.success(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - ${new Date().toLocaleTimeString()}`);
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
