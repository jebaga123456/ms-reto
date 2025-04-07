export interface MetaDataAttributes {
    id: string;
    comicId: string;
    name: string;
    description?: string;
    createBy: string;
  }
  
  export class MetadataEntity {
    constructor(private attributes: MetaDataAttributes) {}
    toValue(): MetaDataAttributes {
      return {
        id: this.attributes.id,
        comicId: this.attributes.comicId,
        name: this.attributes.name,
        description: this.attributes.description,
        createBy: this.attributes.createBy,
      };
    } 
    }
  
  