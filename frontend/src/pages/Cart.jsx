import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert("Please fill in all shipping details");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        product: item._id
      }));

      await axios.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod: "Cash on Delivery",
        totalPrice
      });

      alert("Order placed successfully! You will receive a confirmation soon.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Your Cart</h2>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        {/* Cart Items */}
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                marginBottom: "15px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  padding: "8px 15px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div>
          <div
            style={{
              padding: "25px",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              position: "sticky",
              top: "20px"
            }}
          >
            <h3 style={{ marginTop: 0 }}>Shipping Details</h3>
            <input
              type="text"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, address: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
            />
            <input
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
            />

            <div
              style={{
                padding: "15px",
                background: "#f5f5f5",
                borderRadius: "5px",
                marginBottom: "20px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px"
                }}
              >
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px"
                }}
              >
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr style={{ margin: "10px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: "bold"
                }}
              >
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div
              style={{
                padding: "15px",
                background: "#e0f2fe",
                borderRadius: "5px",
                marginBottom: "20px",
                fontSize: "0.9rem"
              }}
            >
              <strong>Payment Method:</strong> Cash on Delivery (COD)
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              style={{
                width: "100%",
                padding: "15px",
                background: isPlacingOrder ? "#ccc" : "#667eea",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isPlacingOrder ? "not-allowed" : "pointer",
                fontSize: "1.1rem",
                fontWeight: "bold"
              }}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
