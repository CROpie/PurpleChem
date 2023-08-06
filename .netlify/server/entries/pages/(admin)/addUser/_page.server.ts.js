import { f as fail } from "../../../../chunks/index.js";
const actions = {
  addUser: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { formData, missing: true });
    }
    const username = String(formData.get("username"));
    const email = String(formData.get("email"));
    const { data, error } = await event.locals.supabase.auth.signUp({
      email,
      password: "default"
    });
    if (error) {
      console.log(error);
      return;
    }
    const { error: error2 } = await event.locals.supabase.from("profiles").update({
      username,
      full_name: email
    }).eq("id", data.user.id);
    if (error2) {
      console.log(error2);
      return fail(400, { error2: true });
    }
    console.log("success");
    return { success: true };
  }
};
export {
  actions
};
