import { c as create_ssr_component, a as compute_rest_props, s as setContext, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, g as getContext, h as subscribe, v as validate_component, i as is_promise, n as noop, j as set_store_value } from "../../chunks/ssr.js";
import { twMerge } from "tailwind-merge";
import { w as writable } from "../../chunks/index2.js";
import { i as is_void } from "../../chunks/names.js";
import { p as page } from "../../chunks/stores.js";
import "devalue";
import { R as RDKitSS } from "../../chunks/rdkitstore2.js";
const app = "";
let defaultNavClass = "w-full";
let defaultNavDivClass = "px-4 py-1 mx-auto flex flex-wrap justify-between items-center rounded-lg";
const fillClass = "text-opNeutral bg-primary";
const outlineClass = "border text-primary border-primary bg-opNeutral";
const noborderClass = "border-none";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["outline", "noborder", "selectedColor"]);
  let { outline = false } = $$props;
  let { noborder = false } = $$props;
  setContext("outline", outline);
  let navClass = twMerge(defaultNavClass, $$props.class);
  let navDivClass = twMerge(defaultNavDivClass, outline ? outlineClass : fillClass, noborder ? noborderClass : "", $$props.class);
  let hidden = true;
  let toggle = () => {
    hidden = !hidden;
  };
  const activeComponentId = writable(null);
  setContext("active", activeComponentId);
  let { selectedColor = "text-complement" } = $$props;
  setContext("selected", selectedColor);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.noborder === void 0 && $$bindings.noborder && noborder !== void 0)
    $$bindings.noborder(noborder);
  if ($$props.selectedColor === void 0 && $$bindings.selectedColor && selectedColor !== void 0)
    $$bindings.selectedColor(selectedColor);
  return `<nav${spread([escape_object($$restProps), { class: escape_attribute_value(navClass) }], {})}><div${add_attribute("class", navDivClass, 0)}>${slots.default ? slots.default({ hidden, toggle }) : ``}</div></nav>`;
});
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
let defaultUlClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium";
let defaultDivClass = "w-full md:block md:w-auto";
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ulClass;
  let $$restProps = compute_rest_props($$props, ["slideParams", "hidden"]);
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: quintOut
  } } = $$props;
  let { hidden = true } = $$props;
  let divClass = twMerge([defaultDivClass, $$props.class]);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0)
    $$bindings.slideParams(slideParams);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  ulClass = twMerge([defaultUlClass, !hidden && "border rounded-lg border-neutral", $$props.class]);
  return `${!hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}><ul${add_attribute("class", ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(divClass) },
      { hidden: hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`}`;
});
let defaultLiClass = "block py-2 pr-4 pl-3 md:p-0 rounded md:border-0 hover:text-complement";
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "isActive"]);
  let $activeComponentId, $$unsubscribe_activeComponentId;
  let { href = "" } = $$props;
  const componentId = crypto.randomUUID();
  const activeComponentId = getContext("active");
  $$unsubscribe_activeComponentId = subscribe(activeComponentId, (value) => $activeComponentId = value);
  let { isActive = false } = $$props;
  let selected = getContext("selected");
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  isActive = $activeComponentId === componentId;
  liClass = twMerge(defaultLiClass, isActive && selected, $$props.class);
  $$unsubscribe_activeComponentId();
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li>`;
});
const defaultAClass = "flex items-center";
const NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let aClass;
  let $$restProps = compute_rest_props($$props, ["href", "isActive"]);
  let $activeComponentId, $$unsubscribe_activeComponentId;
  let { href = "" } = $$props;
  const componentId = crypto.randomUUID();
  const activeComponentId = getContext("active");
  $$unsubscribe_activeComponentId = subscribe(activeComponentId, (value) => $activeComponentId = value);
  let { isActive = false } = $$props;
  let selected = getContext("selected");
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  isActive = $activeComponentId === componentId;
  aClass = twMerge(defaultAClass, isActive ? selected : "", $$props.class);
  $$unsubscribe_activeComponentId();
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      { class: escape_attribute_value(aClass) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>`;
});
const ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let { size = "md" } = $$props;
  const svgSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5"
  };
  let buttonClass = twMerge("focus:outline-none whitespace-normal", $$props.class);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`;
});
let viewBox = "0 0 24 24";
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let svgpath = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { role: "button" },
      { tabindex: "0" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg>`;
});
const NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["btnClass", "menuClass"]);
  let { btnClass = "ml-3 md:hidden" } = $$props;
  let { menuClass = "h-6 w-6 shrink-0" } = $$props;
  if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass !== void 0)
    $$bindings.btnClass(btnClass);
  if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0)
    $$bindings.menuClass(menuClass);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render(
        $$result,
        {
          class: twMerge(menuClass, $$props.classMenu)
        },
        {},
        {}
      )}`;
    }
  })}`;
});
const Dark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
});
const Light = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path></svg>`;
});
const DarkLightTheme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { brightness = "dark" } = $$props;
  let { colours = ["red", "orange", "yellow", "green", "blue", "purple", "gray"] } = $$props;
  let { placement = "bottom" } = $$props;
  const formClass = twMerge("", $$props.class);
  if ($$props.brightness === void 0 && $$bindings.brightness && brightness !== void 0)
    $$bindings.brightness(brightness);
  if ($$props.colours === void 0 && $$bindings.colours && colours !== void 0)
    $$bindings.colours(colours);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  $$unsubscribe_page();
  return `<form method="POST"${add_attribute("class", formClass, 0)}><ul class="text-primary w-7"><button type="button">${brightness === "dark" ? `${validate_component(Dark, "Dark").$$render($$result, {}, {}, {})}` : `${brightness === "light" ? `${validate_component(Light, "Light").$$render($$result, {}, {}, {})}` : ``}`}</button> ${``}</ul></form>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isAdmin;
  let $RDKitSS, $$unsubscribe_RDKitSS;
  $$unsubscribe_RDKitSS = subscribe(RDKitSS, (value) => $RDKitSS = value);
  let { data } = $$props;
  async function initRDKit() {
    console.log("initializing RDKit");
    await initRDKitModule().then(function(instance) {
      set_store_value(RDKitSS, $RDKitSS = instance, $RDKitSS);
    });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  isAdmin = false;
  $$unsubscribe_RDKitSS();
  return ` ${$$result.head += `<!-- HEAD_svelte-j41hkq_START -->${$$result.title = `<title>Chem Database</title>`, ""}<script src="https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js" data-svelte-h="svelte-1a7e78b"><\/script><script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js" data-svelte-h="svelte-14bd2oj"><\/script><!-- HEAD_svelte-j41hkq_END -->`, ""} ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `  <p data-svelte-h="svelte-1vy8d51">Setting up RDKit</p> `;
    }
    return function() {
      return ` <div class="sticky top-0 z-20">${validate_component(Navbar, "Navbar").$$render($$result, { outline: true }, {}, {
        default: ({ hidden, toggle }) => {
          return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
            default: () => {
              return `<img src="src/lib/images/BearbeerCrop.png" class="mr-3 h-12 sm:h-12" alt="PurpleChem"> <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" data-svelte-h="svelte-1hk93m8">PurpleChem</span>`;
            }
          })} <div class="flex ml-4 mr-auto">${validate_component(DarkLightTheme, "DarkLightTheme").$$render($$result, { brightness: "light" }, {}, {})} ${validate_component(DarkLightTheme, "DarkLightTheme").$$render($$result, { brightness: "dark" }, {}, {})}</div>  ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render($$result, { hidden }, {}, {
            default: () => {
              return `${isAdmin ? `${validate_component(NavLi, "NavLi").$$render(
                $$result,
                {
                  href: "/admin",
                  class: "dark:text-green-300"
                },
                {},
                {
                  default: () => {
                    return `Admin Area`;
                  }
                }
              )}` : ``} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/orderChemical" }, {}, {
                default: () => {
                  return `Order Chemical`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "inventory" }, {}, {
                default: () => {
                  return `Inventory`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/queryData" }, {}, {
                default: () => {
                  return `Query Database`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render(
                $$result,
                {
                  href: "/logout",
                  class: "text-neutral underline"
                },
                {},
                {
                  default: () => {
                    return `Log Out`;
                  }
                }
              )}`;
            }
          })}`;
        }
      })}</div> ${slots.default ? slots.default({}) : ``} `;
    }();
  }(initRDKit())}`;
});
export {
  Layout as default
};
