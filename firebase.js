import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyDwLOBrP43HOh_p-c9NJ3UvU-WYfFi-NSU",

    authDomain: "whitegames-6cc28.firebaseapp.com",

    databaseURL:
    "https://whitegames-6cc28-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "whitegames-6cc28",

    storageBucket:
    "whitegames-6cc28.firebasestorage.app",

    messagingSenderId: "39184769201",

    appId:
    "1:39184769201:web:8b1ff022ac9fdbba1e4290",

    measurementId: "G-CPGKM7E5ZV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

export {

    auth,
    database,

    ref,
    set,
    get,
    child,
    onValue,

    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut

};