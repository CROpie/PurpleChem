import * as server from '../entries/pages/(admin)/status/_page.server.ts.js';

export const index = 9;
export const component = async () => (await import('../entries/pages/(admin)/status/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/status/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.0c4bdde1.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js","_app/immutable/chunks/each.def00d2a.js","_app/immutable/chunks/Heading.4a73eefe.js","_app/immutable/chunks/tw-merge.ff61617c.js","_app/immutable/chunks/Button.d5d5b0af.js","_app/immutable/chunks/TableBodyCell.0ec4bacd.js"];
export const stylesheets = [];
export const fonts = [];
