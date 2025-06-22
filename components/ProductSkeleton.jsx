export default function ProductSkeleton() {
  return (
    <div className='animate-pulse border rounded-lg p-4 bg-white text-black shadow-sm'>
      <div className='w-full h-48 bg-gray-300 rounded' />
      <div className='h-5 bg-gray-300 mt-4 rounded w-3/4' />
      <div className='h-4 bg-gray-200 mt-2 rounded w-full' />
      <div className='h-4 bg-gray-200 mt-2 rounded w-5/6' />
      <div className='h-6 bg-gray-300 mt-4 rounded w-1/3' />
      <div className='h-10 bg-gray-300 mt-3 rounded w-full' />
    </div>
  );
}
