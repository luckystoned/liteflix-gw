import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MovieReponseDto } from '../../api/movie/dto/movie-response.dto';

@Injectable()
export class LiteflixService {
  constructor(private httpService: HttpService, private logger: Logger) {}

  createMovie(body: {
    title: string;
    imgUrl: string;
  }): Observable<MovieReponseDto[]> {
    return this.httpService.post<MovieReponseDto[]>('/movie', body).pipe(
      map((response) => response.data),
      tap(() =>
        this.logger.log(`Movie with title ${body.title} created successfully`),
      ),
      catchError((err) => {
        this.logger.error(
          `There was an error creating movie with title ${body.title}`,
        );

        return throwError(() => new Error(err));
      }),
    );
  }

  getMovies(): Observable<MovieReponseDto[]> {
    return this.httpService.get<MovieReponseDto[]>('/movie').pipe(
      map((response) =>
        response.data.map((movie) => ({
          ...movie,
          isUserMovie: true,
        })),
      ),
      tap(() => this.logger.log('Movies were returned successfully')),
      catchError((err) => {
        this.logger.error(`There was an error getting returning movies`);

        return throwError(() => new Error(err));
      }),
    );
  }
}
