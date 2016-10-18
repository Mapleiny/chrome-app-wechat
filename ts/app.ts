import {loginServer} from './servers/loginServer'
import {NotificationCenter} from './utility/notificationCenter'
import {IUser,IMessage,StatusNotifyCode} from './models/wxInterface'
import {contactManager} from './manager/contactManager'
import {chatManager} from './manager/chatManager'
import {messageManager} from './manager/messageManager'

import {ChatListController} from './controller/chatListController'
import {ChatContent} from './controller/chatContent'
export class App {
	private chatListController = new ChatListController();
	private chatContent = new ChatContent();


	constructor(redirectUrl) {
		let self = this;

		loginServer.getBaseInfo(redirectUrl).then((result)=>{
			// 保存 SyncKey
			messageManager.setSyncKey(result.SyncKey);

			// 添加联系人信息
			contactManager.setAccount(result.User);
			contactManager.addContacts(result.ContactList);

			// 聊天列表初始化
			chatManager.initChatList(result.ChatSet);

			// 初始化完成状态
			messageManager.initDoneStatusNotify();

			// 开始信息同步检测
			console.log('Start Message Check');
			messageManager.startMessageCheck();

			// 获取全部联系人列表
			contactManager.initContact(0);
		}).catch(reason=>{
			console.log(reason);
		});

		self.init();
	}


	init(){
		let self = this;

		NotificationCenter.on('chat.init.success,contact.init.success',(e)=>{
			if(e.eventName == 'contact.init.success') {
				chatManager.updateChatList();
			}
			self.chatListController.updateChatList();
		});



	}
}