import { ApiProperty } from '@nestjs/swagger';

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
