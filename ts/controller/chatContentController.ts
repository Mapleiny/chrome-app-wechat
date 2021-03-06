import {IUser,IMessage,MessageType,AppMsgType} from '../models/wxInterface'
import {UserModel} from '../models/userModel'
import {MessageModel} from '../models/messageModel'
import {ChatContentItem} from '../template/chatContentItem'
import {BaseController} from './baseController'
import {chatManager} from '../manager/chatManager'
import {messageManager} from '../manager/messageManager'
import {contactManager} from '../manager/contactManager'
import {sourceServer} from '../servers/sourceServer'

import {NotificationCenter} from '../utility/notificationCenter'

class ChatContentController extends BaseController{
	private $chatContentHeader:JQuery = $('#chat-content-header');
	private $chatContentContainer:JQuery = $('#chat-content-container');
	private $inputTextarea:JQuery = $('#message-input');
	private messageList:{[key:string]:MessageModel[]} = {};
	currentChatUser:string;

	constructor(){
		super();
		let self = this;
		this.$inputTextarea.on('keydown',function(e){
			let message:string = $(this).val();
			if(e.keyCode == 13 && !e.metaKey && message.length > 0) {
				$(this).val('');
				self.sendMessage(message);
				e.preventDefault();
			}else if(e.keyCode == 13){
				$(this).val(function(index,value){
					return value+'\n';
				});
			}
		});

		this.$chatContentContainer.on('click','.item',(event)=>{
			let msgId = $(event.currentTarget).data('id');
			let message = messageManager.getMessage(msgId);
			this.onMessageClick(message);
		});
	}

	selectUser(username:string){
		let selectUserInfo = contactManager.getContact(username);
		if(selectUserInfo) {
			this.$chatContentHeader.find('.username').text(selectUserInfo.getDisplayName());
			this.currentChatUser = username;
			this.displayMessageContent(username);
			this.$inputTextarea.focus();
		}	
	}

	newMessage(message:MessageModel){
		let self = this;
		console.log('Here Comes User Message');
		if(!(message.MMPeerUserName in self.messageList)) {
			self.messageList[message.MMPeerUserName] = [];
		}
		self.messageList[message.MMPeerUserName].push(message);
		if(message.MMPeerUserName == self.currentChatUser) {
			this.updateMessageContent([message]);
		}
	}

	private sendMessage(content:string){
		NotificationCenter.post<string>('message.send.text',content);
	}

	private onMessageClick(message:MessageModel){
		switch (message.MsgType) {
			case MessageType.APP:
				switch (message.AppMsgType) {
					case AppMsgType.URL:
						window.open(message.Url);
						break;
					default:
						// code...
						break;
				}
				break;
			case MessageType.MICROVIDEO:
				this.playVideoMessage(message);
				break;
			case MessageType.VOICE:
				this.playVoiceMessage(message);
				break;
			default:
				// code...
				break;
		}
	}

	private displayMessageContent(userName){
		let self = this;
		let messages:MessageModel[] = this.messageList[userName];
		self.$chatContentContainer.empty();
		this.updateMessageContent(messages);
	}

	private updateMessageContent(messages:MessageModel[]){
		let self = this;
		if(!messages) {return;}
		messages.forEach(message=>{
			let sender = contactManager.getContact(message.MMActualSender);
			if(sender) {
				let item = new ChatContentItem(message,sender);
				self.$chatContentContainer.append(item.$element);
			}else{
				console.error(`Miss Sender:${message.MMActualSender}`);
			}
		});
		self.$chatContentContainer.scrollTop(999999);
	}

	private playVoiceMessage(message:MessageModel){
		let audio:HTMLAudioElement = document.createElement('audio');
		sourceServer.fetchSource(message.Url).then(localUrl=>{
			audio.src = localUrl;
			audio.autoplay = true;
		});
	}
	private playVideoMessage(message:MessageModel){

	}
}
export let chatContentController = new ChatContentController();