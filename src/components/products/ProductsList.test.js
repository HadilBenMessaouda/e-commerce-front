// ProductsList.test.js

import { describe, it, expect } from '@jest/globals'; // Ensure Jest functions are imported
import { render, screen } from '@testing-library/react';
import ProductsList from './ProductsList';
import axios from 'axios';

jest.mock('axios');

describe('ProductsList Component', () => {
  it('renders product list', async () => {
    axios.get.mockResolvedValue({
      data: [{ product_id: 1, name: 'Product 1', description: 'Description 1', price: 10 }]
    });

    render(<ProductsList />);

    const productListItems = await screen.findAllByRole('listitem');
    expect(productListItems.length).toBe(1);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
  });
});
