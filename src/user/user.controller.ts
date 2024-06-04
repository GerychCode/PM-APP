import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserBaseDto } from './dto/user.base.dto';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { SetUserPasswordDto } from './dto/set.user.password.dto';
import { GetUserDto } from './dto/get.user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Get('')
	getUser(@Query() getUserDto: GetUserDto) {
		return this.userService.getUser(getUserDto);
	}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Delete('')
	deleteUser(@Res({ passthrough: true }) response: Response) {
		return this.userService.deleteUser(response);
	}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Patch('')
	updateUser(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.updateUser(request, updateUserDto);
	}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Patch('set-password')
	updateUserPassword(
		@Req() request: Request,
		@Body() setUserPasswordDto: SetUserPasswordDto,
	) {
		return this.userService.updateUserPassword(request, setUserPasswordDto);
	}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@Patch('admin/:id')
	@UseGuards(AdminPermissionGuard(AdminPermission.editUsers))
	updateUserAdmin(
		@Param() { userId }: UserBaseDto,
		@Body() updateUserDto: UpdateUserDto,
		@Req() request: Request,
	) {
		return this.userService.updateUserAdmin(userId, updateUserDto, request);
	}

	@ApiTags('User')
	@ApiBearerAuth('JWT')
	@Delete('admin/:id')
	@UseGuards(AdminPermissionGuard(AdminPermission.editUsers))
	deleteUserAdmin(@Param() { userId }: UserBaseDto, @Req() request: Request) {
		return this.userService.deleteUserAdmin(request, userId);
	}
}
