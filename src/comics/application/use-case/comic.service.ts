import axios from "axios";
import { CustomInjectable } from "src/comics/common/injectable";
import { ComicRepository } from "src/comics/domain/repository/comic.repository";


@CustomInjectable()
export class ComicService {
  constructor(private readonly comicRepository: ComicRepository) {}

  async combinate(peopleId: string, weatherId: string): Promise<object> {

    const cacheKey = `combinate-${peopleId}-${weatherId}`;
    const cached = await this.comicRepository.getItem(cacheKey);
    if (cached && this.isFresh(cached.createBy)) return cached;

    const [peopleRes, speciesRes] = await Promise.all([
      axios.get(`https://swapi.dev/api/people/${peopleId}/`),
      axios.get(`https://swapi.dev/api/species/${weatherId}/`),
    ]);

    const person = peopleRes.data;
    const species = speciesRes.data;

     // 2. Fetch planet
     const planetRes = await axios.get(person.homeworld);
     const planet = planetRes.data;
 
     const result = {       
       name: person.name,
       createBy: new Date().toISOString(),
       homeworld: {
         name: planet.name,
         climate: planet.climate,
         terrain: planet.terrain,
         nameSpecie: species.name,
       },
     };
 
     // 3. Save in cache
     await this.comicRepository.create(cacheKey, result);

     return result;
  }

  private isFresh(dateStr: string) {
    const created = new Date(dateStr).getTime();
    return Date.now() - created < 30 * 60 * 1000; // 30 mins
  }
  
  
}
