// let admin = require("firebase-admin");
// let googleServiceAccount = require("../config/google-services.json");
// admin.initializeApp({
//   credential: admin.credential.cert(googleServiceAccount),
// });
class SendNotificationHelper {
  sendPushNotification(values) {
    // const registrationTokens = values.device_ids;
    // if (!registrationTokens) {
    //   return;
    // }
    // let payload = {
    //   notification: {
    //     title: values.title,
    //     body: values.body,
    //   },
    //   data: values && values.data ? values.data : {},
    // };
    // const option = {
    //   priority: "high",
    //   timeToLive: 60 * 60 * 24,
    // };
    // admin
    //   .messaging()
    //   .sendToDevice(registrationTokens, payload, option)
    //   .then((response) => {
    //     console.info("Notification sent successfully", response);
    //   })
    //   .catch((error) => {
    //     console.error("Notification", error);
    //   });
  }
}

module.exports = new SendNotificationHelper();
