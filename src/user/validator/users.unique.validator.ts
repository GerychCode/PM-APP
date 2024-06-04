import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Users } from '../../database/postgresql/models/User/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'UserDataValidator', async: true })
@Injectable()
export class UsersUniqueValidator implements ValidatorConstraintInterface {
	constructor(
		@InjectModel(Users)
		private usersRepository: typeof Users,
	) {}

	//{
	//   targetName: 'RegistrationDto',
	//   property: 'name',
	//   object: RegistrationDto {
	//     name: 'string',
	//     surname: 'string',
	//     tag: 'string',
	//     email: 'string@gmail.com',
	//     phone: '+380997693339',
	//     password: 'string'
	//   },
	//   value: 'string',
	//   constraints: [ 'id', 'sosi' ]
	// }
	async validate(value: any, { property }: ValidationArguments) {
		try {
			return !(await this.usersRepository.findOne({
				where: {
					[property]: value,
				},
			}));
		} catch (e) {
			return false;
		}
	}

	defaultMessage() {
		return `Incorrect data entered`;
	}
}
