import { STATUS } from './../../utils/enums';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { List } from 'src/typeorm/entities/List';
import { ApiProperty } from '@nestjs/swagger';

export class AddItemsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  deadline: string;

  @ApiProperty()
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: string;

  list: List[];
}
