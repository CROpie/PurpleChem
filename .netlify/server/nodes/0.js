import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.fdc1bd65.js","_app/immutable/chunks/0.e4fe0e3f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/forms.e3414725.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.b9dc4869.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.781df6c9.js","_app/immutable/chunks/tw-merge.ff61617c.js","_app/immutable/chunks/each.def00d2a.js","_app/immutable/chunks/stores.a723ce64.js","_app/immutable/chunks/popper.f3391c26.js","_app/immutable/chunks/rdkitstore2.996cc875.js"];
export const stylesheets = ["_app/immutable/assets/0.62b3171c.css"];
export const fonts = [];
