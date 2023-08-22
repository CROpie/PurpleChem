<script lang="ts">
	/* MINOR COMPONENTS */
	import { Input } from '$lib/components/form/formAll';

	/* TYPES */
	import type { ChemicalInfo } from '$lib/types/orderChemical';

	export let chemicalInfo: ChemicalInfo;
</script>

<div class="flex">
	<Input
		label="Molecular Weight (g/mol)"
		type="text"
		divClass="w-3/12"
		outline
		bind:value={chemicalInfo.MW}
	/>
	<Input
		label="Melting Point (°C)"
		type="text"
		divClass="w-3/12"
		outline
		bind:value={chemicalInfo.MP}
	/>
	<Input
		label="Boiling Point (°C)"
		type="text"
		divClass="w-3/12"
		outline
		bind:value={chemicalInfo.BP}
	/>
	<Input
		label="Density (g/mL)"
		type="text"
		divClass="w-3/12"
		outline
		bind:value={chemicalInfo.density}
	/>
</div>
