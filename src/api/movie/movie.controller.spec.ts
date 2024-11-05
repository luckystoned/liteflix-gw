import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CreateMovieQueryDto } from './dto/create-movie-query.dto';
import { TmbdMoviesQueryDto } from './dto/tmbd-movies-query.dto';
import { MovieReponseDto } from './dto/movie-response.dto';
import { of, firstValueFrom } from 'rxjs';
import { TmdbMoviesResponseDto } from './dto/tmdb-movies-response.dto';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            createMovie: jest.fn(),
            getMovies: jest.fn(),
            getPopularMovies: jest.fn(),
            getNowPlayingMovies: jest.fn(),
          },
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieQueryDto = {
        imgUrl: 'http://example.com/image.jpg',
        title: 'Movie Title',
      };
      const result: MovieReponseDto[] = [
        {
          id: '1',
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          isUserMovie: false,
        },
      ];

      jest
        .spyOn(movieService, 'createMovie')
        .mockImplementation(() => Promise.resolve(of(result)));

      const response = await firstValueFrom(
        await movieController.createMovie(createMovieDto),
      );
      expect(response).toBe(result);
    });
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      const result: MovieReponseDto[] = [
        {
          id: '1',
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          isUserMovie: false,
        },
      ];
      jest.spyOn(movieService, 'getMovies').mockResolvedValue(result);

      expect(await movieController.getMovies()).toBe(result);
    });
  });

  describe('getPopularMovies', () => {
    it('should return an array of popular movies', async () => {
      const result: TmdbMoviesResponseDto[] = [
        {
          id: 1,
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          voteAverage: 5,
          backdropPath: 'http://example.com/image.jpg',
          releaseDate: '2021-01-01',
        },
      ];
      jest
        .spyOn(movieService, 'getPopularMovies')
        .mockImplementation(() => Promise.resolve(result));

      expect(await movieController.getPopularMovies()).toBe(result);
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should return an array of now playing movies', async () => {
      const params: TmbdMoviesQueryDto = {
        page: '1',
      };
      const result: TmdbMoviesResponseDto[] = [
        {
          id: 1,
          imgUrl: 'http://example.com/image.jpg',
          title: 'Movie Title',
          voteAverage: 5,
          backdropPath: 'http://example.com/image.jpg',
          releaseDate: '2021-01-01',
        },
      ];
      jest.spyOn(movieService, 'getNowPlayingMovies').mockResolvedValue(result);

      expect(await movieController.getNowPlayingMovies(params)).toBe(result);
    });
  });
});
