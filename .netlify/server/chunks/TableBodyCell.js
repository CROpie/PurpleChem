import { c as create_ssr_component, a as compute_rest_props, s as setContext, f as add_attribute, b as spread, e as escape_object, d as escape_attribute_value, g as getContext } from "./ssr.js";
import { twMerge } from "tailwind-merge";
let divClass = "relative overflow-x-auto shadow-md sm:rounded-lg";
let tableClass = "w-full text-left text-sm";
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["outline"]);
  let { outline = false } = $$props;
  setContext("outline", outline);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  return `<div${add_attribute("class", twMerge(divClass, $$props.divClass), 0)}><table${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(tableClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div> `;
});
const outlineClass$1 = "border-2 text-complement border-primary bg-transparent";
const fillClass$1 = "text-complement bg-primary";
const TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["defaultRow"]);
  let { defaultRow = true } = $$props;
  let outline = getContext("outline");
  let theadClass = twMerge("text-xs uppercase cursor-pointer", outline ? outlineClass$1 : fillClass$1, $$props.class);
  if ($$props.defaultRow === void 0 && $$bindings.defaultRow && defaultRow !== void 0)
    $$bindings.defaultRow(defaultRow);
  return `<thead${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(theadClass)
      }
    ],
    {}
  )}>${defaultRow ? `<tr>${slots.default ? slots.default({}) : ``}</tr>` : `${slots.default ? slots.default({}) : ``}`}</thead> `;
});
const TableHeadCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tableHeaderClass"]);
  let { tableHeaderClass = "px-6 py-3" } = $$props;
  if ($$props.tableHeaderClass === void 0 && $$bindings.tableHeaderClass && tableHeaderClass !== void 0)
    $$bindings.tableHeaderClass(tableHeaderClass);
  return `<th${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(tableHeaderClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<tbody${add_attribute("class", $$props.class, 0)}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const outlineClass = "border-2 text-primary odd:border-primaryLight even:border-primary bg-transparent hover:bg-primaryDark hover:text-neutral";
const fillClass = "text-neutral odd:bg-primaryLight even:bg-primary hover:bg-primaryDark";
const TableBodyRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let outline = getContext("outline");
  return `<tr${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(outline ? outlineClass : fillClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr> `;
});
const tableRowClass = "px-6 py-4 whitespace-nowrap font-medium";
const TableBodyCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<td${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(tableRowClass))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
export {
  Table as T,
  TableHead as a,
  TableHeadCell as b,
  TableBody as c,
  TableBodyRow as d,
  TableBodyCell as e
};
