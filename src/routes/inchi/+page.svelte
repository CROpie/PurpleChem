<script>
	import { onMount } from 'svelte';

	let JSApplet;

	onMount(() => {
		JSApplet = {};
		JSApplet.Inchi = {};
	});

	$: console.log(JSApplet);

	function computeInchi(mol) {
		var result;
		var tmp_function_name = '__local_ff';
		JSApplet.Inchi[tmp_function_name] = function (inchi_result) {
			result = inchi_result;
		};
		JSApplet.Inchi.computeInchi(mol, 'JSApplet.Inchi.' + tmp_function_name);
		delete JSApplet.Inchi[tmp_function_name];

		return result;
	}
</script>

<svelte:head>
	<script
		src="/node_modules/jsme-editor/96E40B969193BD74B8A621486920E79C.cache.js"
		type="text/javascript"
	></script>
</svelte:head>
