import React from "react";
import { IMG_URL } from "../utils/constants";

const CartItemList = ({ items }) => {
  return (
    // stopped the closing of the accordion when clicked on any item of the list using stopPropagation()
    <div onClick={(event) => event.stopPropagation()}>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="border-b border-gray-200 text-left px-2 py-4 flex justify-between items-start"
        >
          <div>
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <br />
              <span>
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
          </div>
          <div className="relative w-3/12">
            <img
              src={IMG_URL + item.card.info.imageId}
              className="rounded-lg w-full"
              alt={item.card.info.name}
            />
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default CartItemList;
