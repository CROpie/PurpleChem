<script>
	import Button from '$lib/components/button/Button.svelte';
	export let data;
	const { supabase } = data;

	// async function fetchplz() {
	// 	const { data, error } = await supabase
	// 		.from('orders')
	// 		.select('chemicalID ( chemicalName, CAS), supplierID ( id, supplierName) ');
	// 	console.log('data: ', data, 'error: ', error);
	// }

	async function fetchplz() {
		const { data, error } = await supabase.from('orders').select('id').eq('id', 1);
		console.log('data: ', data, 'error: ', error);
	}
</script>

<Button on:click={fetchplz} outline>FetchParams</Button>
