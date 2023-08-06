<script lang="ts">
	import FormComponent from './FormComponent.svelte';

	export let data;

	export let form;

	$: console.log('form: ', form); // { fruit: "nectarine" }
	console.log('window location: ', window.location.href);
</script>

<FormComponent />
