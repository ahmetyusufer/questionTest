import supabase from "./supabase";

export async function getLeadered() {
  let { data, error } = await supabase.from("leaderedTable").select("*");
  if (error) {
    console.log(error);
    throw new Error("Veriler çekilirken bir hata oluştu.");
  }
  return data;
}

export async function createLeadered({ name, score }) {
  const { data, error } = await supabase
    .from("leaderedTable")
    .insert([{ name, score }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Veri eklenirken bir hata oluştu.");
  }
  return data;
}
