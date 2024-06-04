import {
	Table,
	AllowNull,
	AutoIncrement,
	Column,
	IsDate,
	Length,
	PrimaryKey,
	Default,
	CreatedAt,
	BelongsTo,
	Model,
	ForeignKey,
	NotNull,
	HasMany,
	Max,
	Min,
} from 'sequelize-typescript';
import { Users } from '../User/users.model';
import { Projects } from '../Project/projects.model';
import { ProjectsEmployee } from '../Project/projects.employee.model';
import { ProjectsTaskStages } from '../Project/projects.task.stages.model';
import { TasksComments } from './task.comments.model';

@Table({
	timestamps: true,
})
export class Tasks extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	@ForeignKey(() => Projects)
	projectId: number;

	@BelongsTo(() => Projects)
	project: Projects;

	@AllowNull(true)
	@Column
	@ForeignKey(() => ProjectsEmployee)
	employeeId: number;

	@BelongsTo(() => ProjectsEmployee)
	employee: ProjectsEmployee;

	@AllowNull(false)
	@Column
	title: string;

	@AllowNull(true)
	@Length({ max: 2000 })
	@Column
	description?: string;

	@IsDate
	@Column
	duoDate: Date;

	@Max(100)
	@Min(0)
	@Default(0)
	@Column
	importance: number;

	@AllowNull(true)
	@Column
	@ForeignKey(() => ProjectsTaskStages)
	stageId: number;

	@BelongsTo(() => ProjectsTaskStages)
	stage: ProjectsTaskStages;

	@HasMany(() => TasksComments, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		hooks: true,
	})
	taskComments: TasksComments[];
}
