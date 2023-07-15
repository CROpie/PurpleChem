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
	}

	// look to see if the active component id matches the component id
	$: isOpen = $activeComponentId === componentId;
	$: isDoubleOpen = $activeEditComponentId === editComponentId;

	// styling
	let outline = getContext('outline');
	let defaultAccordion = 'w-full flex flex-col gap-2 justify-between rounded-lg py-1';

	const outlineClass = 'border-2 text-complement border-primary bg-transparent';
	const fillClass = 'text-complement bg-primary';

	// removed odd/even (striped)
	// const outlineClass =
	// 	'border-2 text-complement odd:border-primary even:border-primaryLight bg-transparent';
	// const fillClass = 'text-complement odd:bg-primary even:bg-primaryLight';

	const outlineContentClass = 'text-primary border-0 border-t-2 border-dashed border-primaryLight';
	const fillContentClass = 'text-neutral border-0 border-t-2 border-dashed border-primaryLight';
</script>

<div class={twMerge(defaultAccordion, outline ? outlineClass : fillClass, $$props.class)}>
	<button on:click={setActive} class={twMerge('text-complement', $$props.titleClass)}>
		<slot name="title" />
	</button>

	{#if isOpen}
		<div
			class={twMerge(
				'flex flex-col gap-4',
				outline ? outlineContentClass : fillContentClass,
				$$props.contentClass
			)}
		>
			<slot name="content" />
			<Button
				on:click={setEditActive}
				outline
				class={twMerge('border-0', outline ? 'text-primary' : 'text-neutral')}>▽</Button
			>
		</div>
	{/if}

	{#if isDoubleOpen}
		<div class={twMerge('', outline ? outlineContentClass : fillContentClass, $$props.editClass)}>
			<slot name="edit" />
		</div>
	{/if}
</div>

<!--
  @component
  # PROPS
  open: set an item to be open by default
-->
