import { create } from "zustand";
import { LinkType } from "../flow/types";


type Store = {
	//For Details 
	displayName: string;
	username: string;
	title: string;
	avatar: string;
	cover:string;
	bio: string;
	twitter: string;
	github: string;
	linkedin: string;
	instagram: string;
	youtube: string;
	gmail: string;
	model: boolean;
	otherLinks:LinkType[]
	//For Themes
	avatarStyle:string
	userBgColor:string
	userTheme:string
	colorTheme_DATA:string[]
	backgroundColors_DATA:Array<string>
};
type Actions = {
	//For Details 
	setDisplayName: (displayName: Store["displayName"]) => void;
	setUserName: (username: Store["username"]) => void;
	setTitle: (title: Store["title"]) => void;
	setAvatar: (avatar: Store["avatar"]) => void;
	setBio: (bio: Store["bio"]) => void;
	setTwitter: (twitter: Store["twitter"]) => void;
	setGithub: (github: Store["github"]) => void;
	setLinkedin: (linkedin: Store["linkedin"]) => void;
	setInstagram: (instagram: Store["instagram"]) => void;
	setYoutube: (youtube: Store["youtube"]) => void;
	setGmail: (gmail: Store["gmail"]) => void;
	setModel: (model: Store["model"]) => void;
	setCover: (model: Store["cover"]) => void;
	//For Themes
	setAvatarStyle: (displayName: Store["avatarStyle"]) => void;
	setUserBgColor: (userBgColor: Store["userBgColor"]) => void;
	setUserTheme: (userBgColor: Store["userTheme"]) => void;
	addOtherLink: (data:LinkType) => void;
	deleteOtherLink: (data:LinkType) => void;

};

export const useControls = create<Store & Actions>((set): any => ({
	//For Details 
	displayName: "",
	username: "",
	title: "",
	avatar: "",
	cover: "",
	bio: "",
	github: "",
	linkedin: "",
	instagram: "",
	youtube: "",
	gmail: "",
	model: false,
	otherLinks: [],
	//For Themes
	avatarStyle:"",
	userBgColor:"",
	userTheme:'#e5e5e5 #a3a3a3 #404040 #262626',
	colorTheme_DATA:[
		'#e5e5e5 #a3a3a3 #404040 #262626',
		'#E2D6FF #CCBBFF #24273F #1B1C30',
		'#e5e7eb #9ca3af #374151 #1f2937',
		'#c7d2fe #6366f1 #3730a3 #312e81',
		'#635985 #443C68 #393053 #18122B',
		'#F56EB3 #CB1C8D #7F167F #460C68',
	],
	backgroundColors_DATA:[
		'linear-gradient(20deg, rgb(79 70 229) 10%, rgb(168 85 247) 30%, rgb(162 28 175) 60%)',
		'linear-gradient(270deg, rgb(79 70 229) 0%, rgb(168 85 247) 30%, rgb(162 28 175) 70%)',
		'linear-gradient(90deg, rgb(79 70 229) 0%, rgb(168 85 247) 35%, rgb(162 28 175) 100%)',
		'linear-gradient(180deg, rgb(79 70 229) 10%, rgb(168 85 247) 30%, rgb(162 28 175) 60%)',
		'',
	],

	//For Details 
	setDisplayName: (displayName: string) => set(() => ({ displayName: displayName })),
	setUserName: (username: string) => set(() => ({ username: username })),
	setTitle: (title: string) => set(() => ({ title: title })),
	setAvatar: (avatar: string) => set(() => ({ avatar: avatar })),
	setBio: (bio: string) => set(() => ({ bio: bio })),
	setTwitter: (twitter: string) => set(() => ({ twitter: twitter })),
	setGithub: (github: string) => set(() => ({ github: github })),
	setLinkedin: (linkedin: string) => set(() => ({ linkedin: linkedin })),
	setInstagram: (instagram: string) => set(() => ({ instagram: instagram })),
	setYoutube: (youtube: string) => set(() => ({ youtube: youtube })),
	setGmail: (gmail: string) => set(() => ({ gmail: gmail })),
	setModel: (model: boolean) => set(() => ({ model: !model })),
	addOtherLink: (data:LinkType) => {
		set((state) => ({
			otherLinks: [...state.otherLinks,data],
		}));
	},
	setCover:(cover:string) => set(()=> ({cover:cover})),
	deleteOtherLink: (data:LinkType) => {
		set((state) => ({
			otherLinks: [...state.otherLinks.filter((e)=>e.title != data.title )],
		}));
	},
	//For Themes
	setAvatarStyle: (avatarStyle: string) => set(() => ({ avatarStyle: avatarStyle })),
	setUserBgColor: (userBgColor: string) => set(() => ({ userBgColor: userBgColor })),
	setUserTheme: (userTheme: string) => set(() => ({ userTheme: userTheme })),

}));
