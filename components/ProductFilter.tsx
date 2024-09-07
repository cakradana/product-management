import {
  ProductsFilterProps,
  SortByOption,
  SortOrderOption,
} from "@/types/product";

const ProductFilter = ({
  searchTerm,
  setSearhTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: ProductsFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search product..."
        className="input input-bordered flex-grow"
        value={searchTerm}
        onChange={(e) => setSearhTerm(e.target.value)}
      />
      <select
        className="select select-bordered"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortByOption)}
      >
        <option value={SortByOption.Name}>Name</option>
        <option value={SortByOption.Price}>Price</option>
        <option value={SortByOption.Stock}>Stock</option>
      </select>
      <select
        className="select select-bordered"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
      >
        <option value={SortOrderOption.Ascending}>Ascending</option>
        <option value={SortOrderOption.Descending}>Descending</option>
      </select>
    </div>
  );
};

export default ProductFilter;
