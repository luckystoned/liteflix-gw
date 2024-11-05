import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { TmbdService } from './tmdb.service';
import { Logger } from '@nestjs/common';
import { TmdbMovieType } from 'src/commons/interfaces';

describe('TmbdService', () => {
  let service: TmbdService;
  let httpService: HttpService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmbdService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            axiosRef: {
              defaults: {
                baseURL: '',
                params: {},
              },
            },
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TmbdService>(TmbdService);
    httpService = module.get<HttpService>(HttpService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNowPlayingMovies', () => {
    it('should return an array of movies', (done) => {
      const mockResponse: TmdbMovieType[] = [
        {
          id: 1,
          backdropPath: 'path1',
          title: 'Movie 1',
          voteAverage: 8.5,
          releaseDate: '2021-01-01',
          imgUrl: 'https://image.tmdb.org/t/p/w500/path1',
        },
      ];

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: { results: mockResponse },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      service.getNowPlayingMovies().subscribe((movies) => {
        expect(movies).toEqual([
          {
            id: 1,
            backdropPath: 'path1',
            title: 'Movie 1',
            voteAverage: 8.5,
            releaseDate: '2021-01-01',
            imgUrl: 'https://image.tmdb.org/t/p/w500/path1',
          },
        ]);
        expect(logger.log).toHaveBeenCalledWith(
          'Now playing movies returned successfully',
        );
        done();
      });
    });

    it('should log an error and throw an error when the request fails', (done) => {
      const mockError = new Error('Network error');

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => mockError));

      service.getNowPlayingMovies().subscribe({
        error: (err) => {
          expect(logger.error).toHaveBeenCalledWith(
            'There was an error getting now playing movies',
          );
          expect(err.message).toBe('Network error');
          done();
        },
      });
    });
  });

  describe('getPopularMovies', () => {
    it('should return an array of movies', (done) => {
      const mockResponse: TmdbMovieType[] = [
        {
          id: 2,
          backdropPath: 'path2',
          title: 'Movie 2',
          voteAverage: 7.5,
          releaseDate: '2021-02-01',
          imgUrl: 'https://image.tmdb.org/t/p/w500/path2',
        },
      ];

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: { results: mockResponse },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      service.getPopularMovies().subscribe((movies) => {
        expect(movies).toEqual([
          {
            id: 2,
            backdropPath: 'path2',
            title: 'Movie 2',
            voteAverage: 7.5,
            releaseDate: '2021-02-01',
            imgUrl: 'https://image.tmdb.org/t/p/w500/path2',
          },
        ]);
        expect(logger.log).toHaveBeenCalledWith(
          'Popular movies returned successfully',
        );
        done();
      });
    });

    it('should log an error and throw an error when the request fails', (done) => {
      const mockError = new Error('Network error');

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => mockError));

      service.getPopularMovies().subscribe({
        error: (err) => {
          expect(logger.error).toHaveBeenCalledWith(
            'There was an error getting popular movies',
          );
          expect(err.message).toBe('Network error');
          done();
        },
      });
    });
  });
});
