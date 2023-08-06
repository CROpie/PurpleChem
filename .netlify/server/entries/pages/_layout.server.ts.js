import { r as redirect } from "../../chunks/index.js";
const load = async ({ locals, url }) => {
  const session = await locals.getSession();
  if (url.pathname != "/" && !session) {
    console.log("Access denied.");
    throw redirect(303, "/");
  } else {
    return { session };
  }
};
export {
  load
};
