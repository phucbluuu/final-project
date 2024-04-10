import React from "react";
import { useDispatch } from "react-redux";

import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { setAddItemToCart, setOpenCart } from "../../app/CartSlice";
import { getLocalStorage } from "../../utils/sessionStorage";
import { selectShowForm, setShowForm } from "../../app/LoginSlice";

const Item = ({
  ifExists,
  _id,
  color,
  shadow,
  name,
  desc,
  banner,
  type,
  unit,
  price,
  available,
  suplier,
  soldAmount,
  isBest,
}) => {
  //   console.log(id)
  const dispatch = useDispatch();
  const token = getLocalStorage("userToken");

  const onAddToCart = () => {
    if (!token || token === "") {
      dispatch(setShowForm(true));
    } else {
      const item = { id: _id, name, type, banner, color, shadow, price };

      dispatch(setAddItemToCart(item));
    }
  };

  const onBuyNow = () => {
    if (!token || token === "") {
      dispatch(setShowForm(true));
    } else {
      const item = { id: _id, name, type, banner, color, shadow, price };

      dispatch(setAddItemToCart(item));
      onCartToggle();
    }
  };

  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  return (
    <>
      <div
        className={`relative bg-gradient-to-b ${color}  grid items-center ${
          ifExists ? "justify-items-start" : "justify-items-center"
        } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
      >
        <div
          className={`grid items-center ${
            ifExists ? "justify-items-start" : "justify-items-center"
          }`}
        >
          <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
            {name}
          </h1>
          <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
            {type}
          </p>

          <div className="flex items-center justify-between w-28 my-2">
            <div className="flex items-center bg-white/80  px-1 rounded blur-effect-theme">
              <h1 className="text-black text-sm font-medium">${price}</h1>
            </div>
            <div className="flex items-center gap-1">
              {isBest && (
                <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
              onClick={() => onAddToCart()}
            >
              <ShoppingBagIcon className="icon-style text-slate-900" />
            </button>
            <button
              type="button"
              className="bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
              onClick={onBuyNow}
            >
              Buy now
            </button>
          </div>
        </div>
        <div
          className={`flex items-center ${
            ifExists ? "absolute top-5 right-1" : "justify-center"
          }`}
        >
          <img
            src={banner}
            alt={`img/item-img/${_id}`}
            className={`transitions-theme hover:-rotate-12 ${
              ifExists
                ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
                : "h-36 w-64"
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default Item;
