import { IsNumber, IsString, Validate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class UserBaseDto {
	@ApiProperty({ required: true })
	@Expose()
	@IsNumber()
	@Type(() => Number)
	@Validate(RecordExistValidator, [{ model: 'Users', property: 'id' }], {
		message: 'Users not found',
	})
	userId: number;
}
export class NoValidationUserBaseDto {
	@ApiProperty({ required: true })
	@Expose()
	@IsNumber()
	@Type(() => Number)
	userId: number;
}
export class OptionalUserBaseDto extends PartialType(UserBaseDto) {}
export class NoValidationOptionalUserBaseDto extends PartialType(
	NoValidationUserBaseDto,
) {}
