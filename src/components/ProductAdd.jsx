import { useState } from 'react';
import axios from '../AxiosConfig'; // Import the configured Axios instance
import { useMutation } from 'react-query';
import NavAdmin from './NavAdmin';

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [quantity, setQuantity] = useState('');
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
                category: {} // Handle category selection appropriately
            };

            await addProductMutation.mutateAsync(newProduct);

            // Handle success feedback
            setSuccess(true);
            setName('');
            setDescription('');
            setPrice('');
            setImageURL('');
            setQuantity('');
        } catch (error) {
            // Handle error feedback
            setError('Error adding product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavAdmin />
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Product added successfully!</p>}
        </div>
    );
};

export default ProductAdd;
