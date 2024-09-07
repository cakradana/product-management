export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  pokemon: string;
  image: string;
}

export interface ProductsCollection {
  items: Product[];
}

export interface ProductModalProps {
  product?: Product;
  onClose: () => void;
}

export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export enum SortByOption {
  Name = "name",
  Price = "price",
  Stock = "stock",
}

export enum SortOrderOption {
  Ascending = "asc",
  Descending = "desc",
}

export interface ProductsFilterProps {
  searchTerm: string;
  setSearhTerm: (term: string) => void;
  sortBy: SortByOption;
  setSortBy: (sort: SortByOption) => void;
  sortOrder: SortOrderOption;
  setSortOrder: (order: SortOrderOption) => void;
}
