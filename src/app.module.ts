import { Module } from '@nestjs/common';
import { ComicsModule } from './comics/comics.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ComicsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables accessible app-wide
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}