<script lang="ts">
	/* MINOR COMPONENTS */
	import { Input } from '$lib/components/form/formAll';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	/* TYPES */
	import type { OrderInfo, Supplier } from '$lib/types/orderChemical';

	export let orderInfo: OrderInfo;
	export let supplierList: Supplier[];

	// Units for dropdown select
	const unitsList = [
		{ value: 'mg', name: 'mg' },
		{ value: 'g', name: 'g' },
		{ value: 'mL', name: 'mL' },
		{ value: 'L', name: 'L' }
	];
</script>

<div class="flex">
	<Input
		label="Amount"
		name="amount"
		type="text"
		required
		divClass="w-9/12"
		bind:value={orderInfo.amount}
		outline
	/>
	<DropSelect
		name="amountUnit"
		outline
		label="Unit"
		class="rounded-lg border-2"
		divClass="w-3/12"
		bind:value={orderInfo.amountUnit}
	>
		{#each unitsList as unit}
			<DropSelectItem value={unit.value} label={unit.name} />
		{:else}
			<DropSelectItem label="No options!" class="bg-neutral text-opNeutral" />
		{/each}
	</DropSelect>
</div>

<div class="flex">
	<DropSelect
		label="Supplier"
		name="supplierID"
		outline
		class="rounded-lg border-2"
		bind:value={orderInfo.supplier_id}
	>
		{#each supplierList as supplier}
			<DropSelectItem value={supplier.id} label={supplier.supplierName} />
		{:else}
			<DropSelectItem label="No options!" class="bg-neutral text-opNeutral" />
		{/each}
	</DropSelect>
	<Input
		label="Product Code"
		name="supplierPN"
		type="text"
		outline
		bind:value={orderInfo.supplierPN}
		required
	/>
</div>
