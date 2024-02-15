import { logger } from '../utils/logger.js';

export const succesLoggerMiddleware = (req, res, next) => {
    req.logger = logger;
    req.logger.succes(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.succes(req)
    next();
};

export const httpLoggerMiddleware = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req} - ${new Date().toLocaleTimeString()}`);
    req.logger.http(req)
    next();
};

// export const errorLoggerMiddleware = (req, res, next) => {
//     req.logger = logger;
//     req.logger.error(`${req.method} en ${req} - ${new Date().toLocaleTimeString()}`);
//     req.logger.error(req)
//     next();
// };