import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
	forwardRef,
	NotFoundException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { Users } from '../database/postgresql/models/User/users.model';
import { JwtUtilsService } from './jwt/jwt.utils.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { AuthorizationDto } from './dto/authorization.dto';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly jwtUtilsService: JwtUtilsService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}
	async registrationNewAccount(
		registrationDto: RegistrationDto,
		response: Response,
	) {
		const passwordHash: string = hashSync(
			registrationDto.password,
			genSaltSync(10),
		);
		const newUser: Users = await this.userService.createUser({
			...registrationDto,
			password: passwordHash,
		});

		const { password, updatedAt, ...freeUserData } = newUser.dataValues;

		const jwtPairs =
			await this.jwtUtilsService.generateJwtPairs(freeUserData);
		await this.cacheManager.set(
			`refreshToken_${newUser.id}`,
			jwtPairs.refreshToken,
		);
		response.cookie('refresh_token', jwtPairs.refreshToken, {
			httpOnly: true,
		});
		return { ...freeUserData, access_token: jwtPairs.accessToken };
	}

	async authorizationUser(
		authorizationDto: AuthorizationDto,
		response: Response,
	) {
		const foundUser: Users = await this.userService.getUserForService({
			login: authorizationDto.login,
		});
		if (!foundUser) throw new NotFoundException('User is not found');
		const passValidate: boolean = compareSync(
			authorizationDto.password,
			foundUser.password,
		);
		if (!passValidate)
			throw new BadRequestException('Incorrect password entered');

		const { password, updatedAt, ...freeUserData } = foundUser.dataValues;
		const jwtPairs =
			await this.jwtUtilsService.generateJwtPairs(freeUserData);

		await this.cacheManager.set(
			`refreshToken_${freeUserData.id}`,
			jwtPairs.refreshToken,
		);

		response.cookie('refresh_token', jwtPairs.refreshToken, {
			httpOnly: true,
		});
		return { ...freeUserData, access_token: jwtPairs.accessToken };
	}

	async logoutUser(response: any) {
		const userData = response?.req?.user;
		await this.cacheManager.del(`refreshToken_${userData.id}`);
		response.clearCookie('refresh_token');
		response.status(200);
		return;
	}

	async refreshToken(request: Request, response: Response) {
		const { refresh_token } = request.cookies;
		if (!refresh_token) throw new UnauthorizedException();
		const jwtObject =
			await this.jwtUtilsService.verifyRefreshToken(refresh_token);
		if (!jwtObject) throw new UnauthorizedException();
		const foundUser: Users = await this.userService.getUserForService({
			userId: jwtObject.id,
		});
		const { password, updatedAt, ...freeUserData } = foundUser.dataValues;
		const jwtPairs =
			await this.jwtUtilsService.generateJwtPairs(freeUserData);

		await this.cacheManager.set(
			`refreshToken_${freeUserData.id}`,
			jwtPairs.refreshToken,
		);

		response.cookie('refresh_token', jwtPairs.refreshToken, {
			httpOnly: true,
		});
		return { ...freeUserData, access_token: jwtPairs.accessToken };
	}

	async logoutUserAdmin(id: number) {
		return await this.cacheManager.del(`refreshToken_${id}`);
	}
}
