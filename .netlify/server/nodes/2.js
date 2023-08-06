import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.3762b8fc.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/Heading.4a73eefe.js","_app/immutable/chunks/tw-merge.ff61617c.js","_app/immutable/chunks/Input.6e2b9bbd.js","_app/immutable/chunks/Button.d5d5b0af.js","_app/immutable/chunks/paths.345df6d0.js"];
export const stylesheets = [];
export const fonts = [];
