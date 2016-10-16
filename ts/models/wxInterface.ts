export interface IBaseRequest{
	Uin:string;
	Sid:string;
	Skey:string;
	DeviceID:string;
}

export interface IBaseResponse{
	ErrMsg : string;
	Ret : 0;
}

export interface IBatchgetContactParams{
	UserName : string;
	ChatRoomId? : string;
	EncryChatRoomId? : string;
}

export interface IBatchContactResponse{
	BaseResponse : IBaseResponse;
	ContactList : Array<IUser>;
	Count : number;
}

export interface IContactResponse{
	BaseResponse : IBaseResponse;
	MemberCount : number;
	MemberList : IUser[];
	Seq : number
}

export interface ISyncKey{
	Count:number;
	List:Array<Object>;
}

export interface ISyncResponse{
	BaseResponse : IBaseResponse;
	AddMsgCount : number;
	AddMsgList : Array<any>;
	SyncKey : ISyncKey;
}

export interface IInitInfoResResponse{
	BaseResponse : IBaseResponse;
	ContactList : Array<IUser>;
	Count : number;
	SKey : string;
	SyncKey : ISyncKey;
	User : IUser;
	ChatSet : string;
}

export interface IContactHeadImgParams{
	UserName : string;
	MsgId?: string;
	EncryChatRoomId?:string;
}

export interface IUser{
	UserName : string;

	NickName : string;
	Sex : number;
	RemarkName : string;
	HeadImgUrl : string;
	Signature : string;
	SnsFlag : number;

	City : string;
	Province : string;

	ContactFlag : number;
	VerifyFlag : number;

	AppAccountFlag : number;

	// group
	EncryChatRoomId : string;
	MemberList : Array<IGroupMember>;
	MemberCount : number;
	Statues : number;
};

export interface IMessage{
	MsgId : number;
	CreateTime : number;
	Content : string;
	StatusNotifyUserName : string;
	FromUserName : string;
	ToUserName : string;
	MsgType : MessageType; 
}

export interface IGroupMember{
	NickName : string;
	UserName : string;
	DisplayName : string;
	MemberStatus : number;
	AttrStatus : number;
	HeadImgUrl : string;
}

export enum MessageType{
	MSGTYPE_TEXT                 = 1,      // 文本消息
	MSGTYPE_IMAGE                = 3,      // 图片消息
	MSGTYPE_VOICE                = 34,     // 语音消息
	MSGTYPE_VIDEO                = 43,     // 视频消息
	MSGTYPE_MICROVIDEO           = 62,     // 小视频消息
	MSGTYPE_EMOTICON             = 47,     // 表情消息
	MSGTYPE_APP                  = 49,     // 模版消息
	MSGTYPE_VOIPMSG              = 50,     // 
	MSGTYPE_VOIPNOTIFY           = 52,
	MSGTYPE_VOIPINVITE           = 53,
	MSGTYPE_LOCATION             = 48,     // 地理位置消息
	MSGTYPE_STATUSNOTIFY         = 51,
	MSGTYPE_SYSNOTICE            = 9999,
	MSGTYPE_POSSIBLEFRIEND_MSG   = 40,     // 
	MSGTYPE_VERIFYMSG            = 37,     // 朋友验证消息
	MSGTYPE_SHARECARD            = 42,     // 名片分享
	MSGTYPE_SYS                  = 1e4,    // 系统消息
	MSGTYPE_RECALLED             = 10002   // 撤回消息
}

export enum StatusNotifyCode{
	READED = 1,
	ENTER_SESSION = 2,
	INITED = 3,
	SYNC_CONV = 4,
	QUIT_SESSION = 5
}

export let TextInfoMap = {
	"2457513":"周六",
    "4078104":"[视频]",
    "7068541":"查看详细资料",
    "02d9819":"提示",
    "0d2fc2c":"程序初始化失败，点击确认刷新页面",
    "61e885c":"不允许发送空文件",
    "9a7dbbc":"发送视频文件不允许超过 20MB",
    "76a7e04":"图片上传失败，请检查你的网络",
    "82cf63d":"抱歉，截屏工具暂不支持64位操作系统下的IE浏览器。",
    "112a5c0":"请检查你是否禁用了截屏插件。如果你还没安装截屏插件，点击确定安装。",
    "c5795a7":"图片上传失败，请检查你的网络，",
    "8d521cc":"点击修改备注",
    "5a97440":"我是",
    "f45a3d8":"添加好友失败",
    "84e4fac":"取消置顶",
    "3d43ff1":"置顶",
    "1f9be6d":"修改群名",
    "685739c":"关闭聊天",
    "91382d9":"清屏",
    "b5f1591":"发送消息",
    "0bd10a8":"添加到通讯录",
    "3b61c96":"引用",
    "d9eb6f5":"「",
    "83b6d34":"」",
    "79d3abe":"复制",
    "f26ef91":"下载",
    "21e106f":"转发",
    "0d42740":"创建群聊失败",
    "b3b6735":"最近聊天",
    "845ec73":"图片加载失败，请关闭后重试。",
    "809bb9d":"[表情]",
    "562d747":"周日",
    "1603b06":"周一",
    "b5a6a07":"周二",
    "e60725e":"周三",
    "170fc8e":"周四",
    "eb79cea":"周五",
    "938b111":"该消息网页版微信暂时不支持",
    "a5627e8":"[图片]",
    "b28dac0":"[语音]",
    "1f94b1b":"[小视频]",
    "80f56fb":"[发送了一个表情，请在手机上查看]",
    "2242ac7":"[收到了一个表情，请在手机上查看]",
    "e230fc1":"[动画表情]",
    "fdaa3a3":"[收到一条视频/语音聊天消息，请在手机上查看]",
    "0e23719":"[音乐]",
    "4f20785":"[应用消息]",
    "c4e04ee":"请在手机点击打开",
    "e5b228c":"[链接]",
    "6daeae3":"[文件]",
    "0cdad09":"[收到一条微信转账消息，请在手机上查看]",
    "c534fc3":"[收到一条优惠券消息，请在手机上查看]",
    "8e94ca5":"我发起了位置共享，请在手机上查看",
    "a41d576":"对方",
    "a1f1299":"发起了位置共享，请在手机上查看",
    "95afe20":"[收到一条扫商品消息，请在手机上查看]",
    "355765a":"[收到一条商品消息，请在手机上查看]",
    "9d7f4bb":"[收到一条表情分享消息，请在手机上查看]",
    "e24e75c":"[微信红包]",
    "ded861c":"撤回了一条消息",
    "df1fd91":"你",
    "ebeaf99":"想要将你加为朋友",
    "9a2223f":"你推荐了",
    "dd14577":"向你推荐了",
    "6c2fc35":"微信团队",
    "eb7ec65":"文件传输助手",
    "0469c27":"腾讯新闻",
    "a82c4c4":"朋友推荐消息",
    "f13fb20":"星标好友",
    "59d29a3":"好友",
    "4b0ab7b":"群组",
    "215feec":"公众号",
    "2f521c5":"微信网页版",
    "cfbf6f4":"微信",
    "a7dd12b":"show",
    "a88f05b":"hide",
    "41f984b":"toggle"
}













