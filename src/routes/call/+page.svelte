<script lang="ts">
	import { MenuButton, UserCard } from "$lib";
	import { AppContext } from "$lib/shared.svelte";

	const appState = AppContext.get();

	let callState = $state({
		me: {
			mic: true,
			hp: true,
			speaking: true,
			onlymic: false,
		},
		other: {
			mic: false,
			hp: false,
			speaking: false,
			username: "Anon1753852111",
		},
	});
</script>

<div class="flex size-full text-(--primary)">
	<UserCard
		variant="me"
		mic={callState.me.mic}
		hp={callState.me.hp}
		speaking={callState.me.speaking}
		initial={appState.username}
		setter={appState.setUsername}
	/>
	<UserCard
		variant="other"
		mic={callState.other.mic}
		hp={callState.other.hp}
		speaking={callState.other.speaking}
		initial={callState.other.username}
		setter={(value: string) => {
			callState.other.username = value;
		}}
	/>
</div>
<div class="h-px w-full bg-(--border)"></div>
<div class="flex h-max w-full">
	<MenuButton
		variant="mic"
		bind:isOn={callState.me.mic}
		onclick={() => {
			callState.me.mic = !callState.me.mic;
			if (callState.me.hp) {
				callState.me.onlymic = !callState.me.onlymic;
			} else {
				callState.me.onlymic = false;
				callState.me.hp = !callState.me.hp;
			}
		}}
	/>
	<div class="h-full w-px bg-(--border)"></div>
	<MenuButton
		variant="hp"
		bind:isOn={callState.me.hp}
		onclick={() => {
			if (!callState.me.onlymic) {
				callState.me.hp = !callState.me.hp;
				callState.me.mic = !callState.me.mic;
			} else {
				callState.me.hp = !callState.me.hp;
			}
		}}
	/>
	<div class="h-full w-px bg-(--border)"></div>
	<MenuButton
		variant="exit"
		onclick={() => {
			// handle call end
			window.location.href = "/";
		}}
	/>
</div>
