<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { DBOrder } from '$lib/types/inventory';

	export let order: DBOrder;
	export let currentSVG: string;
</script>

<div class="ml-4">
	<Heading tag="h6" class="text-complement">PROPERTIES</Heading>

	<div class="flex flex-wrap gap-2">
		<div class="border-2 border-primary">
			{@html `${currentSVG}`}
		</div>
		<ul>
			<li>CAS: {order.chemical.CAS}</li>
			<li>MW: {order.chemical.MW ? order.chemical.MW : '-'}</li>
			<li>BP: {order.chemical.BP ? order.chemical.BP : '-'}</li>
			<li>MP: {order.chemical.MP ? order.chemical.MP : '-'}</li>
			<li>Density: {order.chemical.density ? order.chemical.density : '-'}</li>
			<li>Date Ordered: {order.orderDate.substring(0, 10)}</li>
			<li>Supplier: {order.supplier.supplierName}</li>
		</ul>

		<ul>
			<!-- <li>CAS: {order.chemicalID.CAS}</li> -->
			<!-- TODO -->
			<!-- <li>Supplier:</li>
			<li>Date Ordered:</li> -->
		</ul>
	</div>
</div>
