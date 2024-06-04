import { IntersectionType, PickType } from '@nestjs/swagger';
import { GetDataQueryDto } from '../../common/dto/get.data.query.dto';
import { NoValidationOptionalEmployeeBaseDto } from './employee.base.dto';
import { NoValidationOptionalRoleBaseDto } from '../../project.roles/dto/role.base.dto';
import { OptionalUserBaseDto } from '../../user/dto/user.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';

export class GetEmployeeDto extends IntersectionType(
	NoValidationOptionalEmployeeBaseDto,
	NoValidationProjectBaseDto,
	NoValidationOptionalRoleBaseDto,
	OptionalUserBaseDto,
) {}

export class EmployeeModelIncludeDto extends PickType(GetDataQueryDto, [
	'includeUser',
	'includeRole',
] as const) {}
