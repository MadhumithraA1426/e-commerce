const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ₹{item.price}
        </div>
      ))}
    </div>
  );
};

export default Cart;
