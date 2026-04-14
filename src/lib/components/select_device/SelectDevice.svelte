<script lang="ts">
	import { Select, Slider } from "$lib";

	type SelectDeviceProps = {
		selectedGetter: () => [string, string] | undefined;
		selectedSetter: (value: string) => void;
		volumeSetter: (value: number) => void;
		optionsGetter: () => Promise<[string, string][]>;
		volumeInitial: number;
		variant: "in" | "out";
	};

	let {
		selectedGetter,
		selectedSetter,
		volumeSetter,
		optionsGetter,
		volumeInitial,
		variant,
	}: SelectDeviceProps = $props();

	let volume = $state(volumeInitial);

	$effect(() => {
		volumeSetter(volume);
	});
</script>

<div class="flex size-full">
	<Select {variant} {selectedSetter} {selectedGetter} {optionsGetter} />
	<div class="h-full w-px bg-(--border)"></div>
	<Slider bind:volume />
</div>
