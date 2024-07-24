import  { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig'; // Import your axios instance
import './product.css'; // Import the CSS file

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                name,
                description,
                price,
                imageURL,
                quantity,
                category: categoryId // Include the category name
            };

            // Send the POST request with the token
            const response = await axiosInstance.post('/api/v1/product', productData);

            console.log('Product added:', response.data);
            setSuccessMessage('Product added successfully!');
            setErrorMessage('Error adding product');

            // Clear form fields after successful submission
            setName('');
            setDescription('');
            setPrice(0);
            setImageURL('');
            setQuantity(0);
            setCategoryId('');

        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="textarea"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="label">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Image URL:</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Category:</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="input"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button">Add Product</button>
            </form>
            {successMessage && <div className="success">{successMessage}</div>}
            {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
    );
};

export default ProductAdd;
