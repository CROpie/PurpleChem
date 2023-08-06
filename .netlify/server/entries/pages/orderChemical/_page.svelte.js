import { c as create_ssr_component, h as subscribe, v as validate_component, f as add_attribute, l as each, k as escape } from "../../../chunks/ssr.js";
import { H as Heading } from "../../../chunks/Heading.js";
import "devalue";
import { I as Input } from "../../../chunks/Input.js";
import { B as Button } from "../../../chunks/Button.js";
import { D as DropSelect, a as DropSelectItem } from "../../../chunks/DropSelectItem.js";
import { R as RDKitSS } from "../../../chunks/rdkitstore2.js";
const OrderForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_RDKitSS;
  $$unsubscribe_RDKitSS = subscribe(RDKitSS, (value) => value);
  let jsmeContainer;
  let { supplierList } = $$props;
  let { form } = $$props;
  let CAS = "";
  let chemicalName = "";
  let amount = null;
  let supplierPN = null;
  let supplierID = null;
  let amountUnit = null;
  let MW = null;
  let MP = null;
  let BP = null;
  let density = null;
  let inchi;
  let smile;
  const items = [
    { value: "mg", name: "mg" },
    { value: "g", name: "g" },
    { value: "mL", name: "mL" },
    { value: "L", name: "L" }
  ];
  if ($$props.supplierList === void 0 && $$bindings.supplierList && supplierList !== void 0)
    $$bindings.supplierList(supplierList);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<form method="POST" action="?/orderChemical" class="m-8">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "CAS number",
        name: "CAS",
        type: "text",
        "data-testID": "CASInput",
        outline: true,
        required: true,
        autofocus: true,
        value: CAS
      },
      {
        value: ($$value) => {
          CAS = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="flex items-center gap-4 mt-2">${validate_component(Button, "Button").$$render($$result, { type: "button", outline: true }, {}, {
      default: () => {
        return `SEARCH`;
      }
    })} ${``} ${``} ${``} ${``} ${``}</div> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Chemical Name",
        name: "chemicalName",
        type: "text",
        outline: true,
        required: true,
        value: chemicalName
      },
      {
        value: ($$value) => {
          chemicalName = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="hidden flex-col"${add_attribute("this", jsmeContainer, 0)}><div class="text-primary" data-svelte-h="svelte-1a1z2he">Chemical Structure</div> <div id="jsme_container"></div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "button",
        outline: true,
        class: "w-96"
      },
      {},
      {
        default: () => {
          return `Generate Structure Info`;
        }
      }
    )} ${``}</div> <div class="flex">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Amount",
        name: "amount",
        type: "text",
        required: true,
        divClass: "w-9/12",
        outline: true,
        value: amount
      },
      {
        value: ($$value) => {
          amount = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(DropSelect, "DropSelect").$$render(
      $$result,
      {
        name: "amountUnit",
        outline: true,
        label: "Unit",
        class: "rounded-lg border-2",
        divClass: "w-3/12",
        value: amountUnit
      },
      {
        value: ($$value) => {
          amountUnit = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${items.length ? each(items, (item) => {
            return `${validate_component(DropSelectItem, "DropSelectItem").$$render($$result, { value: item.value, label: item.name }, {}, {})}`;
          }) : `${validate_component(DropSelectItem, "DropSelectItem").$$render(
            $$result,
            {
              label: "No options!",
              class: "bg-neutral text-opNeutral"
            },
            {},
            {}
          )}`}`;
        }
      }
    )}</div> <div class="flex">${validate_component(DropSelect, "DropSelect").$$render(
      $$result,
      {
        label: "Supplier",
        name: "supplierID",
        outline: true,
        class: "rounded-lg border-2",
        value: supplierID
      },
      {
        value: ($$value) => {
          supplierID = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${supplierList.length ? each(supplierList, (supplier) => {
            return `${validate_component(DropSelectItem, "DropSelectItem").$$render(
              $$result,
              {
                value: supplier.id,
                label: supplier.supplierName
              },
              {},
              {}
            )}`;
          }) : `${validate_component(DropSelectItem, "DropSelectItem").$$render(
            $$result,
            {
              label: "No options!",
              class: "bg-neutral text-opNeutral"
            },
            {},
            {}
          )}`}`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Product Code",
        name: "supplierPN",
        type: "text",
        outline: true,
        required: true,
        value: supplierPN
      },
      {
        value: ($$value) => {
          supplierPN = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${``} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        outline: true,
        class: "w-full mt-8"
      },
      {},
      {
        default: () => {
          return `ORDER CHEMICAL`;
        }
      }
    )} ${form?.error ? `<p class="text-red-500">${escape(form.error)}</p>` : ``} ${``} ${form?.success ? `<p class="text-green-500" data-svelte-h="svelte-50bjxy">Order Successful.</p>` : ``}  <input name="MW" type="hidden" placeholder="MW"${add_attribute("value", MW, 0)}> <input name="MP" type="hidden" placeholder="MP"${add_attribute("value", MP, 0)}> <input name="BP" type="hidden" placeholder="BP"${add_attribute("value", BP, 0)}> <input name="density" type="hidden" placeholder="density"${add_attribute("value", density, 0)}> <input name="inchi" type="hidden" placeholder="inchi"${add_attribute("value", inchi, 0)}> <input name="smile" type="hidden" placeholder="smile"${add_attribute("value", smile, 0)}></form>`;
  } while (!$$settled);
  $$unsubscribe_RDKitSS();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supplierList } = data;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Order Chemical`;
    }
  })} ${supplierList ? `${validate_component(OrderForm, "OrderForm").$$render($$result, { supplierList, form }, {}, {})}` : `<p class="text-primary" data-svelte-h="svelte-hknmfk">An error occured while loading the page...</p>`}`;
});
export {
  Page as default
};
