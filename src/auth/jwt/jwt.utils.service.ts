import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from '../../database/postgresql/models/User/users.model';

@Injectable()
export class JwtUtilsService {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async generateJwtPairs(
		freeUserData: Omit<Users, 'password' | 'updatedAt'>,
	) {
		return {
			refreshToken: await this.jwtService.signAsync(freeUserData, {
				secret: this.configService.get('JWT_REFRESH_SECRET'),
				expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
			}),
			accessToken: await this.jwtService.signAsync(freeUserData, {
				secret: this.configService.get('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
			}),
		};
	}
	async verifyRefreshToken(refreshToken: string) {
		try {
			return await this.jwtService.verifyAsync(refreshToken, {
				secret: this.configService.get('JWT_REFRESH_SECRET'),
			});
		} catch (error) {
			return false;
		}
	}
}
