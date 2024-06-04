import {
	BadRequestException,
	forwardRef,
	HttpStatus,
	Inject,
	Injectable,
	NotImplementedException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Op, Transaction } from 'sequelize';
import { GetUserDto } from './dto/get.user.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { SetUserPasswordDto } from './dto/set.user.password.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(Users)
		private readonly usersModel: typeof Users,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	async getUser({ userId, login, name, surname, phone, email }: GetUserDto) {
		try {
			const whereClause: any = {};
			if (userId) whereClause.id = userId;
			if (login) whereClause.login = login;
			if (name) whereClause.name = { [Op.like]: `%${name}%` };
			if (surname) whereClause.surname = { [Op.like]: `%${surname}%` };
			if (phone) whereClause.phone = phone;
			if (email) whereClause.email = email;

			return await this.usersModel.findAll({
				where: whereClause,
				attributes: { exclude: ['password', 'updatedAt'] },
			});
		} catch (error) {
			throw error;
		}
	}

	async createUser(userData: RegistrationDto) {
		let userTransaction: Transaction;
		try {
			userTransaction = await this.usersModel.sequelize.transaction();
			const newUser: Users = await this.usersModel.create(
				{ ...userData },
				{ transaction: userTransaction },
			);
			await userTransaction.commit();
			return newUser;
		} catch (error) {
			if (userTransaction) {
				await userTransaction.rollback();
			}
			throw error;
		}
	}

	async deleteUser(response: any) {
		const user: Omit<Users, 'password' | 'updatedAt'> = response?.req?.user;
		if (!user) throw new UnauthorizedException();
		const deleteUser = await this.usersModel.destroy({
			where: {
				id: user.id,
				login: user.login,
			},
		});
		if (deleteUser !== 1)
			throw new BadRequestException(
				'Failed to delete user try again later',
			);
		return await this.authService.logoutUser(response);
	}

	async getUserForService({ userId, ...getUserDro }: GetUserDto) {
		try {
			return await this.usersModel.findOne({
				where: {
					...(userId && {
						id: userId,
					}),
					...getUserDro,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async updateUser(request: any, updateUserDto: UpdateUserDto) {
		let userTransaction: Transaction;
		try {
			userTransaction = await this.usersModel.sequelize.transaction();
			const updatedUser = await this.usersModel.update(
				{
					...updateUserDto,
				},
				{
					where: {
						id: request.user.id,
					},
					transaction: userTransaction,
					returning: true,
				},
			);
			if (updatedUser[0] !== 1)
				throw new NotImplementedException(
					'Failed to update user data, try again later',
				);
			await userTransaction.commit();
			return await this.authService.refreshToken(request, request.res);
		} catch (error) {
			await userTransaction.rollback();
			throw error;
		}
	}

	async deleteUserAdmin(request: any, id: number) {
		let userTransaction: Transaction;
		try {
			if (request.user.id === id)
				throw new BadRequestException('You cannot delete your account');
			userTransaction = await this.usersModel.sequelize.transaction();
			const deleteUser: number = await this.usersModel.destroy({
				where: {
					id: id,
				},
				transaction: userTransaction,
			});
			if (deleteUser !== 1)
				throw new BadRequestException(
					'Failed to delete user try again later',
				);
			await userTransaction.commit();
			await this.authService.logoutUserAdmin(id);
			return HttpStatus.OK;
		} catch (error) {
			if (userTransaction) {
				await userTransaction.rollback();
			}
			throw error;
		}
	}

	async updateUserAdmin(
		id: number,
		updateUserDto: UpdateUserDto,
		request: any,
	) {
		let userTransaction: Transaction;
		try {
			userTransaction = await this.usersModel.sequelize.transaction();
			if (request.user.id === id)
				throw new BadRequestException('You cannot delete your account');

			const updatedUser = await this.usersModel.update(
				{
					...updateUserDto,
				},
				{
					where: {
						id: id,
					},
					transaction: userTransaction,
				},
			);
			if (updatedUser[0] !== 1)
				throw new NotImplementedException(
					'Failed to update user data, try again later',
				);
			await userTransaction.commit();
			await this.authService.logoutUserAdmin(id);
			return HttpStatus.OK;
		} catch (error) {
			if (userTransaction) {
				await userTransaction.rollback();
			}
			throw error;
		}
	}

	async updateUserPassword(
		request: any,
		setUserPassword: SetUserPasswordDto,
	) {
		let userTransaction: Transaction;
		try {
			userTransaction = await this.usersModel.sequelize.transaction();
			const { user } = request;
			const userEntry: Users = await this.usersModel.findOne({
				where: {
					id: user.id,
					login: user.login,
				},
			});
			if (!userEntry) throw new BadRequestException('User not found');

			const passValidate: boolean = compareSync(
				setUserPassword.oldPassword,
				userEntry.password,
			);
			if (!passValidate)
				throw new BadRequestException(
					'Old password entered incorrectly',
				);

			const NewPasswordHash: string = hashSync(
				setUserPassword.newPassword,
				genSaltSync(10),
			);
			const updatedUserEntry = await this.usersModel.update(
				{
					password: NewPasswordHash,
				},
				{
					where: {
						id: user.id,
						login: user.login,
					},
					transaction: userTransaction,
				},
			);
			if (updatedUserEntry[0] !== 1)
				throw new BadRequestException(
					'Failed to update password, try again later',
				);
			await userTransaction.commit();
			return HttpStatus.OK;
		} catch (error) {
			await userTransaction.rollback();
			throw error;
		}
	}
}
