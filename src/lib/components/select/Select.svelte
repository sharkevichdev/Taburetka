<script lang="ts">
	import { posInRect } from "$lib/utils";
	import { fade } from "svelte/transition";

	type SelectProps = {
		value: string;
		variant: "in" | "out";
		options: string[];
	};

	let { value = $bindable(), variant, options = $bindable() }: SelectProps = $props();

	let select = $state<HTMLDivElement>();
	let selectTrigger = $state<HTMLButtonElement>();
	let isOpen = $state(false);

	function handleOutsideClick(e: MouseEvent) {
		const selectRect = select?.getBoundingClientRect();
		const triggerRect = selectTrigger?.getBoundingClientRect();

		if (!selectRect || !triggerRect) return;
		if (
			posInRect(selectRect, e.clientX, e.clientY) ||
			posInRect(triggerRect, e.clientX, e.clientY)
		) {
			return;
		}

		isOpen = false;
	}

	$effect(() => {
		if (isOpen) {
			window.addEventListener("mousedown", handleOutsideClick);
		} else {
			window.removeEventListener("mousedown", handleOutsideClick);
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={select}
		transition:fade={{ duration: 200 }}
		class="absolute top-0 z-10 size-full px-[100px]"
		onclick={() => {
			isOpen = false;
		}}
	>
		<div
			class={[
				"flex size-full flex-col overflow-y-scroll border-x-[1px] border-(--border) bg-(--bg) text-(--primary) shadow-[0_0_100px_50px_hex(#000000)] shadow-black/60",
				options.length < 5 ? "justify-center" : "",
			]}
		>
			{#if options.length < 5}
				<div class="h-px min-h-px w-full bg-(--border)"></div>
			{/if}

			{#each options as option, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={() => {
						value = option;
					}}
					class="group relative flex h-[41px] min-h-[41px] w-full cursor-pointer items-center pr-[60px] pl-[20px] transition duration-200 hover:bg-(--border)"
				>
					<span
						class="h-max w-full truncate text-[16px] font-normal tracking-[-0.06rem] text-(--primary) group-hover:text-(--accent)"
						>{option}</span
					>
					{#if option == value}
						<svg
							width="21"
							height="21"
							viewBox="0 0 21 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="absolute right-[20px] size-[22px]"
						>
							<path
								d="M16.4851 6.75586L8.99458 14.2451L4.80469 10.0617"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="stroke-(--primary) transition duration-200 group-hover:stroke-(--accent)"
							/>
						</svg>
					{/if}
				</div>
				{#if !(i == options.length - 1) || i < 5}
					<div class="h-px min-h-px w-full bg-(--border)"></div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<button
	bind:this={selectTrigger}
	class="group relative flex size-full max-w-[50%] cursor-pointer items-center pr-[13px] pl-[45px] transition duration-200 hover:bg-(--border)"
	onclick={() => {
		isOpen = !isOpen;
	}}
>
	{#if variant == "in"}
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute left-[13px] aspect-square size-[21px]"
		>
			<path
				d="M2.66659 13.3327C2.29992 13.3327 1.98614 13.2022 1.72525 12.9413C1.46437 12.6805 1.3337 12.3665 1.33325 11.9993V10.666C1.33325 10.4771 1.39725 10.3189 1.52525 10.1913C1.65325 10.0638 1.81148 9.99979 1.99992 9.99935C2.18837 9.9989 2.34681 10.0629 2.47525 10.1913C2.6037 10.3198 2.66748 10.478 2.66659 10.666V11.9993H13.3333V3.99935H2.66659V5.33268C2.66659 5.52157 2.60259 5.68002 2.47459 5.80802C2.34659 5.93602 2.18837 5.99979 1.99992 5.99935C1.81148 5.9989 1.65325 5.9349 1.52525 5.80735C1.39725 5.67979 1.33325 5.52157 1.33325 5.33268V3.99935C1.33325 3.63268 1.46392 3.3189 1.72525 3.05802C1.98659 2.79713 2.30037 2.66646 2.66659 2.66602H13.3333C13.6999 2.66602 14.0139 2.79668 14.2753 3.05802C14.5366 3.31935 14.667 3.63313 14.6666 3.99935V11.9993C14.6666 12.366 14.5361 12.68 14.2753 12.9413C14.0144 13.2027 13.7004 13.3331 13.3333 13.3327H2.66659ZM8.11659 8.66602H1.99992C1.81103 8.66602 1.65281 8.60202 1.52525 8.47402C1.3977 8.34602 1.3337 8.18779 1.33325 7.99935C1.33281 7.8109 1.39681 7.65268 1.52525 7.52468C1.6537 7.39668 1.81192 7.33268 1.99992 7.33268H8.11659L7.19992 6.43268C7.06659 6.31046 7.00259 6.15779 7.00792 5.97468C7.01325 5.79157 7.07726 5.63313 7.19992 5.49935C7.33326 5.36602 7.4917 5.29668 7.67525 5.29135C7.85881 5.28602 8.01703 5.34979 8.14992 5.48268L10.1999 7.53268C10.3333 7.66602 10.3999 7.82157 10.3999 7.99935C10.3999 8.17713 10.3333 8.33268 10.1999 8.46602L8.14992 10.516C8.01659 10.6493 7.85837 10.716 7.67525 10.716C7.49214 10.716 7.3337 10.6493 7.19992 10.516C7.0777 10.3827 7.0137 10.2245 7.00792 10.0413C7.00214 9.85824 7.06614 9.69979 7.19992 9.56602L8.11659 8.66602Z"
				class="fill-(--primary) transition duration-200 group-hover:fill-(--accent)"
			/>
		</svg>
	{:else}
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute left-[13px] aspect-square size-[21px]"
		>
			<path
				d="M13.3334 13.3327C13.7001 13.3327 14.0139 13.2022 14.2747 12.9413C14.5356 12.6805 14.6663 12.3665 14.6667 11.9993V10.666C14.6667 10.4771 14.6027 10.3189 14.4747 10.1913C14.3467 10.0638 14.1885 9.99979 14.0001 9.99935C13.8116 9.9989 13.6532 10.0629 13.5247 10.1913C13.3963 10.3198 13.3325 10.478 13.3334 10.666V11.9993H2.66674V3.99935H13.3334V5.33268C13.3334 5.52157 13.3974 5.68002 13.5254 5.80802C13.6534 5.93602 13.8116 5.99979 14.0001 5.99935C14.1885 5.9989 14.3467 5.9349 14.4747 5.80735C14.6027 5.67979 14.6667 5.52157 14.6667 5.33268V3.99935C14.6667 3.63268 14.5361 3.3189 14.2747 3.05802C14.0134 2.79713 13.6996 2.66646 13.3334 2.66602H2.66674C2.30008 2.66602 1.98608 2.79668 1.72474 3.05802C1.46341 3.31935 1.33297 3.63313 1.33341 3.99935V11.9993C1.33341 12.366 1.46386 12.68 1.72474 12.9413C1.98563 13.2027 2.29963 13.3331 2.66674 13.3327H13.3334ZM10.7167 8.61601H5.68951C5.50063 8.61601 5.3424 8.55201 5.21485 8.42401C5.08729 8.29601 5.02329 8.13779 5.02285 7.94935C5.0224 7.7609 5.0864 7.60268 5.21485 7.47468C5.34329 7.34668 5.50151 7.28268 5.68951 7.28268H10.7167L9.80008 6.38268C9.66675 6.26046 9.60275 6.10779 9.60808 5.92468C9.61341 5.74157 9.67741 5.58313 9.80008 5.44935C9.93341 5.31601 10.0919 5.24668 10.2754 5.24135C10.459 5.23601 10.6172 5.29979 10.7501 5.43268L12.8001 7.48268C12.9334 7.61601 13.0001 7.77157 13.0001 7.94935C13.0001 8.12713 12.9334 8.28268 12.8001 8.41601L10.7501 10.466C10.6167 10.5993 10.4585 10.666 10.2754 10.666C10.0923 10.666 9.93386 10.5993 9.80008 10.466C9.67786 10.3327 9.61386 10.1745 9.60808 9.99135C9.6023 9.80824 9.6663 9.64979 9.80008 9.51602L10.7167 8.61601Z"
				class="fill-(--primary) transition duration-200 group-hover:fill-(--accent)"
			/>
		</svg>
	{/if}
	<span
		class="truncate text-[16px] font-normal tracking-[-0.06rem] text-(--primary) transition duration-200 group-hover:text-(--accent)"
	>
		{value}
	</span>
</button>

<style lang="postcss">
	::-webkit-scrollbar-thumb {
		@apply hidden;
	}

	::-webkit-scrollbar {
		@apply hidden;
	}
</style>
