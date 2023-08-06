import { j as json } from "../../chunks/index.js";
const POST = async ({ request, locals }) => {
  console.log("logging in user");
  const form = {
    success: false,
    error: null,
    admin: null
  };
  const { email, password } = await request.json();
  if (!email || !password) {
    form.error = "Somehow invalid data made it to the server.";
    return json(form);
  }
  const { data, error } = await locals.supabase.auth.signInWithPassword({
    email,
    password
  });
  console.log(data);
  if (error) {
    form.error = "Request failed...";
    return json(form);
  }
  if (data) {
    if (data.user.app_metadata.claims_admin) {
      console.log("that's an admin!");
      form.admin = true;
    } else {
      console.log("that's a user!");
      form.admin = false;
    }
    form.success = true;
    return json(form);
  }
};
export {
  POST
};
