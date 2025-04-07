export interface SwapiCacheAttributes {
    id: string;    
    name: string;
    homeworld?: any;
    createBy: string;
  }
  
  export class SwapiCacheEntity {
    constructor(private attributes: SwapiCacheAttributes) {}
    toValue(): SwapiCacheAttributes {
      return {
        id: this.attributes.id,        
        name: this.attributes.name,
        homeworld: this.attributes.homeworld,
        createBy: this.attributes.createBy,
      };
    } 
    }
  
  