import { Injectable } from "@nestjs/common";
import { CustomInjectable } from "src/comics/common/injectable";
import { ComicRepository } from "src/comics/domain/repository/comic.repository";
import { MetadataRequestDto } from "src/comics/infraestructure/controller/dto/metadata-request.dto";

@CustomInjectable()
export class MetadataService {
  constructor(private readonly comicRepository: ComicRepository) {}

  
  async saveMetadata(metadata: MetadataRequestDto) {
    const item = { ...metadata, createBy: new Date().toISOString() };
    return this.comicRepository.saveMetadata(item);
  }

}
