import supabase, { Database } from "./supabase";

// テーブル名
export const TABLE_NAME = "messages";

// データの全取得
export const fetchDatabase = async () => {
  try {
    const { data } = await supabase.from(TABLE_NAME).select("*").order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.error(error);
  }
};

type InsertProps = Pick<Database, "name" | "message" | "is_ai">;

// データの追加
export const addSupabaseData = async ({ name, message, is_ai }: InsertProps) => {
  try {
    await supabase.from(TABLE_NAME).insert({ name, message, is_ai });
  } catch (error) {
    console.error(error);
  }
};