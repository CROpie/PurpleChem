import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { B as Button } from "../../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Secret Admin Area`;
    }
  })} <div class="flex flex-col gap-2 w-3/12">${validate_component(Button, "Button").$$render($$result, { href: "addUser" }, {}, {
    default: () => {
      return `Add a New User`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "modifyuser" }, {}, {
    default: () => {
      return `Modify Users`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "modifychemical" }, {}, {
    default: () => {
      return `Modify Chemical Data`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "modifyorder" }, {}, {
    default: () => {
      return `Modify Order`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "status" }, {}, {
    default: () => {
      return `Change Status of Orders`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "addCSV" }, {}, {
    default: () => {
      return `Add Orders via CSV File`;
    }
  })}</div>`;
});
export {
  Page as default
};
