<script lang="ts">
	type SliderProps = { value: number };

	let { value = $bindable() }: SliderProps = $props();
</script>

<div class="group relative flex size-full justify-end overflow-hidden">
	<span
		class="absolute top-[5px] left-[9px] size-max text-[16px] font-normal tracking-[-0.06rem] text-(--secondary) transition duration-200 group-hover:text-(--accent)"
		>{value}%</span
	>
	<div
		class="h-full w-[3px] bg-(--secondary) transition duration-200 group-hover:bg-(--accent)"
	></div>
	<div
		class="h-full border-(--secondary) bg-(--border) transition duration-200 group-hover:bg-(--secondary)"
		style="width: {value / 2}%;"
	></div>
	<input
		type="range"
		class="absolute left-[-11px] h-full rotate-180 cursor-w-resize opacity-0"
		style="width: calc(100% + 16px);"
		max="200"
		bind:value
	/>
</div>
