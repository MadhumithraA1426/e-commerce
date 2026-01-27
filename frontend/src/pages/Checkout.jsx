import API from "../services/api";

const Checkout = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const placeOrder = async () => {
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

    await API.post("/orders", {
      orderItems: cart,
      shippingAddress: {
        address: "Demo Address",
        city: "Chennai",
        postalCode: "600001",
        country: "India"
      },
      paymentMethod: "Cash on Delivery",
      totalPrice
    });

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
  };

  return <button onClick={placeOrder}>Place Order</button>;
};

export default Checkout;
