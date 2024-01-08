import supabase, { Database } from "./supabase";

// テーブル名
export const TABLE_NAME = "messages";

// データの全取得
export const fetchDatabase = async () => {
  // 現在の日時を取得
  const now = new Date();
  // 一時間前の時刻を計算
  const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));

  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("created_at")
      .lte("created_at", now.toISOString())
      .gte("created_at", oneHourAgo.toISOString());

    return data;
  } catch (error) {
    console.error(error);
  }
}

type InsertProps = Pick<Database, "name" | "message" | "is_ai">;

// データの追加
export const addSupabaseData = async ({ name, message, is_ai }: InsertProps) => {
  try {
    await supabase.from(TABLE_NAME).insert({ name, message, is_ai });
  } catch (error) {
    console.error(error);
  }
}