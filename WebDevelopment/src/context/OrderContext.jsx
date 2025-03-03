import React, { createContext, useState, useContext } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderMessage, setOrderMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [orderItems, setOrderItems] = useState([]);

  // Show the order message, ensuring only one appears
  const showOrderMessage = (message) => {
    setOrderMessage(message);
    setTimeout(() => {
      setOrderMessage(""); // Hide the message after 3 seconds
    }, 3000);
  };

  // Show error message
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(""); // Hide the error after 3 seconds
    }, 3000);
  };

  // Add item to the order list and show the message
  const addOrderItem = (item) => {
    setOrderItems([...orderItems, item]);
    showOrderMessage("You have added the item to your order list!");
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{ orderMessage, errorMessage, showError, orderItems, addOrderItem, removeFromCart }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
