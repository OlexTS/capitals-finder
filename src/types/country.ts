export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt: string;
}

export interface Country {
  name: CountryName;
  capital: string[];
  flags: CountryFlags;
  population: number;
  region: string;
  borders?: string[];
  currencies?: Record<string, {symbol: string; name: string}>;
  languages: Record<string, string>;
  maps: { googleMaps: string };
}
