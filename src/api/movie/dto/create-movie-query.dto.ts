import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMovieQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
