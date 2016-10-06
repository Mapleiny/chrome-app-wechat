var loginWindow;
let createLoginWindow = function () {
    return chrome.app.window.create('login.html', {
        'id': 'LoginWindow',
        'innerBounds': {
            'width': 300,
            'height': 400
        },
        'frame': 'none',
        'resizable': false
    }, function (createdWindow) {
        loginWindow = createdWindow;
    });
};
let createMainWindow = function () {
    chrome.app.window.create('index.html', {
        'id': 'MainWindow',
        'innerBounds': {
            'minWidth': 800,
            'minHeight': 600
        },
        'frame': 'none',
    });
};
chrome.app.runtime.onLaunched.addListener(function () {
    createLoginWindow();
    // createMainWindow();
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command == 'OPEN_MAIN') {
        console.log(message.data);
        if (!message.data) {
            return;
        }
        chrome.storage.sync.set({
            redirectUrl: message.data
        }, function () {
            console.log(chrome.runtime.lastError);
            if (loginWindow) {
                loginWindow.close();
            }
            createMainWindow();
        });
    }
});
