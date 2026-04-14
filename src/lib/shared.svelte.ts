import { invoke } from "@tauri-apps/api/core";
import { LazyStore } from "@tauri-apps/plugin-store";
import { Context } from "runed";

const appStore = new LazyStore("settings.json");
export const AppContext = new Context<AppState>("App");

type AudioDeviceDirection = "Input" | "Output";

type AudioDeviceInfo = {
	name: string;
	id: string;
	driver: string | null;
	direction: AudioDeviceDirection;
	is_default: boolean;
};

class AudioDevice {
	name: string;
	id: string;
	driver: string | null;
	direction: AudioDeviceDirection;
	isDefault: boolean;
	extended: string;

	constructor(opts: AudioDeviceInfo) {
		this.name = opts.name;
		this.id = opts.id;
		this.driver = opts.driver;
		this.direction = opts.direction;
		this.isDefault = opts.is_default;

		const preName = `${this.name}${this.driver ? ` (${this.driver})` : ""}`
			.trim()
			.replace(/\s+/g, " ");
		this.extended = this.isDefault ? `Default (${preName})` : preName;
	}
}

class DeviceSelector {
	devices: Map<string, string>;
	default?: string;
	selected?: string;
	volume: number;

	constructor(list: AudioDevice[], selected?: string, volume?: number) {
		this.volume = volume ? volume : 100;

		this.default = list.find((d) => d.isDefault)?.id;
		this.selected = selected ? selected : this.default;

		this.devices = new Map<string, string>();
		list.forEach((device) => {
			this.devices.set(device.id, device.extended);
		});
	}

	update(list: AudioDevice[]) {
		const newDefault = list.find((d) => d.isDefault)?.id;

		if (
			!this.selected ||
			this.selected == this.default ||
			!list.find((d) => d.id == this.selected)
		) {
			this.selected = newDefault;
		}

		if (this.default != newDefault) {
			this.default = newDefault;
		}

		this.devices.clear();
		list.forEach((device) => {
			this.devices.set(device.id, device.extended);
		});
	}

	getOptions(): [string, string][] {
		const res: [string, string][] = [];
		if (this.default) {
			res.push([this.default, this.devices.get(this.default)!]);
		}
		if (this.selected != this.default) {
			res.push([this.selected!, this.devices.get(this.selected!)!]);
		}

		return [
			...res,
			...this.devices
				.entries()
				.filter(([id]) => id != this.default && id != this.selected)
				.toArray()
				.sort(([b], [a]) => a.toLowerCase().localeCompare(b.toLowerCase())),
		];
	}
}

class DeviceManager {
	devices: AudioDevice[];
	inputDeviceSelector: DeviceSelector;
	outputDeviceSelector: DeviceSelector;

	constructor() {
		this.devices = [];
		this.inputDeviceSelector = new DeviceSelector([]);
		this.outputDeviceSelector = new DeviceSelector([]);

		this.update = this.update.bind(this);
		this.getInputOptions = this.getInputOptions.bind(this);
		this.getOutputOptions = this.getOutputOptions.bind(this);
	}

	async update() {
		const devices = (await invoke<AudioDeviceInfo[]>("list_audio_devices")).map(
			(d) => new AudioDevice(d),
		);

		this.devices = devices;
		this.inputDeviceSelector.update(devices.filter((d) => d.direction == "Input"));
		this.outputDeviceSelector.update(devices.filter((d) => d.direction == "Output"));
	}

	async getInputOptions() {
		await this.update();
		return this.inputDeviceSelector.getOptions();
	}

	async getOutputOptions() {
		await this.update();
		return this.outputDeviceSelector.getOptions();
	}
}

interface AppStateOpts {
	username?: string;
	inputDevice?: string;
	inputVolume?: number;
	outputDevice?: string;
	outputVolume?: number;
}

export class AppState {
	inCall: boolean;
	username: string;
	deviceManager: DeviceManager;

	static create(): AppState {
		return AppContext.set(new AppState());
	}

	constructor() {
		this.inCall = false;
		this.username = `Anon${(Math.random() * 10 ** 10).toFixed(0)}`;

		this.deviceManager = new DeviceManager();
		this.deviceManager.update();
	}

	async init() {
		const opts: AppStateOpts = {
			username: await appStore.get("username"),
			inputDevice: await appStore.get("inputDeviceId"),
			inputVolume: await appStore.get("inputDeviceVolume"),
			outputDevice: await appStore.get("outputDeviceId"),
			outputVolume: await appStore.get("outputDeviceVolume"),
		};

		Object.assign(this, {
			...(opts.username && { username: opts.username }),
		});

		Object.assign(this.deviceManager.inputDeviceSelector, {
			...(opts.inputDevice && { selected: opts.inputDevice }),
			...(opts.inputVolume && { volume: opts.inputVolume }),
		});

		Object.assign(this.deviceManager.outputDeviceSelector, {
			...(opts.outputDevice && { selected: opts.outputDevice }),
			...(opts.outputVolume && { volume: opts.outputVolume }),
		});

		this.setUsername = this.setUsername.bind(this);
		this.setInputDevice = this.setInputDevice.bind(this);
		this.getInputDevice = this.getInputDevice.bind(this);
		this.setInputVolume = this.setInputVolume.bind(this);
		this.setOutputDevice = this.setOutputDevice.bind(this);
		this.getOutputDevice = this.getOutputDevice.bind(this);
		this.setOutputVolume = this.setOutputVolume.bind(this);
	}

	setUsername(value: string) {
		this.username = value;
		(async () => {
			await appStore.set("username", value);
			await appStore.save();
		})();
	}

	getInputDevice(): [string, string] | undefined {
		const name =
			this.deviceManager.inputDeviceSelector.selected &&
			this.deviceManager.inputDeviceSelector.devices.get(
				this.deviceManager.inputDeviceSelector.selected,
			);

		// @ts-ignore
		return name && [this.deviceManager.inputDeviceSelector.selected, name];
	}

	setInputDevice(value: string) {
		this.deviceManager.inputDeviceSelector.selected = value;
		(async () => {
			await appStore.set("inputDeviceId", value);
			await appStore.save();
		})();
	}

	getOutputDevice(): [string, string] | undefined {
		const name =
			this.deviceManager.outputDeviceSelector.selected &&
			this.deviceManager.outputDeviceSelector.devices.get(
				this.deviceManager.outputDeviceSelector.selected,
			);

		// @ts-ignore
		return name && [this.deviceManager.outputDeviceSelector.selected, name];
	}

	setOutputDevice(value: string) {
		this.deviceManager.outputDeviceSelector.selected = value;
		(async () => {
			await appStore.set("outputDeviceId", value);
			await appStore.save();
		})();
	}

	setInputVolume(value: number) {
		this.deviceManager.inputDeviceSelector.volume = value;
		(async () => {
			await appStore.set("inputDeviceVolume", value);
			await appStore.save();
		})();
	}

	setOutputVolume(value: number) {
		this.deviceManager.outputDeviceSelector.volume = value;
		(async () => {
			await appStore.set("outputDeviceVolume", value);
			await appStore.save();
		})();
	}
}
