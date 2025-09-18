import React from 'react';
import { useState } from "react";

    
const Test = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div className="bg-blue-500 h-[400px] w-full">
            <h1>Testc adasdad</h1>

            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-2xl shadow">
      <button
        onClick={() => setCount(count - 1)}
        className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
      >
        -
      </button>

      <span className="text-xl font-bold">{count}</span>

      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
      >
        +
      </button>
    </div>
        </div>
    );
}

export default Test;
