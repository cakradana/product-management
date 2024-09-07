"use client";

import AddProduct from "@/components/AddProduct";
import ProductGrid from "@/components/ProductGrid";
import { setProducts } from "@/store/productsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts)));
    }
  });

  return (
    <div className="container mx-auto p-4">
      <AddProduct />
      <ProductGrid />
    </div>
  );
}
