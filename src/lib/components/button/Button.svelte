<script lang="ts" module>
	import type { WithChildren, WithoutChildren } from "$lib/types";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	const button = tv({
		base: "flex size-full items-center justify-center gap-[7px] stroke-(--secondary) px-[20px] text-[17px] font-normal tracking-[-0.03rem] text-(--secondary) transition duration-200",
		variants: {
			color: {
				default:
					"hover:bg-(--border) hover:fill-(--accent) hover:stroke-(--accent) hover:text-(--accent)",
				accent: "hover:bg-(--accent) hover:fill-(--border) hover:stroke-(--border) hover:text-(--border)",
			},
		},
		defaultVariants: {
			color: "default",
		},
	});

	type ButtonVariants = VariantProps<typeof button>;

	type AnchorElement = WithChildren &
		WithoutChildren<Omit<HTMLAnchorAttributes, "href" | "type">> & {
			href: HTMLAnchorAttributes["href"];
			type?: never;
		};

	type ButtonElement = WithChildren &
		WithoutChildren<Omit<HTMLButtonAttributes, "type" | "href">> & {
			type?: HTMLButtonAttributes["type"];
			href?: never;
		};

	type ButtonProps = (AnchorElement | ButtonElement) & {
		color?: ButtonVariants["color"];
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	let {
		color = "default",
		type = "button",
		href = undefined,
		class: className,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<svelte:element
	this={href ? "a" : "button"}
	type={href ? undefined : type}
	{href}
	class={cn(button({ color }), className)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
