import { MetadataEntity } from "../entities/metadata.entity";
import { SwapiCacheEntity } from "../entities/swapicache.entity";

export abstract class ComicRepository {

  abstract create(key: string, data: any): Promise<void>;
  abstract getItem(id: string): Promise<any | null>;
  abstract saveMetadata(data: any): Promise<void>;
  abstract getAllCache(): Promise<SwapiCacheEntity[]>;
  abstract getAllMetadata(): Promise<MetadataEntity[]>;
}