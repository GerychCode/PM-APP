import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { AuthService } from '../auth/auth.service';
import { JwtUtilsService } from '../auth/jwt/jwt.utils.service';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';

@Module({
	imports: [SequelizeModule.forFeature([Users, Admins, AdminsRoles])],
	providers: [UserService, AuthService, JwtUtilsService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
