import {
	BadRequestException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/project.create.dto';
import { Op, Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { UserBaseDto } from '../user/dto/user.base.dto';
import { ProjectUpdateDto } from './dto/project.update.dto';
import { GetProjectDto, ProjectModelIncludeDto } from './dto/get.project.dto';
import { ProjectEmployeeService } from '../project.employee/project.employee.service';
import { ProjectRolesService } from '../project.roles/project.roles.service';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';
import { Tasks } from '../database/postgresql/models/Task/task.model';
import { TasksComments } from '../database/postgresql/models/Task/task.comments.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { NoValidationProjectBaseDto } from './dto/project.base.dto';

@Injectable()
export class ProjectService {
	constructor(
		@InjectModel(Projects)
		private readonly projectModel: typeof Projects,
		private readonly projectEmployeeService: ProjectEmployeeService,
		private readonly projectRolesService: ProjectRolesService,
	) {}

	async getProjects(
		getProjectDto: GetProjectDto,
		projectModelIncludeDto: ProjectModelIncludeDto,
		request?: any,
		baseDto?: UserBaseDto,
	) {
		if (!request && !baseDto)
			throw new BadRequestException('Project owner not specified');
		const { title, projectId, ...getProjectData } = getProjectDto;

		return await this.projectModel.findAll({
			where: {
				...(projectId && { id: projectId }),
				...(title && { title: { [Op.like]: `%${title}%` } }),
				...getProjectData,
			},
			include: [
				{
					model: ProjectsEmployee,
					where: {
						userId: baseDto ? baseDto.userId : request.user.id,
					},
					attributes: [],
				},
				projectModelIncludeDto?.includeTask && {
					model: Tasks,
					attributes: {
						exclude: ['updatedAt'],
					},
					include: projectModelIncludeDto?.includeComments
						? [
								{
									model: TasksComments,
									attributes: {
										exclude: ['updatedAt'],
									},
								},
							]
						: [],
				},
				projectModelIncludeDto?.includeStage && {
					model: ProjectsTaskStages,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
				projectModelIncludeDto?.includeRole && {
					model: ProjectsRoles,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
			].filter(Boolean),
		});
	}

	async createProject(
		{ user }: { user: any },
		createProjectDto: CreateProjectDto,
	) {
		let projectTransaction: Transaction;
		try {
			projectTransaction =
				await this.projectModel.sequelize.transaction();
			const userProjectDataMatches = await this.projectModel.findOne({
				where: {
					ownerId: user.id,
					title: createProjectDto.title,
				},
			});
			if (userProjectDataMatches) {
				throw new BadRequestException(
					'You already have a project with this title',
				);
			}
			const project = await this.projectModel.create(
				{ ...createProjectDto, ownerId: user.id },
				{ transaction: projectTransaction },
			);
			await projectTransaction.commit();
			await this.projectEmployeeService.createEmployee(
				{
					projectId: project.id,
					userId: user.id,
				},
				'Owner',
			);

			return project;
		} catch (error) {
			throw error;
		}
	}

	async updateProject(
		request: any,
		projectUpdateDto: ProjectUpdateDto,
		isAdmin: boolean = false,
	) {
		let projectTransaction: Transaction;
		try {
			projectTransaction =
				await this.projectModel.sequelize.transaction();
			const exclusionOptions: { id: number; ownerId?: number } = {
				id: projectUpdateDto.projectId,
			};
			if (!isAdmin) exclusionOptions.ownerId = request.user.id;
			const foundProject = await this.projectModel.findOne({
				where: { ...exclusionOptions },
			});
			if (!foundProject) throw new NotFoundException('Project not found');
			const { projectId, ...projectUpdateData } = projectUpdateDto;
			const updatedProject = await foundProject.update(
				{ ...projectUpdateData },
				{
					transaction: projectTransaction,
				},
			);
			if (!updatedProject)
				throw new BadRequestException(
					'Failed to update project, try again later',
				);
			await projectTransaction.commit();
			return updatedProject.dataValues;
		} catch (error) {
			await projectTransaction.rollback();
			throw error;
		}
	}

	async deleteProject(
		noValidationProjectBaseDto: NoValidationProjectBaseDto,
	) {
		let projectTransaction: Transaction;
		try {
			projectTransaction =
				await this.projectModel.sequelize.transaction();

			const foundProject = await this.projectModel.findOne({
				where: { id: noValidationProjectBaseDto.projectId },
			});
			if (!foundProject) throw new NotFoundException('Project not found');

			await foundProject.destroy({
				transaction: projectTransaction,
			});
			await projectTransaction.commit();
			return HttpStatus.OK;
		} catch (error) {
			throw error;
		}
	}
}
