import { LoggerService } from '@nestjs/common';
import { CustomInjectable } from 'src/comics/common/injectable';
import * as winston from 'winston';

@CustomInjectable()
export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.info({ message });
  }

  error(message: string, trace?: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string) {
    this.logger.warn({ message });
  }

  debug(message: string) {
    this.logger.debug({ message });
  }
}