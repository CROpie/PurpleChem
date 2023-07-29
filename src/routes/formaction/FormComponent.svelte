<script lang="ts">
	let banana = '';
	import { deserialize, enhance } from '$app/forms';

	let form;
	let waiting = false;

	function handleSubmit() {
		return async ({ result, update }) => {
			form = result.data;
			update();
		};
	}

	// async function handleSubmit(event) {
	// 	waiting = true;
	// 	const data = new FormData(this);
	// 	const response = await fetch(this.action, {
	// 		method: 'POST',
	// 		body: data
	// 	});
	// 	const jas = await response.json();
	// 	console.log('jas: ', jas);

	// 	const result = deserialize(await response.text());
	// 	form = result.data;
	// 	console.log('form: ', form);
	// 	waiting = false;
	// }
</script>

<form method="POST" action="?/test" use:enhance={handleSubmit}>
	<!-- <form method="POST" action="?/test" on:submit|preventDefault={handleSubmit}> -->
	<input
		class="border-2 border-red-500 text-lg"
		name="fruit"
		bind:value={banana}
		data-testid="inputFruit"
	/>
	<button type="submit" data-testid="button">Submit</button>
</form>

{#if form}
	<p>fruit: {form.fruit}</p>
{/if}
{#if waiting}
	<p>Waiting...</p>
{/if}
