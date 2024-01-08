'use client'

import { useState } from 'react';
import Chat from '@/components/Chat';

export default function Username() {

  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  // 入室
  const hundleLoginClick = () => {
    setUsername(input);
  }

  // 退室
  const hundleLogoutClick = () => {
    setUsername('');
  }

  if (username) {
    return (
      <main>
        <div className='absolute bg-primary w-full text-center'>
          <div className='flex items-center justify-between max-w-7xl p-3 m-auto'>
            <span className='font-bold text-lg'>
              こんにちは、{username} さん
            </span>
            <button
              className="btn btn-error"
              onClick={hundleLogoutClick}
            >
              退　室
            </button>
          </div>
        </div>
        <Chat name={username} />
      </main>
    );

  } else {
    return (
      <main className="w-full h-screen m-auto max-w-7xl flex flex-col justify-center gap-3">
        <div className='text-center text-4xl font-black mb-32'>
          AI乱入チャット
        </div>
        <input
          type="text"
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="名前を入力してね"
        />
        <button
          className="btn btn-primary w-full"
          onClick={hundleLoginClick}
        >
          入　室
        </button>
      </main>
    )
  }
}