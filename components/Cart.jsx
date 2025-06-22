import { useEffect, useState } from 'react';
import Popup from './Popup';

export default function Cart({ cart, setCart, removeItem, products }) {
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem('phone');
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('phone', phone);
  }, [cart, phone]);

  const handleOrder = async () => {
    if (phone.replace(/\D/g, '').length !== 11) {
      setError('Введите корректный номер телефона');
      return;
    }

    if (!cart.length) {
      setError('Корзина пуста');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://o-complex.com:1337/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, cart }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setCart([]);
        setPhone('');
        localStorage.removeItem('cart');
        localStorage.removeItem('phone');
      } else {
        setError(data.error || 'Ошибка при заказе');
      }
    } catch (e) {
      setError('Сервер не отвечает');
    } finally {
      setLoading(false);
    }
  };
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div
      className='bg-[#D9D9D9] text-black p-4 rounded-md shadow-md max-w-xl mx-auto'
      id='cart'
    >
      <h3 className='text-lg font-bold mb-4'>Корзина</h3>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className='space-y-3'>
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return (
              <li
                key={item.id}
                className='flex items-center justify-between gap-4'
              >
                <div className='flex w-full'>
                  <span className='font-medium'>
                    {product?.title || `Товар #${item.id}`} — {item.quantity}{' '}
                    шт.
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className='text-red-500 ml-auto cursor-pointer'
                  >
                    Удалить
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {cart.length > 0 && (
        <div className='mt-4 font-semibold text-right text-lg'>
          Итого: {totalPrice} ₽
        </div>
      )}

      <div className='mt-4'>
        <input
          type='tel'
          className='w-full px-3 py-2 rounded text-black'
          placeholder='+7 (___) ___-__-__'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {error && <p className='text-red-500 mt-2'>{error}</p>}

      <button
        onClick={handleOrder}
        disabled={loading}
        className='mt-4 w-full bg-[#222222] text-white py-2 rounded hover:bg-[#393939] cursor-pointer disabled:opacity-50'
      >
        {loading ? 'Оформляем...' : 'Заказать'}
      </button>

      {success && (
        <Popup
          message='Заказ успешно отправлен!'
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  );
}
