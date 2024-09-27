import React from 'react';
import { Edit } from 'lucide-react';
import EditProduct from './EditProduct';

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">ไม่มีรูปภาพ</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600">ราคา: {product.price} บาท</p>
        <button
          onClick={() => setIsEditing(true)}
          className="mt-2 text-purple-500 hover:text-purple-600 transition duration-300"
        >
          <Edit className="h-5 w-5" />
        </button>
      </div>
      {isEditing && (
        <EditProduct product={product} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ProductCard;