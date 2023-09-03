export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookFilterableFields: string[] = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'categoryId',
];

export const bookRelationalFields: string[] = ['categoryId'];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
