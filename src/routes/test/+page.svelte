<script lang="ts">
	import Comp1 from './comp1.svelte';
	import Comp2 from './comp2.svelte';

	const initialComponentState = {
		showComp1: true,
		showComp2: true
	};

	let componentState = { ...initialComponentState };
</script>

<button on:click={() => (componentState.showComp1 = !componentState.showComp1)}>TOGGLE 1</button>
<button on:click={() => (componentState.showComp2 = !componentState.showComp2)}>TOGGLE 2</button>
<button on:click={() => (componentState = { ...initialComponentState })}>RESET</button>
{#if componentState.showComp1}
	<Comp1 />
{/if}

{#if componentState.showComp2}
	<Comp2 />
{/if}
