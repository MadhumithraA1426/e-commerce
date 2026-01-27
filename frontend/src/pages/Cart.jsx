import { Link } from "react-router-dom";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
        </div>
      ))}
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
