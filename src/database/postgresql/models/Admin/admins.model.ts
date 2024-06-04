import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { Users } from '../User/users.model';
import { AdminsRoles } from './admins.roles.model';

@Table
export class Admins extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	@ForeignKey(() => Users)
	userId: number;

	@BelongsTo(() => Users)
	user: Users;

	@AllowNull(false)
	@Column
	@ForeignKey(() => AdminsRoles)
	roleId: number;

	@BelongsTo(() => AdminsRoles)
	adminsRoles: AdminsRoles;
}
