import {
	BadRequestException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectRolesService } from '../project.roles/project.roles.service';
import {
	EmployeeModelIncludeDto,
	GetEmployeeDto,
} from './dto/get.employee.dto';
import { UpdateEmployeeDto } from './dto/update.employee.dto';
import { DeleteEmployeeDto } from './dto/delete.employee.dto';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { Users } from '../database/postgresql/models/User/users.model';

@Injectable()
export class ProjectEmployeeService {
	constructor(
		@InjectModel(ProjectsEmployee)
		private readonly projectEmployee: typeof ProjectsEmployee,
		private readonly projectRole: ProjectRolesService,
	) {}

	async getEmployees(
		getEmployeeDto: GetEmployeeDto,
		employeeModelIncludeDto: EmployeeModelIncludeDto = null,
	) {
		return await this.projectEmployee.findAll({
			where: {
				projectId: getEmployeeDto.projectId,
				...(getEmployeeDto.employeeId && {
					id: getEmployeeDto.employeeId,
				}),
				...(getEmployeeDto.userId && { userId: getEmployeeDto.userId }),
				...(getEmployeeDto.roleId && { roleId: getEmployeeDto.roleId }),
			},
			include: [
				employeeModelIncludeDto?.includeUser && {
					model: Users,
					attributes: {
						exclude: ['password', 'updatedAt'],
					},
				},
				employeeModelIncludeDto?.includeRole && {
					model: ProjectsRoles,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
			].filter(Boolean),
			attributes: {
				exclude: ['updatedAt'],
			},
		});
	}

	async createEmployee(
		createEmployeeDto: CreateEmployeeDto,
		defaultRole: string | null = null,
	) {
		let transaction: Transaction;
		try {
			transaction = await this.projectEmployee.sequelize.transaction();
			const role = await this.projectRole.getProjectRoleOrDefault({
				roleId: createEmployeeDto.roleId,
				projectId: createEmployeeDto.projectId,
				title: defaultRole ? defaultRole : 'Default',
			});
			if (!role) throw new BadRequestException('Role not found');

			const newEmployee = await this.projectEmployee.create(
				{
					...createEmployeeDto,
					roleId: role.id,
				},
				{ transaction },
			);

			await transaction.commit();

			return newEmployee;
		} catch (error) {
			if (transaction) {
				await transaction.rollback();
			}
			throw error;
		}
	}

	async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
		let employeeTransaction: Transaction;
		try {
			employeeTransaction =
				await this.projectEmployee.sequelize.transaction();

			const role = await this.projectRole.getProjectRoleOrDefault({
				roleId: updateEmployeeDto.roleId,
				projectId: updateEmployeeDto.projectId,
				title: 'Default',
			});
			if (!role) throw new BadRequestException('Role not found');

			const updatedEmployee = await this.projectEmployee.update(
				{ roleId: role.id },
				{
					where: {
						id: updateEmployeeDto.employeeId,
						projectId: updateEmployeeDto.projectId,
					},
					transaction: employeeTransaction,
					returning: true,
				},
			);
			await employeeTransaction.commit();
			return updatedEmployee[1];
		} catch (error) {
			await employeeTransaction.rollback();
			throw error;
		}
	}

	async deleteEmployee(req: any, deleteEmployeeDto: DeleteEmployeeDto) {
		try {
			const employee = await this.projectEmployee.findOne({
				where: {
					id: deleteEmployeeDto.employeeId,
					projectId: deleteEmployeeDto.projectId,
				},
				include: [ProjectsRoles],
			});
			if (!employee) throw new BadRequestException('Employee not found');

			if (employee.dataValues.role.permission.administrator)
				throw new BadRequestException('You cant delete administrator');

			if (
				employee.dataValues.role.title === 'Owner' /*||
				!employee.dataValues.role.projectId*/
			)
				throw new BadRequestException('You cant delete owner');

			if (employee.dataValues.userId === req.user.id)
				throw new BadRequestException('You cant delete yourself');

			const deleteEntry = await this.projectEmployee.destroy({
				where: {
					id: deleteEmployeeDto.employeeId,
					projectId: deleteEmployeeDto.projectId,
				},
			});
			if (deleteEntry == 0)
				throw new BadRequestException('Failed to delete the role');
			return HttpStatus.OK;
		} catch (error) {
			throw error;
		}
	}
}
