import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.f96b5636.js","_app/immutable/chunks/0.a84d3483.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/forms.67fe5b06.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.98c49886.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.345df6d0.js","_app/immutable/chunks/tw-merge.ff61617c.js","_app/immutable/chunks/each.def00d2a.js","_app/immutable/chunks/stores.818cde97.js","_app/immutable/chunks/popper.f3391c26.js","_app/immutable/chunks/rdkitstore2.996cc875.js"];
export const stylesheets = ["_app/immutable/assets/0.62b3171c.css"];
export const fonts = [];
