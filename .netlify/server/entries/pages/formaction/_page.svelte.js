import { c as create_ssr_component, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "devalue";
const FormComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let banana = "";
  return `<form method="POST" action="?/test"> <input class="border-2 border-red-500 text-lg" name="fruit" data-testid="inputFruit"${add_attribute("value", banana, 0)}> <button type="submit" data-testid="button" data-svelte-h="svelte-e49b7q">Submit</button></form> ${``} ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  console.log("window location: ", window.location.href);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    console.log("form: ", form);
  }
  return `${validate_component(FormComponent, "FormComponent").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
