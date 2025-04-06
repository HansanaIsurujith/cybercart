import React, { useState, useEffect } from 'react';
import { compareProducts, getAllProductNames } from '../api';

const ComparisonTool = () => {
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [products, setProducts] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const response = await getAllProductNames();
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchProductNames();
  }, []);

  const handleCompare = async () => {
    if (!product1 || !product2) {
      alert('Please select two products to compare');
      return;
    }

    setLoading(true);
    try {
      const response = await compareProducts(product1, product2);
      setComparisonResult(response.data);
    } catch (error) {
      console.error('Error comparing products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comparison-tool">
      <h2>Compare Products</h2>
      <div className="comparison-form">
        <div className="form-group">
          <label>Product 1:</label>
          <select
            value={product1}
            onChange={(e) => setProduct1(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Product 2:</label>
          <select
            value={product2}
            onChange={(e) => setProduct2(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleCompare} disabled={loading}>
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </div>

      {comparisonResult && (
        <div className="comparison-result">
          <h3>Comparison Results</h3>
          <div className="result-grid">
            <div className="product-result">
              <h4>{comparisonResult.product1.name}</h4>
              <p>Score: {comparisonResult.product1.score}</p>
            </div>
            <div className="vs">VS</div>
            <div className="product-result">
              <h4>{comparisonResult.product2.name}</h4>
              <p>Score: {comparisonResult.product2.score}</p>
            </div>
          </div>
          <div className="winner">
            <h3>Winner: {comparisonResult.winner}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;