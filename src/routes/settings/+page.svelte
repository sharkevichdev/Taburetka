<script lang="ts">
	import { Select, Slider } from "$lib";
	import { app } from "$lib/shared.svelte";
	import { invoke } from "@tauri-apps/api/core";

	type AudioDeviceInfo = {
		name: string;
		id: string | null;
		is_input: boolean;
		is_default: boolean;
	};

	let inDeviceOptions = $state<string[]>([]);
	let outDeviceOptions = $state<string[]>([]);

	function moveDefaultToFront(list: AudioDeviceInfo[]) {
		const index = list.findIndex((d) => d.is_default);

		if (index > 0) {
			[list[0], list[index]] = [list[index], list[0]];
		}

		return list;
	}

	async function get_devices() {
		const devices = await invoke<AudioDeviceInfo[]>("list_audio_devices");

		inDeviceOptions = moveDefaultToFront(devices.filter((d) => d.is_input)).map((d) =>
			d.is_default ? `Default (${d.name})` : d.name,
		);

		outDeviceOptions = moveDefaultToFront(devices.filter((d) => !d.is_input)).map((d) =>
			d.is_default ? `Default (${d.name})` : d.name,
		);
	}

	get_devices();
</script>

<div class="flex size-full flex-col text-(--accent)">
	<div class="flex size-full flex-col">
		<div class="flex size-full">
			<Select variant="in" bind:value={app.inDevice} bind:options={inDeviceOptions} />
			<div class="h-full w-[1px] bg-(--border)"></div>
			<Slider bind:value={app.micVolume} />
		</div>
		<div class="h-[1px] w-full bg-(--border)"></div>
		<div class="flex size-full">
			<Select variant="out" bind:value={app.outDevice} bind:options={outDeviceOptions} />
			<div class="h-full w-[1px] bg-(--border)"></div>
			<Slider bind:value={app.hpVolume} />
		</div>
	</div>
</div>
