import { Test, TestingModule } from '@nestjs/testing';
import { SaveMetaDataComicController } from '../src/comics/infraestructure/controller/save-metadata.controller';
import { MetadataService } from 'src/comics/application/use-case/metadata.service';
import { MetadataRequestDto } from '../src/comics/infraestructure/controller/dto/metadata-request.dto';

describe('SaveMetaDataComicController', () => {
  let controller: SaveMetaDataComicController;
  const mockMetadataService = {
    saveMetadata: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaveMetaDataComicController],
      providers: [
        {
          provide: MetadataService,
          useValue: mockMetadataService,
        },
      ],
    }).compile();

    controller = module.get<SaveMetaDataComicController>(SaveMetaDataComicController);
    jest.clearAllMocks();
  });

  it('should call MetadataService.saveMetadata and return result', async () => {
    const dto: MetadataRequestDto = {
      comicId: '/combinate/1/1',
      name : '',
      description: '200',
    };

    const mockResponse = {
      ...dto,
      createBy: new Date().toISOString(),
    };

    mockMetadataService.saveMetadata.mockResolvedValue(mockResponse);

    const result = await controller.saveMetadata(dto);

    expect(mockMetadataService.saveMetadata).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResponse);
  });
});