import { CustomInjectable } from "src/comics/common/injectable";
import { ComicRepository } from "src/comics/domain/repository/comic.repository";
import { AppLogger } from "src/comics/infraestructure/logger/logger.service";

@CustomInjectable()
export class HistoryService {
  constructor(private readonly comicRepository: ComicRepository, private readonly logger : AppLogger) {}
  
  async getHistory(page: number) {    
    this.logger.log(`HistoryService.getHistory  init page: ${page}`);

    const infoRes =  await this.comicRepository.getAllCache();
    const metaRes = await this.comicRepository.getAllMetadata();

    const metaMap = new Map();
        
    metaRes.forEach((m) => metaMap.set(m.toValue().comicId, m.toValue()));

    const sorted = infoRes.sort(
      (a, b) =>new Date(b.toValue().createBy).getTime() - new Date(a.toValue().createBy).getTime(),      
    );

    const pageSize = 3;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = sorted.slice(start, end).map((i) => ({
      id: i.toValue().id,
      name: i.toValue().name,
      homeworld: i.toValue().homeworld,
      nameMetadata: metaMap.get(i.toValue().id)?.name || '',
      descriptionMetadata: metaMap.get(i.toValue().id)?.description || '',
      createBy: i.toValue().createBy,
    }));

    return {
      count: sorted.length,
      next: sorted.length > end ? `/history?page=${page + 1}` : null,
      previous: page > 1 ? `/history?page=${page - 1}` : null,
      results,
    };
  }

}  
