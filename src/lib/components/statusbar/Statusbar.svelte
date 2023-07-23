<script lang="ts">
	export let updating = false;
	export let form;
	export let test = false;
</script>

<div
	class="text-center text-complement bg-opNeutral border-2 border-primary fixed inset-x-0 bottom-0 p-4 text-lg"
>
	{#if updating}
		<p class="text-red-500">Updating...</p>
	{:else if form?.success}
		<p class="text-green-500">Updated.</p>
	{:else if form?.error}
		<p class="text-red-500">{form.error}</p>
	{:else if test}
		<p class="text-red-500">Test was success.</p>
	{:else}
		<p class="text-primary">Ready</p>
	{/if}
</div>
