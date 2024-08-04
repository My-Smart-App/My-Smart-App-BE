import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IFindDTO } from '../common/utils-interface/find-dto';

/**
 * Payload DTO for create new user
 */
interface IRequestUserCreate {
  name: string;
  age: number;
  email: string;
  description: string;
}

export class RequestUserCreate implements IRequestUserCreate {
  @ApiProperty({ example: 'admin', description: 'Name of the user' })
  name: string;

  @ApiProperty({ example: 18, description: 'Age of the user' })
  age: number;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'My name is admin',
    description: 'Note of the user',
  })
  description: string;
}

/**
 * Query DTO for find user with filter and option
 */
interface IFindUsersDto extends IFindDTO {}

export class FindUsersDto implements IFindUsersDto {
  @ApiPropertyOptional({ description: 'Name to search for', type: String })
  search?: string; //In future, change type to Record<string, string>[]

  @ApiPropertyOptional({
    description: 'Order by field and value',
    type: String,
  })
  orderBy?: string; // In future, change type to Record<string, string>[]

  @ApiPropertyOptional({ description: 'Limit number of users', type: Number })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Offset number of users',
    type: Number,
  })
  offSet?: number;
}
