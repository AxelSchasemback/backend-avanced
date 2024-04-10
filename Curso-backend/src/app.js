import express from 'express';
import { apiRouter } from './Routers/apiRouter.js';
import { viewsRouter } from './Routers/ViewRouter.js';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { serverSession } from './config/sessionConfig.js';
import cookieParser from 'cookie-parser'
import { MONGODB_URL, PORT, COOKIE_SECRET } from './config/config.js';
import { passportInitialize, passportSession } from './middlewares/authentication.js';
import { logger } from './utils/logger.js';
import { deleteInactiveUser } from './utils/inactiveusers.js';
import cron from 'node-cron'

await mongoose.connect(`${MONGODB_URL}`);

logger.info(`Base de datos conectada`);

cron.schedule('0 0 * * *', deleteInactiveUser);

export const app = express();

app.use(serverSession)

app.use(passportInitialize)

app.use(passportSession)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOKIE_SECRET))

viewsRouter.use('/static', express.static('./static'));

app.engine('handlebars', engine());

app.set('views', './static/views');

app.set('view engine', 'handlebars');

app.use('/api', apiRouter);

app.use('/', viewsRouter);

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
});