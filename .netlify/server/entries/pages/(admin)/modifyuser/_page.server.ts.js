const load = async ({ locals: { supabase } }) => {
  const { data: usersList } = await supabase.from("profiles").select("id, username, full_name");
  return { usersList };
};
export {
  load
};
