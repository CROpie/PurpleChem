import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supabase } = data;
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  handleSignOut();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return ``;
});
export {
  Page as default
};
