var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BJMtqDIlviIyejVuoCsLfXKCnVpl7ho0NaJOlEUscq5NPy7W1RghXkDmjxxOlbq7vNsd1mbr0LCZaMB6uhbBKxE",
    "privateKey": "9ZKX73IXDCO8R4m2uPq9JtiBKKa2rh2cyprvm1g2-ds"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    )
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dJCre3Sk44Q:APA91bEgBJ6QUENEkU5QEKDidCSmLv7d3V9SXnncd1ExVRNhumY2Bek0UJoMdcNbSxm5F6yM4zw7DWin4eJ74yFe_LgYJGx9bcqcZpCrrFa1EByj-DAHEmXZVxLSlD5byQcNsl9umVgE",
    "keys": {
        "p256dh": "BP3cVG8yPjOygBuz91jkd3SXeMLph1lOzfpASBuTJCpEi7F1W9QjmAnLWZDWSgGBLusWLRhG1kkWQDBw3nbP1ZQ=",
        "auth": "7LNTz1wU1z7RzUG1EevA7Q=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '579881249574',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
    );