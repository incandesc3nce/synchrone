'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [link, setLink] = useState('./sign-up');

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <nav>
        <ul className="flex justify-center gap-4 mt-4">
          <li>
            <button
              onClick={() => setLink('./sign-up')}
              className={`text-lg cursor-pointer p-2 rounded-lg ${
                link === './sign-up' ? 'bg-blue-800 font-bold' : 'text-gray-500'
              }`}>
              Регистрация
            </button>
          </li>
          <li>
            <button
              onClick={() => setLink('./login')}
              className={`text-lg cursor-pointer p-2 rounded-lg ${link === './login' ? 'bg-blue-800 font-bold' : 'text-gray-500'}`}>
              Вход
            </button>
          </li>
        </ul>
      </nav>
      
      <iframe src={link} className="size-1/2" />
    </main>
  );
}
