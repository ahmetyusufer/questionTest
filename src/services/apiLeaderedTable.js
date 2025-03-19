import supabase from "./supabase";

const tableName = "YOUR_SUPABASE_TABLE_NAME"

export async function getLeadered() {
  let { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.log(error);
    throw new Error("Veriler çekilirken bir hata oluştu.");
  }
  return data;
}

export async function createLeadered({ name, score }) {
  const { data, error } = await supabase
    .from(tableName)
    .insert([{ name, score }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Veri eklenirken bir hata oluştu.");
  }
  return data;
}
