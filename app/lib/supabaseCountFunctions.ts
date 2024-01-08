import supabase, { Database } from "./supabaseCount";

// テーブル名
export const TABLE_NAME = "counts";

// データの全取得
export const fetchCount = async () => {

  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("count")
      .order("created_at", { ascending: false });

    if (data) {
      return data;
    } else {
      // カラムが無ければ作成
      try {
        await supabase
          .from(TABLE_NAME)
          .insert({ count: 0 });
      } catch (error) {
        console.error(error);
      }
      return 0;
    }

  } catch (error) {
    console.error(error);
  }
}

// データの追加
export const incrementCount = async () => {
  try {
    await supabase
      .from(TABLE_NAME)
      .update({ count: 'count + 1' });
  } catch (error) {
    console.error(error);
  }
}