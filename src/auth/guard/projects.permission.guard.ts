import { ExecutionContext, mixin } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectsRoles } from '../../database/postgresql/models/Project/projects.roles.model';
import { ProjectsEmployee } from '../../database/postgresql/models/Project/projects.employee.model';
import { ProjectRolesPermissionsEnum } from '../../project.roles/permissions/project.roles.permissions.enum';

export const PermissionGuard = (
	role: ProjectRolesPermissionsEnum = ProjectRolesPermissionsEnum.default,
) => {
	class PermissionGuardModule extends JwtAuthGuard {
		constructor(
			@InjectModel(ProjectsEmployee)
			readonly projectsEmployeesModel: typeof ProjectsEmployee,
			@InjectModel(ProjectsRoles)
			readonly projectsRolesModel: typeof ProjectsRoles,
		) {
			super();
		}

		async canActivate(context: ExecutionContext) {
			await super.canActivate(context);
			const { user, body, query } = context.switchToHttp().getRequest();
			const projectId = body.projectId || query.projectId;
			if (!projectId || !user.id) return false;
			const employee = await this.projectsEmployeesModel.findOne({
				where: {
					projectId,
					userId: user.id,
				},
				include: this.projectsRolesModel,
			});
			if (employee) {
				const employeePermissions = employee.dataValues.role.permission;
				if (
					employee.dataValues.role.title === 'Owner' &&
					!employee.dataValues.role.projectId
				)
					return true;
				if (
					(employeePermissions.administrator && role !== 'owner') ||
					employeePermissions?.[role]
				)
					return true;
				if (role === ProjectRolesPermissionsEnum.default) return true;
				else return false;
			} else return false;
		}
	}
	return mixin(PermissionGuardModule);
};
