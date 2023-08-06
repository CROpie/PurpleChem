import { r as redirect } from "../../chunks/index.js";
const actions = {
  setTheme: async ({ url, cookies }) => {
    const themeld = url.searchParams.get("themeld");
    const themeco = url.searchParams.get("themeco");
    const theme = `${themeld} ${themeco}`;
    const redirectTo = url.searchParams.get("redirectTo");
    if (theme) {
      cookies.set("colortheme", theme, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
      });
    }
    throw redirect(303, redirectTo ?? "/");
  }
  // login: async ({ request, locals: { supabase } }) => {
  // 	console.log('logging in user');
  // 	const form: FormResult = {
  // 		success: false,
  // 		error: null
  // 	};
  // 	const formData = await request.formData();
  // 	if (!formData) {
  // 		form.error = 'Request failed...';
  // 		return fail(400, form);
  // 	}
  // 	const email = String(formData.get('email'));
  // 	const password = String(formData.get('password'));
  // 	const { data, error } = await supabase.auth.signInWithPassword({
  // 		email,
  // 		password
  // 	});
  // 	if (error) {
  // 		form.error = 'Request failed...';
  // 		return fail(400, form);
  // 	}
  // 	if (data) {
  // 		form.success = true;
  // 		return form;
  // 	}
  // }
};
export {
  actions
};
