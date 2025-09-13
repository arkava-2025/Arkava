import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-medium">Contadorsas: {count}</p>

      <button
        className="px-4 py-2 bg-primary text-red-500 bg-green-800 rounded-xl hover:opacity-80 transition"
        onClick={() => setCount(count + 1)}
      >
        Sumar
      </button>
    </div>
  );
}
