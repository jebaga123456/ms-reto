import { ApiProperty } from "@nestjs/swagger";
  
  export class MetadataRequestDto {
    @ApiProperty() comicId: string;
    @ApiProperty() name: string;
    @ApiProperty() description: string;    
  }