import * as dotenv from 'dotenv';

dotenv.config();

interface EnvironmentConfiguration {
  liteflixBaseUrl: string;
  tmdbBaseUrl: string;
  tmdbLanguage: string;
}

const { LITEFLIX_MOVIES_BASE_URL, TMDB_BASE_URL, TMDB_LANGUAGE } = process.env;

const envConfig = (): EnvironmentConfiguration => ({
  liteflixBaseUrl: LITEFLIX_MOVIES_BASE_URL,
  tmdbBaseUrl: TMDB_BASE_URL,
  tmdbLanguage: TMDB_LANGUAGE,
});

export default envConfig;
