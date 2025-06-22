export default function Popup({ message, onClose }) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white text-black p-6 rounded shadow-md max-w-sm w-full text-center'>
        <p className='mb-4'>{message}</p>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
