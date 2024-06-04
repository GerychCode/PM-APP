import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtUtilsService } from './jwt/jwt.utils.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersUniqueValidator } from '../user/validator/users.unique.validator';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
	imports: [
		SequelizeModule.forFeature([Users]),
		JwtModule.register({
			global: true,
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		JwtUtilsService,
		JwtService,
		JwtStrategy,
		UsersUniqueValidator,
	],
})
export class AuthModule {}
