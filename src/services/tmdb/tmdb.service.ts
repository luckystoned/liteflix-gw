import { TmbdMoviesQueryDto } from 'src/api/movie/dto/tmbd-movies-query.dto';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TmdbMovieType } from '../../commons/interfaces';

@Injectable()
export class TmbdService {
  constructor(private httpService: HttpService, private logger: Logger) {
    // Set default base URL and API key for testing
    this.httpService.axiosRef.defaults.baseURL = process.env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
    this.httpService.axiosRef.defaults.params = {
      api_key: process.env.TMDB_API_KEY || 'test_api_key',
    };
  }

  getNowPlayingMovies(
    params?: TmbdMoviesQueryDto,
  ): Observable<TmdbMovieType[]> {
    return this.httpService
      .get<{ results: TmdbMovieType[] }>('/movie/now-playing', { params })
      .pipe(
        map((response) =>
          response.data.results.map((movie) => ({
            id: movie.id,
            backdropPath: movie.backdropPath,
            title: movie.title,
            voteAverage: movie.voteAverage,
            releaseDate: movie.releaseDate,
            imgUrl: `https://image.tmdb.org/t/p/w500/${movie.backdropPath}`,
          })),
        ),
        tap(() => this.logger.log('Now playing movies returned successfully')),
        catchError((err) => {
          this.logger.error('There was an error getting now playing movies');
          return throwError(() => err); // Changed to rethrow 'err' directly
        }),
      );
  }

  getPopularMovies(params?: TmbdMoviesQueryDto): Observable<TmdbMovieType[]> {
    return this.httpService
      .get<{ results: TmdbMovieType[] }>('/movie/popular', { params })
      .pipe(
        map((response) =>
          response.data.results.map((movie) => ({
            id: movie.id,
            backdropPath: movie.backdropPath,
            title: movie.title,
            voteAverage: movie.voteAverage,
            releaseDate: movie.releaseDate,
            imgUrl: `https://image.tmdb.org/t/p/w500/${movie.backdropPath}`,
          })),
        ),
        tap(() => this.logger.log('Popular movies returned successfully')),
        catchError((err) => {
          this.logger.error('There was an error getting popular movies');
          return throwError(() => err); // Changed to rethrow 'err' directly
        }),
      );
  }
}
