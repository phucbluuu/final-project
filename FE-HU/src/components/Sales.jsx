import React, { useState, useEffect } from "react";
import Item from "./utils/Item";
import Title from "./utils/Title";
import productsApi from "../api/products";

const Sales = ({ ifExists, endpoint: { title, items } }) => {
  // console.log(endpoint)
  const [patries, setPatries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [teas, setTeas] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async (type) => {
    const res = await productsApi.getProducts();
    if (res.status === 200) {
      setPatries(res.data.products.filter((item) => item.type === "pastry"));
      setCoffees(res.data.products.filter((item) => item.type === "coffee"));
      setTeas(res.data.products.filter((item) => item.type === "tea"));
    }
  };
  useEffect(() => {
    if (search === "") {
      getProducts();
    }
  }, [search]);

  const searchApi = async (query) => {
    const res = await productsApi.getProductsByQuery(query);
    if (res.status === 200) {
      setPatries(res.data.products.filter((item) => item.type === "pastry"));
      setCoffees(res.data.products.filter((item) => item.type === "coffee"));
      setTeas(res.data.products.filter((item) => item.type === "tea"));
    }
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Debounced search function
  const delayedSearch = debounce(searchApi, 2000); // 2000ms delay

  // Event handler for input change
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearch(query);
    delayedSearch(query); // Call the debounced search function with the input query
  };
  return (
    <>
      <div className="nike-container">
        <div className="flex flex-row justify-center items-center gap-10 md:flex-col">
          <Title title={"Product"} />
          <input
            type="text"
            className="border-sky-100 border-2 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Search"
            style={{ transition: "all .15s ease" }}
            value={search}
            onChange={handleInputChange}
          />
        </div>

        <h3 className="mt-8 p-2 font-medium text-lg bg-yellow-800 text-white rounded-lg w-full">
          Coffee
        </h3>
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {coffees?.map((item, i) => (
            <Item
              {...item}
              key={i}
              ifExists={ifExists}
              color="bg-gradient-to-r from-stone-500 to-stone-700"
            />
          ))}
        </div>
        <h3 className="mt-8 p-2 font-medium text-lg bg-teal-400 text-white rounded-lg w-full">
          Tea
        </h3>
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {teas?.map((item, i) => (
            <Item
              {...item}
              key={i}
              ifExists={ifExists}
              color="bg-gradient-to-r from-emerald-300 to-green-300"
            />
          ))}
        </div>
        <h3 className="mt-8 p-2 font-medium text-lg bg-pink-200 text-white rounded-lg w-full">
          Pastries
        </h3>
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {patries?.map((item, i) => (
            <Item
              {...item}
              key={i}
              ifExists={ifExists}
              color="bg-gradient-to-r from-violet-200 to-pink-200"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sales;
