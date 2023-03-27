/* eslint-disable */ 
const functions = require("firebase-functions");

// import firebase-admin package
const admin = require("firebase-admin");
const firestore = admin.firestore;

admin.initializeApp()

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.createUser = functions.auth.user().onCreate((user) => {
    const { uid, email, disabled } = user
    admin.firestore().collection("users").doc(uid)
    .set({
        email: email,
        disabled: disabled,
        uid: uid,
        notPermissive: [],
        created: firestore.Timestamp.fromDate(new Date()),
    }).then(writeResult => {
        return;
    }).catch(err => {
       console.log(err);
       return;
    });
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
    const { uid } = user
    admin.firestore().collection("users").doc(uid).delete().then(() => {
        return;
    }).catch((error) => {
        console.error("Error deleting document", error);
        return;
    })
})
