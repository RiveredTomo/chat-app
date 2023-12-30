import { Database } from "@/lib/supabase";
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions";
import supabase from "@/lib/supabase";

// リアルタイムデータ更新
const fetchRealtimeData = () => {
  try {
    supabase
      .channel("table_postgres_changes") // 任意のチャンネル名
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
            const { id, message, name, is_ai } = payload.new;
            setMessageText((messageText) => [...messageText, { id, message, name, is_ai }]);
          }
        }
      )
      .subscribe();

    // リスナーの解除
    return () => supabase.channel("table_postgres_changes").unsubscribe();
  } catch (error) {
    console.error(error);
  }
};