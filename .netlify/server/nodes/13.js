import * as server from '../entries/pages/orderChemical/_page.server.ts.js';

export const index = 13;
export const component = async () => (await import('../entries/pages/orderChemical/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/orderChemical/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.b72b1968.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/Heading.4a73eefe.js","_app/immutable/chunks/tw-merge.ff61617c.js","_app/immutable/chunks/each.def00d2a.js","_app/immutable/chunks/forms.67fe5b06.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.98c49886.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.345df6d0.js","_app/immutable/chunks/Input.6e2b9bbd.js","_app/immutable/chunks/Button.d5d5b0af.js","_app/immutable/chunks/DropSelectItem.ff837732.js","_app/immutable/chunks/popper.f3391c26.js","_app/immutable/chunks/rdkitstore2.996cc875.js"];
export const stylesheets = [];
export const fonts = [];
