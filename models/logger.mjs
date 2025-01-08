import pino from 'pino';

export const logger = pino({
    name: 'Page Logger',
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            colorizeObjects: true,
        },
    },
});
