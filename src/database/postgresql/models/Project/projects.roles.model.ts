import {
	Table,
	AllowNull,
	AutoIncrement,
	Column,
	PrimaryKey,
	CreatedAt,
	BelongsTo,
	Model,
	ForeignKey,
	DataType,
	HasMany,
	AfterSync,
} from 'sequelize-typescript';
import ProjectRolesPermissions from '../../../../project.roles/permissions/project.roles.permissions';
import { Projects } from './projects.model';
import { ProjectsEmployee } from './projects.employee.model';

@Table({
	timestamps: true,
})
export class ProjectsRoles extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	title: string;

	@Column({
		type: DataType.JSONB,
		defaultValue: ProjectRolesPermissions,
	})
	permission: object;

	@ForeignKey(() => Projects)
	projectId: number;

	@BelongsTo(() => Projects)
	project: Projects;

	@CreatedAt
	createdAt: Date;

	@HasMany(() => ProjectsEmployee, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	projectsEmployees: ProjectsEmployee[];

	@AfterSync
	static async afterSyncHook(instance: ProjectsRoles, options: any) {
		const defaultExists = await ProjectsRoles.findOne({
			where: { title: 'Default', projectId: null },
		});
		if (!defaultExists) {
			await ProjectsRoles.create({
				title: 'Default',
				projectId: null,
				permission: {
					...ProjectRolesPermissions,
				},
			});
		}
		const ownerExists = await ProjectsRoles.findOne({
			where: { title: 'Owner' },
		});
		if (!ownerExists) {
			await ProjectsRoles.create({
				title: 'Owner',
				projectId: null,
				permission: {
					...ProjectRolesPermissions,
					administrator: true,
				},
			});
		}
	}
}
