import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders/admin");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      if (error.response?.status === 403) {
        alert("Access denied. Admin only.");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order", error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>Admin Dashboard</h1>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", padding: "40px" }}>No orders yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                padding: "25px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <div>
                  <h3 style={{ margin: 0 }}>Order #{order._id.slice(-6)}</h3>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      padding: "5px 15px",
                      background: order.isDelivered ? "#10b981" : "#f59e0b",
                      color: "white",
                      borderRadius: "5px",
                      display: "inline-block",
                      marginBottom: "10px"
                    }}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    ₹{order.totalPrice}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Items:</strong>
                <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
                  {order.orderItems.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - Qty: {item.qty} × ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Shipping Address:</strong>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Payment:</strong> {order.paymentMethod} - {order.paymentStatus}
              </div>

              {!order.isDelivered && (
                <button
                  onClick={() => updateOrderStatus(order._id, "delivered")}
                  style={{
                    padding: "10px 20px",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
