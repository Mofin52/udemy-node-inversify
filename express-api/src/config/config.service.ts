import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Couldnt read .env file or it does not exist');
		} else {
			this.config = result.parsed as DotenvParseOutput;
			this.logger.log('[ConfigService] Loaded .env config successfuly');
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
