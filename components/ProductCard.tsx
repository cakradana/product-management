import { ProductCardProps } from "@/types/product";
import Image from "next/image";

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            priority={true}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Pokemon: {product.pokemon}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-info"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
