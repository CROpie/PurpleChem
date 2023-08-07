<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import QueryDataTable from './QueryDataTable.svelte';

	export let data;
	const { supabase } = data;
</script>

<Heading tag="h2" class="text-center mt-3">Query Database</Heading>

<QueryDataTable {supabase} />
