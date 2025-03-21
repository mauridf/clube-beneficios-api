const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Nível mínimo de log
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Inclui stack traces de erros
    format.splat(),
    format.json() // Formato JSON para logs
  ),
  transports: [
    // Logs no console
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
    // Logs em arquivo
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;