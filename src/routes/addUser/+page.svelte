<script lang="ts">
	import { Button } from '$lib/components/button/button';

	export let data;
	let { supabase } = data;

	const addUser = async () => {
		const { data, error } = await supabase.auth.signUp({
			email: 'leah@purplechem.com',
			password: 'default',
			options: {
				data: {
					first_name: 'Leah',
					age: 29,
					role: 'admin'
				}
			}
		});
	};
</script>

<Button on:click={addUser} />
