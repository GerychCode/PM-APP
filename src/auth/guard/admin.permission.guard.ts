import { ExecutionContext, mixin } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { InjectModel } from '@nestjs/sequelize';
import { AdminPermission } from '../../common/enum/user/permissions/admin.permission.enum';
import { Admins } from '../../database/postgresql/models/Admin/admins.model';
import { AdminsRoles } from '../../database/postgresql/models/Admin/admins.roles.model';

export const AdminPermissionGuard = (permission: AdminPermission) => {
	class PermissionGuardModule extends JwtAuthGuard {
		constructor(
			@InjectModel(Admins)
			readonly adminModel: typeof Admins,
			@InjectModel(AdminsRoles)
			readonly adminsRolesModel: typeof AdminsRoles,
		) {
			super();
		}

		async canActivate(context: ExecutionContext) {
			await super.canActivate(context);
			const { user } = context.switchToHttp().getRequest();
			if (!user.id) return false;
			const admin = await this.adminModel.findOne({
				where: {
					userId: user.id,
				},
				include: this.adminsRolesModel,
			});
			if (admin) {
				const adminPermissions =
					admin.dataValues.adminsRoles.permission;
				if (adminPermissions[permission]) return true;
				else return false;
			} else return false;
		}
	}
	return mixin(PermissionGuardModule);
};
