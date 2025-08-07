export type Club = {
	id: string;
	name: string;
	logo: string;
	description: string;
	website: string;
};

export const mannschaften: Club[] = [
	{
		id: "sf-nofels",
		name: "SF Nofels",
		logo: "/logos/sfn_logo.webp",
		description: "Hobbyliga Weltmeister.",
		website: "",
	},
	{
		id: "fc-uebersaxen",
		name: "FC Übersaxen",
		logo: "/logos/fcue_logo.webp",
		description: "Traditionsverein mit starkem Jugendbereich.",
		website: "https://www.fc-uebersaxen.at/",
	},
	{
		id: "fc-fraxern",
		name: "FC Fraxern",
		logo: "/logos/fcf_logo.webp",
		description: "Nutzen die dünne Luft zu ihrem Vorteil.",
		website: "https://www.fc-fraxern.at/",
	},
	{
		id: "rw-rankweil",
		name: "RW Rankweil",
		logo: "/logos/rwr_logo.webp",
		description: "Hat auch eine Hobbymannschaft.",
		website:
			"https://vereine.oefb.at/fcrwrankweil1920/Hobbymannschaft-3.html?:hp=3333048",
	},
	{
		id: "fc-viktorsberg",
		name: "FC Viktorsberg",
		logo: "/logos/fcv_logo.webp",
		description: "Ein weiterer Bergverein.",
		website: "https://www.fcviktorsberg.at/index.php",
	},
	{
		id: "fc-weiler",
		name: "FC Weiler",
		logo: "/logos/fcw_logo.webp",
		description: "Nicht ganz Röthis, nicht ganz Sulz.",
		website: "https://www.fc-weiler.com/",
	},
];
