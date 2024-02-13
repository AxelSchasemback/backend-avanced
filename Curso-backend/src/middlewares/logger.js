import { winstonLogger } from '../utils/logger.js'

export const addLogger = (req, res, next) => {
    req.logger = winstonLogger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next()
}