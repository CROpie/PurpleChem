import { c as create_ssr_component, a as compute_rest_props, f as add_attribute, k as escape, b as spread, e as escape_object, d as escape_attribute_value } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const defaultClass = "block w-full rounded-lg text-lg p-2 outline-none focus:ring-0";
const outlineClass = "border-2 text-primary border-primary bg-transparent focus:border-complement";
const fillClass = "text-neutral bg-primary focus:bg-complement";
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "label",
    "value",
    "outline",
    "disabled",
    "autofocus",
    "type",
    "divClass",
    "labelClass"
  ]);
  let { label = null } = $$props;
  let { value = void 0 } = $$props;
  let { outline = false } = $$props;
  let { disabled = false } = $$props;
  let { autofocus = false } = $$props;
  let { type = "text" } = $$props;
  let { divClass = twMerge("w-full", $$props.divClass) } = $$props;
  let { labelClass = twMerge("text-primary", $$props.labelClass) } = $$props;
  const inputClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0)
    $$bindings.autofocus(autofocus);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.labelClass === void 0 && $$bindings.labelClass && labelClass !== void 0)
    $$bindings.labelClass(labelClass);
  return `${autofocus ? `<div${add_attribute("class", divClass, 0)}>${label ? `<div${add_attribute("class", labelClass, 0)}>${escape(label)}</div>` : ``} ${disabled ? `<input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClass)
      },
      { disabled: true }
    ],
    {}
  )}${add_attribute("value", value, 0)}>` : `<input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClass)
      }
    ],
    {}
  )}${add_attribute("value", value, 0)}>`}</div>` : `<div${add_attribute("class", divClass, 0)}>${label ? `<div${add_attribute("class", labelClass, 0)}>${escape(label)}</div>` : ``} <input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClass)
      }
    ],
    {}
  )}${add_attribute("value", value, 0)}></div>`} `;
});
export {
  Input as I
};
