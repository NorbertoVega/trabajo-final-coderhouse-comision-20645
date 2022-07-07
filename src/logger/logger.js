import { createLogger, format, transports } from 'winston';
const LEVEL = Symbol.for('level');

function filterOnly(level) {
    return format(function (info) {
        if (info[LEVEL] === level) {
            return info;
        }
    })();
}

const logger = createLogger({

    transports: [
        new transports.File({
            level: 'warn',
            format: filterOnly('warn'),
            filename: 'logs/warn.log',
        }),
        new transports.File({
            level: 'error',
            format: filterOnly('error'),
            filename: 'logs/error.log',
        }),
        new transports.Console({
            level: 'info'
        })
    ]
});

export default logger;