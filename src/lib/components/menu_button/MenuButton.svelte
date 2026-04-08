<script lang="ts">
	type MenuButtonProps = {
		variant?: "mic" | "hp" | "exit";
		isOn?: boolean;
		onclick?: () => void;
	};

	let { variant, isOn = $bindable(true), onclick }: MenuButtonProps = $props();
</script>

<button
	class={[
		"group flex h-max w-full cursor-pointer items-center justify-center py-[15px] transition duration-200",
		variant != "exit" ? "hover:bg-(--border)" : "hover:bg-(--red)",
	]}
	{onclick}
>
	{#if variant == "mic"}
		{#if isOn}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<path
					d="M12.6683 6.61133C12.6683 9.18866 10.579 11.278 8.00163 11.278C5.42429 11.278 3.33496 9.18866 3.33496 6.61133"
					stroke-width="1.33333"
					stroke-linecap="round"
					class="stroke-(--secondary) transition duration-200 group-hover:stroke-(--accent)"
				/>
				<path
					d="M10.6683 3.97331C10.6683 2.50064 9.47429 1.30664 8.00163 1.30664C6.52896 1.30664 5.33496 2.50064 5.33496 3.97331V6.61331C5.33496 8.08597 6.52896 9.27997 8.00163 9.27997C9.47429 9.27997 10.6683 8.08597 10.6683 6.61331V3.97331Z"
					class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
				/>
				<path
					d="M8.66833 11.2795C8.66833 11.0955 8.519 10.9462 8.335 10.9462H7.66833C7.48433 10.9462 7.335 11.0955 7.335 11.2795V13.2788H8.66833V11.2795Z"
					class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
				/>
				<path
					d="M6.00163 13.2788C5.63363 13.2788 5.33496 13.5775 5.33496 13.9455C5.33496 14.3135 5.63363 14.6121 6.00163 14.6121H10.0016C10.3696 14.6121 10.6683 14.3135 10.6683 13.9455C10.6683 13.5775 10.3696 13.2788 10.0016 13.2788H6.00163Z"
					class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
				/>
			</svg>
		{:else}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<g clip-path="url(#clip0_595_9191)">
					<mask
						id="mask0_595_9191"
						style="mask-type:luminance"
						maskUnits="userSpaceOnUse"
						x="-1"
						y="-1"
						width="18"
						height="18"
					>
						<path d="M16 -0.00195312H0V15.998H16V-0.00195312Z" fill="white" />
						<path
							d="M12.8326 0.340531L0.418627 12.846C0.418627 12.846 -1.28636 14.6455 0.0303602 15.969C1.46671 17.4126 3.19151 15.6008 3.19151 15.6008L15.6055 3.09536C15.6055 3.09536 17.8134 0.905971 16.4324 -0.415469C15.0609 -1.72795 12.8326 0.340531 12.8326 0.340531Z"
							fill="black"
						/>
						<path d="M13.2802 5.46484H11.7869V7.43818H13.2802V5.46484Z" fill="white" />
					</mask>
					<g mask="url(#mask0_595_9191)">
						<path
							d="M12.6683 6.61133C12.6683 9.18866 10.579 11.278 8.00163 11.278C5.42429 11.278 3.33496 9.18866 3.33496 6.61133"
							stroke-width="1.33333"
							stroke-linecap="round"
							class="stroke-(--secondary) transition duration-200 group-hover:stroke-(--accent)"
						/>
						<path
							d="M10.6683 3.97331C10.6683 2.50064 9.47429 1.30664 8.00163 1.30664C6.52896 1.30664 5.33496 2.50064 5.33496 3.97331V6.61331C5.33496 8.08597 6.52896 9.27997 8.00163 9.27997C9.47429 9.27997 10.6683 8.08597 10.6683 6.61331V3.97331Z"
							class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
						/>
						<path
							d="M8.66833 11.2795C8.66833 11.0955 8.519 10.9462 8.335 10.9462H7.66833C7.48433 10.9462 7.335 11.0955 7.335 11.2795V13.2788H8.66833V11.2795Z"
							class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
						/>
						<path
							d="M6.00163 13.2788C5.63363 13.2788 5.33496 13.5775 5.33496 13.9455C5.33496 14.3135 5.63363 14.6121 6.00163 14.6121H10.0016C10.3696 14.6121 10.6683 14.3135 10.6683 13.9455C10.6683 13.5775 10.3696 13.2788 10.0016 13.2788H6.00163Z"
							class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
						/>
					</g>
					<path
						d="M1.33325 14.6654L14.6666 1.33203"
						stroke-width="1.33333"
						stroke-linecap="round"
						class="stroke-(--secondary) transition-all duration-200 group-hover:stroke-(--accent)"
					/>
				</g>
				<defs>
					<clipPath id="clip0_595_9191">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{/if}
	{:else if variant == "hp"}
		{#if isOn}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<path
					d="M2.4582 8.00169C2.4582 4.93855 4.94172 2.45503 8.00487 2.45503C11.068 2.45503 13.5515 4.93855 13.5515 8.00169C13.5515 8.48217 13.5196 8.94463 13.4503 9.38836H12.1649C11.5104 9.38836 10.894 9.69689 10.5009 10.2204L9.13292 12.0438C8.80775 12.4779 8.72316 13.0464 8.90897 13.556C9.31457 14.6716 10.6999 15.3344 11.8057 14.5329C14.1332 12.8474 14.9382 10.5448 14.9382 8.00169C14.9382 4.17241 11.8341 1.06836 8.00487 1.06836C4.17559 1.06836 1.07153 4.17241 1.07153 8.00169C1.07153 10.5448 1.87649 12.8474 4.20401 14.5329C5.30988 15.3344 6.69516 14.6716 7.10076 13.556C7.28657 13.0464 7.20199 12.4779 6.87681 12.0438L5.50887 10.2204C5.11575 9.69689 4.49937 9.38836 3.84487 9.38836H2.55943C2.49009 8.94463 2.4582 8.48217 2.4582 8.00169Z"
					class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
				/>
			</svg>
		{:else}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="size-[21px]"
			>
				<g clip-path="url(#clip0_595_9241)">
					<mask
						id="mask0_595_9241"
						style="mask-type:luminance"
						maskUnits="userSpaceOnUse"
						x="-1"
						y="-2"
						width="19"
						height="19"
					>
						<path d="M16 -0.00390625H0V15.9961H16V-0.00390625Z" fill="white" />
						<path
							d="M13.0258 0.0327458L0.115255 13.0384C0.115255 13.0384 -1.65793 14.9099 -0.288543 16.2863C1.20526 17.7877 2.99905 15.9034 2.99905 15.9034L15.9096 2.89777C15.9096 2.89777 18.2058 0.620803 16.7696 -0.753494C15.3432 -2.11847 13.0258 0.0327458 13.0258 0.0327458Z"
							fill="black"
						/>
					</mask>
					<g mask="url(#mask0_595_9241)">
						<path
							d="M2.45332 7.99583C2.45332 4.93269 4.93684 2.44917 7.99998 2.44917C11.0631 2.44917 13.5467 4.93269 13.5467 7.99583C13.5467 8.47631 13.5148 8.93877 13.4454 9.3825H12.16C11.5055 9.3825 10.8891 9.69103 10.496 10.2145L9.12804 12.038C8.80286 12.472 8.71828 13.0405 8.90409 13.5501C9.30969 14.6657 10.695 15.3285 11.8008 14.527C14.1284 12.8415 14.9333 10.539 14.9333 7.99583C14.9333 4.16655 11.8293 1.0625 7.99998 1.0625C4.1707 1.0625 1.06665 4.16655 1.06665 7.99583C1.06665 10.539 1.87161 12.8415 4.19913 14.527C5.305 15.3285 6.69028 14.6657 7.09588 13.5501C7.28169 13.0405 7.1971 12.472 6.87193 12.038L5.50398 10.2145C5.11086 9.69103 4.49449 9.3825 3.83998 9.3825H2.55454C2.48521 8.93877 2.45332 8.47631 2.45332 7.99583Z"
							class="fill-(--secondary) transition duration-200 group-hover:fill-(--accent)"
						/>
					</g>
					<path
						d="M1.3335 14.6654L14.6668 1.33203"
						stroke-width="1.33333"
						stroke-linecap="round"
						class="stroke-(--secondary) transition-all duration-200 group-hover:stroke-(--accent)"
					/>
				</g>
				<defs>
					<clipPath id="clip0_595_9241">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{/if}
	{:else if variant == "exit"}
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="size-[21px]"
		>
			<path
				d="M14.2234 6.78153C10.79 3.34886 5.22405 3.34886 1.79138 6.78153C0.20605 8.36753 0.432716 10.3962 1.62938 11.5929C1.79938 11.7629 2.06072 11.8022 2.27338 11.6895L5.15338 10.1649C5.41938 10.0242 5.54472 9.71153 5.44938 9.4262L4.96138 7.96286C6.78338 6.66153 9.23072 6.66153 11.0527 7.96286L10.5434 9.8322C10.462 10.1315 10.616 10.4449 10.9027 10.5629L13.7574 11.7382C13.9641 11.8235 14.202 11.7755 14.36 11.6175C15.5547 10.4229 15.806 8.3642 14.2234 6.78153Z"
				class="fill-(--red) transition duration-200 group-hover:fill-(--bg)"
			/>
		</svg>
	{:else}
		WTF?
	{/if}
</button>
