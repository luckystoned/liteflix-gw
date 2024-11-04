import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LiteflixService } from './liteflix.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('liteflixBaseUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LiteflixService, Logger],
  exports: [LiteflixService],
})
export class LiteflixModule {}
