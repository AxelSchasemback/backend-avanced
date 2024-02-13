import winston from 'winston'
import fs from 'fs/promises'

class logger {
    constructor(entorno, level) {
        this.entorno = entorno
        this.level = level
    }

    log(nivel, mensaje) {
        if (nivel <= this.level) {
            const lineRegister = `${new Date().toLocaleString()}: ${mensaje}` + "\n"
            if (this.entorno === "dev") {
                console.log(lineRegister)
            } else {
                fs.appendFile('event.log', lineRegister)
            }
        }
    }
}

const winstonLogger = winston.createLogger({

    transports: [
        new winston.transports.Console({ level: "debug" })
    ]
})