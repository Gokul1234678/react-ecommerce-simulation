import React, { useEffect, useState } from "react";
import "../assets/style/orders.css";

const Orders = ({ isAdmin = false }) => {
  const [orders, setOrders] = useState([]);

  // Load all orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    console.log(storedOrders);
    
  }, []);

  // Update order status (only for admin)
  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Order History</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4>🧾 Order ID: {order.id}</h4>
              <p className="order-date">Date: {order.date}</p>
              <p className="order-status">
                <strong>Status:</strong>{" "}
                {isAdmin ? (
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option>On Process</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                ) : (
                  <span
                    className={`status-label ${(order.status || "On Process").toLowerCase().replace(" ", "-")
                      }`}
                  >
                    {order.status || "On Process"}
                  </span>

                )}
              </p>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="order-img"
                    />
                    <div>
                      <h5>{item.title}</h5>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
