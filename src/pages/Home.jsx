import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../assets/style/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch products
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filteredData = products.filter((item) =>
      item.title.toLowerCase().includes(query)
    // The .includes() method checks if the string contains the given substring.
    // "iphone 14".includes("ip") // true
    // "iphone 14".includes("sam") // false

    );
    setFiltered(filteredData);
  };

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    let sorted = [...filtered];

    if (order === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);//ascending
    } 
    else if (order === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);//descending
    } 
    else {
      sorted = [...products]; // reset
    }

    setFiltered(sorted);
  };

  return (
    <div className="home-container">
      <h2 className="home-heading">🛍️ Product Collection</h2>

      {/* Search & Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search product..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />

        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
