const registration = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
            .register('./service-worker.js')
            .then(() => console.log('Register Berhasil'))
            .catch(() => console.log('Register Tidak Berhasil'))
        })
    }else{
        console.log('Service Worker it is not supported!')
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}   

const notification = () => {
    if('Notification' in window){
        Notification.requestPermission()
        .then(result => {
            if(result === 'denied'){
                console.log('Denied')
                return
            }else if (result === 'default'){
                console.log('Default!')
                return
            }
            if(('PushManager' in window)){
                navigator.serviceWorker.getRegistration()
                .then(reg => {
                    reg.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BJMtqDIlviIyejVuoCsLfXKCnVpl7ho0NaJOlEUscq5NPy7W1RghXkDmjxxOlbq7vNsd1mbr0LCZaMB6uhbBKxE")
                    })
                    .then(sub => {
                        console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                    })
                    .catch(err => console.log('Gagal Subscribe : ',err))
                })
            }
        })
    }
}

export default {
    registration,
    notification
}