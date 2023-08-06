import * as server from '../entries/pages/formaction/_page.server.ts.js';

export const index = 10;
export const component = async () => (await import('../entries/pages/formaction/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/formaction/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.5478a89b.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/forms.e3414725.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.b9dc4869.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.781df6c9.js"];
export const stylesheets = [];
export const fonts = [];
