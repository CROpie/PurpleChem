<script lang="ts">
	import { csvParse } from 'd3-dsv';

	import { Input, Fileupload } from '$lib/components/form/formAll';
	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';

	let csvFile: FileList;
	let data: any;

	function getData() {
		console.log('hello');
		const input = csvFile[0];
		console.log(input);
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

<!-- <Fileupload type="file" accept=".csv" bind:files={csvFile} class="text-primary-500 mt-6" /> -->
<input type="file" bind:files={csvFile} accept=".csv" />
<Button type="button" on:click={getData} outline class="w-full mt-6">Load</Button>

<form method="POST" action="?/inputCSV">
	<input type="hidden" name="csvData" bind:value={data} />
	<Button type="submit" outline class="w-full mt-6">Submit</Button>
</form>