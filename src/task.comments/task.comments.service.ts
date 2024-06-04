import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TasksComments } from '../database/postgresql/models/Task/task.comments.model';
import { CreateCommentsDto } from './dto/create.comments.dto';

@Injectable()
export class TaskCommentsService {
	constructor(
		@InjectModel(TasksComments)
		private readonly commentModel: typeof TasksComments,
	) {}

	async createComment(createCommentsDto: CreateCommentsDto) {
		try {
		} catch (error) {
			throw error;
		}
	}
}
