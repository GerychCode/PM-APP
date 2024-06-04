import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationDto } from './dto/authorization.dto';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiTags('Auth')
	@Post('/registration')
	async registrationNewAccount(
		@Body() registrationDto: RegistrationDto,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			return this.authService.registrationNewAccount(
				registrationDto,
				response,
			);
		} catch (error) {}
	}

	@ApiTags('Auth')
	@Post('authorization')
	authorizationUser(
		@Body() authorizationDto: AuthorizationDto,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.authService.authorizationUser(authorizationDto, response);
	}

	@ApiTags('Auth')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Get('logout')
	logOutUser(@Res({ passthrough: true }) response: Response) {
		return this.authService.logoutUser(response);
	}
	@ApiTags('Auth')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Post('refresh-token')
	refreshToken(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.authService.refreshToken(request, response);
	}
}
