export function ReviewSkeleton() {
  return (
    <div className='flex w-full sm:w-[468px] bg-[#D9D9D9] rounded-xl p-4 animate-pulse space-x-4'>
      <div className='w-12 h-12 rounded-full bg-gray-300' />
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-between text-sm text-gray-400'>
          <div className='h-4 w-24 bg-gray-300 rounded' />
          <div className='h-4 w-16 bg-gray-300 rounded' />
        </div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-300 rounded w-full' />
          <div className='h-4 bg-gray-300 rounded w-3/4' />
        </div>
      </div>
    </div>
  );
}
