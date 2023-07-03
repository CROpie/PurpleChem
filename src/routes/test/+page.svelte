<script lang="ts">
	import { Input } from 'flowbite-svelte';

	let display = '';
</script>

<p>{display}</p>

<label for="test">Hello</label>
<Input id="test" bind:value={display} type="text" class="bg-red-500" />
