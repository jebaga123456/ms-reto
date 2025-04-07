
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidV4 } from "uuid";
import { CustomInjectable } from "src/comics/common/injectable";
import { ComicRepository } from "src/comics/domain/repository/comic.repository";
import { MetadataEntity } from "src/comics/domain/entities/metadata.entity";
import { SwapiCacheEntity } from "src/comics/domain/entities/swapicache.entity";



@CustomInjectable()
export  class ComicDBRepository implements ComicRepository {

    async create(key: string, data: any): Promise<void> {
        const documentClient = this.getDocumentClient();

        const model = {
          id: key,
          name: data?.name,
          createBy: data.createBy,
          homeworld: {
            name: data.homeworld.name,
            climate: data.homeworld.climate,
            terrain: data.homeworld.terrain,
            nameSpecie: data.homeworld.nameSpecie,
          },
        };

        await documentClient.send(new PutCommand({
            TableName: 'swapicache',
            Item: model,
          }));
    }

    async getItem(id: string): Promise<any | null> {
        const documentClient = this.getDocumentClient();

        const result = await documentClient.send(new GetCommand({
            TableName: 'swapicache',
            Key:{id}
        }))

        return result.Item?.data || null;
    }
    
    async getAllCache(): Promise<SwapiCacheEntity[]> {
      const documentClient = this.getDocumentClient();
      const response =  await documentClient.send(new ScanCommand({ TableName: 'swapicache' }));
      const documents = response.Items?? [];
      return documents.map((doc) => this.mapToCacheEntity(doc));
      }

    async getAllMetadata(): Promise<MetadataEntity[]> {
        const documentClient = this.getDocumentClient();
        const response = await documentClient.send(new ScanCommand({ TableName: 'metadata'}));
        const documents = response.Items?? [];

        return documents.map((doc) => this.mapToMetadataEntity(doc));
      }

    private getDocumentClient(): DynamoDBDocumentClient {
        //TO-DO mover valores a variables de entorno
        const config = {
          credentials: {
            accessKeyId: 'AKIAYTBWJTVBBEY7GO6X',
            secretAccessKey: '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',
          },
          region: 'us-east-2',
        };
        const client = new DynamoDBClient(config);
    
        return DynamoDBDocumentClient.from(client);
      }
      
  async saveMetadata(item: any) {
    const documentClient = this.getDocumentClient();

     const model = {
      id: uuidV4(),
      comicId: item.comicId,
      name: item.name,
      description: item.description,
      createBy: item.createBy,
    };

     await documentClient.send(new PutCommand({
      TableName: 'metadata',
      Item: model,
    }));

  }

  private mapToMetadataEntity(document: any): MetadataEntity {
    return new MetadataEntity({
      id: document.id,
      comicId: document.comicId,
      name: document.name,
      description: document.description,
      createBy: document.createBy,
    });
  }
  private mapToCacheEntity(document: any): SwapiCacheEntity {
    return new SwapiCacheEntity({
      id: document.id,
      name: document.name,
      homeworld: document.homeworld,      
      createBy: document.createBy,
    });
  }
}