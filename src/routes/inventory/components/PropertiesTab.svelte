<script lang="ts">
	/* MINOR COMPONENTS */
	import Heading from '$lib/components/typography/Heading.svelte';

	/* TYPES */
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
			<li>CAS: <span class="text-neutral">{order.chemical.CAS}</span></li>
			<li>MW: <span class="text-neutral">{order.chemical.MW ? order.chemical.MW : '-'}</span></li>
			<li>BP: <span class="text-neutral">{order.chemical.BP ? order.chemical.BP : '-'}</span></li>
			<li>MP: <span class="text-neutral">{order.chemical.MP ? order.chemical.MP : '-'}</span></li>
			<li>
				Density: <span class="text-neutral"
					>{order.chemical.density ? order.chemical.density : '-'}</span
				>
			</li>
			<li>Date Ordered: <span class="text-neutral">{order.orderDate.substring(0, 10)}</span></li>
			<li>Supplier: <span class="text-neutral">{order.supplier.supplierName}</span></li>
		</ul>
	</div>
</div>
