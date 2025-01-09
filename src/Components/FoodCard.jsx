import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FoodCard = ({
  name,
  rupees,
  category,
  imageUrl,
  setNumberOfItemsInCart,
  numberOfItemsInCart,
  setCartItems,
  setItemsAdded,
  itemsAdded,
  ordersSummary,
  setOrdersSummary,
}) => {
  function addToCart(foodName, rupees = 0) {
    let rupeesDup = rupees.replace(/\D/g, "");
    rupeesDup = Number(rupeesDup);
    console.log(rupeesDup);

    const isItemPresent = itemsAdded.some(
      (item) => item.toLowerCase() === foodName.toLowerCase()
    );

    if (isItemPresent) {
      toast.success(`${foodName} has already present inside cart`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }

    setNumberOfItemsInCart((prev) => prev + 1);

    toast.success(`${foodName} has been added to cart`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    if (!isItemPresent) {
      setItemsAdded((prev) => [...prev, foodName.toLowerCase()]);
      setCartItems((prev) => [
        ...prev,
        {
          imageUrl,
          name,
          quantity: 1,
          rupees,
          onDelete: false,
        },
      ]);
      setOrdersSummary((prev) => ({
        ...prev, // Spread the previous state to retain existing properties
        subtotal: prev.subtotal + rupeesDup,
        delivery: 20,
        taxes: (prev.subtotal + rupeesDup) * 0.3,
        total:
          prev.subtotal + rupeesDup + 20 + (prev.subtotal + rupeesDup) * 0.3,
      }));
    }
  }
  return (
    <div className="food-card-main-container bg-yellow-300 h-3/20 w-1/4 ml-2 rounded-lg mt-2">
      <img
        className="w-full h-3/20 object-cover rounded-lg"
        src={imageUrl}
        alt="food"
      />
      <h2 className="mt-4 text-black-900 font-serif text-2xl fw-bold ml-6">
        {name}
      </h2>
      <div className="rupees-veg-or-non-veg flex justify-around items-center gap-x-28 text-lg">
        <span>{rupees}</span>
        <span>{category}</span>
      </div>
      <button
        onClick={() => addToCart(name, rupees)}
        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 ml-6 mt-2"
      >
        Add Dish to Cart
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default FoodCard;
