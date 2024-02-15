import winston from 'winston';

const optionLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        succes: 4,
        http: 5,
        debug: 6
    },
    colors: {
        fatal: 'black',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        succes: 'green',
        http: 'skyblue',
        debug: 'white'
    }
};

winston.addColors(optionLevels)

export const logger = winston.createLogger({
    levels: optionLevels.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf((info) => {
                    const { level, message, ...rest } = info;

                    // Imprime objetos y arrays de manera legible utilizando prettyPrint
                    const prettyPrintedRest = Object.keys(rest).length
                        ? `\n${JSON.stringify(rest, null, 2)}`
                        : '';

                    return ` - [${level}]: ${message}${prettyPrintedRest}`;
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
        })
    ]
});