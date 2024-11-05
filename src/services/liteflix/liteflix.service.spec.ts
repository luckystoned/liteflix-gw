import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { LiteflixService } from './liteflix.service';
import { Logger } from '@nestjs/common';
import { MovieReponseDto } from '../../api/movie/dto/movie-response.dto';

describe('LiteflixService', () => {
  let service: LiteflixService;
  let httpService: HttpService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LiteflixService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
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

    service = module.get<LiteflixService>(LiteflixService);
    httpService = module.get<HttpService>(HttpService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create a movie and log success', (done) => {
      const body = {
        title: 'Test Movie',
        imgUrl: 'http://example.com/image.jpg',
      };
      const response: MovieReponseDto[] = [
        {
          id: '1',
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          isUserMovie: false,
        },
      ];
      jest.spyOn(httpService, 'post').mockReturnValue(
        of({
          data: response,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      service.createMovie(body).subscribe({
        next: (result) => {
          expect(result).toEqual(response);
          expect(logger.log).toHaveBeenCalledWith(
            'Movie with title Test Movie created successfully',
          );
          done();
        },
        error: done.fail,
      });
    });

    it('should log error if movie creation fails', (done) => {
      const body = {
        title: 'Test Movie',
        imgUrl: 'http://example.com/image.jpg',
      };
      const error = new Error('Error creating movie');
      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => throwError(() => error));

      service.createMovie(body).subscribe({
        complete: done.fail,
        error: () => {
          expect(logger.error).toHaveBeenCalledWith(
            'There was an error creating movie with title Test Movie',
          );
          done();
        },
      });
    });
  });

  describe('getMovies', () => {
    it('should return movies and log success', (done) => {
      const response: MovieReponseDto[] = [
        {
          id: '1',
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          isUserMovie: false,
        },
      ];
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: response,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      service.getMovies().subscribe({
        next: (result) => {
          expect(result).toEqual(
            response.map((movie) => ({ ...movie, isUserMovie: true })),
          );
          expect(logger.log).toHaveBeenCalledWith(
            'Movies were returned successfully',
          );
          done();
        },
        error: done.fail,
      });
    });

    it('should log error if getting movies fails', (done) => {
      const error = new Error('Error getting movies');
      jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => error));

      service.getMovies().subscribe({
        complete: done.fail,
        error: () => {
          expect(logger.error).toHaveBeenCalledWith(
            'There was an error getting returning movies',
          );
          done();
        },
      });
    });
  });
});
