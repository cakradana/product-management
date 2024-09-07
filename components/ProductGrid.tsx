import { deleteProduct } from "@/store/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Product, SortByOption, SortOrderOption } from "@/types/product";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductGrid = () => {
  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.Name);
  const [sortOrder, setSortOrder] = useState<SortOrderOption>(
    SortOrderOption.Ascending
  );
  const [searchTerm, setSearhTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const products = useSelector((state: RootState) => state.products.items);
  const dispatch: AppDispatch = useDispatch();

  const sortedAndFilteredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        if (a[sortBy as SortByOption] < b[sortBy as SortByOption])
          return sortOrder === SortOrderOption.Ascending ? -1 : 1;
        if (a[sortBy as SortByOption] > b[sortBy as SortByOption])
          return sortOrder === SortOrderOption.Ascending ? 1 : -1;
        return 0;
      })
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, sortBy, sortOrder, searchTerm]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <ProductFilter
        searchTerm={searchTerm}
        setSearhTerm={setSearhTerm}
        sortBy={sortBy as SortByOption}
        setSortBy={setSortBy}
        sortOrder={sortOrder as SortOrderOption}
        setSortOrder={setSortOrder}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductGrid;
