<script lang="ts">
	import { csvParse } from 'd3-dsv';

	import { Input } from '$lib/components/form/Input';
	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';
	import { Fileupload } from 'flowbite-svelte';

	let csvFile: FileList;
	let data: any;

	function getData() {
		const input = csvFile[0];
		const reader = new FileReader();

		reader.onload = (event) => {
			const text = event.target?.result;
			data = csvParse(text);
			data = JSON.stringify(data);
			console.log('Retrieved data: ', data);
		};
		reader.readAsText(input);
	}
</script>

<Heading tag="h2" class="text-center mt-3">Import CSV</Heading>
<Fileupload type="file" accept=".csv" bind:files={csvFile} class="text-primary-500 mt-6" />
<Button type="button" on:click={getData} outline class="w-full mt-6">Load</Button>

<form method="POST" action="?/inputCSV">
	<Input type="hidden" name="csvData" bind:value={data} />
	<Button type="submit" outline class="w-full mt-6">Submit</Button>
</form>
