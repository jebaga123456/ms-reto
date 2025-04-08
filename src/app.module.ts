import { Module } from '@nestjs/common';
import { ComicsModule } from './comics/comics.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ComicsModule,
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers : [{
            limit: 5,
            ttl: 60
          }]
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables accessible app-wide
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}