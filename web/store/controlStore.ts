import { create } from "zustand";


type themeType = {
	c1: string;
	c2: string;
	c3: string;
	c4: string;
  };
type Store = {
	//For Details 
	displayName: string;
	username: string;
	title: string;
	avatar: string;
	bio: string;
	twitter: string;
	github: string;
	linkedin: string;
	instagram: string;
	youtube: string;
	gmail: string;
	model: boolean;
	otherlinks: Array<{ key: string, value: any }>;

	//For Themes
	avatarStyle:string
	userBgColor:string
	userTheme:themeType
	colorTheme_DATA:themeType[]
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
	ADD_otherlinks: (key: string, value: any) => void;

	//For Themes
	setAvatarStyle: (displayName: Store["avatarStyle"]) => void;
	setUserBgColor: (userBgColor: Store["userBgColor"]) => void;
	setUserTheme: (userBgColor: Store["userTheme"]) => void;


};
export const useControls = create<Store & Actions>((set): any => ({
	//For Details 
	displayName: "",
	username: "",
	title: "",
	avatar: "",
	bio: "",
	github: "",
	linkedin: "",
	instagram: "",
	youtube: "",
	gmail: "",
	model: false,
	otherlinks: [],
	//For Themes
	avatarStyle:"",
	userBgColor:"",
	userTheme:{
		c1:'#e5e5e5',
		c2:'#a3a3a3',
		c3:'#404040',
		c4:'#262626',
	},
	
	colorTheme_DATA:[
		{
			c1:'#e5e5e5',
			c2:'#a3a3a3',
			c3:'#404040',
			c4:'#262626',
		},
		{
			c1:'#E2D6FF',
			c2:'#CCBBFF',
			c3:'#24273F',
			c4:'#1B1C30',
		},
		{
			c1:'#e5e7eb',
			c2:'#9ca3af',
			c3:'#374151',
			c4:'#1f2937',
		},
		{
			c1:'#c7d2fe',
			c2:'#6366f1',
			c3:'#3730a3',
			c4:'#312e81',
		},
		{
			c1:'#635985',
			c2:'#443C68',
			c3:'#393053',
			c4:'#18122B',
		},
		{
			c1:'#F56EB3',
			c2:'#CB1C8D',
			c3:'#7F167F',
			c4:'#460C68',
		},
		
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
	otherLinks: (key: string, value: any) => {
		set((state) => ({
			otherlinks: [...state.otherlinks, { key: key, value: value }],
		}));
	},

	//For Themes
	setAvatarStyle: (avatarStyle: string) => set(() => ({ avatarStyle: avatarStyle })),
	setUserBgColor: (userBgColor: string) => set(() => ({ userBgColor: userBgColor })),
	setUserTheme: (userTheme: themeType) => set(() => ({ userTheme: userTheme })),



}));
