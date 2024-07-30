import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';


const fetchProducts = async ({ queryKey }) => {
    const { page, size, sort, sortBy } = queryKey[1];
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('roles');


    if (!token) {
        throw new Error('No token found');
    }
    else if(role !== "ROLE_USER"){
        throw new Error('Unauthorized');

    }

    try {
        const response = await axios.post(
            'http://localhost:8090/api/v1/pageableList',
            {
                pageNo: page,
                pageSize: size,
                sort: sort.toUpperCase(),
                sortByColumn: sortBy,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Response Data:', response.data); // Log response data for debugging

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response);
        throw new Error('Unauthorized');
    }
};

const ProductList = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const [sort, setSort] = useState('asc');
    const [sortBy, setSortBy] = useState('id');
    

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', { page, size, sort, sortBy }],
        queryFn: fetchProducts,
        keepPreviousData: true,
    });

    const handleSort = (column) => {
      setSortBy(column);
  };

  const handleSortOrder = () => {
      setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'));
  };
 

  
//   const handlePageChange = (direction) => {  
//     if (direction === 'next' && data && !data.last) {  
//         setPage((prevPage) => prevPage + 1);  
//     } else if (direction === 'prev' && page > 0) {  
//         setPage((prevPage) => prevPage - 1);  
//     }  
// };  
const handlePageChange = (newPage) => {  
    setPage(newPage);  
};  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data...</div>;

   
    return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
            <div className="sorting-buttons">
             
             <button onClick={() => handleSort('name')} className={sortBy === 'name' ? `sorted-${sort}` : ''}>
                Sort by Name
            </button>
            <button onClick={() => handleSort('price')} className={sortBy === 'price' ? `sorted-${sort}` : ''}>
                Sort by Price
            </button>
            <button onClick={handleSortOrder}>
                Sort by Order ({sort === 'asc' ? 'Ascending' : 'Descending'})
            </button>
        </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.content.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                       alt={`Image of ${product.name}`}   
                       src={product.imageURL}
                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">  
                <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>  
                    Previous  
                </button>  
                {Array.from({ length: data.totalPages }, (_, i) => (  
                    <button  
                        key={i}  
                        onClick={() => handlePageChange(i)}  
                        className={page === i ? 'active' : ''}  
                    >  
                        {i + 1}  
                    </button>  
                ))}  
                <button disabled={page >= data.totalPages - 1} onClick={() => handlePageChange(page + 1)}>  
                    Next  
                </button>  
            </div>  
        </div>
      )
    }

export default ProductList;
