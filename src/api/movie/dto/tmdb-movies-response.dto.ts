import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TmdbMoviesResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly backdropPath: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly voteAverage: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly releaseDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string;
}
