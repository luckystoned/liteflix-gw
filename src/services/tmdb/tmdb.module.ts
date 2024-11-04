import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TmbdService } from './tmdb.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('tmdbBaseUrl'),
        params: {
          language: configService.get('tmdbLanguage'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TmbdService, Logger],
  exports: [TmbdService],
})
export class TmdbModule {}
