<script>
	import Heading from '$lib/components/typography/Heading.svelte';
	import Button from '$lib/components/button/Button.svelte';
</script>

<Heading tag="h2" class="text-center mt-3">Secret Admin Area</Heading>

<div class="flex flex-col gap-2 mx-8 mt-4">
	<Button outline href="updateStatus" class="mb-4">Update Order Status</Button>
	<Button outline href="addUser">Add a New User</Button>
	<Button outline href="addSupplier" class="mb-4">Add a New Supplier</Button>
	<Button outline href="modifyUser">Modify Users</Button>
	<Button outline href="modifySupplier">Modify Suppliers</Button>
	<Button outline href="modifyChemical">Modify Chemical Data</Button>
	<Button outline href="modifyOrder" class="mb-4">Modify Order</Button>

	<Button outline href="addCSV">Add Orders via CSV File</Button>
</div>
