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
export const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey(
    "BCTJ4XMqSZYgGQ4fgkYHHLUUe0u3brLwLRAsMhQM8wHfAEvlEPsBPk4ydy8y8lvH2YZ1phhnC-ivxNp8uLzO2SA"
);
