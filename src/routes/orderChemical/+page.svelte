<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import OrderForm from '$lib/Major/OrderChemical/OrderForm.svelte';

	import type { PageData } from './$types';

	type FormResult = {
		success: boolean;
		error: string | null;
	};

	// server load function
	export let data: PageData;
	const { supplierList } = data;

	export let form: FormResult;
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>
{#if supplierList}
	<OrderForm {supplierList} {form} />
{:else}
	<p class="text-primary">An error occured while loading the page...</p>
{/if}
