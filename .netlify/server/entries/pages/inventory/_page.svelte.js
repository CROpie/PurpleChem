import { c as create_ssr_component, a as compute_rest_props, s as setContext, b as spread, e as escape_object, d as escape_attribute_value, g as getContext, h as subscribe, f as add_attribute, k as escape, o as compute_slots, j as set_store_value, p as createEventDispatcher, v as validate_component, l as each } from "../../../chunks/ssr.js";
import { twMerge } from "tailwind-merge";
import { w as writable } from "../../../chunks/index2.js";
import { i as is_void } from "../../../chunks/names.js";
import { R as RDKitSS } from "../../../chunks/rdkitstore2.js";
import { B as Button } from "../../../chunks/Button.js";
import { I as Input } from "../../../chunks/Input.js";
import { D as DropSelect, a as DropSelectItem } from "../../../chunks/DropSelectItem.js";
import { H as Heading } from "../../../chunks/Heading.js";
import "devalue";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["outline", "selectedColour"]);
  let { outline = false } = $$props;
  setContext("outline", outline);
  const activeComponentId = writable(null);
  setContext("active", activeComponentId);
  let { selectedColour = "text-complement" } = $$props;
  setContext("selectedColour", selectedColour);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.selectedColour === void 0 && $$bindings.selectedColour && selectedColour !== void 0)
    $$bindings.selectedColour(selectedColour);
  return `<aside${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("w-64", $$props.class))
      },
      { "aria-label": "Sidebar" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</aside>`;
});
const defaultClass$2 = "overflow-y-auto py-4 px-3 rounded";
const fillClass$2 = "bg-primary";
const outlineClass$2 = "border-2 border-primary bg-transparent";
const SidebarWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let outline = getContext("outline");
  let divClass = twMerge(defaultClass$2, outline ? outlineClass$2 : fillClass$2, $$props.class);
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}>${slots.default ? slots.default({}) : ``}</div>`;
});
const defaultClass$1 = "space-y-2";
const SidebarGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["border", "borderClass"]);
  let { border = false } = $$props;
  let { borderClass = "pt-4 mt-4 border-t border-neutral" } = $$props;
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.borderClass === void 0 && $$bindings.borderClass && borderClass !== void 0)
    $$bindings.borderClass(borderClass);
  return `<ul${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(defaultClass$1, border ? borderClass : "", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</ul>`;
});
const defaultClass = "flex items-center p-2 text-base font-normal rounded-lg cursor-pointer";
let fillClass$1 = "text-neutral hover:text-complement";
let outlineClass$1 = "text-primary hover:text-complement";
const SidebarItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "label", "spanClass", "startSelected", "isActive"]);
  let $$slots = compute_slots(slots);
  let $activeComponentId, $$unsubscribe_activeComponentId;
  let outline = getContext("outline");
  let { href = "" } = $$props;
  let { label = "" } = $$props;
  let { spanClass = "ml-3" } = $$props;
  const componentId = crypto.randomUUID();
  const activeComponentId = getContext("active");
  $$unsubscribe_activeComponentId = subscribe(activeComponentId, (value) => $activeComponentId = value);
  let { startSelected = false } = $$props;
  function setActive() {
    set_store_value(activeComponentId, $activeComponentId = componentId, $activeComponentId);
  }
  let { isActive = false } = $$props;
  let selectedColour = getContext("selectedColour");
  let elementClass = "";
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0)
    $$bindings.spanClass(spanClass);
  if ($$props.startSelected === void 0 && $$bindings.startSelected && startSelected !== void 0)
    $$bindings.startSelected(startSelected);
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  startSelected && setActive();
  isActive = $activeComponentId === componentId;
  elementClass = twMerge(defaultClass, outline ? outlineClass$1 : fillClass$1, isActive ? selectedColour : "", $$props.class);
  $$unsubscribe_activeComponentId();
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        escape_object($$restProps),
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        {
          class: escape_attribute_value(elementClass)
        }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.icon ? slots.icon({}) : ``} <span role="button"${add_attribute("class", spanClass, 0)}>${escape(label)}</span> ${$$slots.subtext ? `${slots.subtext ? slots.subtext({}) : ``}` : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}</li>`;
});
const LocationSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { locationsList } = $$props;
  let { selectedLocationID } = $$props;
  let { currentLocation } = $$props;
  console.log(window.location);
  createEventDispatcher();
  if ($$props.locationsList === void 0 && $$bindings.locationsList && locationsList !== void 0)
    $$bindings.locationsList(locationsList);
  if ($$props.selectedLocationID === void 0 && $$bindings.selectedLocationID && selectedLocationID !== void 0)
    $$bindings.selectedLocationID(selectedLocationID);
  if ($$props.currentLocation === void 0 && $$bindings.currentLocation && currentLocation !== void 0)
    $$bindings.currentLocation(currentLocation);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Sidebar, "Sidebar").$$render(
      $$result,
      {
        class: "mt-9 w-full sm:w-64",
        outline: true
      },
      {},
      {
        default: () => {
          return `${validate_component(SidebarWrapper, "SidebarWrapper").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "All", startSelected: true }, {}, {})} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Unsorted" }, {}, {})}`;
                }
              })} ${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, { border: true }, {}, {
                default: () => {
                  return `${locationsList.length ? each(locationsList, (location) => {
                    return `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: location.locationName }, {}, {})}`;
                  }) : `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "" }, {}, {})}`} ${``}`;
                }
              })} ${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, { border: true }, {}, {
                default: () => {
                  return `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "New", class: "text-neutral" }, {}, {})}`;
                }
              })}`;
            }
          })} ${``} ${``} ${``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const TitleTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_RDKitSS;
  $$unsubscribe_RDKitSS = subscribe(RDKitSS, (value) => value);
  let { order } = $$props;
  let { currentSVG } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.currentSVG === void 0 && $$bindings.currentSVG && currentSVG !== void 0)
    $$bindings.currentSVG(currentSVG);
  $$unsubscribe_RDKitSS();
  return `<button>${order.statusID.id != 3 ? `<button class="break-words">${escape(order.chemicalID.chemicalName)} (${escape(order.id)})*</button>` : `<button class="break-words">${escape(order.chemicalID.chemicalName)} (${escape(order.id)})</button>`}</button>`;
});
const ModifyForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  let { locationsList } = $$props;
  createEventDispatcher();
  let currentLocation = "Choose a storage location.";
  let currentValue = null;
  if (order.locationID) {
    currentLocation = order.locationID.locationName;
    currentValue = order.locationID.id;
  }
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.locationsList === void 0 && $$bindings.locationsList && locationsList !== void 0)
    $$bindings.locationsList(locationsList);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = ` <form class="flex gap-5 flex-wrap items-center justify-center mt-2"><div class="flex items-center justify-start gap-1"><p data-svelte-h="svelte-191fg5e">Remaining:</p> ${escape(order.amount)} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        "data-testid": "amount",
        name: "amount",
        type: "number",
        class: "text-primary text-end",
        outline: true,
        value: order.amount
      },
      {
        value: ($$value) => {
          order.amount = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p>${escape(order.amountUnit)}</p></div> <div class="flex justify-start items-center gap-1 md:flex-nowrap flex-wrap"><p class="block whitespace-nowrap" data-svelte-h="svelte-9s0ufq">Change Location:</p> ${validate_component(DropSelect, "DropSelect").$$render(
      $$result,
      {
        name: "locationID",
        class: "sm:w-64 w-36 border-2 rounded-lg",
        outline: true,
        popClass: "w-36",
        defaultText: currentLocation,
        value: currentValue
      },
      {
        value: ($$value) => {
          currentValue = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${locationsList.length ? each(locationsList, (location) => {
            return `${validate_component(DropSelectItem, "DropSelectItem").$$render(
              $$result,
              {
                value: location?.id,
                label: location?.locationName
              },
              {},
              {}
            )}`;
          }) : `${validate_component(DropSelectItem, "DropSelectItem").$$render($$result, { label: "No Locations!" }, {}, {})}`}`;
        }
      }
    )} </div> <div>${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        outline: true,
        class: "border-none text-2xl"
      },
      {},
      {
        default: () => {
          return `✓`;
        }
      }
    )}</div></form> ${``} ${``} ${``} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
const ModifyForceStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  createEventDispatcher();
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  return `<p class="text-primary">Chemical is yet to arrive. Order Status: <span class="text-complement">${escape(order.statusID.statusValue)}</span>.</p> <form method="POST" action="?/forceStatus"><input type="hidden" name="orderID"${add_attribute("value", order.id, 0)}> ${validate_component(Button, "Button").$$render($$result, { outline: true, type: "submit" }, {}, {
    default: () => {
      return `Demo: Force status = received`;
    }
  })}</form>`;
});
const ModifyTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  let { locationsList } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.locationsList === void 0 && $$bindings.locationsList && locationsList !== void 0)
    $$bindings.locationsList(locationsList);
  return `<div class="ml-4">${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "text-complement" }, {}, {
    default: () => {
      return `MODIFY`;
    }
  })} ${order.statusID.id == 1 || order.statusID.id == 2 ? `${validate_component(ModifyForceStatus, "ModifyForceStatus").$$render($$result, { order }, {}, {})}` : `${validate_component(ModifyForm, "ModifyForm").$$render($$result, { order, locationsList }, {}, {})}`}</div>`;
});
const PropertiesTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  let { currentSVG } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.currentSVG === void 0 && $$bindings.currentSVG && currentSVG !== void 0)
    $$bindings.currentSVG(currentSVG);
  return `<div class="ml-4">${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "text-complement" }, {}, {
    default: () => {
      return `PROPERTIES`;
    }
  })} <div class="flex flex-wrap gap-2"><div class="border-2 border-primary"><!-- HTML_TAG_START -->${`${currentSVG}`}<!-- HTML_TAG_END --></div> <ul><li>MW: ${escape(order.chemicalID.MW)}</li> <li>BP: ${escape(order.chemicalID.BP)}</li> <li>MP: ${escape(order.chemicalID.MP)}</li> <li>Density: ${escape(order.chemicalID.density)}</li></ul> <ul><li>CAS: ${escape(order.chemicalID.CAS)}</li>  <li data-svelte-h="svelte-zh00zg">Supplier:</li> <li data-svelte-h="svelte-1ro5e1l">Date Ordered:</li></ul></div></div>`;
});
let defaultDivStyle = "w-full p-2 rounded-lg text-lg";
const AccordionDouble = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const activeComponentId = writable(null);
  setContext("active", activeComponentId);
  const activeEditComponentId = writable(null);
  setContext("activeEdit", activeEditComponentId);
  let { outline = false } = $$props;
  setContext("outline", outline);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  return `<div${add_attribute("class", twMerge(defaultDivStyle), 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
let defaultAccordion = "w-full flex flex-col gap-2 justify-between rounded-lg py-1";
const outlineClass = "border-2 text-complement border-primary bg-transparent";
const fillClass = "text-complement bg-primary";
const outlineContentClass = "text-primary border-0 border-t-2 border-dashed border-primaryLight";
const fillContentClass = "text-neutral border-0 border-t-2 border-dashed border-primaryLight";
const AccordionItemDouble = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isOpen;
  let isDoubleOpen;
  let $activeEditComponentId, $$unsubscribe_activeEditComponentId;
  let $activeComponentId, $$unsubscribe_activeComponentId;
  const componentId = crypto.randomUUID();
  const editComponentId = crypto.randomUUID();
  const activeComponentId = getContext("active");
  $$unsubscribe_activeComponentId = subscribe(activeComponentId, (value) => $activeComponentId = value);
  const activeEditComponentId = getContext("activeEdit");
  $$unsubscribe_activeEditComponentId = subscribe(activeEditComponentId, (value) => $activeEditComponentId = value);
  let outline = getContext("outline");
  isOpen = $activeComponentId === componentId;
  isDoubleOpen = $activeEditComponentId === editComponentId;
  $$unsubscribe_activeEditComponentId();
  $$unsubscribe_activeComponentId();
  return `<div${add_attribute("class", twMerge(defaultAccordion, outline ? outlineClass : fillClass, $$props.class), 0)}><button${add_attribute("class", twMerge("text-complement", $$props.titleClass), 0)}>${slots.title ? slots.title({}) : ``}</button> ${isOpen ? `<div${add_attribute("class", twMerge("flex flex-col gap-4", outline ? outlineContentClass : fillContentClass, $$props.contentClass), 0)}>${slots.content ? slots.content({}) : ``} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      outline: true,
      class: twMerge("border-0", outline ? "text-primary" : "text-neutral")
    },
    {},
    {
      default: () => {
        return `▽`;
      }
    }
  )}</div>` : ``} ${isDoubleOpen ? `<div${add_attribute("class", twMerge("", outline ? outlineContentClass : fillContentClass, $$props.editClass), 0)}>${slots.edit ? slots.edit({}) : ``}</div>` : ``}</div> `;
});
const InventoryAccordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { locationsList } = $$props;
  let { filteredOrdersList } = $$props;
  let currentSVG = "";
  if ($$props.locationsList === void 0 && $$bindings.locationsList && locationsList !== void 0)
    $$bindings.locationsList(locationsList);
  if ($$props.filteredOrdersList === void 0 && $$bindings.filteredOrdersList && filteredOrdersList !== void 0)
    $$bindings.filteredOrdersList(filteredOrdersList);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="flex-1">${validate_component(AccordionDouble, "AccordionDouble").$$render($$result, { outline: true }, {}, {
      default: () => {
        return `${filteredOrdersList.length ? each(filteredOrdersList, (order) => {
          return `${validate_component(AccordionItemDouble, "AccordionItemDouble").$$render($$result, { class: "text-sm sm:text-lg" }, {}, {
            edit: () => {
              return `${validate_component(PropertiesTab, "PropertiesTab").$$render($$result, { slot: "edit", order, currentSVG }, {}, {})}`;
            },
            content: () => {
              return `${validate_component(ModifyTab, "ModifyTab").$$render($$result, { slot: "content", order, locationsList }, {}, {})}`;
            },
            title: () => {
              return `${validate_component(TitleTab, "TitleTab").$$render(
                $$result,
                { slot: "title", order, currentSVG },
                {
                  currentSVG: ($$value) => {
                    currentSVG = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })}`;
        }) : `<p class="text-primary" data-svelte-h="svelte-e1i4wd">There&#39;s nothing here!</p>`}`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Inventory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { locationsList } = $$props;
  let { ordersList } = $$props;
  let filteredOrdersList = ordersList;
  let selectedLocationID = -1;
  let currentLocation = "All";
  const filterOrdersList = () => {
    if (selectedLocationID == -1) {
      filteredOrdersList = ordersList;
    } else if (selectedLocationID == -2) {
      filteredOrdersList = ordersList.filter((order) => {
        return order.locationID == null;
      });
    } else {
      filteredOrdersList = ordersList.filter((order) => {
        return order.locationID?.id == selectedLocationID;
      });
    }
    sortOrders();
  };
  function sortOrders() {
    {
      filteredOrdersList = filteredOrdersList.sort((a, b) => a.chemicalID.chemicalName > b.chemicalID.chemicalName ? 1 : -1);
    }
  }
  if ($$props.locationsList === void 0 && $$bindings.locationsList && locationsList !== void 0)
    $$bindings.locationsList(locationsList);
  if ($$props.ordersList === void 0 && $$bindings.ordersList && ordersList !== void 0)
    $$bindings.ordersList(ordersList);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    selectedLocationID && filterOrdersList();
    $$rendered = `<div class="flex flex-wrap">${validate_component(LocationSidebar, "LocationSidebar").$$render(
      $$result,
      {
        locationsList,
        selectedLocationID,
        currentLocation
      },
      {
        selectedLocationID: ($$value) => {
          selectedLocationID = $$value;
          $$settled = false;
        },
        currentLocation: ($$value) => {
          currentLocation = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="flex-1">${validate_component(Heading, "Heading").$$render($$result, { tag: "h3" }, {}, {
      default: () => {
        return `${escape(currentLocation)}`;
      }
    })} ${validate_component(InventoryAccordion, "InventoryAccordion").$$render($$result, { locationsList, filteredOrdersList }, {}, {})}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  let ordersList = data.ordersList;
  let locationsList = data.locationsList;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ordersList = data.ordersList;
  locationsList = data.locationsList;
  return `${!ordersList || !locationsList ? `<p class="text-primary" data-svelte-h="svelte-1yw7e3j">Error retrieving data from the database. Please try refreshing the page.</p>` : `${validate_component(Inventory, "Inventory").$$render($$result, { locationsList, ordersList }, {}, {})}`} ${form?.error ? `<p class="text-red-500">${escape(form.error)}</p>` : ``}`;
});
export {
  Page as default
};
