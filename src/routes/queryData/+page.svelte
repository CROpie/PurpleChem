<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import QueryDataTable from './QueryDataTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	const { supabase } = data;
</script>

<Heading tag="h2" class="text-center mt-3">Search Database</Heading>

<QueryDataTable {supabase} />
