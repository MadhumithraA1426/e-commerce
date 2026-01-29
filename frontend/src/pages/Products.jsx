import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "../api/axios";

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const categories = ["all", "headphones", "smartwatch", "speakers", "mobiles", "laptops"];

  useEffect(() => {
    setSelectedCategory(category || "all");
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory === "all" 
          ? "/products" 
          : `/products?category=${selectedCategory}`;
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", textAlign: "center" }}>
        {selectedCategory === "all" ? "All Products" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>

      {/* Category Filter */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        marginBottom: "30px", 
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 20px",
              border: "2px solid #667eea",
              background: selectedCategory === cat ? "#667eea" : "white",
              color: selectedCategory === cat ? "white" : "#667eea",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              textTransform: "capitalize"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading products...
        </h2>
      ) : (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <h3 style={{ textAlign: "center", width: "100%" }}>
              No products available in this category
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
