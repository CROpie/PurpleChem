import { c as create_ssr_component, a as compute_rest_props, f as add_attribute, v as validate_component, h as subscribe, l as each, k as escape } from "../../../chunks/ssr.js";
import { H as Heading } from "../../../chunks/Heading.js";
import { B as Button } from "../../../chunks/Button.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../chunks/TableBodyCell.js";
import { I as Input } from "../../../chunks/Input.js";
import { twMerge } from "tailwind-merge";
import { R as RDKitSS } from "../../../chunks/rdkitstore2.js";
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["inputValue", "placeholder", "color"]);
  let { inputValue = "Search" } = $$props;
  let { placeholder = "" } = $$props;
  let { color = "primary" } = $$props;
  let svgColours = { primary: "dark:text-primaryA-500" };
  let svgClass = twMerge("w-5 h-5", svgColours[color], $$props.svgClass);
  let divClass = twMerge("", $$props.divClass);
  if ($$props.inputValue === void 0 && $$bindings.inputValue && inputValue !== void 0)
    $$bindings.inputValue(inputValue);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div${add_attribute("class", divClass, 0)}><div class="relative mt-1"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg${add_attribute("class", svgClass, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div> ${validate_component(Input, "Input").$$render(
      $$result,
      Object.assign({}, $$restProps, { type: "text" }, { placeholder }, { class: twMerge("pl-10", $$props.class) }, { value: inputValue }),
      {
        value: ($$value) => {
          inputValue = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> `;
  } while (!$$settled);
  return $$rendered;
});
const QueryDataTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_RDKitSS;
  $$unsubscribe_RDKitSS = subscribe(RDKitSS, (value) => value);
  let jsmeContainer;
  let { supabase } = $$props;
  const tableHead = [
    "chemicalName",
    "CAS",
    "username",
    "amount",
    "isConsumed",
    "supplierName",
    "supplierPN",
    "statusValue",
    "orderDate"
  ];
  let queryChemicalName = "";
  let queryOrders = [];
  let showObj;
  if ($$props.supabase === void 0 && $$bindings.supabase && supabase !== void 0)
    $$bindings.supabase(supabase);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    showObj = {
      chemicalName: true,
      CAS: true,
      username: true,
      amount: true,
      amountUnit: true,
      isConsumed: true,
      supplierName: true,
      supplierPN: true,
      statusValue: true,
      orderDate: true
    };
    $$rendered = `<div class="mx-8 mt-3"><form class="flex-1">${validate_component(Search, "Search").$$render(
      $$result,
      {
        outline: true,
        placeholder: "Chemical Name, CAS or username",
        divClass: "my-4",
        inputValue: queryChemicalName
      },
      {
        inputValue: ($$value) => {
          queryChemicalName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</form> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Toggle Structure Search`;
      }
    })} <div class="hidden"${add_attribute("this", jsmeContainer, 0)}><div id="jsme_container"></div> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `GO`;
      }
    })}</div> ${``} ${``} ${``} ${``}  <div class="hidden"><div class="flex justify-between">${each(tableHead, (heading) => {
      return `<div class="flex flex-col items-center"><label for="${"show" + escape(heading, true)}" class="text-primary">${escape(heading)}</label> <input type="checkbox" id="${"show" + escape(heading, true)}"${add_attribute("checked", showObj[heading], 1)}> </div>`;
    })}</div></div> <div class="flex my-3">${validate_component(Button, "Button").$$render($$result, { type: "button", outline: true }, {}, {
      default: () => {
        return `Show Consumed`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { type: "button", outline: true }, {}, {
      default: () => {
        return `Hide Consumed`;
      }
    })}</div> ${validate_component(Table, "Table").$$render(
      $$result,
      {
        hoverable: true,
        color: "primary",
        striped: true
      },
      {},
      {
        default: () => {
          return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
            default: () => {
              return `${each(tableHead, (heading) => {
                return `${showObj[heading] ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(heading)}`;
                  }
                })}` : ``}`;
              })}`;
            }
          })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
            default: () => {
              return `${each(queryOrders, (order) => {
                return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                  default: () => {
                    return `${each(Object.entries(order), ([key, value]) => {
                      return `${showObj[key] ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `${escape(value)}`;
                        }
                      })}` : ``}`;
                    })} `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      }
    )}</div> `;
  } while (!$$settled);
  $$unsubscribe_RDKitSS();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supabase } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Search Database`;
    }
  })} ${validate_component(QueryDataTable, "QueryDataTable").$$render($$result, { supabase }, {}, {})}`;
});
export {
  Page as default
};
