import { Module } from '@nestjs/common';
import { ComicsModule } from './comics/comics.module';

@Module({
  imports: [ComicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}