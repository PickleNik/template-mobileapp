const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.userPicture = functions.storage.object().onFinalize(event => {
 console.log(event);
 return 0;
});
