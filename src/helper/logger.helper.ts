import winston, { Logger } from "winston";

const timezoned = (): string => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    dateStyle: "short",
    timeStyle: "long",
    formatMatcher: "best fit",
  });
};

export const logger: Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    // winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.timestamp({ format: timezoned }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message} `
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/info.log" }),
  ],
});
