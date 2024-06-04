import {
	Table,
	AutoIncrement,
	Column,
	PrimaryKey,
	CreatedAt,
	BelongsTo,
	Model,
	ForeignKey,
	HasMany,
} from 'sequelize-typescript';
import { Projects } from './projects.model';
import { ProjectsRoles } from './projects.roles.model';
import { Users } from '../User/users.model';
import { ProjectsTaskStages } from './projects.task.stages.model';
import { Tasks } from '../Task/task.model';
import { TasksComments } from '../Task/task.comments.model';

@Table({
	timestamps: true,
})
export class ProjectsEmployee extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@ForeignKey(() => Users)
	userId: number;

	@BelongsTo(() => Users)
	user: ProjectsRoles;

	@ForeignKey(() => ProjectsRoles)
	roleId: number;

	@BelongsTo(() => ProjectsRoles)
	role: ProjectsRoles;

	@ForeignKey(() => Projects)
	projectId: number;

	@BelongsTo(() => Projects)
	project: Projects;

	@CreatedAt
	createdAt: Date;

	@HasMany(() => Tasks, {
		onDelete: 'SET NULL',
		hooks: true,
	})
	task: Tasks[];

	@HasMany(() => TasksComments, {
		onDelete: 'SET NULL',
		hooks: true,
	})
	taskComments: TasksComments[];
}
