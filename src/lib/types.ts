import type { Snippet } from "svelte";

export type WithChildren<Props = {}> = Props & {
	children?: Snippet | undefined;
};
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type Without<T extends object, U extends object> = Omit<T, keyof U>;
