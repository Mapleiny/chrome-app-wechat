import {IUser,IGroupMember} from './wxInterface'
import {contactManager} from '../manager/contactManager'



let SpicalAccounts = ["weibo", "qqmail", "fmessage", "tmessage", "qmessage", "qqsync", "floatbottle", "lbsapp", "shakeapp", "medianote", "qqfriend", "readerapp", "blogapp", "facebookapp", "masssendapp", "meishiapp", "feedsapp", "voip", "blogappweixin", "weixin", "brandsessionholder", "weixinreminder", "wxid_novlwrv3lqwv11", "gh_22b87fa7cb3c", "officialaccounts", "notification_messages"];
let ShieldAccounts = ["newsapp", "wxid_novlwrv3lqwv11", "gh_22b87fa7cb3c", "notification_messages"];

enum CONTACTFLAG{
	CONTACT = 1,
	CHATCONTACT = 2,
	CHATROOMCONTACT = 4,
	BLACKLISTCONTACT = 8,
	DOMAINCONTACT = 16,
	HIDECONTACT = 32,
	FAVOURCONTACT = 64,
	RDAPPCONTACT = 128,
	SNSBLACKLISTCONTACT = 256,
	NOTIFYCLOSECONTACT = 512,
	TOPCONTACT = 2048,
}

enum CHATROOM_NOTIFY{
	CLOSE = 0,
	OPEN = 1
}

export class UserModel{

	// property
	UserName : string;

	NickName : string;
	Sex : number;
	RemarkName : string;
	HeadImgUrl : string;
	Signature : string;

	City : string;
	Province : string;

	// group
	EncryChatRoomId : string;
	MemberList : Array<IGroupMember>;
	MemberCount : number;

	private _contactFlag : number;
	private Statues:number;

	// status
	isContact : boolean;
	isBlackContact : boolean;
	isConversationContact : boolean;
	isRoomContact : boolean;
	isMuted : boolean;
	isTop : boolean;
	isShieldUser : boolean;
	hasPhotoAlbum : boolean;
	MMFromBatchget:boolean = false;
	MMBatchgetMember:boolean = false;


	protected class = (this.constructor as typeof UserModel);

	constructor(userInfo:IUser){
		this.updateUserInfo(userInfo);
	}

	set contactFlag(contactFlag : number) {
		this._contactFlag = contactFlag;
		this.isContact = !!(contactFlag & CONTACTFLAG.CONTACT);
		this.isBlackContact = !!(contactFlag & CONTACTFLAG.BLACKLISTCONTACT);
		this.isMuted = this.isRoomContact ? 
			this.Statues === CHATROOM_NOTIFY.CLOSE : 
			!!(contactFlag & CONTACTFLAG.NOTIFYCLOSECONTACT);

		this.isTop = !!(contactFlag & CONTACTFLAG.TOPCONTACT);
	}


	updateUserInfo(userInfo:IUser){
		// property
		this.UserName = userInfo.UserName;
		this.NickName = userInfo.NickName;
		this.Sex = userInfo.Sex;
		this.RemarkName = userInfo.RemarkName;
		this.HeadImgUrl = userInfo.HeadImgUrl;
		this.Signature = userInfo.Signature;
		this.City = userInfo.City;
		this.Province = userInfo.Province;
		this.EncryChatRoomId = userInfo.EncryChatRoomId;
		this.MemberList = userInfo.MemberList;
		this.MemberCount = userInfo.MemberCount;

		// status
		this.isRoomContact =  UserModel.isRoomContact(userInfo.UserName);
		this.Statues = userInfo.Statues;
		this.contactFlag = userInfo.ContactFlag;
		
		this.hasPhotoAlbum = !!(1 & userInfo.SnsFlag);	

		this.isShieldUser = this.class.isShieldUser(this.UserName);
	}

	

	getDisplayName(){
		let self = this;
		var name = "";

		if(this.isRoomContact) {
			name = this.RemarkName || this.NickName;
			if(!name && !this.MemberCount) {
				this.MemberList.slice(0,10).forEach(membr=>{
					let contactUser = contactManager.getContact(membr.UserName);
					if(contactUser) {
						name += contactUser.RemarkName || contactUser.NickName
					}else{
						name += membr.NickName;
					}
				});
			}else if(!name){
				name = this.UserName;
			}
		}else{
			name = this.RemarkName || this.NickName;
		}

		return name;
	}

	static getDisplayName(username:string){
		return 
	}

	static isSpUser(username:string){
		return /@qqim$/.test(username) || SpicalAccounts.indexOf(username) != -1;
	}

	static isShieldUser(username:string){
		return /@lbsroom$/.test(username) || /@talkroom$/.test(username) || ShieldAccounts.indexOf(username) != -1;
	}

	static isRoomContact(username:string){
		return username ? /^@@|@chatroom$/.test(username) : false;
	}
}