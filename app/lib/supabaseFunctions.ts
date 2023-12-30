import supabase, { Database } from "./supabase";

// テーブル名
export const TABLE_NAME = "messages";

// データの全取得
export const fetchDatabase = async () => {
  try {
    const { data } = await supabase.from(TABLE_NAME).select("*").order("created_at");
    return data;
  } catch (error) {
    console.error(error);
  }
};

type InsertProps = Pick<Database, "message" | "name" | "created_at" | "is_ai">;

// データの追加
export const addSupabaseData = async ({ message, name, is_ai }: InsertProps) => {
  try {
    await supabase.from(TABLE_NAME).insert({ message, name, is_ai });
  } catch (error) {
    console.error(error);
  }
};