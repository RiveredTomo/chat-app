import { Database } from "@/lib/supabaseMessage";
import { fetchDatabaseFive, addSupabaseData } from "@/lib/supabaseMessageFunctions";

export const callAI = async () => {
  // DB登録処理のため1秒待機
  await waitOneSecond();
  // 直近5件のメッセージを取得
  const chatHistory = await fetchDatabaseFive();

  // プロンプトとして渡す形に整形
  const chatList = (chatHistory as Database[]).map(item => `${item.name}：${item.message}`).reverse(); // SQLの都合上降順なのでreverseで昇順にする
  const userPrompt = chatList.join('\n');

  console.log(userPrompt);

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
}

function waitOneSecond() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('1秒経過しました');
    }, 1000);
  });
}