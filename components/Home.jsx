'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Review from './Review';
import { ReviewSkeleton } from './ReviewSkeleton';
import Cart from './Cart';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

export default function Home({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState([]);

  const observer = useRef(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('http://o-complex.com:1337/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const loadProducts = async (pageNum) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await fetch(
      `http://o-complex.com:1337/products?page=${pageNum}&page_size=20`
    );
    const data = await res.json();

    setProducts((prev) => {
      const combined = [...prev, ...data.items];
      const uniqueMap = new Map();
      combined.forEach((item) => uniqueMap.set(item.id, item));
      return Array.from(uniqueMap.values());
    });
    if (data.items.length < 20) setHasMore(false);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, quantity: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='min-h-screen bg-[#222222] text-white p-4'>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      {/* Отзывы */}
      <section className='my-8 max-w-5xl mx-auto'>
        <h3 className='text-xl mb-4 font-semibold'>Отзывы</h3>
        <div className='flex flex-wrap gap-4'>
          {reviews.length === 0
            ? [...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)
            : reviews.map((r, i) => (
                <Review key={`${r.id}-${i}`} html={r.text} />
              ))}
        </div>
      </section>

      <section>
        <Cart
          cart={cart}
          setCart={setCart}
          updateQty={updateQty}
          removeItem={removeItem}
          products={products}
        />
      </section>

      <section className='my-8 max-w-5xl mx-auto'>
        <h3 className='text-xl mb-4 font-semibold'>Товары</h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.length === 0 && loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((product, index) => {
                const isLast = index === products.length - 1;
                const cartItem = cart.find((item) => item.id === product.id);
                return (
                  <div
                    key={`product-${product.id}-${index}`}
                    ref={isLast ? lastProductRef : null}
                  >
                    <ProductCard
                      product={product}
                      cartItem={cartItem}
                      addToCart={addToCart}
                      updateQty={updateQty}
                      removeItem={removeItem}
                    />
                  </div>
                );
              })}
        </div>

        {loading && products.length > 0 && (
          <p className='text-center text-gray-400 mt-4'>Загрузка...</p>
        )}
      </section>
    </div>
  );
}
