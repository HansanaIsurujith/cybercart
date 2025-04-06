import React, { useState } from 'react';
import { createProduct } from '../api';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    specifications: {
      weight: '',
      dimensions: '',
      color: ''
    },
    ratings: 0,
    image: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('specifications.')) {
      const specField = name.split('.')[1];
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        specifications: {
          weight: '',
          dimensions: '',
          color: ''
        },
        ratings: 0,
        image: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      {success && <div className="success-message">Product created successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Specifications</h3>
        <div className="form-group">
          <label>Weight:</label>
          <input
            type="text"
            name="specifications.weight"
            value={formData.specifications.weight}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dimensions:</label>
          <input
            type="text"
            name="specifications.dimensions"
            value={formData.specifications.dimensions}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="specifications.color"
            value={formData.specifications.color}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;