import { CustomInjectable } from "src/comics/common/injectable";
import { ComicRepository } from "src/comics/domain/repository/comic.repository";
import { MetadataRequestDto } from "src/comics/infraestructure/controller/dto/metadata-request.dto";
import { AppLogger } from "src/comics/infraestructure/logger/logger.service";

@CustomInjectable()
export class MetadataService {
  constructor(private readonly comicRepository: ComicRepository, private readonly logger : AppLogger) {}

  async saveMetadata(metadata: MetadataRequestDto) {
    this.logger.log(`MetadataService.saveMetadata  init metadata: ${metadata}`);

    const item = { ...metadata, createBy: new Date().toISOString() };
    return this.comicRepository.saveMetadata(item);
  }

}
