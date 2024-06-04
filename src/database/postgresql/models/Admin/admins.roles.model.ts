import {
	AfterSync,
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript';
import AdminPermissions from '../../default.value/Admin/admin.permissions';
import { Admins } from './admins.model';

@Table({
	timestamps: true,
})
export class AdminsRoles extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Unique
	@AllowNull(false)
	@Column
	title: string;

	@Column({
		type: DataType.JSONB,
		defaultValue: AdminPermissions,
	})
	permission: object;

	@HasMany(() => Admins, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		hooks: true,
	})
	admins: Admins[];

	@AfterSync
	static async afterSyncHook() {
		const AdminEntry: AdminsRoles = await AdminsRoles.findOne({
			where: { title: 'Admin' },
		});
		if (!AdminEntry) {
			await AdminsRoles.create({
				title: 'Admin',
				permission: {
					...AdminPermissions,
				},
			});
		}
	}
}
