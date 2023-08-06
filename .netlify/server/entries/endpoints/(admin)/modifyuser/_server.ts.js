import { j as json } from "../../../../chunks/index.js";
const PUT = async ({ request, locals }) => {
  const form = {
    success: false,
    error: ""
  };
  const { user } = await request.json();
  if (!user) {
    form.error = "Request did not contain the required information.";
    return json(form, { status: 400 });
  }
  const { error } = await locals.supabase.from("profiles").update({
    username: user.username
  }).eq("id", user.id);
  if (error) {
    console.log("error", error);
    form.error = "Could not complete the request.";
    return json(form, { status: 400 });
  }
  form.success = true;
  return json(form);
};
export {
  PUT
};
