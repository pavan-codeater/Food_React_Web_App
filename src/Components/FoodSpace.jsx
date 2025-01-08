import React, { useEffect, useRef, useState } from "react";
import FoodCard from "./FoodCard";
import { IoMdGrid } from "react-icons/io";
import { FiCoffee } from "react-icons/fi";
import { LuSoup } from "react-icons/lu";
import { GiFullPizza } from "react-icons/gi";
import { PiHamburgerFill } from "react-icons/pi";
import { SiKfc } from "react-icons/si";
import { SiBurgerking } from "react-icons/si";
import { IoFastFoodOutline } from "react-icons/io5";

const FoodSpace = ({
  onClick,
  findFood,
  foodItems,
  setTypeOfFood,
  typeOfFood,
  displayAll,
  setDisplayAll,
  setNumberOfItemsInCart,
  numberOfItemsInCart,
  setCartItems,
  setItemsAdded,
  itemsAdded,
  ordersSummary,
  setOrdersSummary,
}) => {
  function displayFiliteredItems(tempValue) {
    if (tempValue == "all") {
      setDisplayAll(true);
    } else {
      setDisplayAll(false);
    }
    setTypeOfFood(tempValue);
  }

  return (
    <div
      onClick={onClick}
      className="food-space-main-container w-auto h-auto bg-green-500"
    >
      {findFood == "" && typeOfFood == "" ? (
        <div className="categories-food w-3/4 h-32 ml-48">
          <div className="group-categories  flex gap-x-24 items-center justify-center">
            <div
              onClick={() => displayFiliteredItems("all")}
              className={`all cursor-pointer mt-3 flex flex-col justify-center lg:shadow-xl ${
                typeOfFood === "all" ? "bg-red-700" : "bg-orange-400"
              }`}
            >
              <IoMdGrid size="60px" />
              <p className="text-center">All</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("breakfast")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <IoFastFoodOutline size="60px" />
              <p className="text-center">Breakfast</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("soup")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <LuSoup size="60px" />
              <p className="text-center">Soups</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("pizza")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <GiFullPizza size="60px" />
              <p className="text-center">Pizza</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("maincourse")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <PiHamburgerFill size="60px" />
              <p className="text-center">main_course</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("kfc")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <SiKfc size="60px" />
              <p className="text-center">KFC</p>
            </div>
            <div
              onClick={() => displayFiliteredItems("burger")}
              className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
            >
              <SiBurgerking size="60px" />
              <p className="text-center">Burger</p>
            </div>
          </div>
        </div>
      ) : (
        findFood == "" &&
        typeOfFood != "" && (
          <div className="categories-food w-3/4 h-32 ml-48">
            <div className="group-categories  flex gap-x-24 items-center justify-center">
              <div
                onClick={() => displayFiliteredItems("all")}
                className="all cursor-pointer mt-3 bg-orange-400  hover:bg-blue-400 flex flex-col justify-center lg:shadow-xl"
              >
                <IoMdGrid size="60px" />
                <p className="text-center">All</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("breakfast")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <IoFastFoodOutline size="60px" />
                <p className="text-center">Breakfast</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("soup")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <LuSoup size="60px" />
                <p className="text-center">Soups</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("pizza")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <GiFullPizza size="60px" />
                <p className="text-center">Pizza</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("maincourse")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <PiHamburgerFill size="60px" />
                <p className="text-center">main_course</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("kfc")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <SiKfc size="60px" />
                <p className="text-center">KFC</p>
              </div>
              <div
                onClick={() => displayFiliteredItems("burger")}
                className="all cursor-pointer mt-3 bg-orange-400 hover:bg-blue-400 flex flex-col align content-center"
              >
                <SiBurgerking size="60px" />
                <p className="text-center">Burger</p>
              </div>
            </div>
          </div>
        )
      )}
      {findFood != "" && typeOfFood == "" && (
        <div className="food-card-space w-auto h-auto  ml-80 mt-4 box-border flex gap-x-1 flex-wrap ml-3/4">
          {foodItems
            .filter((food) =>
              food.name.toLowerCase().includes(findFood.toLowerCase())
            )
            .map((food, idx) => (
              <FoodCard
                key={idx}
                name={food.name}
                rupees={food.rupees}
                category={food.category}
                imageUrl={food.imageUrl}
                setNumberOfItemsInCart={setNumberOfItemsInCart}
                numberOfItemsInCart={numberOfItemsInCart}
                setCartItems={setCartItems}
                setItemsAdded={setItemsAdded}
                itemsAdded={itemsAdded}
                ordersSummary={ordersSummary}
                setOrdersSummary={setOrdersSummary}
              />
            ))}
        </div>
      )}

      {findFood == "" && typeOfFood != "" && (
        <div className="food-card-space w-auto h-auto  ml-80 mt-4 box-border flex gap-x-1 flex-wrap ml-3/4">
          {!displayAll &&
            foodItems
              .filter((food) => food.type.toLowerCase() == typeOfFood)
              .map((food, idx) => (
                <FoodCard
                  key={idx}
                  name={food.name}
                  rupees={food.rupees}
                  category={food.category}
                  imageUrl={food.imageUrl}
                  setNumberOfItemsInCart={setNumberOfItemsInCart}
                  numberOfItemsInCart={numberOfItemsInCart}
                  setCartItems={setCartItems}
                  setItemsAdded={setItemsAdded}
                  itemsAdded={itemsAdded}
                  ordersSummary={ordersSummary}
                  setOrdersSummary={setOrdersSummary}
                />
              ))}
          {displayAll &&
            foodItems.map((food, idx) => (
              <FoodCard
                key={idx}
                name={food.name}
                rupees={food.rupees}
                category={food.category}
                imageUrl={food.imageUrl}
                setNumberOfItemsInCart={setNumberOfItemsInCart}
                numberOfItemsInCart={numberOfItemsInCart}
                setCartItems={setCartItems}
                setItemsAdded={setItemsAdded}
                itemsAdded={itemsAdded}
                ordersSummary={ordersSummary}
                setOrdersSummary={setOrdersSummary}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default FoodSpace;
