import {
	Table,
	AutoIncrement,
	Column,
	PrimaryKey,
	CreatedAt,
	BelongsTo,
	Model,
	ForeignKey,
	AllowNull,
	HasMany,
} from 'sequelize-typescript';
import { Projects } from './projects.model';
import { ProjectsRoles } from './projects.roles.model';
import { Users } from '../User/users.model';
import { Tasks } from '../Task/task.model';

@Table({
	timestamps: true,
})
export class ProjectsTaskStages extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	title: string;

	@AllowNull(true)
	@Column
	description: string;

	@ForeignKey(() => Projects)
	projectId: number;

	@BelongsTo(() => Projects)
	project: Projects;

	@CreatedAt
	createdAt: Date;

	@HasMany(() => Tasks, {
		onUpdate: 'SET NULL',
		onDelete: 'SET NULL',
		hooks: true,
	})
	task: Tasks[];
}
