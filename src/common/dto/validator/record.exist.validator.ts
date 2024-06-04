import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@ValidatorConstraint({ name: 'RecordExistValidator', async: true })
@Injectable()
export class RecordExistValidator implements ValidatorConstraintInterface {
	constructor(private sequelize: Sequelize) {}

	async validate(value: any, args: ValidationArguments) {
		const constraints = args.constraints[0];
		if (!value) return false;
		try {
			const ModelClass = this.sequelize.models[constraints.model];
			if (!ModelClass) {
				throw new Error(
					`Model ${constraints.model} not found in Sequelize`,
				);
			}
			const expressionParams = constraints?.expressionParams?.reduce(
				(acc, arg) => {
					if (!args.object[arg])
						throw new Error("Argument '" + arg + "' not found");
					acc[arg] = args.object[arg];
				},
				{},
			);

			const record = await ModelClass.findOne({
				where: {
					[constraints.property
						? constraints.property
						: args.property]: value,
					...expressionParams,
				},
			});
			return !!record;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	defaultMessage() {
		return `Record does not exist`;
	}
}
