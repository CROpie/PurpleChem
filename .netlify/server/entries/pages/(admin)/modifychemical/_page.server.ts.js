const load = async ({ locals: { supabase } }) => {
  const { data: chemicalList } = await supabase.from("chemicals").select("id, chemicalName, CAS, MW, MP, BP, density");
  return { chemicalList };
};
export {
  load
};
