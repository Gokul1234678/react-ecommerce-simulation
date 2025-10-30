import React from "react";
import "../assets/style/home.css"; // Use the same CSS as Home

const ProductCard = ({ product }) => {
  const outOfStock = product.rating.count === 0;
  // The count field means how many people rated the product, but since FakeStoreAPI doesn’t have a stock property,
  // we’re treating rating.count as stock quantity.
  // So:
  // If rating.count === 0, that means no stock left.
  // We store that in a variable outOfStock (true/false).


  // Add to cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      alert("🛒 Product already in cart!");
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Added to cart!");
    }
  };



  const addToWishlist = (product) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.find((item) => item.id === product.id);
  if (exists) {
    alert("Already in wishlist!");
    return;
  }
  localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
  alert("Added to wishlist!");
};

  return (
    <div className="product-card" key={product.id}>
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        {outOfStock && <span className="out-badge">Out of Stock</span>}
      </div>
      <h5 className="product-title">{product.title}</h5>
      <p className="product-price">${product.price}</p>
      <div className="button-group">
        <button onClick={handleAddToCart} className="btn add" disabled={outOfStock}>
          Add to Cart
        </button>
        <button onClick={() => addToWishlist(product)} className="btn wish" disabled={outOfStock} >
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
