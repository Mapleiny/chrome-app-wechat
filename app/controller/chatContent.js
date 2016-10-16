define(["require", "exports", '../template/chatContentItem', '../baseClass/eventable', '../manager/chatManager'], function (require, exports, chatContentItem_1, eventable_1, chatManager_1) {
    "use strict";
    class ChatContent extends eventable_1.Eventable {
        constructor() {
            super();
            this.$chatContentHeader = $('#chat-content-header');
            this.$chatContentContainer = $('#chat-content-container');
            this.$inputTextarea = $('#message-input');
            this.messageList = {};
            let self = this;
            this.$inputTextarea.on('keydown', function (e) {
                let message = $(this).val();
                if (e.keyCode == 13 && !e.metaKey && message.length > 0) {
                    $(this).val('');
                    self.sendMessage(message);
                    e.preventDefault();
                }
                else if (e.keyCode == 13) {
                    $(this).val(function (index, value) {
                        return value + '\n';
                    });
                }
            });
        }
        selectUser(username) {
            let selectUserInfo = chatManager_1.chatManager.chatListInfo[username];
            let name = selectUserInfo.RemarkName || selectUserInfo.NickName.replace(/<.+?>.*?<\/.+?>/g, '');
            this.$chatContentHeader.find('.username').text(name);
            this.currentChatUser = username;
            this.displayMessageContent(username);
            this.$inputTextarea.focus();
        }
        newMessage(messages) {
            let self = this;
            let currentUserMessage = [];
            messages.forEach(function (value) {
                var fromUserName = value.FromUserName;
                let toUserName = value.ToUserName;
                if (fromUserName == chatManager_1.chatManager.currentUser.UserName) {
                    fromUserName = toUserName;
                }
                if (!(fromUserName in self.messageList)) {
                    self.messageList[fromUserName] = [];
                }
                if (fromUserName == self.currentChatUser) {
                    currentUserMessage.push(value);
                }
                self.messageList[fromUserName].push(value);
            });
            this.updateMessageContent(currentUserMessage);
        }
        sendMessage(message) {
            if (message.length > 0) {
                let fakeMessage = this.createFakeMessage(message);
                if (!(this.currentChatUser in this.messageList)) {
                    this.messageList[this.currentChatUser] = [];
                }
                this.messageList[this.currentChatUser].push(fakeMessage);
                chatManager_1.chatManager.sendMessage(this.currentChatUser, message, function (result) {
                    if (result.BaseResponse.Ret == 0) {
                        fakeMessage.MsgId = result.MsgId;
                    }
                });
                this.updateMessageContent([fakeMessage]);
            }
        }
        createFakeMessage(message) {
            let time = new Date();
            return {
                MsgId: 0,
                MsgType: 1,
                Content: message,
                FromUserName: chatManager_1.chatManager.currentUser.UserName,
                ToUserName: this.currentChatUser,
                CreateTime: time.getTime(),
                StatusNotifyUserName: ''
            };
        }
        displayMessageContent(userName) {
            let self = this;
            let messages = this.messageList[userName];
            self.$chatContentContainer.empty();
            this.updateMessageContent(messages);
        }
        updateMessageContent(messages) {
            let self = this;
            if (!messages) {
                return;
            }
            messages.forEach(function (value) {
                var fromUserInfo;
                var isSelf = false;
                if (value.FromUserName == chatManager_1.chatManager.currentUser.UserName) {
                    isSelf = true;
                    fromUserInfo = chatManager_1.chatManager.currentUser;
                }
                else {
                    fromUserInfo = chatManager_1.chatManager.chatListInfo[value.FromUserName];
                }
                let item = new chatContentItem_1.ChatContentItem(value, fromUserInfo, isSelf);
                self.$chatContentContainer.append(item.$element);
            });
            self.$chatContentContainer.scrollTop(self.$chatContentContainer.height());
        }
    }
    exports.ChatContent = ChatContent;
});
