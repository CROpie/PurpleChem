import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.002c2a95.js","app":"_app/immutable/entry/app.2a217ce9.js","imports":["_app/immutable/entry/start.002c2a95.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/singletons.98c49886.js","_app/immutable/chunks/index.33dd07fd.js","_app/immutable/chunks/paths.345df6d0.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.2a217ce9.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.7ec5994a.js","_app/immutable/chunks/index.71e9833e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js'),
			() => import('../server/nodes/5.js'),
			() => import('../server/nodes/6.js'),
			() => import('../server/nodes/7.js'),
			() => import('../server/nodes/8.js'),
			() => import('../server/nodes/9.js'),
			() => import('../server/nodes/10.js'),
			() => import('../server/nodes/11.js'),
			() => import('../server/nodes/12.js'),
			() => import('../server/nodes/13.js'),
			() => import('../server/nodes/14.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: () => import('../server/entries/endpoints/_server.ts.js')
			},
			{
				id: "/(admin)/addCSV",
				pattern: /^\/addCSV\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(admin)/addUser",
				pattern: /^\/addUser\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(admin)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/formaction",
				pattern: /^\/formaction\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/inventory",
				pattern: /^\/inventory\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: () => import('../server/entries/endpoints/inventory/_server.ts.js')
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(admin)/modifychemical",
				pattern: /^\/modifychemical\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: () => import('../server/entries/endpoints/(admin)/modifychemical/_server.ts.js')
			},
			{
				id: "/(admin)/modifyorder",
				pattern: /^\/modifyorder\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: () => import('../server/entries/endpoints/(admin)/modifyorder/_server.ts.js')
			},
			{
				id: "/(admin)/modifyuser",
				pattern: /^\/modifyuser\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: () => import('../server/entries/endpoints/(admin)/modifyuser/_server.ts.js')
			},
			{
				id: "/orderChemical",
				pattern: /^\/orderChemical\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: () => import('../server/entries/endpoints/orderChemical/_server.ts.js')
			},
			{
				id: "/queryData",
				pattern: /^\/queryData\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(admin)/status",
				pattern: /^\/status\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: () => import('../server/entries/endpoints/(admin)/status/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
