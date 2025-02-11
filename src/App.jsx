import React, { useEffect, useState } from "react";
import "./App.css";
import SearchFood from "./Components/SearchFood";
import FoodSpace from "./Components/FoodSpace";
import { useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import FoodOrders from "./Components/FoodOrders";
import { FaCartArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CheckOutPage from "./Components/CheckOutPage";
import axios from "axios";

const foodItems = [
  {
    name: "pan cakes",
    rupees: "Rs 100",
    category: "veg",
    type: "breakfast",
    imageUrl:
      "https://media.istockphoto.com/id/1270124269/photo/american-pancakes-with-fruits-on-table-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=K_NZ2KmhFkbKS3aDaVlIiH7JiQ8WEo_6lxhNVc5Wkuo=",
  },
  {
    name: "dosa",
    rupees: "Rs 100",
    category: "veg",
    type: "breakfast",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/01/27/07/34/dosa-6971361_1280.jpg",
  },
  {
    name: "south indian meals",
    rupees: "Rs 250",
    category: "veg",
    type: "maincourse",
    imageUrl:
      "https://media.istockphoto.com/id/1026593638/photo/southern-grits-with-biscuits.jpg?s=612x612&w=0&k=20&c=GpQVU_fdUacNf-dYRT720eQ1DvLJUe5l81Vhuy3ESLM=",
  },
  {
    name: "idli",
    rupees: "Rs 50",
    category: "veg",
    type: "breakfast",
    imageUrl:
      "https://media.istockphoto.com/id/182491284/photo/idli-sambhar-and-chutney-south-indian-dish-on-banana-leaf.jpg?s=612x612&w=0&k=20&c=LCAfM8HrWBZsRZHTjAXzYAWvG63oDagBimAMXXq-zFk=",
  },
  {
    name: "tomato Soup",
    rupees: "Rs 100",
    category: "veg",
    type: "soup",
    imageUrl:
      "https://media.istockphoto.com/id/1144780740/photo/tomato-soup-on-wooden-table-background.jpg?s=612x612&w=0&k=20&c=Kev7bUjbXTpXnqu02JUqXJ_IFAu4b7fdBt0lUKnsWeQ=",
  },
  {
    name: "north india meals",
    rupees: "Rs 250",
    category: "veg",
    type: "maincourse",
    imageUrl:
      "https://media.istockphoto.com/id/2112774156/photo/en-chaap-with-lucchi-chuntney-sauce-and-chilli-dip-served-in-thali-platter-isolated-on.jpg?s=612x612&w=0&k=20&c=S9lLlPkuwDBVWYqszeoQZLEWFUwchBYBpu4V-qBSiks=",
  },
  {
    name: "chicken soup",
    rupees: "Rs 200",
    category: "non veg",
    type: "soup",
    imageUrl:
      "https://media.istockphoto.com/id/1169104260/photo/healthy-chicken-soup.jpg?s=612x612&w=0&k=20&c=JcGkYR2XbTsCyVX9x-cvlJFD8eBZfRv-aCm3TP561-8=",
  },
  {
    name: "Mutton curry",
    rupees: "Rs 250",
    category: " non veg",
    type: "burger",
    imageUrl:
      "https://media.istockphoto.com/id/1253934130/photo/mutton-masala-curry-in-plastic-container-for-home-delivery.webp?a=1&b=1&s=612x612&w=0&k=20&c=YfBWKFt3Zje8yRAlAdteLnL5vhJvCnf2Vj2CU2ytgE4=",
  },
  {
    name: "farm house pizza",
    rupees: "Rs 250",
    category: "veg",
    type: "pizza",
    imageUrl:
      "https://media.istockphoto.com/id/1043604390/photo/butter-chicken-pizza.jpg?s=612x612&w=0&k=20&c=ahj3y6ktAvzcINubn0a0BfvovLTGDx_J_aMju4szqVQ=",
  },
  {
    name: "chicken nuggets balls",
    rupees: "Rs 400",
    category: "non veg",
    type: "kfc",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683657860186-6afce5df3c0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bnVnZ2V0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "bbq burger ",
    rupees: "Rs 250",
    category: "veg",
    type: "burger",
    imageUrl:
      "https://media.istockphoto.com/id/607299584/photo/street-fast-food-hamburger-with-bbq-grilled-steak.jpg?s=612x612&w=0&k=20&c=alSUYqo-rQwSmjNbrgngbiydGr1Jt6kO_zUJPQkC6es=",
  },
  {
    name: "KFC bucket pieces",
    rupees: "Rs 499",
    category: "non veg",
    type: "kfc",
    imageUrl:
      "https://media.istockphoto.com/id/2148308984/photo/kfc-chicken-chunks-in-a-takeout-bucket.jpg?s=612x612&w=0&k=20&c=uv5jaPeC9eDq7YPtIDHqW55UO3bpVu5OfBCZ4ylXh-Y=",
  },
];

const App = () => {
  const [findFood, setFindFood] = useState(""); // helps when search query is typed
  const [typeOfFood, setTypeOfFood] = useState(""); // typeOfFood=="breakfast" || "soups"
  const [displayAll, setDisplayAll] = useState(true); // typeOfFood=="all"
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0); // track of # items in cart
  const [showOrdersTab, setShowOrdersTab] = useState(false); // hide or display orderstab based on z-index and display property
  const [cartItems, setCartItems] = useState([]);
  const [itemsAdded, setItemsAdded] = useState([]); // just to avoid increment of counting food items of same dish
  const [ordersSummary, setOrdersSummary] = useState({
    subtotal: 0,
    delivery: 20,
    taxes: 0,
    total: 0,
  });
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [animateShake, setAnimateShake] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: null,
  });

  const [otpValue, setOtpValue] = useState(null);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    console.log("itemsAdded ", itemsAdded);
  }, [ordersSummary, showLoginPage, cartItems, animateShake, itemsAdded]);

  function handleSendOtp() {
    axios
      .post("http://localhost:3000/api/otp", { email: formData.email })
      .then((response) => {
        const receivedOtp = Number(response.data.otp);
        setOtpValue(receivedOtp);
        console.log("OTP Value from backend: ", receivedOtp);
        // timer
        const intervalId = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds <= 1) {
              clearInterval(intervalId); // Stop the timer
              return 0; // Ensure it doesn't exceed 60
            }
            return prevSeconds - 1;
          });
        }, 1000);

        return () => clearInterval(intervalId);
      });
  }

  function handleVerifyOtp() {
    if (otpValue != null && otpValue == Number(formData.otp) && seconds >= 1) {
      console.log("Verified OTP success");
      setShowLoginPage(false);
      setOtpValue(null);
      setFormData((prev) => ({
        ...prev,
        email: "",
        otp: null,
      }));
    } else {
      setOtpValue(null);
      setFormData((prev) => ({
        ...prev,
        email: "",
        otp: null,
      }));
    }
  }

  function handleEmailOTPChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      {/* -------------------------Order tab to right side z-index -10---------------- */}
      <div
        className={`ordered-items-display-main-container top-0 right-0 absolute h-inherit w-1/3 backdrop-blur-sm bg-white/40 ${
          showOrdersTab == true ? "z-10" : "hidden"
        }`}
      >
        {itemsAdded.length != 0 && (
          <div className="orders-title-cross-symbol h-1/10 w-full flex justify-center items-center gap-x-64">
            <h1 className="orders mt-6 ml-5 text-left font-medium text-3xl">
              Order Items
            </h1>
            <span>
              <ImCross
                onClick={() => setShowOrdersTab(false)}
                size="25px"
                className="cursor-pointer"
              />
            </span>
          </div>
        )}

        {itemsAdded.length == 0 && (
          <div className="orders-title-cross-symbol h-full w-full flex justify-center items-center gap-x-64 backdrop-blur-sm bg-white/40 relative">
            <div className="cart-items-present absolute top-0 flex justify-center items-center gap-x-64">
              <h1 className="orders mt-6 ml-5 text-left font-medium text-3xl">
                Order Items
              </h1>
              <span>
                <ImCross
                  onClick={() => setShowOrdersTab(false)}
                  size="25px"
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div className="cart-icon-text flex flex-col gap-y-6 align-content-center mt-40">
              <p>
                <FaCartArrowDown size={"150px"} />
              </p>
              <h2 className="text-3xl ">Cart is Empty</h2>
            </div>
          </div>
        )}

        <FoodOrders
          itemsAdded={itemsAdded}
          setItemsAdded={setItemsAdded}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setNumberOfItemsInCart={setNumberOfItemsInCart}
          ordersSummary={ordersSummary}
          setOrdersSummary={setOrdersSummary}
          setShowLoginPage={setShowLoginPage}
        />
      </div>

      {/* -----Entire App------- */}
      <div
        className={`app-main-container w-full h-full bg-green-500 absolute ${
          showOrdersTab == true ? "z-0" : "block"
        }`}
      >
        <SearchFood
          onClick={() => setShowOrdersTab(false)}
          setFindFood={setFindFood}
          setTypeOfFood={setTypeOfFood}
          numberOfItemsInCart={numberOfItemsInCart}
          setShowOrdersTab={setShowOrdersTab}
        />

        <FoodSpace
          onClick={() => setShowOrdersTab(false)}
          findFood={findFood}
          foodItems={foodItems}
          setTypeOfFood={setTypeOfFood}
          typeOfFood={typeOfFood}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          setNumberOfItemsInCart={setNumberOfItemsInCart}
          numberOfItemsInCart={numberOfItemsInCart}
          setCartItems={setCartItems}
          setItemsAdded={setItemsAdded}
          itemsAdded={itemsAdded}
          ordersSummary={ordersSummary}
          setOrdersSummary={setOrdersSummary}
        />
      </div>

      {/* ----------------------Login PAge---------------- */}
      <div
        className={`login-page-main-container h-full w-3/4 backdrop-blur-sm bg-white/40 absolute left-48 z-30 hover:animate-shake ${
          showLoginPage ? "z-30" : "hidden"
        }`}
      >
        <div
          className={`login-form-subcontainer w-2/4 h-3/4 backdrop-blur-sm bg-white/30 absolute top-20 left-64 rounded-lg shadow-cyan-500/50`}
        >
          <div
            className={`login-form-content h-4/5 w-4/5 backdrop-blur-lm absolute top-10 left-12 bg-white/10 hover:animate-none`}
          >
            <h1 className="text-center text-3xl font-semibold mt-4 relative">
              Login
            </h1>
            <input
              type="email"
              name="email"
              onChange={handleEmailOTPChange}
              value={formData.email}
              placeholder="Enter Email..."
              className="w-3/4 ml-10 mt-10 h-12 text-2xl rounded-lg"
            />
            <button
              onClick={handleSendOtp}
              className="bg-fuchsia-500 w-3/4 ml-10 mt-9 h-12 rounded-lg text-center text-1xl font-medium"
            >
              SEND OTP
            </button>
            <input
              type="text"
              value={formData.otp}
              onChange={handleEmailOTPChange}
              name="otp"
              id="otp"
              placeholder="Enter OTP..."
              className="w-3/4 ml-10 mt-9 h-12 text-2xl rounded-lg"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-fuchsia-500 w-3/4 ml-10 mt-9 h-12 rounded-lg text-center text-1xl font-medium"
            >
              Verify OTP
            </button>

            {seconds <= 59 && seconds > 0 && otpValue == formData.otp && (
              <p className="text-center text-2xl text-red-600">
                Your entered OTP is correct
              </p>
            )}

            {seconds <= 59 && seconds > 0 && otpValue != formData.otp && (
              <p className="text-center text-2xl text-red-600">
                Remaining Time for OTP {seconds}
              </p>
            )}

            {seconds == 0 && (
              <p className="text-center text-2xl text-red-600">
                Try Once Again
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

//flex-grow is related to chidren and size varies according to flex-grow property

export default App;
