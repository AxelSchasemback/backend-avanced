import { logger } from '../utils/logger.js';

export const httpLoggerMiddleware = (req, res, next) => {
    req.logger = logger;

    if (req.url.startsWith('/static') || req.url.startsWith('/docs')) {
        return next();
    }

    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};