import { c as create_ssr_component, v as validate_component, l as each, k as escape } from "../../../../chunks/ssr.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { I as Input } from "../../../../chunks/Input.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableBodyCell.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const tableHead = ["email", "username", "save"];
  let { data } = $$props;
  let { usersList } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="fixed top-14 bg-opNeutral z-10 w-full">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "text-center mt-3" }, {}, {
      default: () => {
        return `Modify Username`;
      }
    })} <div class="h-8 ml-4 text-center">${``} ${``} ${``}</div></div> ${usersList ? `<div class="mx-8 mt-24">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
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
        })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => {
            return `${each(usersList, (user) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                $$result,
                {
                  class: "odd:bg-primaryLight even:bg-primaryLight border-2 border-primary"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(user.full_name)}`;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Input, "Input").$$render(
                          $$result,
                          {
                            name: user.id,
                            class: "w-6/12",
                            value: user.username
                          },
                          {
                            value: ($$value) => {
                              user.username = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )} `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return ` <button type="button" data-svelte-h="svelte-66e901">Save</button> `;
                      }
                    })} `;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    })}</div>` : `<p class="text-primary" data-svelte-h="svelte-eaf0u6">something went wrong: data not pulled form server.</p>`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
