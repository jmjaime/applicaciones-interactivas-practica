export interface Artist {
  id: number;
  name: string;
  genre: string;
}

export interface Track {
  id: number;
  title: string;
  artistId: number;
}

export const artists: Artist[] = [
  { id: 42, name: "Bad Bunny", genre: "reggaeton" },
  { id: 7, name: "Rosalía", genre: "flamenco pop" },
  { id: 13, name: "Duki", genre: "trap" },
];

export const tracks: Track[] = [
  { id: 1, title: "Callejero", artistId: 42 },
  { id: 2, title: "Nocturna", artistId: 42 },
  { id: 3, title: "Vaivén", artistId: 7 },
  { id: 4, title: "Under", artistId: 13 },
];
