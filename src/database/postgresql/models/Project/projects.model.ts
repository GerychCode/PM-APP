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
} from 'sequelize-typescript';
import { Users } from '../User/users.model';
import { ProjectsEmployee } from './projects.employee.model';
import { ProjectsRoles } from './projects.roles.model';
import { ProjectsTaskStages } from './projects.task.stages.model';
import { Tasks } from '../Task/task.model';

@Table({
	timestamps: true,
})
export class Projects extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	title: string;

	@AllowNull(true)
	@Length({ max: 2000 })
	@Column
	description: string;

	@IsDate
	@AllowNull(false)
	@Column
	dateOfStart: Date;

	@IsDate
	@Column
	duoDate: Date;

	@AllowNull(false)
	@Default(true)
	@Column
	private: boolean;

	@CreatedAt
	createdAt: Date;

	@AllowNull(false)
	@Column
	@ForeignKey(() => Users)
	ownerId: number;

	@BelongsTo(() => Users)
	user: Users;

	@HasMany(() => ProjectsRoles, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projectsRoles: ProjectsRoles[];

	@HasMany(() => ProjectsEmployee, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projectEmployee: ProjectsEmployee[];

	@HasMany(() => ProjectsTaskStages, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projectsTaskStages: ProjectsTaskStages[];

	@HasMany(() => Tasks, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	task: Tasks[];
}
