import { c as create_ssr_component, s as setContext, h as subscribe, f as add_attribute, k as escape, g as getContext } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { w as writable } from "./index2.js";
const defaultClass$1 = "p-2 text-lg w-full";
const fillClass$1 = "text-neutral bg-primary hover:text-opNeutral hover:bg-complement";
const outlineClass$1 = "border text-primary border-primary bg-transparent hover:text-complement hover:border-complement";
const DropSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $details, $$unsubscribe_details;
  let { placement = "bottom" } = $$props;
  let { outline = false } = $$props;
  setContext("outline", outline);
  let { defaultText = "Choose an option:" } = $$props;
  let { label = null } = $$props;
  let { value = null } = $$props;
  let { name = null } = $$props;
  let showOptions = false;
  const divClass = twMerge("w-full", $$props.divClass);
  const elementClass = twMerge(defaultClass$1, outline ? outlineClass$1 : fillClass$1, $$props.class);
  const popupClass = twMerge("", $$props.popClass);
  const labelClass = twMerge("text-primary", $$props.labelClass);
  const details = writable(null);
  $$unsubscribe_details = subscribe(details, (value2) => $details = value2);
  setContext("details", details);
  const getData = () => {
    if ($details) {
      value = $details.value;
      defaultText = $details.label;
      showOptions = false;
    }
  };
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.defaultText === void 0 && $$bindings.defaultText && defaultText !== void 0)
    $$bindings.defaultText(defaultText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $details && getData();
  $$unsubscribe_details();
  return `<div${add_attribute("class", divClass, 0)}>${label ? `<div${add_attribute("class", labelClass, 0)}>${escape(label)}</div>` : ``} <button data-testid="dropSelect" type="button"${add_attribute("class", elementClass, 0)} role="select">${escape(defaultText)}</button> ${showOptions ? `<div${add_attribute("class", popupClass, 0)}>${slots.default ? slots.default({}) : ``}</div>` : ``} <input type="hidden"${add_attribute("name", name, 0)}${add_attribute("placeholder", name, 0)}${add_attribute("value", value, 0)}></div> `;
});
const defaultClass = "w-full p-2";
const fillClass = "text-neutral bg-primaryLight hover:text-opNeutral hover:bg-complement border-none outline-none";
const outlineClass = "border text-primary border-primaryLight bg-opNeutral hover:text-complement hover:border-complement";
const DropSelectItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_details;
  let outline = getContext("outline");
  const buttonClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
  let { value = null } = $$props;
  let { label = "" } = $$props;
  const details = getContext("details");
  $$unsubscribe_details = subscribe(details, (value2) => value2);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  $$unsubscribe_details();
  return `<button${add_attribute("class", buttonClass, 0)} type="button" role="option">${escape(label)}</button> `;
});
export {
  DropSelect as D,
  DropSelectItem as a
};
