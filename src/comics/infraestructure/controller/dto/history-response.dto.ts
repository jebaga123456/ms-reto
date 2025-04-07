import { ApiProperty } from "@nestjs/swagger";
import { HomeworldDto } from "./information-response.dto";

class HistoryItemDto {
  @ApiProperty() name: string;
  @ApiProperty() nameMetadata: string;
  @ApiProperty() descriptionMetadata: string;
  @ApiProperty({ type: HomeworldDto }) homeworld: HomeworldDto;
  @ApiProperty() createBy: string;
}

export class HistoryResponseDto {
  @ApiProperty() count: number;
  @ApiProperty() next: string;
  @ApiProperty() previous: string;
  @ApiProperty({ type: [HistoryItemDto] }) results: HistoryItemDto[];
}

