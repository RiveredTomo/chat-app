'use client'

import { fetchDatabaseFive, addSupabaseData } from "@/lib/supabaseMessageFunctions";
import { useState } from "react";

export const AI = () => {

  const [isDisabled, setIsDisabled] = useState("");

  const handleAIClick = async () => {
    setIsDisabled("true");

    // 直近5件のメッセージを取得
    const chatHistory = await fetchDatabaseFive();

    // プロンプトとして渡す形に整形
    const chatList = chatHistory.map(item => `${item.name}：${item.message}`).reverse();
    const userPrompt = chatList.join('\n');

    // APIルートを使用し、Gemineを呼び出す
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 送信するデータ
      body: JSON.stringify({ chatHistory: userPrompt }),
    });
    const data = await response.json();
    console.log(data.text);

    // AIの発言としてDBに追加
    if (data.text !== "") await addSupabaseData({ name: 'AI', message: data.text, is_ai: true });

    await setIsDisabled("");
  }

  return (
    <button
      type="button"
      className="btn btn-accent"
      onClick={handleAIClick}
      disabled={isDisabled ? true : false}
    >
      AI乱入！
    </button>
  )
}