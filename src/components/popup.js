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
        title: `Confirm`,
        content: `Are you sure you want to do this?`,
        buttons: {
            right: ['Cancel'],
            right: [{
                text: 'OK',
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