import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { List } from 'src/typeorm/entities/List';
import { STATUS } from 'src/utils/enums';

export class PatchItemsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  deadline: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: string;

  list: List[];
}
