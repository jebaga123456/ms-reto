import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ComicService } from "src/comics/application/use-case/comic.service";
import { InformationResponseDto } from "./dto/information-response.dto";
import { Throttle } from "@nestjs/throttler";

@Controller('reto')
@ApiTags('combinate')
export class CombinateComicController {
  constructor(private comicService: ComicService) {}

  @Get('combinate/:peopleId/:weatherId')
  @ApiOperation({ summary: 'Get combined Star Wars info' })
  @ApiResponse({ status: 200, type: InformationResponseDto })

  @Throttle({ options: { limit : 5 , ttl : 60} })
  async getCombined(
    @Param('peopleId') peopleId: string,
    @Param('weatherId') weatherId: string,
  ) {
    return this.comicService.combinate(peopleId, weatherId);
  }
}
