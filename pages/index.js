'use server';

import Home from '@/components/Home';

export async function getServerSideProps() {
  const res = await fetch(
    'http://o-complex.com:1337/products?page=1&page_size=20'
  );
  const data = await res.json();

  return {
    props: {
      initialProducts: data.items || [],
    },
  };
}

export default function Page({ initialProducts }) {
  return <Home initialProducts={initialProducts} />;
}
