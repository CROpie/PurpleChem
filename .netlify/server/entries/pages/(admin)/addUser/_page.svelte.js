import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import "devalue";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let email = "";
  let username = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      console.log(username);
    }
    $$rendered = `<form method="POST" action="?/addUser">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Name of new user: ",
        type: "text",
        outline: true,
        name: "username",
        required: true,
        value: username
      },
      {
        value: ($$value) => {
          username = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "E-mail address of new user: ",
        type: "email",
        outline: true,
        name: "email",
        required: true,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Add User`;
      }
    })}</form> ${form?.success ? `<p class="text-green-500" data-svelte-h="svelte-1mzm9bd">User Added.</p>` : `${form?.error ? `<p class="text-red-500" data-svelte-h="svelte-1bq899z">Something went wrong...</p>` : ``}`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
