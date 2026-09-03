// Scaffolding ya armado — no es parte del ejercicio.

export interface Author {
  id: number;
  name: string;
  nationality: string;
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
}

export interface Collection {
  id: number;
  name: string;
  bookIds: number[];
}

export const authors: Author[] = [
  { id: 1, name: "Jorge Luis Borges", nationality: "Argentina" },
  { id: 2, name: "Isabel Allende", nationality: "Chile" },
  { id: 3, name: "Gabriel García Márquez", nationality: "Colombia" },
];

export const books: Book[] = [
  { id: 1, title: "Ficciones", authorId: 1 },
  { id: 2, title: "El Aleph", authorId: 1 },
  { id: 3, title: "La casa de los espíritus", authorId: 2 },
  { id: 4, title: "Cien años de soledad", authorId: 3 },
];

export const collections: Collection[] = [
  { id: 1, name: "Clásicos latinoamericanos", bookIds: [1, 4] },
];
