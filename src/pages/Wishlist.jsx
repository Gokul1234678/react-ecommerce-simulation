import React, { useEffect, useState } from "react";
import "../assets/style/wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Remove item from wishlist
  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Move item to cart
  const handleMoveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // remove from wishlist
    const updatedWishlist = wishlist.filter((w) => w.id !== item.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    alert("✅ Moved to cart!");
  };

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">❤️ Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty-wishlist">No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} className="wishlist-img" />
              <h4 className="wishlist-name">{item.title}</h4>
              <p className="wishlist-price">₹{item.price}</p>

              <div className="wishlist-actions">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="move-btn"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
