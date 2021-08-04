import Popup from 'react-popup';

export const errorPopup = (message, error) => {
    return Popup.register({
        title: `❗️ ${message}`,
        content: `ERROR: ${error}`,
        buttons: {
            right: ['ok']
        }
    })
}

export const confirmPopup = (message, promptValue, callback) => {
    return Popup.register({
        title: `Confirm Action`,
        content: `Are you sure you want to ${message}?  This action cannot be undone.`,
        buttons: {
            right: ['cancel'],
            right: [{
                text: 'ok',
                key: '⌘+s',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    })
}