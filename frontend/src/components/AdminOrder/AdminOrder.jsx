import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrder.css"
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/order/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/order/orders${orderId}`, { status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="admin-order-container">
        <AdminTopBar/>
      <h2>Admin Order Management</h2>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading orders...</p> : orders.length === 0 ? <p>No orders available.</p> : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total (KES)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} x {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.total}</td>
                <td>{order.status || "Pending"}</td>
                <td>
                  <select onChange={(e) => updateOrderStatus(order._id, e.target.value)} defaultValue={order.status || "Pending"}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
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

export default AdminOrder;
