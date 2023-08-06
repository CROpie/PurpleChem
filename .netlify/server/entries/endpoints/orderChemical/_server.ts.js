import { j as json } from "../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const { CAS } = await request.json();
  const { data: chemical, error } = await locals.supabase.from("chemicals").select().eq("CAS", CAS).maybeSingle();
  if (error) {
    console.log("error", error);
    return json({ chemical: null });
  }
  return json({ chemical });
};
export {
  POST
};
