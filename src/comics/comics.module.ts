import { Module } from '@nestjs/common';
import { CombinateComicController } from './infraestructure/controller/combinate-comic.controller';
import { ComicService } from './application/use-case/comic.service';
import { ComicDBRepository } from './infraestructure/repository/dynamo-db/comic-db.repository';
import { ComicRepository } from './domain/repository/comic.repository';
import { MetadataService } from './application/use-case/metadata.service';
import { SaveMetaDataComicController } from './infraestructure/controller/save-metadata.controller';
import { HistoryController } from './infraestructure/controller/history.controller';
import { HistoryService } from './application/use-case/history.service';
import { AppLogger } from './infraestructure/logger/logger.service';

@Module({
  imports: [],  
  controllers: [CombinateComicController, SaveMetaDataComicController, HistoryController],
  providers: [ComicService,
    MetadataService,
    ComicDBRepository,
    HistoryService,
    AppLogger,
    {
      provide: ComicRepository,
      useExisting : ComicDBRepository
    }],
})
export class ComicsModule {}
