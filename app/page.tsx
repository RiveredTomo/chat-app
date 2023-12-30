'use client'

import { useState } from "react";
import Test from '@/components/Test';


export default function Home() {
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');

  // 入室ボタンクリック時に、名前入力欄に
  const hundleLoginClick = () => {
    setInputName(name);
  }

  return (
    <body
      className="overflow-hidden"
    >
      <main
        className="flex h-screen min-h-screen max-w-7xl flex-col items-start justify-between gap-3 p-24 m-auto"
      >
        {inputName
          ?
          <Test name={inputName} />
          :
          <div
            className="flex flex-col gap-3 w-full m-auto"
          >
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力してね"
            />
            <button
              className="btn btn-primary w-full"
              onClick={hundleLoginClick}
            >
              入　室
            </button>
          </div>
        }
      </main>
    </body>
  )


  // return (
  //   <body
  //     className="overflow-hidden"
  //   >

  //     <main className="flex h-screen min-h-screen max-w-7xl flex-col items-start justify-between gap-3 p-24 m-auto">
  //       {/* タイムライン */}
  //       <div
  //         className="space-y-5 h-full w-full max-w-full overflow-y-auto"
  //       >

  //         <div
  //           className="w-fit"
  //         >
  //           <div
  //             className="bg-primary p-3 rounded-lg"
  //           >
  //             <p
  //               className="font-bold"
  //             >Name:
  //             </p>
  //             <p
  //               className="ps-3"
  //             >
  //               メッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージ
  //             </p>
  //           </div>
  //           <p
  //             className="text-right"
  //           >yyyy-mm-dd hh:mm:ss
  //           </p>
  //         </div>

  //       </div>
  //       {/* 入力エリア */}
  //       <div
  //         className="flex gap-3 w-full"
  //       >
  //         <input type="text"
  //           className="input input-bordered"
  //           placeholder="Your Name"
  //         />
  //         <div
  //           className="join w-full"
  //         >
  //           <input
  //             type="text"
  //             className="input input-bordered join-item w-full"
  //             placeholder="Input Message..."
  //           />
  //           <button
  //             className='btn btn-primary join-item'
  //           >投稿
  //           </button>
  //         </div>
  //         <button
  //           className="btn btn-secondary"
  //         >
  //           なんかボタン
  //         </button>
  //       </div>
  //     </main>
  //   </body>
  // )
}
