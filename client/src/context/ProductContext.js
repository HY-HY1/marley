import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";


const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []); 


  const contextValue = {
    products,
    fetchProducts, 
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Step 4: Create 
export const useProductContext = () => {
    const context = useContext(ProductContext);
  
    if (!context) {
      throw new Error("useProductContext must be used within a ProductProvider");
    }
  
    return context;
  };