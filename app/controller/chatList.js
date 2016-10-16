define(["require", "exports", '../manager/chatManager', '../template/chatListItem', '../baseClass/eventable'], function (require, exports, chatManager_1, chatListItem_1, eventable_1) {
    "use strict";
    class ChatList extends eventable_1.Eventable {
        constructor() {
            super();
            this.$chatListContainer = $('#chat-list-container');
            this.userListItems = [];
            this.userListItemsInfo = {};
            this.bindEvent();
        }
        updateChatList() {
            let self = this;
            let list;
            this.$chatListContainer.empty();
            this.userListItems = [];
            chatManager_1.chatManager.chatList.forEach(function (value) {
                let data = chatManager_1.chatManager.chatListInfo[value];
                let item = new chatListItem_1.ChatListItem(data);
                self.userListItems.push(item);
                self.userListItemsInfo[data.UserName] = item;
                self.$chatListContainer.append(item.$element);
                self.$chatListContainer.addBack();
            });
        }
        newMessage(messages) {
            let self = this;
            messages.forEach(function (value) {
                if (value.FromUserName in self.userListItemsInfo) {
                    let item = self.userListItemsInfo[value.FromUserName];
                    item.lastMessage = value.Content;
                    item.lastDate = new Date(value.CreateTime * 1000);
                    let index = self.userListItems.indexOf(item);
                    self.userListItems.splice(index, 1);
                    self.userListItems.unshift(item);
                }
            });
            self.$chatListContainer.empty();
            self.userListItems.forEach(function (value) {
                self.$chatListContainer.append(value.$element);
            });
        }
        selectedItem(index) {
            if (typeof this.activeUserIndex == 'number' && index == this.activeUserIndex) {
                return;
            }
            let item = this.userListItems[index];
            item.active = true;
            let preItem = this.userListItems[this.activeUserIndex];
            if (preItem) {
                preItem.active = false;
            }
            this.activeUserIndex = index;
            this.dispatchEvent('SelectUser', item.id);
        }
        bindEvent() {
            let self = this;
            this.$chatListContainer.on('click', '.item', function (event) {
                let index = $(this).index();
                self.selectedItem(index);
            });
        }
    }
    exports.ChatList = ChatList;
});
