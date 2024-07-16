import React, { useState } from 'react';
import axios from '../AxiosConfig';
import { useMutation } from '@tanstack/react-query'; // Import from @tanstack/react-query if using version 3
import './product.css'; // Import your custom styles

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addProductMutation = useMutation(async (newProduct) => {
    const response = await axios.post('/api/v1/product', newProduct);
    return response.data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        imageURL,
        quantity: parseInt(quantity),
        category
      };

      await addProductMutation.mutateAsync(newProduct);

      // Handle success feedback
      setSuccess(true);
      setName('');
      setDescription('');
      setPrice('');
      setImageURL('');
      setQuantity('');
      setCategory('');
    } catch (error) {
      // Handle error feedback
      setError('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='label'>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input' required />
        </div>
        <div className='form-group'>
          <label className='label'>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea' required />
        </div>
        <div className='form-group'>
          <label className='label'>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='input' required />
        </div>
        <div className='form-group'>
          <label className='label'>Image URL:</label>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className='input' />
        </div>
        <div className='form-group'>
          <label className='label'>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className='input' required />
        </div>
        <div className='form-group'>
          <label className='label'>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className='input' />
          {/* Alternatively, use a select dropdown for categories */}
          {/* <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select a category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
          </select> */}
        </div>
        <button type="submit" disabled={loading} className='button'>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>Product added successfully!</p>}
    </div>
  );
};

export default ProductAdd;
