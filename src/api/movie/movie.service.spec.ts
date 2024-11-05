import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { LiteflixService } from '../../services/liteflix/liteflix.service';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { BadRequestException, Logger } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('MovieService', () => {
  let service: MovieService;
  let liteflixService: LiteflixService;
  let tmdbService: TmbdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: LiteflixService,
          useValue: {
            createMovie: jest.fn(),
            getMovies: jest.fn(),
            deleteMovie: jest.fn(),
          },
        },
        {
          provide: TmbdService,
          useValue: {
            getPopularMovies: jest.fn(),
            getNowPlayingMovies: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    liteflixService = module.get<LiteflixService>(LiteflixService);
    tmdbService = module.get<TmbdService>(TmbdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMovie', () => {
    it('should call liteflixService.createMovie', async () => {
      const body = { title: 'Test Movie', imgUrl: 'http://test.com/image.jpg' };
      const result = of([]);
      jest.spyOn(liteflixService, 'createMovie').mockReturnValue(result);

      expect(await service.createMovie(body)).toBe(result);
      expect(liteflixService.createMovie).toHaveBeenCalledWith(body);
    });
  });

  describe('getMovies', () => {
    it('should return movies', async () => {
      const movies = [];
      jest.spyOn(liteflixService, 'getMovies').mockReturnValue(of(movies));

      expect(await service.getMovies()).toBe(movies);
    });

    it('should throw BadRequestException on error', async () => {
      jest
        .spyOn(liteflixService, 'getMovies')
        .mockReturnValue(throwError(() => new Error()));

      await expect(service.getMovies()).rejects.toThrow(BadRequestException);
    });
  });

  describe('getPopularMovies', () => {
    it('should return popular movies', async () => {
      const movies = [];
      jest.spyOn(tmdbService, 'getPopularMovies').mockReturnValue(of(movies));

      expect(await service.getPopularMovies()).toBe(movies);
    });

    it('should throw BadRequestException on error', async () => {
      jest
        .spyOn(tmdbService, 'getPopularMovies')
        .mockReturnValue(throwError(() => new Error()));

      await expect(service.getPopularMovies()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should return now playing movies', async () => {
      const movies = [];
      jest
        .spyOn(tmdbService, 'getNowPlayingMovies')
        .mockReturnValue(of(movies));

      expect(await service.getNowPlayingMovies()).toBe(movies);
    });

    it('should throw BadRequestException on error', async () => {
      jest
        .spyOn(tmdbService, 'getNowPlayingMovies')
        .mockReturnValue(throwError(() => new Error()));

      await expect(service.getNowPlayingMovies()).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
