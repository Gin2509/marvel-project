export interface Series {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: URL[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: Thumbnail;
  creators: Creators;
  characters: Characters;
  stories: Stories;
  comics: Characters;
  events: Characters;
  next: null;
  previous: null;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: CharactersItem[];
  returned: number;
}

export interface CharactersItem {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: CreatorsItem[];
  returned: number;
}

export interface CreatorsItem {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: Type;
}

export enum Type {
  Cover = "cover",
  InteriorStory = "interiorStory",
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface URL {
  type: string;
  url: string;
}

export interface SeriesDto {
  id: number;
  title: string;
  type: string;
  startYear: number;
  endYear: number;
  image?: string;
  description?: string;
  thumbnail?: Thumbnail;
  resourceRelationship: ResourceRelationship[];
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ResourceRelationship {
  typeResource: string;
  count: number;
}

// export interface seriesDetails extends Result {
//   description: string;
// }
