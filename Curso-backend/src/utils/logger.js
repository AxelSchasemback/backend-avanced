import winston from 'winston';

const optionLevels = {
    levels: {
        fatal: 1,
        error: 2,
        user: 3,
        success: 4,
        http: 5,
        warning: 6,
        info: 7
    },
    colors: {
        fatal: 'black',
        error: 'red',
        user: 'orange',
        success: 'green',
        http: 'cyan',
        warning: 'yellow',
        info: 'blue'
    }
};

winston.addColors(optionLevels.colors);

export const logger = winston.createLogger({
    levels: optionLevels.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf((info) => {
                    const { level, message } = info;

                    return ` - [${level}]: ${JSON.stringify(message, null, 2)}`;
                }),
            ),
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'eventsError.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            level: 'user',
            filename: 'userDelete.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});