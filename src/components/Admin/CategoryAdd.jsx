import  { useState } from 'react';
import axios from '../../AxiosConfig';
import { useMutation } from '@tanstack/react-query'; // Import from @tanstack/react-query if using version 3
import './index.css'; // Import your custom styles

const CategoryAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addCategoryMutation = useMutation(async (newCategory) => {
    const response = await axios.post('/api/v1/category', newCategory);
    return response.data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newCategory = {
        name,
        description
      };

      await addCategoryMutation.mutateAsync(newCategory);

      // Handle success feedback
      setSuccess(true);
      setName('');
      setDescription('');
    } catch (error) {
      // Handle error feedback
      setError('Error adding category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='label'>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input' required />
        </div>
        <div className='form-group'>
          <label className='label'>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='input' required />
        </div>
        <button type="submit" disabled={loading} className='button'>
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>Category added successfully!</p>}
    </div>
  );
};

export default CategoryAdd;
