import { useEffect, useState } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const items = JSON.parse(localStorage.getItem('cart')) || [];
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const scrollToCart = () => {
    const el = document.getElementById('cart');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className='  p-4 md:p-6 bg-[#777777] text-white text-center text-2xl font-bold rounded-md'>
      тестовое задание
    </header>
  );
}
