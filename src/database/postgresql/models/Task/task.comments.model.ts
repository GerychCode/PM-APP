import {
	Table,
	AllowNull,
	AutoIncrement,
	Column,
	PrimaryKey,
	BelongsTo,
	Model,
	ForeignKey,
	HasMany,
} from 'sequelize-typescript';
import { ProjectsEmployee } from '../Project/projects.employee.model';
import { Tasks } from './task.model';
import { Projects } from '../Project/projects.model';

@Table({
	timestamps: true,
})
export class TasksComments extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(true)
	@ForeignKey(() => Projects)
	@Column
	projectId: number;

	@BelongsTo(() => Projects)
	project: Projects;

	@AllowNull(true)
	@ForeignKey(() => ProjectsEmployee)
	@Column
	employeeId: number;

	@BelongsTo(() => ProjectsEmployee)
	employee: ProjectsEmployee;

	@AllowNull(true)
	@ForeignKey(() => Tasks)
	@Column
	tasksId: number;

	@BelongsTo(() => Tasks)
	task: Tasks;

	@AllowNull(false)
	@Column
	text: string;

	@AllowNull(true)
	@ForeignKey(() => TasksComments)
	@Column
	parentId: number;

	@BelongsTo(() => TasksComments, {
		foreignKey: 'parent_id',
		onDelete: 'CASCADE',
	})
	parent: TasksComments;

	@HasMany(() => TasksComments, {
		foreignKey: 'parent_id',
		onDelete: 'CASCADE',
	})
	children: TasksComments[];
}
