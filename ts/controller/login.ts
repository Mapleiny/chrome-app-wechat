import {WxLogin} from '../tools/wxLogin'



export class Login{
	wxLogin = new WxLogin();
	constructor(){
		let self = this;

		let $QRCode = $('#QRCode');

		self.start($QRCode);
		
	}

	start($QRCode){
		let self = this;
		this.wxLogin.start().then(function(value){
			// qrcode
			$QRCode.attr('src',value.data);
			return value.next;
		}).then(function(value){
			// 二维码已扫描
			return value.next;
		}).then(function(value){
			// 登录已确认
			self.jumpToMain(value.data);
		}).catch(function(error){
			if(error == 'refreash') {
				self.start($QRCode);
			}
		});
	}

	jumpToMain(info){
		chrome.runtime.sendMessage({
			command:'OPEN_MAIN',
			data: info
		});
	}
}