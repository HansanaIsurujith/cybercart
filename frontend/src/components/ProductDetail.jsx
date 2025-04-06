import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.Products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-header">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="rating">Rating: {product.ratings}/5</p>
        </div>
      </div>
      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-specs">
        <h3>Specifications</h3>
        <ul>
          <li><strong>Category:</strong> {product.category}</li>
          <li><strong>Weight:</strong> {product.specifications.weight}</li>
          <li><strong>Dimensions:</strong> {product.specifications.dimensions}</li>
          <li><strong>Color:</strong> {product.specifications.color}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;