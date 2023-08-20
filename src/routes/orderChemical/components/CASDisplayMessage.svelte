<script lang="ts">
	export let searchingCAS: boolean;
	export let invalidCAS: boolean;
	export let CASnotFound: boolean;
	export let CASfound: boolean;
</script>

{#if searchingCAS}
	<p class="text-orange-500">Searching...</p>
{/if}
{#if invalidCAS}
	<p class="text-red-500">Please enter a valid CAS number.</p>
{/if}
{#if CASnotFound}
	<p class="text-red-500">No information from this CAS number was obtained.</p>
	<p class="text-red-500">
		<span class="text-complement">Chemical Name</span> will need to be added manually.
	</p>
	<p class="text-red-500">
		<span class="text-complement">Structure</span> and
		<span class="text-complement">Physical Properties</span> may be added manually.
	</p>
{/if}
{#if CASfound}
	<p class="text-green-500">
		Success: physical and structural properties have been imported automatically.
	</p>
{/if}
