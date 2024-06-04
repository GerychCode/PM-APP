import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { CreateRoleDto } from './dto/create.role.dto';
import { GetRoleDto, RoleModelIncludeDto } from './dto/get.role.dto';
import { Op, Transaction } from 'sequelize';
import projectRolesPermissions from './permissions/project.roles.permissions';
import { UpdateRoleDto } from './dto/update.role.dto';
import { DeleteRoleDto } from './dto/delete.role.dto';
import { Projects } from '../database/postgresql/models/Project/projects.model';

@Injectable()
export class ProjectRolesService {
	constructor(
		@InjectModel(ProjectsRoles)
		private readonly projectRoles: typeof ProjectsRoles,
	) {}
	async getProjectRole(
		{ projectId, title, roleId }: GetRoleDto,
		roleModelIncludeDto: RoleModelIncludeDto = null,
	) {
		return await this.projectRoles.findAll({
			where: {
				...(projectId && {
					[Op.or]: [{ projectId: null }, { projectId }],
				}),
				...(roleId && { id: roleId }),
				...(title && { title: { [Op.like]: `%${title}%` } }),
			},
			include: [
				roleModelIncludeDto?.includeProject && {
					model: Projects,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
			].filter(Boolean),
		});
	}

	async createRole(createRoleDto: CreateRoleDto) {
		let roleTransaction: Transaction;
		try {
			const projectRoles = await this.getProjectRole({
				projectId: createRoleDto.projectId,
				title: createRoleDto.title,
			});
			if (projectRoles.some((obj) => obj.title === createRoleDto.title))
				throw new BadRequestException(
					'Your project already has a role with the same name',
				);
			roleTransaction = await this.projectRoles.sequelize.transaction();
			const newRole = await this.projectRoles.create(
				{
					...createRoleDto,
					permission: Object.assign(
						projectRolesPermissions,
						createRoleDto.permission,
					),
				},
				{
					transaction: roleTransaction,
				},
			);
			await roleTransaction.commit();
			return newRole;
		} catch (error) {
			throw error;
		}
	}

	async updateRole(updateRoleDto: UpdateRoleDto) {
		let roleTransaction: Transaction;
		try {
			const projectRoles = await this.getProjectRole({
				projectId: updateRoleDto.projectId,
				roleId: updateRoleDto.roleId,
			});
			if (projectRoles.length === 0)
				throw new BadRequestException('Role not found');
			if (projectRoles.some((obj) => obj.title === updateRoleDto.title))
				throw new BadRequestException(
					'Your project already has a role with the same name',
				);
			roleTransaction = await this.projectRoles.sequelize.transaction();
			const updateRole = await this.projectRoles.update(
				{
					...updateRoleDto,
					permission: Object.assign(
						projectRolesPermissions,
						updateRoleDto.permission,
					),
				},
				{
					where: {
						id: updateRoleDto.roleId,
					},
					transaction: roleTransaction,
					returning: true,
				},
			);
			await roleTransaction.commit();
			return updateRole[1];
		} catch (error) {
			throw error;
		}
	}

	async deleteRole({ roleId, ...deleteRoleDto }: DeleteRoleDto) {
		let roleTransaction: Transaction;
		try {
			roleTransaction = await this.projectRoles.sequelize.transaction();
			const deleteEntry = await this.projectRoles.destroy({
				where: {
					id: roleId,
					...deleteRoleDto,
				},
				transaction: roleTransaction,
			});
			await roleTransaction.commit();
			if (deleteEntry === 0)
				throw new BadRequestException('Failed to delete the role');
			return HttpStatus.OK;
		} catch (error) {
			await roleTransaction.rollback();
			throw error;
		}
	}

	async getProjectRoleOrDefault({ title, roleId, projectId }: GetRoleDto) {
		let whereClause: any = {};

		if (roleId && projectId) {
			whereClause = { id: roleId, projectId };
		} else {
			whereClause = { projectId: null, title };
		}

		const role = await this.projectRoles.findOne({
			where: whereClause,
		});

		if (!role) {
			throw new BadRequestException('Role not found');
		}

		return role;
	}
}
