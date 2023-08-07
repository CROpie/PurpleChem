<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { orders } from '$lib/types/orderType';

	export let order: orders;
	export let currentSVG: string;
</script>

<div class="ml-4">
	<Heading tag="h6" class="text-complement">PROPERTIES</Heading>

	<div class="flex flex-wrap gap-2">
		<div class="border-2 border-primary">
			{@html `${currentSVG}`}
		</div>
		<ul>
			<li>CAS: {order.chemicalID.CAS}</li>
			<li>MW: {order.chemicalID.MW}</li>
			<li>BP: {order.chemicalID.BP}</li>
			<li>MP: {order.chemicalID.MP}</li>
			<li>Density: {order.chemicalID.density}</li>
		</ul>

		<ul>
			<!-- <li>CAS: {order.chemicalID.CAS}</li> -->
			<!-- TODO -->
			<!-- <li>Supplier:</li>
			<li>Date Ordered:</li> -->
		</ul>
	</div>
</div>
