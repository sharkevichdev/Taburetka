<script lang="ts">
	import { app } from "$lib/shared.svelte";
	import { getCurrentWindow } from "@tauri-apps/api/window";

	const appWindow = getCurrentWindow();
</script>

<div
	data-tauri-drag-region
	class="flex h-min w-full items-center justify-between border-b-[1px] border-(--border) p-[17px]"
>
	<div class="flex items-center gap-[16px]">
		<span class="size-max text-[21px] font-semibold tracking-[-0.03rem] text-(--primary)"
			>{window.location.href.match(/settings/) ? "Settings" : "Taburetka"}</span
		>
		{#if app.ping > 0}
			<span class="size-max text-[16px] font-normal tracking-[-0.03rem] text-(--secondary)"
				>{app.ping}ms</span
			>
		{/if}
	</div>
	<div class="flex size-max gap-[11px]">
		{#if !window.location.href.match(/settings/)}
			<button
				onclick={() => (window.location.href = "/settings")}
				class="size-[26px] cursor-pointer"
				aria-label="Settings"
			>
				<svg
					width="26"
					height="26"
					viewBox="0 0 26 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="size-full stroke-(--secondary) transition duration-200 hover:stroke-(--accent)"
				>
					<path
						d="M14.995 17.9891H6.01709M19.9827 8.01367H11.0048"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M17.9877 20.9813C19.6405 20.9813 20.9804 19.6415 20.9804 17.9887C20.9804 16.3359 19.6405 14.9961 17.9877 14.9961C16.335 14.9961 14.9951 16.3359 14.9951 17.9887C14.9951 19.6415 16.335 20.9813 17.9877 20.9813Z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.0124 11.0067C9.66518 11.0067 11.005 9.66689 11.005 8.01411C11.005 6.36133 9.66518 5.02148 8.0124 5.02148C6.35962 5.02148 5.01978 6.36133 5.01978 8.01411C5.01978 9.66689 6.35962 11.0067 8.0124 11.0067Z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{:else}
			<button
				onclick={() => (window.location.href = app.inCall ? "/call" : "/")}
				class="size-[26px] cursor-pointer"
				aria-label="Back"
			>
				<svg
					width="26"
					height="26"
					viewBox="0 0 26 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="size-full stroke-(--secondary) transition duration-200 hover:stroke-(--accent)"
				>
					<path
						d="M22.75 13H3.25M3.25 13L10.5625 5.6875M3.25 13L10.5625 20.3125"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}

		<button
			class="size-[26px] cursor-pointer"
			aria-label="Minimize"
			onclick={() => {
				appWindow.minimize();
			}}
		>
			<svg
				width="26"
				height="26"
				viewBox="0 0 26 26"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-full stroke-(--secondary) transition duration-200 hover:stroke-(--accent)"
			>
				<path d="M5.4165 13H20.5832" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
		<button
			class="size-[26px] cursor-pointer"
			aria-label="Close"
			onclick={() => {
				appWindow.close();
			}}
		>
			<svg
				width="26"
				height="26"
				viewBox="0 0 26 26"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-full stroke-(--secondary) transition duration-200 hover:stroke-(--accent)"
			>
				<path
					d="M20.5807 20.5831L5.41943 5.42188M20.5807 5.42188L5.41943 20.5831"
					stroke-linecap="round"
				/>
			</svg>
		</button>
	</div>
</div>
