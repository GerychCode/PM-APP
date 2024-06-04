import {
	BadRequestException,
	HttpStatus,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	Query,
} from '@nestjs/common';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';
import { CreateStageDto } from './dto/create.stage.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateStageDto } from './dto/update.stage.dto';
import { GetStageDto, StageModelIncludeDto } from './dto/get.stage.dto';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { DeleteStageDto } from './dto/delete.stage.dto';
import { Op, Transaction } from 'sequelize';

@Injectable()
export class ProjectTaskStagesService {
	constructor(
		@InjectModel(ProjectsTaskStages)
		private readonly projectsTaskStagesModel: typeof ProjectsTaskStages,
	) {}

	getStage(
		getStageDto: GetStageDto,
		stageModelIncludeDto: StageModelIncludeDto,
	) {
		const { title, ...currentGetStageDto } = getStageDto;
		return this.projectsTaskStagesModel.findAll({
			where: {
				...(title && { title: { [Op.like]: `%${title}%` } }),
				...currentGetStageDto,
			},
			include: [
				stageModelIncludeDto?.includeProject && {
					model: Projects,
					attributes: {
						exclude: ['updatedAt'],
					},
				},
			].filter(Boolean),
		});
	}

	async createStage(createStageDto: CreateStageDto) {
		try {
			const projectStage: ProjectsTaskStages =
				await this.projectsTaskStagesModel.findOne({
					where: {
						title: createStageDto.title,
					},
				});
			if (projectStage)
				throw new BadRequestException(
					'This title is already used in this project',
				);
			return await this.projectsTaskStagesModel.create({
				...createStageDto,
			});
		} catch (error) {
			throw error;
		}
	}
	async updateStage(updateStageDto: UpdateStageDto) {
		try {
			const taskStages: ProjectsTaskStages[] =
				await this.projectsTaskStagesModel.findAll({
					where: {
						projectId: updateStageDto.projectId,
					},
				});
			const titleMatches = taskStages.find(
				(task) =>
					task.id != updateStageDto.stageId &&
					task.title == updateStageDto.title,
			);
			if (titleMatches)
				throw new BadRequestException(
					'This title is already used in this project',
				);
			const updatedEntry = await this.projectsTaskStagesModel.update(
				{
					title: updateStageDto.title,
					description: updateStageDto.description,
				},
				{
					where: {
						id: updateStageDto.stageId,
						projectId: updateStageDto.projectId,
					},
					returning: true,
				},
			);
			if (updatedEntry[0] != 1) throw new InternalServerErrorException();
			return updatedEntry[1];
		} catch (error) {
			throw error;
		}
	}
	async deleteStage({ stageId, ...deleteStageDto }: DeleteStageDto) {
		let stageTransaction: Transaction;
		try {
			stageTransaction =
				await this.projectsTaskStagesModel.sequelize.transaction();
			const deleteEntry = await this.projectsTaskStagesModel.destroy({
				where: {
					id: stageId,
					...deleteStageDto,
				},
				transaction: stageTransaction,
			});
			await stageTransaction.commit();
			if (deleteEntry === 0)
				throw new BadRequestException('Failed to delete the stage');
			return HttpStatus.OK;
		} catch (error) {
			await stageTransaction.rollback();
			throw error;
		}
	}
}
