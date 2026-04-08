type AppState = {
	ping: number;
	inCall: boolean;
	username: string;
	micVolume: number;
	hpVolume: number;
	inDevice: string;
	outDevice: string;
};

export const app: AppState = $state({
	username: "Anon1753852111",
	ping: 0,
	inCall: false,
	micVolume: 100,
	hpVolume: 100,
	inDevice: "Default(Line 2 (Virtual Audio Cable))", // сделать потом реальное название при дэфолте и когда пропадает выбранное устройство возвращеть в дэфолт
	outDevice: "Default(Line 1 (Virtual Audio Cable))", // сделать потом реальное название при дэфолте и когда пропадает выбранное устройство возвращеть в дэфолт
});
