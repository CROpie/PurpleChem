<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button } from '../button/button';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { order } from '../../../routes/inventory/orderType';
	type ActiveId = string | null;
	type ActiveIdContext = Writable<ActiveId>;

	import type { RDKitModule } from '$lib/rdkitTypes';
	let RDKitModule: RDKitModule;

	export let svgString;

	onMount(() => {
		initRDKitModule().then(function (instance: any) {
			RDKitModule = instance;
		});
	});
	let svg: any;
	$: svg;
	const drawStructure = () => {
		if (order.chemicalID.smile) {
			let JSMol = RDKitModule.get_mol(order.chemicalID.smile);
			svg = JSMol.get_svg();
			console.log(svg);
			svgString = svg;
		}
	};

	const componentId = crypto.randomUUID();

	const editComponentId = crypto.randomUUID();

	export let order: order;

	// can be replaced by a link to context.ts
	import { getContext } from 'svelte';
	const activeComponentId = getContext<ActiveIdContext>('active');
	const activeEditComponentId = getContext<ActiveIdContext>('activeEdit');

	let defaultAccordion = 'w-full flex justify-between p-1 border-2 border-black rounded-lg';

	function setActive() {
		if ($activeComponentId === componentId) {
			isOpen = !isOpen;
			isDoubleOpen = false;
			return;
		}
		$activeComponentId = componentId;
		$activeEditComponentId = null;
	}

	function setEditActive() {
		if ($activeEditComponentId === editComponentId) {
			isDoubleOpen = !isDoubleOpen;
			return;
		}
		$activeEditComponentId = editComponentId;
		drawStructure();
	}

	// look to see if the active component id matches the component id
	$: isOpen = $activeComponentId === componentId;
	$: isDoubleOpen = $activeEditComponentId === editComponentId;
</script>

<div class={twMerge(defaultAccordion, 'flex flex-col gap-2 mb-4 dark:bg-gray-300', $$props.class)}>
	<button on:click={setActive}>
		<slot name="title" />
	</button>

	{#if isOpen}
		<div class={'flex flex-col gap-4 dark:text-black'}>
			<slot name="content" />
			<Button on:click={setEditActive} outline>▽</Button>
		</div>
	{/if}

	{#if isDoubleOpen}
		<slot name="edit" />
	{/if}
</div>

<!--
  @component
  # PROPS
  open: set an item to be open by default
-->
