'use client'

import { useState } from "react";
import useUsername from '@/hooks/useInput'; // 仮定のパス
import Chat from '@/components/Chat';


export default function Home() {
  const [text, setText] = useState('');
  // const [name, setName] = useState('');
  const username = useUsername(''); // useInput フックの使用

  // 入室ボタンクリック時に、名前入力欄に
  const hundleLoginClick = () => {
    useUsername(text);
  }

  // // 退室
  // const hundleLogoutClick = () => {
  //   setName('');
  // }

  return (
    <body className="overflow-hidden">
      {username
        ?
        <Chat name={username} />
        :
        <main className="flex h-screen min-h-screen max-w-7xl flex-col items-start justify-between gap-3 p-24 m-auto">
          <div className="flex flex-col gap-3 w-full m-auto">
            <input
              type="text"
              className="input input-bordered w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="名前を入力してね"
            />
            <button
              className="btn btn-primary w-full"
              onClick={hundleLoginClick}
            >
              入　室
            </button>
          </div>
        </main>
      }
    </body>
  )
}
