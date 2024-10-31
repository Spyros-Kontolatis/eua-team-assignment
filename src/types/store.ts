export interface Hero {
  _id: string;
  name: string;
  films: Array<string>;
  tvShows: Array<string>;
  videoGames: Array<string>;
  allies: Array<string>;
  enemies: Array<string>;
  imageUrl: string;
}

export interface ResponseInfo {
  count: number;
  nextPage: string | null;
  previousPage: string | null;
  totalPages: number;
}
export interface HeroResponse {
  data: Array<Hero>;
  info: ResponseInfo;
}

export interface HeroState {
  heroes: Array<Hero>;
  info: ResponseInfo;
}
