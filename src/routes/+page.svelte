<script lang="ts">
	import { Button, UserCard } from "$lib";
	import { AppContext } from "$lib/shared.svelte";

	const appState = AppContext.get();
</script>

<div class="flex size-full">
	<UserCard initial={appState.username} setter={appState.setUsername} />
	<div class="h-full w-px bg-(--border)"></div>
	<div class="flex h-full w-min flex-col">
		<Button>
			<span class="size-max">Share room</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<path
					d="M10.6667 2H2.66675V10.6667"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M5.3335 4.66602H13.3335V12.666C13.3335 13.0196 13.193 13.3588 12.943 13.6088C12.6929 13.8589 12.3538 13.9993 12.0002 13.9993H6.66683C6.31321 13.9993 5.97407 13.8589 5.72402 13.6088C5.47397 13.3588 5.3335 13.0196 5.3335 12.666V4.66602Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</Button>
		<div class="h-px w-full bg-(--border)"></div>
		<Button color="accent">
			<span class="size-max">Paste room</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<path
					d="M2 8H14M14 8L9.5 3.5M14 8L9.5 12.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</Button>
	</div>
</div>
