<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	import type { Writable } from 'svelte/store';

	type ActiveId = string | null;
	type ActiveIdContext = Writable<ActiveId>;

	// all this can be replaced by a link to context.ts
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	const activeComponentId = writable<ActiveId>(null);
	setContext<ActiveIdContext>('active', activeComponentId);

	const activeEditComponentId = writable<ActiveId>(null);
	setContext<ActiveIdContext>('activeEdit', activeEditComponentId);

	let defaultDivStyle =
		'w-full p-2 text-black dark:bg-primaryA-600 border-4 border-white rounded-lg';
</script>

<div class={twMerge(defaultDivStyle)}>
	<slot />
</div>

<!--
  @component
  Contains a button which will open up a third tab underneath the second
  # PROPS
-->
