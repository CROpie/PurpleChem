<script lang="ts">
	/* STRUCTURE EDITOR */
	import { RDKitSS } from '$lib/stores/rdkitstore';
	import { onMount } from 'svelte';

	export let smile: string | null;
	let currentSVG: string | null = null;

	onMount(() => {
		getSVG(smile);
	});

	function getSVG(smile: string | null) {
		if ($RDKitSS) {
			if (smile) {
				currentSVG = $RDKitSS.get_mol(smile).get_svg();
			}
		}
	}
</script>

<div class="flex justify-center mt-4">
	<div>
		{@html `${currentSVG}`}
	</div>
</div>
