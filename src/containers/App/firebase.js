import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCoVgkWCcJDuat94ETIw-BjAItrlTDZJe0",
  authDomain: "vin-leasing.firebaseapp.com",
  databaseURL: "https://vin-leasing.firebaseio.com",
  projectId: "vin-leasing",
  storageBucket: "vin-leasing.appspot.com",
  messagingSenderId: "38882350420"
};

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey(
  "BE6g3lBd8qnTW7WeygxO_iFko_Kef3WkxjcWk1xIEQF3Px78LgrlRqPMOnZCcENN4Q7CSztvjSq1Uk6HG0Lmd5w"
);
