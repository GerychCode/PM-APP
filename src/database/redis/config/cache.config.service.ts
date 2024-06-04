import { Injectable } from '@nestjs/common';
import { CacheModuleAsyncOptions } from '@nestjs/common/cache';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheOptionsFactory } from '@nestjs/cache-manager';
import { RedisClientOptions } from '@redis/client';

@Injectable()
class CacheConfigService implements CacheOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	createCacheOptions(): CacheModuleAsyncOptions {
		return {
			store: redisStore,
			ttl: this.configService.get('REDIS_EXPIRES'),
			isGlobal: true,
			host: this.configService.get('REDIS_HOST'),
			port: this.configService.get('REDIS_PORT'),
		} as CacheModuleAsyncOptions<RedisClientOptions>;
	}
}

export default CacheConfigService;
