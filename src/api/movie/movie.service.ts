import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { LiteflixService } from '../../services/liteflix/liteflix.service';
import { MovieReponseDto } from './dto/movie-response.dto';
import { TmdbMovieType } from 'src/commons/interfaces';
import { TmbdMoviesQueryDto } from './dto/tmbd-movies-query.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly liteflixService: LiteflixService,
    private readonly tmdbService: TmbdService,
    private logger: Logger,
  ) {}

  async createMovie(body: {
    title: string;
    imgUrl: string;
  }): Promise<Observable<MovieReponseDto[]>> {
    return this.liteflixService.createMovie(body);
  }

  async getMovies(): Promise<MovieReponseDto[]> {
    try {
      const movies = await firstValueFrom(this.liteflixService.getMovies());
      console.log(movies);
      return movies;
    } catch (err) {
      this.logger.error('There was an error getting movies');
      throw new BadRequestException('There was an error getting movies');
    }
  }

  async getPopularMovies(): Promise<TmdbMovieType[]> {
    try {
      return await firstValueFrom(this.tmdbService.getPopularMovies());
    } catch (err) {
      this.logger.error('There was an error getting popular movies');

      throw new BadRequestException(
        'There was an error getting popular movies',
      );
    }
  }

  async getNowPlayingMovies(
    params?: TmbdMoviesQueryDto,
  ): Promise<TmdbMovieType[]> {
    try {
      return await firstValueFrom(this.tmdbService.getNowPlayingMovies(params));
    } catch (err) {
      this.logger.error('There was an error getting now playing movies');

      throw new BadRequestException(
        'There was an error getting now playing movies',
      );
    }
  }
}
