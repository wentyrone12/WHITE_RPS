import {
    auth,
    database,
    ref,
    set,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
}
from "./firebase.js";


// MODALS
const signupModal = document.getElementById("signupModal");
const forgotModal = document.getElementById("forgotModal");

document.getElementById("openSignup")
.addEventListener("click", () => {

    signupModal.style.display = "flex";

});

document.getElementById("openForgot")
.addEventListener("click", () => {

    forgotModal.style.display = "flex";

});

document.getElementById("closeSignup")
.addEventListener("click", () => {

    signupModal.style.display = "none";

});

document.getElementById("closeForgot")
.addEventListener("click", () => {

    forgotModal.style.display = "none";

});


// LOGIN
document.getElementById("loginBtn")
.addEventListener("click", () => {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(email === "" || password === ""){

        alert("Fill all fields!");
        return;

    }

    signInWithEmailAndPassword(auth, email, password)

    .then(() => {

        alert("Login Success!");

        window.location.href = "dashboard.html";

    })

    .catch((error) => {

        alert(error.message);

    });

});


// CREATE ACCOUNT
document.getElementById("signupBtn")
.addEventListener("click", () => {

    const username =
    document.getElementById("signupUsername").value;

    const email =
    document.getElementById("signupEmail").value;

    const password =
    document.getElementById("signupPassword").value;

    if(username === "" || email === "" || password === ""){

        alert("Fill all fields!");
        return;

    }

    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

        updateProfile(userCredential.user, {

    displayName: username

})

.then(() => {

    // SAVE USER DATABASE
    set(ref(database, "users/" + userCredential.user.uid), {

        username: username,
        email: email,
        bio: "No bio yet.",
        age: "N/A",
        gender: "N/A",
        image: "",
        status: "online"

    });

});

        alert("Account Created Successfully!");

        signupModal.style.display = "none";

    })

    .catch((error) => {

        alert(error.message);

    });

});


// FORGOT PASSWORD
document.getElementById("forgotBtn")
.addEventListener("click", () => {

    const email =
    document.getElementById("forgotEmail").value;

    if(email === ""){

        alert("Enter your email!");
        return;

    }

    sendPasswordResetEmail(auth, email)

    .then(() => {

        alert("Password Reset Email Sent!");

        forgotModal.style.display = "none";

    })

    .catch((error) => {

        alert(error.message);

    });

});