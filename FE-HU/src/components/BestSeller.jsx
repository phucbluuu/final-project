import React, { useEffect, useState } from "react";
import Item from "./utils/Item";
import Title from "./utils/Title";
import productsApi from "../api/products";

const BestSeller = ({ ifExists, endpoint: { title, items } }) => {
  const [products, setProducts] = useState([]);

  const getNewProducts = async () => {
    const res = await productsApi.getProducts();
    if (res.status === 200) {
      setProducts(res.data.products);
    }
  };
  useEffect(() => {
    getNewProducts();
  }, []);
  return (
    <>
      <div className="nike-container">
        <Title title={"Best Seller"} />
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {products?.slice(0, 4).map((item, i) => (
            <Item
              {...item}
              key={i}
              ifExists={ifExists}
              color="bg-gradient-to-r from-yellow-500 to-orange-300"
              isBest={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
