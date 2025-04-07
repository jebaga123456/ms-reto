import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MetadataRequestDto } from "./dto/metadata-request.dto";
import { MetadataService } from "src/comics/application/use-case/metadata.service";

@Controller('reto')
@ApiTags('save metadata')
export class SaveMetaDataComicController {
  constructor(private metaDataService: MetadataService) {}

  @Post('save')  
  @ApiOperation({ summary: 'Save metadata info' })
  @ApiResponse({ status: 200})
  async saveMetadata(@Body() metadataRequestDto: MetadataRequestDto) {
    return this.metaDataService.saveMetadata(metadataRequestDto);
  }

}