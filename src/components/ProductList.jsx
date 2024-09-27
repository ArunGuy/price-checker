import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllProducts } from '../utils/productStore';
import ProductCard from './ProductCard';

const ProductList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getAllProducts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length;
    },
  });

  if (status === 'loading') {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>;
  }

  if (status === 'error') {
    return <div className="text-center py-4 text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            {isFetchingNextPage ? 'กำลังโหลด...' : 'โหลดเพิ่มเติม'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;