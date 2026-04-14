<script lang="ts">
	import { SelectDevice } from "$lib";
	import { AppContext } from "$lib/shared.svelte";

	const appState = AppContext.get();
</script>

<div class="flex size-full flex-col text-(--accent)">
	<div class="flex size-full flex-col">
		<SelectDevice
			variant="in"
			selectedSetter={appState.setInputDevice}
			volumeSetter={appState.setInputVolume}
			selectedGetter={appState.getInputDevice}
			optionsGetter={appState.deviceManager.getInputOptions}
			volumeInitial={appState.deviceManager.inputDeviceSelector.volume}
		/>
		<div class="h-px w-full bg-(--border)"></div>
		<SelectDevice
			variant="out"
			selectedSetter={appState.setOutputDevice}
			volumeSetter={appState.setOutputVolume}
			selectedGetter={appState.getOutputDevice}
			optionsGetter={appState.deviceManager.getOutputOptions}
			volumeInitial={appState.deviceManager.outputDeviceSelector.volume}
		/>
	</div>
</div>
