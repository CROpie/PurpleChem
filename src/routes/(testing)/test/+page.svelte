<script lang="ts">
	let data = [
		{ one: 1, two: 2 },
		{ one: 3, two: 4 }
	];
	let data2 = [];
</script>

{#each data2 as datum}
	<p class="text-primary">{datum.one}</p>
	<p class="text-primary">{datum.two}</p>
{:else}
	<p class="text-primary">No data</p>
{/each}
