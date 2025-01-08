import React from "react";
import { PiHamburgerDuotone } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";

const SearchFood = ({
  onClick,
  setFindFood,
  setTypeOfFood,
  numberOfItemsInCart,
  setShowOrdersTab,
}) => {
  const searchRef = useRef(null);
  let searchValue;

  function displayItems(e) {
    searchValue = searchRef.current.value;
    setFindFood(searchValue);
    setTypeOfFood("");
  }

  function displayOrderTabs() {
    setShowOrdersTab(true);
  }

  return (
    <div className="search-food-main-container flex w-full h-24 bg-slate-50 gap-x-24 items-center justify-center relative z-0">
      <PiHamburgerDuotone onClick={onClick} size="60px" />
      <input
        onClick={onClick}
        ref={searchRef}
        value={searchValue}
        onChange={displayItems}
        type="text"
        className="px-4 py-2 bg-gray-400 w-3/4 h-3/4 xl:space-x-12 text-xl"
        placeholder="Search your dish..."
      ></input>
      <div className="basket-number-of-items">
        <span>
          <strong>{numberOfItemsInCart}</strong>
        </span>
        <SlBasket
          onClick={() => displayOrderTabs()}
          size="60px"
          className="pointer cursor-pointer bg-orange-500"
        />
      </div>
    </div>
  );
};

export default SearchFood;
