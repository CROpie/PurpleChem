<script lang="ts">
	let todos = [];
	$: todos;

	async function getTodos() {
		const response = await fetch('http://localhost:5268/api/Chemicals', {});
		console.log(response);
		todos = await response.json();
	}
</script>

<button on:click={getTodos} class="text-primary">Get Chems</button>

{#if todos}
	{#each todos as todo (todo.id)}
		<p class="text-primary">{todo.name}</p>
	{/each}
{/if}
