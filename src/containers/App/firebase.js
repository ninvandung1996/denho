import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD2jNSQ-nJBI0yKdd4tv0_nSKADrxXLGu0",
    authDomain: "vin-leasing-123.firebaseapp.com",
    databaseURL: "https://vin-leasing-123.firebaseio.com",
    projectId: "vin-leasing-123",
    storageBucket: "vin-leasing-123.appspot.com",
    messagingSenderId: "620773447236"
};

firebase.initializeApp(firebaseConfig);
export default firebase;

// Add the public key generated from the console here.
// messaging.usePublicVapidKey(
//   "BE6g3lBd8qnTW7WeygxO_iFko_Kef3WkxjcWk1xIEQF3Px78LgrlRqPMOnZCcENN4Q7CSztvjSq1Uk6HG0Lmd5w"
// );