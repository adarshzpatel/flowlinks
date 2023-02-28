import { create } from "zustand";
import { LinkType } from "../flow/types";
import { DEFAULT_AVATAR, DEFAULT_COVER } from "../components/Builder/Card";

// text

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
	authModal:boolean
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
	setAuthModal: (state: Store["authModal"]) => void;
	addOtherLink: (data:LinkType) => void;
	deleteOtherLink: (data:LinkType) => void;

};

export const useControls = create<Store & Actions>((set): any => ({
	//For Details 
	displayName: "",
	username: "",
	title: "",
	avatar: DEFAULT_AVATAR,
	cover: DEFAULT_COVER,
	bio: "",
	github: "",
	linkedin: "",
	instagram: "",
	youtube: "",
	gmail: "",
	model: false,
	otherLinks: [],
	//For Themes
	avatarStyle:"rounded-lg",
	userBgColor:'linear-gradient(to top, #98FDB4 0%, #00CD8C 100%)',
	userTheme:'#e5e7eb #9ca3af #374151 #1f2937',
	colorTheme_DATA:[
		'#e5e5e5 #a3a3a3 #1f2937 #111827',
		'#E2D6FF #CCBBFF #24273F #1B1C30',
		'#e5e7eb #9ca3af #374151 #1f2937',
		'#ffffff #a3a3a3 #1C1C1C #000000',
		'#E5B8F4 #B854C4 #2D033B #810CA8',
		'#01E68B #008578 #002024 #013841',
		'#FFFFFF #CCBBFF #7B55EA #1F0078',
		'#000200 #AE7B5F #F2D6BE #F6F0EB',
		'#000200 #D3B3B6 #FFFFFF #F6F6F6',
	],
	backgroundColors_DATA:[
		'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
		'linear-gradient(to top, #dfe9f3 0%, white 100%)',
		'linear-gradient(to top, #98FDB4 0%, #00CD8C 100%)',
		'linear-gradient(to top, #ffd6ff 0%, #c8b6ff 100%)',
		'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
		'linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)',
		'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
		'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(to right, #111827 0%, #111827 100%)',
		'linear-gradient(to right, #171717 0%, #171717 100%)',
		'linear-gradient(to right, #a78bfa 0%, #a78bfa 100%)',
		'linear-gradient(to top, #09203f 0%, #537895 100%)',
		
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
	authModal:false ,
	setAuthModal: (state:boolean) => set(()=>({authModal:state}))
}));
