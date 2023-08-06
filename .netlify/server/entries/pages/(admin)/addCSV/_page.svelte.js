import { c as create_ssr_component, v as validate_component, f as add_attribute } from "../../../../chunks/ssr.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { B as Button } from "../../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Import CSV`;
    }
  })}  <input type="file" accept=".csv"> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      outline: true,
      class: "w-full mt-6"
    },
    {},
    {
      default: () => {
        return `Load`;
      }
    }
  )} <form method="POST" action="?/inputCSV"><input type="hidden" name="csvData"${add_attribute("value", data, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "submit",
      outline: true,
      class: "w-full mt-6"
    },
    {},
    {
      default: () => {
        return `Submit`;
      }
    }
  )}</form>`;
});
export {
  Page as default
};
