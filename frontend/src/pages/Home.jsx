import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "Headphones", icon: "🎧", path: "/products/headphones" },
  { name: "Smartwatch", icon: "⌚", path: "/products/smartwatch" },
  { name: "Speakers", icon: "🔊", path: "/products/speakers" },
  { name: "Mobiles", icon: "📱", path: "/products/mobiles" },
  { name: "Laptops", icon: "💻", path: "/products/laptops" }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get("/products?limit=6");
        setFeaturedProducts(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "60px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "15px", color: "white", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "15px" }}>
          🛍️ GadgetHub
        </h1>
        <p style={{ fontSize: "1.3rem", opacity: 0.9 }}>
          Your One-Stop Shop for Premium Gadgets
        </p>
      </div>

      {/* Categories Section */}
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>
          Shop by Category
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.2s",
                display: "block"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
                {category.icon}
              </div>
              <h3 style={{ margin: 0, color: "#333" }}>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>
          Featured Products
        </h2>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No products available</p>
        )}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link
            to="/products"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              background: "#667eea",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "1.1rem"
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
