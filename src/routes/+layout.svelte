<script lang="ts">
	import { Header } from "$lib";
	import { AppState } from "$lib/shared.svelte";
	import "../app.css";

	const appState = AppState.create();
	appState.init();

	let { children } = $props();
</script>

<div class="flex size-full flex-col text-(--accent)">
	<Header />
	<div class="flex size-full flex-col">
		{#await appState.init() then}
			{@render children?.()}
		{/await}
	</div>
</div>
