import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoryService } from "src/comics/application/use-case/history.service";
import { HistoryResponseDto } from "./dto/history-response.dto";


@Controller('reto')
@ApiTags('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('history')  
  @ApiQuery({ name: 'page', required: true })
  @ApiOperation({ summary: 'get history info' })
  @ApiResponse({ status: 200, description: 'paginate history'})

  async getHistory(@Query('page') page: number) {
    return this.historyService.getHistory(+page);
  }

}