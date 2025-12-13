import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format.combine(
        format((info) => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        format.colorize({ all: true }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(info => {
            const { timestamp, level, message } = info;
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ]
});

export default logger;