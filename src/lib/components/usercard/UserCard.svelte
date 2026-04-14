<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	const userCard = tv({
		base: "flex h-full items-center justify-center gap-[13px] text-[21px] font-medium tracking-[-0.03rem] text-(--primary) transition-all duration-200",
		variants: {
			variant: {
				default: "w-full border-l-[3px] px-[40px]",
				me: "w-1/2 border-r-[1px] border-l-[3px] border-r-(--border) px-[20px]",
				other: "w-1/2 border-r-[3px] px-[20px]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	type UserCardVariants = VariantProps<typeof userCard>;

	type UserCardProps = {
		variant?: UserCardVariants["variant"];
		mic?: boolean;
		hp?: boolean;
		speaking?: boolean;
		initial: string;
		setter: (value: string) => void;
	};
</script>

<script lang="ts">
	let {
		variant = "default",
		mic = $bindable(true),
		hp = $bindable(true),
		speaking = false,
		initial,
		setter,
	}: UserCardProps = $props();

	let windowInFocus = $state(true);

	let input: HTMLInputElement | null = $state(null);
	let value = $state(initial);
</script>

<div
	class={[
		userCard({ variant }),
		(!(variant == "default") && speaking) || (variant == "default" && windowInFocus)
			? "border-(--accent)"
			: "border-(--border)/0",
	]}
>
	<div
		class={[
			"aspect-square size-[48px] rounded-full bg-(--primary) transition duration-200",
			variant != "other" ? "cursor-pointer hover:bg-(--accent)" : "",
		]}
	></div>
	{#if variant != "other"}
		<input
			bind:this={input}
			type="text"
			placeholder="Your username..."
			maxlength="20"
			required
			bind:value
			class={[
				"h-min w-full truncate border-b-[1px] transition duration-200 placeholder:text-[21px] placeholder:text-(--secondary) hover:text-(--accent) focus:text-(--accent) focus:ring-0 focus:outline-none",
				!value.length
					? "border-(--red)"
					: "border-(--secondary)/0 hover:border-(--secondary) focus:border-(--primary)",
			]}
			onkeydown={(e) => {
				if ((e.key === "Enter" || e.key === "Escape" || e.key == "Esc") && value.length) {
					input?.blur();
				}
			}}
			onfocusout={() => {
				if (value.length) {
					setter(value);
				}
			}}
		/>
	{:else}
		<span class="h-min w-full truncate">{value}</span>
	{/if}
	<div class="flex size-max gap-[7px]">
		{#if !mic}
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
							d="M10.6667 3.97331C10.6667 2.50064 9.47275 1.30664 8.00008 1.30664C6.52741 1.30664 5.33341 2.50064 5.33341 3.97331V6.61331C5.33341 8.08597 6.52741 9.27997 8.00008 9.27997C9.47275 9.27997 10.6667 8.08597 10.6667 6.61331V3.97331Z"
							class="fill-(--secondary)"
						/>
						<path
							d="M12.6667 6.61328C12.6667 9.19061 10.5774 11.2799 8.00008 11.2799C5.42275 11.2799 3.33342 9.19061 3.33342 6.61328"
							stroke-width="1.33333"
							stroke-linecap="round"
							class="stroke-(--secondary)"
						/>
						<path
							d="M8.66675 11.2806C8.66675 11.0966 8.51741 10.9473 8.33341 10.9473H7.66675C7.48275 10.9473 7.33341 11.0966 7.33341 11.2806V13.9473C7.33341 14.1313 7.48275 14.2806 7.66675 14.2806H8.33341C8.51741 14.2806 8.66675 14.1313 8.66675 13.9473V11.2806Z"
							class="fill-(--secondary)"
						/>
						<path
							d="M6.00008 13.2793C5.63208 13.2793 5.33341 13.578 5.33341 13.946C5.33341 14.314 5.63208 14.6126 6.00008 14.6126H10.0001C10.3681 14.6126 10.6667 14.314 10.6667 13.946C10.6667 13.578 10.3681 13.2793 10.0001 13.2793H6.00008Z"
							class="fill-(--secondary)"
						/>
					</g>
					<path
						d="M1.33325 14.6654L14.6666 1.33203"
						stroke-width="1.33333"
						stroke-linecap="round"
						class="stroke-(--secondary)"
					/>
				</g>
				<defs>
					<clipPath id="clip0_595_9191">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{/if}
		{#if !hp}
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
							class="fill-(--secondary)"
						/>
					</g>
					<path
						d="M1.3335 14.6654L14.6668 1.33203"
						stroke-width="1.33333"
						stroke-linecap="round"
						class="stroke-(--secondary)"
					/>
				</g>
				<defs>
					<clipPath id="clip0_595_9241">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{/if}
	</div>
</div>
