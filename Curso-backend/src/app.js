import express from 'express';
import { apiRouter } from './Routers/apiRouter.js';
import { viewsRouter } from './Routers/ViewRouter.js';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { serverSession } from './middlewares/middle-session.js';
import cookieParser from 'cookie-parser'
import { MONGODB_URL, PORT, COOKIE_SECRET } from './config/config.js';
import { authenticate } from './middlewares/passport.js';

await mongoose.connect(MONGODB_URL);

console.log(`Base de datos conectada`);

const app = express();

app.use(serverSession)
app.use(authenticate)

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
    console.log(`Listening on port ${PORT}`);
});