<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { supabase } = data;

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};

	handleSignOut();
</script>
