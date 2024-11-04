import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TmbdMoviesQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly page?: string;
}
