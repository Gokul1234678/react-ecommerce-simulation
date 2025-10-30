import React, { useEffect, useState } from "react";
import "../assets/style/admin.css";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Panel — Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders available.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Total Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.userEmail || "Unknown"}</td>
                <td>
                  ₹
                  {order.items
                    ?.reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </td>
                <td>
                  <select
                    value={order.status || "On Process"}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option>On Process</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
