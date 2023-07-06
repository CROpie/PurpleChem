<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button } from '../button/button';
	import type { Writable } from 'svelte/store';
	type ActiveId = string | null;
	type ActiveIdContext = Writable<ActiveId>;

	const componentId = crypto.randomUUID();

	const editComponentId = crypto.randomUUID();

	// can be replaced by a link to context.ts
	import { getContext } from 'svelte';
	const activeComponentId = getContext<ActiveIdContext>('active');
	const activeEditComponentId = getContext<ActiveIdContext>('activeEdit');

	let defaultAccordion = 'w-full flex justify-between p-1 border-2 border-black rounded-lg';

	function setActive() {
		if ($activeComponentId === componentId) {
			isOpen = !isOpen;
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
	}

	// look to see if the active component id matches the component id
	$: isOpen = $activeComponentId === componentId;
	$: isDoubleOpen = $activeEditComponentId === editComponentId;
</script>

<div>
	<button on:click={setActive} class={twMerge(defaultAccordion, $$props.nameClass)}>
		<div>
			<slot name="title" />
		</div>
	</button>

	{#if isOpen}
		<div class={twMerge(defaultAccordion, $$props.contentClass)}>
			<slot name="content" />
			<Button on:click={setEditActive} outline>▽</Button>
		</div>
	{/if}

	{#if isDoubleOpen}
		<div class={twMerge(defaultAccordion, $$props.contentClass)}>
			<slot name="edit" />
		</div>
	{/if}
</div>

<!--
  @component
  # PROPS
  open: set an item to be open by default
-->
