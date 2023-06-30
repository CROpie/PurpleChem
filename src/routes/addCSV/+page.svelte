<script lang="ts">
	import { csvParse } from 'd3-dsv';
	import { enhance } from '$app/forms';

	let csvFile;
	let data;

	function getData() {
		const input = csvFile[0];
		const reader = new FileReader();

		reader.onload = (event) => {
			const text = event.target.result;
			data = csvParse(text);
			data = JSON.stringify(data);
			console.log('Retrieved data: ', data);
		};
		reader.readAsText(input);
	}
</script>

<input type="file" accept=".csv" bind:files={csvFile} />
<button type="button" on:click={getData}>Load</button>
<br />

<form method="POST" action="?/inputCSV">
	<input type="hidden" name="csvData" bind:value={data} />
	<button type="submit">Submit</button>
</form>
