import { ApiProperty } from "@nestjs/swagger";

export class HomeworldDto {
    @ApiProperty() name: string;
    @ApiProperty() climate: string;
    @ApiProperty() terrain: string;
    @ApiProperty() nameSpecie: string;
  }
  
  export class InformationResponseDto {
    @ApiProperty() name: string;
    @ApiProperty({ type: HomeworldDto }) homeworld: HomeworldDto;
    @ApiProperty() createBy: string;
  }