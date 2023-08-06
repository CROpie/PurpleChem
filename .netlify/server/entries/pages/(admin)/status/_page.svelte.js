import { c as create_ssr_component, v as validate_component, l as each, k as escape } from "../../../../chunks/ssr.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { B as Button } from "../../../../chunks/Button.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableBodyCell.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { ordersList } = data;
  const tableHead = ["id", "username", "chemicalName", "statusID"];
  let filteredOrdersList = ordersList;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${ordersList ? `<div class="fixed top-14 bg-opNeutral z-10 w-full">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
    default: () => {
      return `Modify Status`;
    }
  })} <div class="h-8 ml-4 text-center">${``} ${``} ${``}</div> <div class="flex gap-2 pb-4">${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Display All`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Display Submitted`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Display Ordered`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Display Received`;
    }
  })}</div></div> <form method="POST" action="./updateStatus"><div class="mx-8 mt-36">${validate_component(Table, "Table").$$render(
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
              return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(heading)}`;
                }
              })}`;
            })}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { class: "cursor-pointer" }, {}, {
          default: () => {
            return `${each(filteredOrdersList, (order) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.id)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.userID.username)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.chemicalID.chemicalName)}`;
                    }
                  })} ${order.statusID == 1 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `Submitted`;
                    }
                  })}` : `${order.statusID == 2 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `Ordered`;
                    }
                  })}` : `${order.statusID == 3 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `Received`;
                    }
                  })}` : ``}`}`} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    }
  )}</div></form>` : `<p class="text-primary" data-svelte-h="svelte-eaf0u6">something went wrong: data not pulled form server.</p>`}`;
});
export {
  Page as default
};
