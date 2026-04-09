<script lang="ts">
	import { Header } from "$lib";
	import { app } from "$lib/shared.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<div class="flex size-full flex-col text-(--accent)">
	<Header />
	<div class="flex size-full flex-col">
		{@render children?.()}
	</div>
</div>
