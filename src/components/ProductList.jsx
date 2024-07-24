import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './ProductList.css'; // Import the CSS file

const fetchProducts = async ({ queryKey }) => {
    const { page, size, sort, sortBy } = queryKey[1];
    const token = localStorage.getItem('refreshToken');

    if (!token) {
        throw new Error('No token found');
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
    const [size, setSize] = useState(10);
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
        <div>
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
            <table>
               
                <tbody>
                    {data.content.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            {/* <td>{product.imageURL}</td> */}
                            <td>  
  <img   
    src={product.imageURL}   
    alt={`Image of ${product.name}`}   
    className="table-image"   
  />  
</td>  

                            <td>{product.category.name}</td>



                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="pagination">  
                <button disabled={page === 0} onClick={() => handlePageChange('prev')}>  
                    Previous  
                </button>  
                <span>Page {page + 1}</span>  
                <button disabled={data.last} onClick={() => handlePageChange('next')}>  
                    Next  
                </button>  
            </div>   */}
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

            <div className="page-size-selector">
                <label>
                    Page Size:
                    <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default ProductList;
