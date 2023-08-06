import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { H as Heading } from "../../chunks/Heading.js";
import { I as Input } from "../../chunks/Input.js";
import { B as Button } from "../../chunks/Button.js";
import "devalue";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let password;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = ` <form class="m-6"><div class="mb-6">${validate_component(Input, "Input").$$render(
      $$result,
      {
        "data-testid": "inputEmail",
        label: "Please enter your work email address.",
        type: "email",
        name: "email",
        class: "mb-3",
        autocomplete: "off",
        outline: true,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        "data-testid": "inputPassword",
        label: "Please enter your password.",
        type: "password",
        name: "password",
        class: "mb-6",
        outline: true,
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        "data-testid": "button",
        type: "submit",
        outline: true,
        class: "w-full"
      },
      {},
      {
        default: () => {
          return `Sign In`;
        }
      }
    )}</div></form> <div data-testid="message">${``} ${``} ${``}</div> `;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Welcome to purplechem.com`;
    }
  })}  ${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})} <p class="text-white" data-svelte-h="svelte-1f13639">one, two, three @ purplechem.com // default</p>`;
});
export {
  Page as default
};
