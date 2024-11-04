import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MovieReponseDto } from './dto/movie-response.dto';
import { MovieService } from './movie.service';
import { TmdbMoviesResponseDto } from './dto/tmdb-movies-response.dto';
import { TmbdMoviesQueryDto } from './dto/tmbd-movies-query.dto';
import { CreateMovieQueryDto } from './dto/create-movie-query.dto';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'Movie created successfully',
    type: MovieReponseDto,
  })
  @ApiOperation({ summary: 'Create a movie' })
  createMovie(@Body() body: CreateMovieQueryDto) {
    return this.movieService.createMovie(body);
  }

  @Get('/')
  @ApiOkResponse({
    description: 'Movies returned successfully',
    type: [MovieReponseDto],
  })
  @ApiOperation({ summary: 'Get all db movies' })
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get('/popular')
  @ApiOkResponse({
    description: 'Popular movies returned successfully',
    type: [TmdbMoviesResponseDto],
  })
  @ApiOperation({ summary: 'Get popular movies from tmdb' })
  getPopularMovies() {
    return this.movieService.getPopularMovies();
  }

  @Get('/now-playing')
  @ApiOkResponse({
    description: 'Now playing movies returned successfully',
    type: [TmdbMoviesResponseDto],
  })
  @ApiOperation({ summary: 'Get now playing movies from tmdb' })
  getNowPlayingMovies(@Query() params?: TmbdMoviesQueryDto) {
    return this.movieService.getNowPlayingMovies(params);
  }
}
