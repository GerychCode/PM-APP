import {
	AllowNull,
	AutoIncrement,
	Column,
	CreatedAt,
	Default,
	HasMany,
	HasOne,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript';
import { Admins } from '../Admin/admins.model';
import { Projects } from '../Project/projects.model';
import { ProjectsEmployee } from '../Project/projects.employee.model';

@Table({
	timestamps: true,
})
export class Users extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@Column
	surname: string;

	@Unique
	@AllowNull(false)
	@Column
	login: string;

	@Unique
	@AllowNull(false)
	@Column
	email: string;

	@Unique
	@AllowNull(false)
	@Column
	phone: string;

	@AllowNull(false)
	@Column
	password: string;

	@Default('')
	@Column
	avatar: string;

	@CreatedAt
	createdAt: Date;
	@HasOne(() => Admins, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	admins: Admins[];

	@HasMany(() => Projects, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projects: Projects[];

	@HasMany(() => ProjectsEmployee, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projectsEmployees: ProjectsEmployee[];
}
