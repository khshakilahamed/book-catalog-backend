import { Server } from 'http';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    logger.info(`Example app listening on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }

    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();