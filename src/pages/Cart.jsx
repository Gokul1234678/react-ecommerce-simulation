import React, { useEffect, useState } from "react";
import "../assets/style/cart.css";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // ✅ Get user info

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove item from cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) return;

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      userEmail: user?.email || "Guest",
      items: cart, // ✅ correct variable
      total: total, // ✅ store total for admin view
      status: "On Process",
    };

    localStorage.setItem("orders", JSON.stringify([...previousOrders, newOrder]));

    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">No items in cart.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-img" />
                <div className="cart-details">
                  <h4>{item.title}</h4>
                  <p className="price">₹{item.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
