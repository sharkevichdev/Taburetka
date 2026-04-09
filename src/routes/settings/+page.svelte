<script lang="ts">
	import { Select, Slider, SelectDevice } from "$lib";
	import { app } from "$lib/shared.svelte";
	import { invoke } from "@tauri-apps/api/core";

	type AudioDeviceInfo = {
		name: string;
		id: string | null;
		driver: string | null;
		direction: number;
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

	function moveSelectedToFront(list: AudioDeviceInfo[]) {
		const index = list.findIndex((d) => app.inDevice);

		if (index > 0) {
			[list[0], list[index]] = [list[index], list[0]];
		}

		return list;
	}

	function formatDevices(devices: AudioDeviceInfo[]) {
		return moveDefaultToFront(devices).map((d) => {
			const name = `${d.name}${d.driver ? ` (${d.driver})` : ""}`.trim().replace(/\s+/g, " ");
			return d.is_default ? `Default (${name})` : name;
		});
	}

	async function getDevices() {
		const devices = await invoke<AudioDeviceInfo[]>("list_audio_devices");

		inDeviceOptions = formatDevices(devices.filter((d) => !d.direction));
		outDeviceOptions = formatDevices(devices.filter((d) => d.direction));
	}

	getDevices();
</script>

<div class="flex size-full flex-col text-(--accent)">
	<div class="flex size-full flex-col">
		<SelectDevice
			bind:selected={app.inDevice}
			variant="in"
			bind:options={inDeviceOptions}
			bind:value={app.micVolume}
		/>
		<div class="h-px w-full bg-(--border)"></div>
		<SelectDevice
			bind:selected={app.outDevice}
			variant="out"
			bind:options={outDeviceOptions}
			bind:value={app.hpVolume}
		/>
	</div>
</div>
