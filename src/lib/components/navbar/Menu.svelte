<script>
	export let size = '24';
	export let color = 'currentColor';
	let svgpath = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
	let viewBox = '0 0 24 24';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	role="button"
	tabindex="0"
	width={size}
	height={size}
	class={$$props.class}
	{...$$restProps}
	fill="none"
	{viewBox}
	stroke-width="2"
	on:click
>
	{@html svgpath}
</svg>
