import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TmdbModule } from '../../services/tmdb/tmdb.module';
import { LiteflixModule } from '../../services/liteflix/liteflix.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [TmdbModule, LiteflixModule],
  controllers: [MovieController],
  providers: [MovieService, Logger, ConfigService],
})
export class MovieModule {}
