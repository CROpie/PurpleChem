import * as server from '../entries/pages/formaction/_page.server.ts.js';

export const index = 10;
export const component = async () => (await import('../entries/pages/formaction/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/formaction/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.c0b7b65b.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/forms.67fe5b06.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.98c49886.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.345df6d0.js"];
export const stylesheets = [];
export const fonts = [];