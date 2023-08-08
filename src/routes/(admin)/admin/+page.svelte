<script>
	import Heading from '$lib/components/typography/Heading.svelte';
	import Button from '$lib/components/button/Button.svelte';
</script>

<Heading tag="h2" class="text-center mt-3">Secret Admin Area</Heading>

<div class="flex flex-col gap-2 mx-8 mt-4">
	<Button href="addUser">Add a New User</Button>
	<Button href="modifyuser">Modify Users</Button>
	<Button href="modifychemical">Modify Chemical Data</Button>
	<Button href="modifyorder">Modify Order</Button>
	<Button href="status">Change Status of Orders</Button>
	<Button href="addCSV">Add Orders via CSV File</Button>
</div>
