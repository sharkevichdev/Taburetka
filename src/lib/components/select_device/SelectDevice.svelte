<script lang="ts">
	import { Select, Slider } from "$lib";

	type SelectDeviceProps = {
		selected: string;
		variant: "in" | "out";
		options: string[];
		value: number;
	};

	let {
		selected = $bindable(),
		variant,
		options = $bindable(),
		value = $bindable(),
	}: SelectDeviceProps = $props();
</script>

<div class="flex size-full">
	<Select {variant} bind:value={selected} bind:options />
	<div class="h-full w-px bg-(--border)"></div>
	<Slider bind:value />
</div>
