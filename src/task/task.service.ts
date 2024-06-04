import {
	BadRequestException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { Tasks } from '../database/postgresql/models/Task/task.model';
import { ProjectEmployeeService } from '../project.employee/project.employee.service';
import { DeleteRoleDto } from '../project.roles/dto/delete.role.dto';
import { Op, Transaction } from 'sequelize';
import { DeleteTaskDto } from './dto/delete.task.dto';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { GetTaskDto, TaskModelIncludeDto } from './dto/get.task.dto';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';

@Injectable()
export class TaskService {
	constructor(
		private readonly projectEmployeeService: ProjectEmployeeService,
		@InjectModel(Tasks)
		private readonly taskModel: typeof Tasks,
	) {}
	getTask(getTaskDto: GetTaskDto, taskModelIncludeDto: TaskModelIncludeDto) {
		const { taskId, title, ...currentGetTaskDto } = getTaskDto;
		return this.taskModel.findAll({
			where: {
				...(taskId && { id: taskId }),
				...(title && { title: { [Op.like]: `%${title}%` } }),
				...currentGetTaskDto,
			},
			include: [
				taskModelIncludeDto?.includeProject && {
					model: Projects,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
				taskModelIncludeDto?.includeEmployee && {
					model: ProjectsEmployee,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
				taskModelIncludeDto?.includeStage && {
					model: ProjectsTaskStages,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
			].filter(Boolean),
		});
	}

	async createTask(createTaskDto: CreateTaskDto) {
		try {
			if (createTaskDto.employeeId) {
				const employee = await this.projectEmployeeService.getEmployees(
					{
						projectId: createTaskDto.projectId,
						employeeId: createTaskDto.employeeId,
					},
				);
				if (employee.length === 0)
					throw new NotFoundException('Employee not found');
			}
			const similarity = await this.taskModel.findOne({
				where: {
					title: createTaskDto.title,
				},
			});
			if (similarity)
				throw new BadRequestException(
					'Your project already has a Task with the same Title',
				);
			return await this.taskModel.create({
				...createTaskDto,
			});
		} catch (error) {
			throw error;
		}
	}

	async updateTask(updateTaskDto: UpdateTaskDto) {
		try {
			const { taskId, projectId, employeeId, ...currentUpdateTaskDto } =
				updateTaskDto;
			if (employeeId) {
				const employee = await this.projectEmployeeService.getEmployees(
					{
						projectId: projectId,
						employeeId,
					},
				);
				if (employee.length === 0)
					throw new NotFoundException('Employee not found');
			}
			if (updateTaskDto.title) {
				const similarity = await this.taskModel.findOne({
					where: {
						projectId: projectId,
						title: updateTaskDto.title,
					},
				});
				if (similarity)
					throw new BadRequestException(
						'Your project already has a Task with the same Title',
					);
			}
			const updatedEntry = await this.taskModel.update(
				{
					...currentUpdateTaskDto,
				},
				{
					where: {
						projectId: projectId,
						id: taskId,
					},
					returning: true,
				},
			);
			return updatedEntry[1];
		} catch (error) {
			throw error;
		}
	}

	async deleteTask({ taskId, ...deleteTaskDto }: DeleteTaskDto) {
		try {
			const deleteEntry = await this.taskModel.destroy({
				where: {
					id: taskId,
					...deleteTaskDto,
				},
			});
			if (deleteEntry === 0)
				throw new BadRequestException('Failed to delete the role');
			return HttpStatus.OK;
		} catch (error) {
			throw error;
		}
	}
}
