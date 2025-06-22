import { useEffect, useState } from 'react';

export default function ProductCard({
  product,
  cartItem,
  addToCart,
  updateQty,
  removeItem,
}) {
  const [qty, setQty] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    setQty(cartItem?.quantity || 1);
  }, [cartItem]);

  const handleQtyChange = (val) => {
    const value = Math.max(0, +val || 0);
    setQty(value);

    if (value === 0) {
      removeItem(product.id);
    } else {
      updateQty(product.id, value);
    }
  };

  return (
    <div className='flex flex-col border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white text-black w-full sm:max-w-xs'>
      <img
        src={product.image_url}
        alt={product.title}
        className='w-full h-40 sm:h-48 object-cover rounded-md'
      />
      <h2 className='text-base sm:text-lg font-semibold mt-3 truncate'>
        {product.title}
      </h2>
      <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
        {product.description}
      </p>
      <div className='mt-2 font-bold text-blue-600 text-sm sm:text-base'>
        {product.price} ₽
      </div>

      {!cartItem ? (
        <button
          onClick={() => addToCart(product)}
          className='mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          aria-label='Купить товар'
        >
          Купить
        </button>
      ) : (
        <div className='mt-3 flex items-center gap-2'>
          <button
            onClick={() => handleQtyChange(qty - 1)}
            className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition'
            aria-label='Уменьшить количество'
          >
            −
          </button>
          <input
            type='number'
            value={qty}
            onChange={(e) => handleQtyChange(e.target.value)}
            className='w-16 px-2 py-1 border rounded text-center'
            aria-label='Количество товара'
            min={0}
          />
          <button
            onClick={() => handleQtyChange(qty + 1)}
            className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition'
            aria-label='Увеличить количество'
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
