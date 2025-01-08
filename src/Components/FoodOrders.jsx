import React, { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const FoodOrders = ({
  itemsAdded,
  setItemsAdded,
  cartItems,
  setCartItems,
  setNumberOfItemsInCart,
  ordersSummary,
  setOrdersSummary,
}) => {
  useEffect(() => {
    localStorage.setItem("itemsAdded", JSON.stringify(itemsAdded));
    console.log("itemsAdded setItems", itemsAdded);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("cartItems  setCartItems", itemsAdded);
  }, [itemsAdded, cartItems, ordersSummary]);

  function increaseOrDecreaseQuantity(symbol, name, rupees, amount = 0) {
    let rupeesDup = "";
    let quantity = 0;

    if (typeof rupees == "string" && rupees.startsWith("R")) {
      rupeesDup = rupees.replace(/\D/g, "");
      rupeesDup = Number(rupeesDup);
      //   console.log(rupeesDup);
    }

    if (typeof rupees == "number") {
      quantity = rupees;
    }
    if (symbol == "i") {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      setOrdersSummary((prev) => ({
        ...prev,
        subtotal: prev.subtotal + rupeesDup,
        delivery: 20,
        taxes: (prev.subtotal + rupeesDup) * 0.3,

        total:
          prev.subtotal + rupeesDup + 20 + (prev.subtotal + rupeesDup) * 0.3,
      }));
    }

    if (symbol == "d") {
      const foundItem = cartItems.find((item) => item.name == name);
      if (foundItem.quantity == 1) {
        return;
      }
      setCartItems((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
      );

      setOrdersSummary((prev) => ({
        ...prev,
        subtotal: prev.subtotal - rupeesDup,
        delivery: 20,
        taxes: (prev.subtotal - rupeesDup) * 0.3,
        total:
          prev.subtotal - rupeesDup + 20 + (prev.subtotal - rupeesDup) * 0.3,
      }));
    }

    if (symbol == "delete") {
      setCartItems((prevState) =>
        prevState.filter((item) => item.name !== name)
      );
      //   Remove item from itemsAdded
      setItemsAdded((prevState) => prevState.filter((item) => item !== name));
      setNumberOfItemsInCart((prev) => prev - 1);
      setOrdersSummary((prev) => ({
        ...prev,
        subtotal: prev.subtotal - quantity * amount,
        delivery: 20,
        taxes: (prev.subtotal - quantity * amount) * 0.3,
        total:
          prev.subtotal -
          quantity * amount +
          20 +
          (prev.subtotal - quantity * amount) * 0.3,
      }));
    }
  }

  return (
    <div className="h-auto">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="order-item-card mt-8 h-1/5 w-full bg-white relative flex"
        >
          <img
            className="h-4/4 w-1/4 inline object-cover"
            src={item.imageUrl}
            alt={item.name}
          />
          <div className="item-name-quantity flex flex-col justify-center gap-y-3 ml-4">
            <h2 className="font-normal text-2xl font-sans">{item.name}</h2>
            <div className="border-2 border-lime-400 add-quantity-subtract bg-orange-400 h-8  flex gap-1 justify-around items-center rounded-md relative cursor-pointer">
              <span
                onClick={() =>
                  increaseOrDecreaseQuantity("d", item.name, item.rupees)
                }
                className="border-r-2 border-lime-400 text-2xl cursor-pointer"
              >
                -
              </span>
              <span className="border-r-2 bo border-lime-400 text-2xl">
                {item.quantity}
              </span>
              <span
                onClick={() =>
                  increaseOrDecreaseQuantity("i", item.name, item.rupees)
                }
                className="border-lime-400 text-2xl cursor-pointer"
              >
                +
              </span>
            </div>
          </div>
          <div className="rupees-delete-icon ml-24 flex flex-col justify-center gap-y-3">
            <span className="font-semibold text-2xl">{item.rupees}</span>
            <span
              onClick={() =>
                increaseOrDecreaseQuantity(
                  "delete",
                  item.name,
                  item.quantity,
                  item.rupees
                )
              }
            >
              <RiDeleteBin5Line size="37px" className="cursor-pointer" />
            </span>
          </div>
        </div>
      ))}

      {/* Order-total summary */}

      {itemsAdded.length != 0 && (
        <div className="order-summary-main-container">
          <br />
          <p className="text-2xl font-semibold text-green-400 text-center">
            Order Total
          </p>
          <br />
          <hr className="border-4 border-dashed border-red-500" />
          <div className="subtotal flex justify-between items-center mt-6">
            <span className="text-2xl font-semibold text-green-500">
              Subtotal
            </span>
            <span>Rs {ordersSummary.subtotal}</span>
          </div>
          <div className="delivery-fees flex justify-between items-center mt-6">
            <span className="text-2xl font-semibold text-green-500">
              Delivery fees
            </span>
            <span>Rs {ordersSummary.delivery}</span>
          </div>
          <div className="taxes flex justify-between items-center mt-6">
            <span className="text-2xl font-semibold text-green-500">Taxes</span>
            <span>Rs {ordersSummary.taxes}</span>
          </div>
          <br />
          <hr className="border-4 border-dashed border-red-500" />
          <div className="taxes flex justify-between items-center mt-6">
            <span className="text-2xl font-semibold text-green-500">Total</span>
            <span>Rs {ordersSummary.total}</span>
          </div>
          <button className="w-full bg-green-400 mt-10 rounded-lg text-2xl font-medium">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOrders;
