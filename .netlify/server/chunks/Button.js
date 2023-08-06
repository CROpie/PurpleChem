import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_attribute_value, e as escape_object } from "./ssr.js";
import { i as is_void } from "./names.js";
import { twMerge } from "tailwind-merge";
const defaultClass = "rounded-lg";
const fillClass = "text-neutral bg-primary hover:text-opNeutral hover:bg-complement";
const outlineClass = "border text-primary border-primary bg-transparent hover:text-complement hover:border-complement";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["outline", "size", "href"]);
  let { outline = false } = $$props;
  let { size = "md" } = $$props;
  let { href = void 0 } = $$props;
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const buttonClass = twMerge(defaultClass, outline ? outlineClass : fillClass, sizeClasses[size], $$props.class);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        {
          class: escape_attribute_value(buttonClass)
        },
        { role: escape_attribute_value("button") }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`;
});
export {
  Button as B
};
