import { sanitizeHtml } from '@/utils/sanitizeHtml';

export default function Review({ html }) {
  return (
    <div className='flex w-full sm:w-[468px] bg-[#D9D9D9] text-black rounded-xl shadow-md p-4 space-x-4'>
      <div className='w-12 h-12 rounded-full bg-gray-400 flex-shrink-0 flex items-center justify-center text-white font-semibold'>
        🙂
      </div>

      <div className='flex flex-col space-y-2'>
        <div className='flex justify-between text-sm text-gray-600'>
          <span>Имя пользователя</span>
          <span>Сегодня</span>
        </div>

        <div
          className='prose prose-sm max-w-none text-black'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
      </div>
    </div>
  );
}
