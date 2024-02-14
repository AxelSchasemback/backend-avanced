import { logger } from '../utils/logger.js';

export const httpLoggerMiddleware = (req, res, next) => {
    req.logger = logger;
    req.logger.succes(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.succes(req)
    next();
};

// export const infoLoggerMiddleware = (req, res, next) => {
//     req.logger = logger;
//     req.logger.info(`${req.method} en ${req} - ${new Date().toLocaleTimeString()}`);
//     req.logger.info(req)
//     next();
// };

// export const errorLoggerMiddleware = (req, res, next) => {
//     req.logger = logger;
//     req.logger.error(`${req.method} en ${req} - ${new Date().toLocaleTimeString()}`);
//     req.logger.error(req)
//     next();
// };