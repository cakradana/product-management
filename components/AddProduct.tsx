"use client";

import Image from "next/image";
import React, { useState } from "react";
import ProductModal from "./ProductModal";

const AddProduct = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="/img/pokeball.png" alt="pkeball" width={24} height={24} />
        Add New Product
      </button>
      {isModalOpen && <ProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AddProduct;
