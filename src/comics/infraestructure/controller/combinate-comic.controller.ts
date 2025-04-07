import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ComicService } from "src/comics/application/use-case/comic.service";
import { InformationResponseDto } from "./dto/information-response.dto";

@Controller('reto')
@ApiTags('combinate')
export class CombinateComicController {
  constructor(private comicService: ComicService) {}

  @Get('combinate/:peopleId/:weatherId')
  @ApiOperation({ summary: 'Get combined Star Wars info' })
  @ApiResponse({ status: 200, type: InformationResponseDto })
  async getCombined(
    @Param('peopleId') peopleId: string,
    @Param('weatherId') weatherId: string,
  ) {
    return this.comicService.combinate(peopleId, weatherId);
  }
}
