'use client'

import { Database } from "@/lib/supabase";
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { format } from 'date-fns';

type Props = {
  name: string
}

export default function Chat({ name }: Props) {
  const [inputText, setInputText] = useState(""); // 入力テキスト
  const [messageText, setMessageText] = useState<Database[]>([]); // メッセージ

  // リアルタイムデータ更新
  const fetchRealtimeData = () => {
    try {
      supabase
        .channel("messages") // 任意のチャンネル名
        .on(
          "postgres_changes", // ここは固定
          {
            event: "*", // "INSERT" | "DELETE" | "UPDATE"  条件指定が可能
            schema: "public",
            table: TABLE_NAME, // DBのテーブル名
          },
          (payload) => {
            // データ登録
            if (payload.eventType === "INSERT") {
              const { id, name, message, created_at, is_ai } = payload.new;
              setMessageText((messageText) => [...messageText, { id, name, message, created_at, is_ai }]);
            }
          }
        )
        .subscribe();

      // リスナーの解除
      return () => supabase.channel("messages").unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  // 初回のみ全データフェッチとリアルタイムリスナー登録
  useEffect(() => {
    (async () => {
      const allMessage = await fetchDatabase();
      setMessageText(allMessage as Database[]); // '{ [x: string]: any; }[] | null'
    })();
    fetchRealtimeData();
  }, []);

  // 入力したメッセージ
  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => setInputText(() => event.target.value);

  // メッセージの送信
  const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    addSupabaseData({ name: name, message: inputText, is_ai: false }); // DBに追加
    setInputText("");
  };

  const hundleLogoutClick = () =>{

  }


  return (
    <main className="flex h-screen min-h-screen max-w-7xl flex-col items-start justify-between gap-3 p-24 m-auto">
      {/* タイムライン */}
      <div className="space-y-5 h-full w-full max-w-full overflow-y-auto" >

        {messageText.map((item) => (
          <div className="w-fit" key={item.id} data-user-id={item.name}>
            <div className="bg-primary p-3 rounded-lg">
              <p className="font-bold">{item.name ? item.name : "名無し"}:</p>
              <p className="ps-3">{item.message}</p>
            </div>
            <p className="text-right">{format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')}</p>
          </div>
        ))}

      </div>
      {/* 入力エリア */}
      <form
        className="flex gap-3 w-full"
        onSubmit={onSubmitNewMessage}
      >
        <button
          className="btn btn-secondary"
          onClick={hundleLogoutClick}
        >
          退　室
        </button>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          placeholder="Your Name"
          value={name}
          readOnly
        />
        <div className="join w-full">
          <input
            type="text"
            name="message"
            className="input input-bordered join-item w-full"
            placeholder="メッセージを入れてね"
            value={inputText}
            onChange={onChangeInputText}
          />
          <button
            className='btn btn-primary join-item'
            disabled={inputText === ""}
          >
            投　稿
          </button>
        </div>
      </form>
    </main>
  )
}