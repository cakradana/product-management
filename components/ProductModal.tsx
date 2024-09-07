import { addProduct, editProduct } from "@/store/productsSlice";
import { Product, ProductModalProps } from "@/types/product";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 1);
  const [stock, setStock] = useState(product?.stock || 1);
  const [pokemon, setPokemon] = useState(product?.pokemon || "");
  const [image, setImage] = useState(product?.image || "");

  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stockError, setStockError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchAllPokemon();
      initialFetchDone.current = true;
    }
  });

  const fetchAllPokemon = async () => {
    if (loading) return;
    setLoading(true);
    setFetchError(null);

    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const pokemonNames = data.results.map((p: { name: string }) => p.name);
      setAllPokemon(pokemonNames);
    } catch (error) {
      setFetchError("Failed to fetch Pokemon list");
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonImage = async (pokemonName: string) => {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImage(data.sprites.front_default || "");
    } catch (error) {
      setFetchError("Failed to fetch Pokemon image");
      setImage("");
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPokemon(value);

    if (value.length === 0) {
      setFilteredPokemon([]);
    } else {
      const filtered = allPokemon.filter((p) =>
        p.toLowerCase().includes(value.toLocaleLowerCase())
      );
      setFilteredPokemon(filtered);
    }

    setImage("");
  };

  const handlePokemonSelect = (selectedPokemon: string) => {
    setPokemon(selectedPokemon);
    setFilteredPokemon([]);
    fetchPokemonImage(selectedPokemon);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrice(value);
    if (value < 1) {
      setPriceError("Price must be at least 1");
    } else {
      setPriceError(null);
    }
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setStock(value);
    if (value < 1) {
      setStockError("Stock must be at least 1");
    } else {
      setStockError(null);
    }
  };

  const handleClearPokemon = () => {
    setPokemon("");
    setImage("");
    setFilteredPokemon([]);
  };

  const handleClearName = () => {
    setName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price < 1 || stock < 1) {
      return;
    }
    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name,
      price,
      stock,
      pokemon,
      image,
    };

    if (product) {
      dispatch(editProduct(newProduct));
    } else {
      dispatch(addProduct(newProduct));
    }
    onClose();
  };

  return (
    <dialog id="product_modal" className="modal modal-open">
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg">
          {product ? "Edit Product" : "Add Product"}
        </h3>
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              className="input input-bordered w-full pr-10"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            {name && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={handleClearName}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            id="price"
            className={`input input-bordered ${
              priceError ? "input-error" : ""
            } `}
            value={Number(price).toString()}
            required
            onChange={handlePriceChange}
          />
          {priceError && (
            <p className="text-error text-sm mt-1">{priceError}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Stock</span>
          </label>
          <input
            type="number"
            id="stock"
            className={`input input-bordered ${
              stockError ? "input-error" : ""
            } `}
            value={Number(stock).toString()}
            required
            onChange={handleStockChange}
          />
          {stockError && (
            <p className="text-error text-sm mt-1">{stockError}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Pokemon</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="pokemon"
              className="input input-bordered w-full pr-10"
              value={pokemon}
              required
              onChange={handlePokemonChange}
            />
            {pokemon && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={handleClearPokemon}
              >
                <X size={20} />
              </button>
            )}
          </div>
          {filteredPokemon.length > 0 && (
            <ul className="menu block bg-base-200 w-full rounded-box mt-3 max-h-60 overflow-x-auto">
              {filteredPokemon.map((option) => (
                <li key={option}>
                  <a onClick={() => handlePokemonSelect(option)}>{option}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {image && (
          <div className="form-control mt-4 flex flex-row justify-center">
            {image && (
              <Image src={image} alt={pokemon} width={100} height={100} />
            )}
            {!image && (
              <p className="text-sm">No image available for this Pokemon</p>
            )}
          </div>
        )}
        {loading && <progress className="progress w-full"></progress>}
        {fetchError && <div className="text-error mt-2">{fetchError}</div>}
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!!priceError || !!stockError}
          >
            {product ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ProductModal;
