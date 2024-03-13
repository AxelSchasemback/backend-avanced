// @ts-nocheck
import { logger } from '../utils/logger.js';

export const logResponseStatus = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    originalSend.call(this, body);

    const statusCode = res.statusCode;

    // Excluir solicitudes a recursos estáticos en la carpeta 'static'
    if (req.url.startsWith('/static') || req.url.startsWith('/api/docs')) {
      return;
    }

    let statusMessage;

    if (statusCode === 200) {
      statusMessage = 'Success';
      logger.success(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Request successfully processed at ${new Date().toLocaleTimeString()}`);
    } else if (statusCode === 201) {
      statusMessage = 'Created';
      logger.success(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Resource successfully created`);
    } else if (statusCode === 304) {
      statusMessage = 'Not Modified';
      logger.http(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Resource not modified`);
    } else if (statusCode === 404) {
      statusMessage = 'Not Found';
      logger.error(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - The requested resource was not found`);
    } else if (statusCode >= 400 && statusCode < 500) {
      statusMessage = 'Client Error';
      logger.error(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Client error occurred while processing the request`);
    } else if (statusCode === 500) {
      statusMessage = 'Server Error';
      logger.fatal(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Internal server error occurred while processing the request`);
    } else {
      statusMessage = 'Unknown';
      logger.fatal(`${req.method} ${req.url} - Status: ${statusCode} (${statusMessage}) - Unknown status code received`);
    }
  }

  next();
};
