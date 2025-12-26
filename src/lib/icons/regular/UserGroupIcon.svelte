<script lang="ts">
	export let width: number | null | undefined = undefined;
	export let height: number | null | undefined = undefined;
	export let stroke: number | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	class={className}
	viewBox="0 0 24 24"
	stroke-width={stroke ?? 2}
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<circle cx="11.873" cy="7.651" r="3.283"
	></circle><path
		d="M 6.889 18.982 C 6.889 15.699 8.59 14.216 11.873 14.216 C 15.156 14.216 17.016 15.779 17.016 19.062"
	></path><circle
		cx="4.015"
		cy="9.652"
		r="2.462"
	></circle><circle
		cx="19.825"
		cy="9.612"
		r="2.462"
	></circle><path
		d="M 22.671 17.535 C 22.321 16.185 22.044 13.827 18.111 14.321"
	></path><path
		d="M 5.658 14.233 C 5.308 15.582 5.031 17.94 1.098 17.446"
		style="transform-box: fill-box; transform-origin: 50% 50%;"
		transform="matrix(-1, 0, 0, -1, 0.000001, 0.000001)"
	></path>
</svg>
