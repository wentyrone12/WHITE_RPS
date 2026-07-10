
import {
    remove,
    update,
    push
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    auth,
    database,
    ref,
    set,
    get,
    child,
    onValue,
    signOut
}
    from "./firebase.js";


const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

const settingsEmail = document.getElementById("settingsEmail");
const settingsUID = document.getElementById("settingsUID");

settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "flex";

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    const user = auth.currentUser;

    if (user) {
        settingsEmail.innerText = "Email: " + user.email;
        settingsUID.innerText = "User ID: " + user.uid;
    }
});

closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
});


document.getElementById("changeUsernameBtn")
    .addEventListener("click", () => {

        const user = auth.currentUser;
        const newUsername = document.getElementById("newUsername").value;

        if (!newUsername) return alert("Enter username!");

        update(ref(database, "users/" + user.uid), {
            username: newUsername
        });

        alert("Username updated!");
    });

document.getElementById("changePasswordBtn")
    .addEventListener("click", async () => {

        const user = auth.currentUser;

        if (!user) {
            return alert("User not logged in.");
        }

        const currentPass =
            document.getElementById("currentPassword").value.trim();

        const newPass =
            document.getElementById("newPassword").value.trim();

        const confirmPass =
            document.getElementById("confirmPassword").value.trim();

        if (
            currentPass === "" ||
            newPass === "" ||
            confirmPass === ""
        ) {
            return alert("Please fill in all fields.");
        }

        if (newPass.length < 6) {
            return alert("New password must be at least 6 characters.");
        }

        if (newPass !== confirmPass) {
            return alert("New password and Confirm password do not match.");
        }

        if (currentPass === newPass) {
            return alert("New password must be different from current password.");
        }

        try {

            const credential =
                EmailAuthProvider.credential(
                    user.email,
                    currentPass
                );

            await reauthenticateWithCredential(
                user,
                credential
            );

            await updatePassword(user, newPass);

            alert("✅ Password changed successfully!");

            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";

        }

        catch (err) {

            if (err.code === "auth/invalid-credential") {

                alert("❌ Current password is incorrect.");

            }

            else if (err.code === "auth/wrong-password") {

                alert("❌ Current password is incorrect.");

            }

            else if (err.code === "auth/requires-recent-login") {

                alert("⚠ Please logout then login again before changing your password.");

            }

            else {

                alert(err.message);

            }

        }

    });

document.getElementById("deleteAccountBtn")
    .addEventListener("click", () => {

        const user = auth.currentUser;

        if (confirm("Delete your account permanently?")) {

            remove(ref(database, "users/" + user.uid));

            deleteUser(user)
                .then(() => {
                    alert("Account deleted");
                    window.location.href = "index.html";
                })
                .catch(err => alert(err.message));
        }

    });

// SIDEBAR
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("active");
    overlay.classList.add("active");

});

overlay.addEventListener("click", () => {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const user = auth.currentUser;

    if (user) {

        set(
            ref(database, "users/" + user.uid + "/status"),
            "offline"
        );

    }

    signOut(auth)

        .then(() => {

            alert("Logged Out!");

            window.location.href = "index.html";

        });

});

// PROFILE SYSTEM
const profileBtn =
    document.getElementById("profileBtn");


const gamePopup =
    document.getElementById("gamePopup");

const popupContent =
    document.getElementById("popupContent");

const profileModal =
    document.getElementById("profileModal");

const closeProfile =
    document.getElementById("closeProfile");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const editSection =
    document.getElementById("editSection");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const profileUsername =
    document.getElementById("profileUsername");

const profileBio =
    document.getElementById("profileBio");

const profileAge =
    document.getElementById("profileAge");

const profileGender =
    document.getElementById("profileGender");

const profileImage =
    document.getElementById("profileImage");


// OPEN PROFILE
profileBtn.addEventListener("click", () => {

    profileModal.style.display = "flex";

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});
// CLOSE PROFILE
closeProfile.addEventListener("click", () => {

    profileModal.style.display = "none";

    profileActionButtons.style.display = "flex";

});
// LOAD USER DATA
auth.onAuthStateChanged((user) => {

    if (user) {

        // ONLINE STATUS
        set(
            ref(database, "users/" + user.uid + "/status"),
            "online"
        );

        const userRef =
            ref(database, "users/" + user.uid);

        onValue(userRef, (snapshot) => {

            if (snapshot.exists()) {

                const data = snapshot.val();

                profileUsername.innerText =
                    data.username || "Unknown";

                profileBio.innerText =
                    data.bio || "No bio yet.";

                profileAge.innerText =
                    "Age: " + (data.age || "N/A");

                profileGender.innerText =
                    "Gender: " + (data.gender || "N/A");

                if (data.image) {

                    profileImage.src = data.image;

                }

            }

        });

    }

});

// EDIT PROFILE
editProfileBtn.addEventListener("click", () => {

    editSection.style.display = "block";

    editProfileBtn.style.display = "none";

    profileBio.style.display = "none";
    profileAge.style.display = "none";
    profileGender.style.display = "none";

});

// SAVE PROFILE
saveProfileBtn.addEventListener("click", () => {

    const user = auth.currentUser;

    if (!user) return;

    const bio =
        document.getElementById("editBio").value;

    const age =
        document.getElementById("editAge").value;

    const gender =
        document.getElementById("editGender").value;

    const file =
        document.getElementById("profileUpload")
            .files[0];

    function saveData(imageURL = "") {

        set(ref(database, "users/" + user.uid), {

            username: user.displayName,
            email: user.email,
            bio: bio,
            age: age,
            gender: gender,
            image: imageURL,
            status: "online"

        });

        profileBio.innerText = bio;
        profileAge.innerText = "Age: " + age;
        profileGender.innerText = "Gender: " + gender;

        if (imageURL) {

            profileImage.src = imageURL;

        }

        alert("Profile Saved!");

        editSection.style.display = "none";

        editProfileBtn.style.display = "block";

        profileBio.style.display = "block";
        profileAge.style.display = "block";
        profileGender.style.display = "block";

    }

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            saveData(e.target.result);

        };

        reader.readAsDataURL(file);

    }
    else {

        saveData(profileImage.src);

    }

});

// SEARCH SYSTEM
const searchBtn =
    document.getElementById("searchBtn");

const searchModal =
    document.getElementById("searchModal");

const closeSearch =
    document.getElementById("closeSearch");

const searchUserBtn =
    document.getElementById("searchUserBtn");

const searchResult =
    document.getElementById("searchResult");


// VIEW USER MODAL
const viewUserModal =
    document.getElementById("viewUserModal");

const closeViewUser =
    document.getElementById("closeViewUser");

const viewUserImage =
    document.getElementById("viewUserImage");

const viewUserName =
    document.getElementById("viewUserName");

const viewUserStatus =
    document.getElementById("viewUserStatus");

const viewUserBio =
    document.getElementById("viewUserBio");

const viewUserAge =
    document.getElementById("viewUserAge");

const viewUserGender =
    document.getElementById("viewUserGender");

const startChatBtn =
    document.getElementById("startChatBtn");

const challengeBtn =
    document.getElementById("challengeBtn");

const profileActionButtons =
    document.querySelector(".profile-action-buttons");

const notifBtn =
    document.getElementById("notifBtn");

const notifModal =
    document.getElementById("notifModal");

const closeNotif =
    document.getElementById("closeNotif");

const notifList =
    document.getElementById("notifList");

const notifCount =
    document.getElementById("notifCount");


// OPEN SEARCH
searchBtn.addEventListener("click", () => {

    searchModal.style.display = "flex";

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});

// CLOSE SEARCH
closeSearch.addEventListener("click", () => {

    searchModal.style.display = "none";

});
// CLOSE VIEW USER
closeViewUser.addEventListener("click", () => {
    viewUserModal.style.display = "none";
    profileActionButtons.style.display = "flex";
});
// SEARCH USER
searchUserBtn.addEventListener("click", () => {

    const username =
        document.getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();

    searchResult.innerHTML = "";

    // ✅ walang input = walang lalabas
    if (username === "") {
        return;
    }

    if (username === "") {

        searchResult.innerHTML = `
    <div class="user-result">
        <div style="width:100%;text-align:center;color:#999;">
            🔍 Please enter a username.
        </div>
    </div>
    `;

        return;
    }

    const dbRef = ref(database);

    get(child(dbRef, "users"))

        .then((snapshot) => {

            searchResult.innerHTML = "";

            if (snapshot.exists()) {

                snapshot.forEach((userSnap) => {

                    const user = userSnap.val();

                    if (
                        user.username.toLowerCase()
                            .includes(username)
                    ) {

                        const userCard =
                            document.createElement("div");

                        userCard.classList.add("user-result");

                        userCard.innerHTML = `

                    <img src="${user.image ||
                            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                            }">

                    <div>

                        <h3>${user.username}</h3>

                        <p class="${user.status === "online"
                                ? "🟢 online"
                                : "🔴 offline"
                            }">

                            ${user.status}

                        </p>

                    </div>

                    `;

                        // CLICK USER PROFILE
                        userCard.addEventListener("click", () => {

                            // ✅ alisin agad ang search results
                            searchResult.innerHTML = "";
                            document.getElementById("searchInput").value = "";

                            // ✅ kung sarili ang pinindot
                            if (userSnap.key === auth.currentUser.uid) {

                                profileModal.style.display = "flex";
                                viewUserModal.style.display = "none";

                                profileActionButtons.style.display = "none";
                                editProfileBtn.style.display = "block";

                                return;
                            }

                            // ✅ ibang user
                            profileActionButtons.style.display = "flex";
                            editProfileBtn.style.display = "none";

                            // Itago muna ang ibang cards
                            searchModal.style.display = "none";
                            chatModal.style.display = "none";
                            chatListModal.style.display = "none";
                            leaderboardModal.style.display = "none";
                            notifModal.style.display = "none";
                            profileModal.style.display = "none";

                            // Ipakita lang ang profile
                            viewUserModal.style.display = "flex";

                            viewUserImage.src =
                                user.image ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                            viewUserName.innerText = user.username;
                            viewUserStatus.innerText = user.status;
                            viewUserBio.innerText = user.bio;
                            viewUserAge.innerText = "Age: " + user.age;
                            viewUserGender.innerText = "Gender: " + user.gender;

                            startChatBtn.dataset.uid = userSnap.key;
                            startChatBtn.dataset.username = user.username;
                            startChatBtn.dataset.image =
                                user.image ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        });

                        searchResult.appendChild(userCard);

                        userCard.scrollIntoView({

                            behavior: "smooth",

                            block: "nearest"

                        });

                    }

                });

            }

        });

});

// CHAT SYSTEM
const chatBtn =
    document.getElementById("chatBtn");

const chatListModal =
    document.getElementById("chatListModal");

const closeChatList =
    document.getElementById("closeChatList");

const chatList =
    document.getElementById("chatList");

const chatModal =
    document.getElementById("chatModal");

const closeChat =
    document.getElementById("closeChat");

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");

const chatUserName =
    document.getElementById("chatUserName");

const chatUserImage =
    document.getElementById("chatUserImage");

const chatProfileHeader =
    document.getElementById("chatProfileHeader");

let currentChatUID = "";
let currentChatName = "";
let currentChatImage = "";

// OPEN CHAT LIST
chatBtn.addEventListener("click", () => {

    chatListModal.style.display = "flex";

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    loadChats();

});

// CLOSE CHAT LIST
closeChatList.addEventListener("click", () => {

    chatListModal.style.display = "none";

});

// CLOSE CHAT
closeChat.addEventListener("click", () => {

    chatModal.style.display = "none";

});

// START CHAT BUTTON
startChatBtn.addEventListener("click", () => {

    currentChatUID =
        startChatBtn.dataset.uid;

    currentChatName =
        startChatBtn.dataset.username;

    currentChatImage =
        startChatBtn.dataset.image;

    openChat();

});

// OPEN CHAT FUNCTION
function openChat() {

    chatModal.style.display = "flex";

    chatUserName.innerText =
        currentChatName;

    chatUserImage.src =
        currentChatImage;

    chatMessages.innerHTML = "";

    const myUID =
        auth.currentUser.uid;

    const roomID =
        [myUID, currentChatUID]
            .sort()
            .join("_");

    // REALTIME CHAT LISTENER
    onValue(

        ref(database, "messages/" + roomID),

        (snapshot) => {

            chatMessages.innerHTML = "";

            if (snapshot.exists()) {

                snapshot.forEach((msgSnap) => {

                    const msg = msgSnap.val();

                    const msgDiv =
                        document.createElement("div");

                    // MY MESSAGE
                    if (msg.sender === myUID) {

                        msgDiv.classList.add("my-message");

                        msgDiv.innerHTML = `

                        <div class="message-bubble my-bubble">
                            ${msg.text}
                        </div>

                        `;

                    }

                    // THEIR MESSAGE
                    else {

                        msgDiv.classList.add("their-message");

                        msgDiv.innerHTML = `

                        <img
                        src="${currentChatImage}"
                        class="chat-avatar">

                        <div class="message-bubble their-bubble">
                            ${msg.text}
                        </div>

                        `;

                    }
                    chatMessages.appendChild(msgDiv);

                });

            }
            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        }

    );

}

function openUserProfileFromChat() {

    get(ref(database, "users/" + currentChatUID))
        .then((snapshot) => {

            if (!snapshot.exists()) return;

            const user = snapshot.val();

            // sarili
            if (currentChatUID === auth.currentUser.uid) {

                chatModal.style.display = "none";
                chatListModal.style.display = "none";
                searchModal.style.display = "none";
                leaderboardModal.style.display = "none";
                notifModal.style.display = "none";

                profileModal.style.display = "flex";
                viewUserModal.style.display = "none";

                profileActionButtons.style.display = "none";
                editProfileBtn.style.display = "block";

                return;

            }

            // ibang user

            chatModal.style.display = "none";
            chatListModal.style.display = "none";
            searchModal.style.display = "none";
            leaderboardModal.style.display = "none";
            notifModal.style.display = "none";
            profileModal.style.display = "none";

            viewUserModal.style.display = "flex";

            viewUserImage.src =
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";

            viewUserName.innerText =
                user.username;

            viewUserStatus.innerText =
                user.status || "offline";

            viewUserBio.innerText =
                user.bio || "No bio";

            viewUserAge.innerText =
                "Age: " + (user.age || "N/A");

            viewUserGender.innerText =
                "Gender: " + (user.gender || "N/A");

            profileActionButtons.style.display = "flex";

            editProfileBtn.style.display = "none";

            startChatBtn.dataset.uid =
                currentChatUID;

            startChatBtn.dataset.username =
                user.username;

            startChatBtn.dataset.image =
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";

        });

}

// SEND MESSAGE
sendMessageBtn.addEventListener("click", () => {

    const text =
        chatInput.value.trim();

    if (text === "") return;

    const myUID =
        auth.currentUser.uid;

    const roomID =
        [myUID, currentChatUID]
            .sort()
            .join("_");

    push(

        ref(database, "messages/" + roomID),

        {

            sender: myUID,
            text: text,
            time: Date.now()

        }

    );
    // SAVE CHAT LIST USER1
    set(

        ref(
            database,
            "chatList/" +
            myUID + "/" +
            currentChatUID
        ),

        {

            uid: currentChatUID,
            username: currentChatName,
            image: currentChatImage

        }

    );
    // SAVE CHAT LIST USER2
    set(

        ref(
            database,
            "chatList/" +
            currentChatUID + "/" +
            myUID
        ),

        {

            uid: myUID,
            username: profileUsername.innerText,
            image: profileImage.src

        }

    );

    chatInput.value = "";

});

// LOAD CHAT LIST
function loadChats() {

    const myUID =
        auth.currentUser.uid;

    onValue(

        ref(database, "chatList/" + myUID),

        (snapshot) => {

            chatList.innerHTML = "";

            if (snapshot.exists()) {

                snapshot.forEach((chatSnap) => {

                    const chat =
                        chatSnap.val();

                    const chatCard =
                        document.createElement("div");

                    chatCard.classList.add("user-result");

                    chatCard.innerHTML = `

                    <img src="${chat.image ||
                        'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }">

                    <div>

                        <h3>${chat.username}</h3>

                    </div>

                    `;

                    chatCard.addEventListener("click", () => {

                        currentChatUID =
                            chat.uid;

                        currentChatName =
                            chat.username;

                        currentChatImage =
                            chat.image;

                        openChat();

                    });

                    chatList.appendChild(chatCard);

                });

            }
            else {

                chatList.innerHTML =
                    "<p>No chats yet.</p>";

            }

        }

    );

}

function hideAllCards() {

    profileModal.style.display = "none";
    searchModal.style.display = "none";
    viewUserModal.style.display = "none";
    chatModal.style.display = "none";
    chatListModal.style.display = "none";
    notifModal.style.display = "none";
    leaderboardModal.style.display = "none";
    settingsModal.style.display = "none";

}

// OPEN NOTIFICATION
notifBtn.addEventListener("click", () => {

    notifModal.style.display = "flex";

});

// CLOSE NOTIFICATION
closeNotif.addEventListener("click", () => {

    notifModal.style.display = "none";

});


// GAME VARIABLES
let hasPlayed = false;
let userScore = 0;
let opponentScore = 0;
let canPick = false; // 👈 NEW (control picking)
let currentGameRoom = "";
let myChoice = "";
let gameStarted = false;
let prepStarted = false;

const playerHand =
    document.getElementById("playerHand");

const computerHand =
    document.getElementById("computerHand");

const countdown =
    document.getElementById("countdown");

const resultText =
    document.getElementById("result");

const movesText =
    document.getElementById("moves");

const userScoreText =
    document.getElementById("userScore");

const computerScoreText =
    document.getElementById("computerScore");

const opponentName =
    document.querySelector(".opponent");

const emojis = {

    rock: "✊",
    paper: "✋",
    scissors: "✌️"

};
// SEND CHALLENGE
challengeBtn.addEventListener("click", () => {

    const myUser = auth.currentUser;

    if (!myUser) return;

    const targetUID =
        startChatBtn.dataset.uid;

    const targetName =
        startChatBtn.dataset.username;

    const roomID =
        [myUser.uid, targetUID]
            .sort()
            .join("_");

    set(

        ref(database,
            "notifications/" +
            targetUID + "/" +
            roomID),

        {

            roomID: roomID,

            senderUID: myUser.uid,

            senderName:
                profileUsername.innerText,

            senderImage:
                profileImage.src,

            receiverUID: targetUID,

            status: "pending",

            time: Date.now()

        }

    );

    alert(
        "Challenge Sent to " +
        targetName
    );

});

document.addEventListener("click", (e) => {

    if (e.target && e.target.id === "closeGamePopup") {

        gamePopup.style.display = "none";

        resultText.innerText = "Choose Your Move";
        movesText.innerText = "You: - | Opponent: -";

        playerHand.innerText = "✊";
        computerHand.innerText = "✊";

    }

});

function startBattleAnimation(myMove, enemyMove, callback) {

    playerHand.innerText = "✊";
    computerHand.innerText = "✊";

    playerHand.classList.add("shake");
    computerHand.classList.add("shake");

    let count = 3;
    countdown.innerText = count;

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdown.innerText = count;
        } else {
            countdown.innerText = "GO!";
        }
    }, 1000);

    setTimeout(() => {

        clearInterval(timer);

        playerHand.classList.remove("shake");
        computerHand.classList.remove("shake");

        playerHand.innerText = emojis[myMove];
        computerHand.innerText = emojis[enemyMove];

        countdown.innerText = "";

        callback(); // 👉 dito lalabas result

    }, 3000);
}

function resetScores() {

    userScore = 0;
    opponentScore = 0;

    userScoreText.innerText = "0";
    computerScoreText.innerText = "0";

    resultText.innerText = "Choose Your Move";
    movesText.innerText = "You: - | Opponent: -";

    playerHand.innerText = "✊";
    computerHand.innerText = "✊";

}


// LOAD NOTIFICATIONS
function loadNotifications(user) {

    onValue(

        ref(database,
            "notifications/" + user.uid),

        (snapshot) => {

            notifList.innerHTML = "";

            let total = 0;

            if (snapshot.exists()) {

                snapshot.forEach((notifSnap) => {

                    total++;

                    const notif =
                        notifSnap.val();

                    const notifCard =
                        document.createElement("div");

                    notifCard.classList.add("user-result");

                    notifCard.innerHTML = `

                    <img src="${notif.senderImage
                        }">

                    <div style="flex:1;">

                        <h3 class="notif-user">
                            ${notif.senderName}
                        </h3>

                        <p>
                            challenged you to play
                        </p>

                        <div class="notif-buttons">

                            <button class="accept-btn">
                                Accept
                            </button>

                            <button class="decline-btn">
                                Decline
                            </button>

                        </div>

                    </div>

                    `;

                    // ACCEPT
                    notifCard
                        .querySelector(".accept-btn")

                        .addEventListener("click", () => {

                            resetScores();

                            currentGameRoom = notif.roomID;
                            gameStarted = true;

                            opponentName.innerText =
                                notif.senderName;

                            // CREATE GAME
                            set(

                                ref(
                                    database,
                                    "games/" +
                                    currentGameRoom
                                ),

                                {

                                    player1:
                                        notif.senderUID,

                                    player2:
                                        auth.currentUser.uid,

                                    player1Name:
                                        notif.senderName,

                                    player2Name:
                                        profileUsername.innerText,

                                    player1Choice: "",
                                    player2Choice: "",

                                    accepted: true,

                                    started: false

                                }

                            );

                            // SEND ACCEPT NOTIF
                            set(

                                ref(
                                    database,
                                    "gameResponses/" +
                                    notif.senderUID +
                                    "/" +
                                    currentGameRoom
                                ),

                                {

                                    accepted: true,

                                    accepter:
                                        profileUsername.innerText,

                                    roomID:
                                        currentGameRoom

                                }

                            );

                            remove(

                                ref(
                                    database,
                                    "notifications/" +
                                    user.uid + "/" +
                                    notif.roomID
                                )

                            )

                                .then(() => {

                                    const user = auth.currentUser;

                                    remove(
                                        ref(
                                            database,
                                            "notifications/" +
                                            user.uid + "/" +
                                            notifSnap.key
                                        )
                                    ).then(() => {

                                        alert(
                                            "You accepted " +
                                            notif.senderName +
                                            "'s challenge!"
                                        );

                                        notifCard.remove();

                                    });

                                });
                            notifModal.style.display =
                                "none";

                            startPreparation();

                            listenGame();

                        });

                    // DECLINE
                    notifCard
                        .querySelector(".decline-btn")

                        .addEventListener("click", () => {

                            const user = auth.currentUser;

                            remove(
                                ref(
                                    database,
                                    "notifications/" +
                                    user.uid + "/" +
                                    notifSnap.key
                                )
                            ).then(() => {

                                alert("Challenge Declined");

                                notifCard.remove();

                            });

                        });

                    notifList.appendChild(notifCard);

                });

                // 🔥 kapag may bagong notif
                playNotif();

            }
            else {

                notifList.innerHTML =
                    "No request";

            }

            notifCount.innerText =
                total;

        }

    );

}
function startPreparation() {

    if (prepStarted) return;

    prepStarted = true;
    canPick = false;

    let prep = 5;

    countdown.innerText = prep;

    const prepTimer = setInterval(() => {

        prep--;
        countdown.innerText = prep;

        if (prep <= 0) {

            clearInterval(prepTimer);

            countdown.innerText = "GO!";

            setTimeout(() => {
                countdown.innerText = "";
                canPick = true; // ❌ STOP PICKING AFTER COUNTDOWN
            }, 1000);
        }

    }, 1000);
}
// PLAY GAME
function playGame(choice) {

    // 👉 AI MODE (always allow)
    if (!gameStarted) {

        const aiChoices = ["rock", "paper", "scissors"];
        const aiMove = aiChoices[Math.floor(Math.random() * 3)];

        playerHand.innerText = "✊";
        computerHand.innerText = "✊";

        playerHand.classList.add("shake");
        computerHand.classList.add("shake");

        let count = 3;
        countdown.innerText = count;

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.innerText = count;
            } else {
                countdown.innerText = "";
            }

            startBattleSound();
        }, 1000);

        setTimeout(() => {

            clearInterval(timer);

            playerHand.classList.remove("shake");
            computerHand.classList.remove("shake");

            playerHand.innerText = emojis[choice];
            computerHand.innerText = emojis[aiMove];

            let result = "";

            if (choice === aiMove) {
                result = "🤝 DRAW";
            }
            else if (
                (choice === "rock" && aiMove === "scissors") ||
                (choice === "paper" && aiMove === "rock") ||
                (choice === "scissors" && aiMove === "paper")
            ) {
                result = "🏆 YOU WIN!";
                userScore++;
            }
            else {
                result = "💀 YOU LOSE!";
                opponentScore++;
            }

            userScoreText.innerText = userScore;
            computerScoreText.innerText = opponentScore;

            resultText.innerText = result;
            movesText.innerText = `You: ${choice} | AI: ${aiMove}`;

            stopBattleSound();

        }, 3000);

        return;
    }

    // 👉 MULTIPLAYER ONLY
    if (!canPick) return;

    const myUID = auth.currentUser.uid;

    get(ref(database, "games/" + currentGameRoom))
        .then((snapshot) => {

            if (snapshot.exists()) {

                const game = snapshot.val();

                if (game.player1 === myUID) {
                    update(ref(database, "games/" + currentGameRoom), {
                        player1Choice: choice
                    });
                } else {
                    update(ref(database, "games/" + currentGameRoom), {
                        player2Choice: choice
                    });
                }

                playerHand.innerText = emojis[choice];
                resultText.innerText = "⏳ Waiting for opponent...";
                movesText.innerText = `You: ${choice.toUpperCase()} | Opponent: ?`;
            }

        });
}

// 🔊 AUDIO SYSTEM
const sounds = {
    notif: new Audio("bell.mp3"),
    battle: new Audio("battle.mp3"),
    click: new Audio("clicker.mp3")
};

// 👉 SETTINGS (EDITABLE MO)
let battleDuration = 3000; // 🔥 pwede mo baguhin (ms)
let notifVolume = 0.7;
let battleVolume = 0.5;

// APPLY SETTINGS
sounds.notif.volume = notifVolume;
sounds.battle.volume = battleVolume;
sounds.battle.loop = true;

// PLAY FUNCTIONS
function playNotif() {
    sounds.notif.currentTime = 0;
    sounds.notif.play();
}

function startBattleSound() {
    sounds.battle.currentTime = 0.3;
    sounds.battle.play();

    // AUTO STOP AFTER DURATION
    setTimeout(() => {
        stopBattleSound();
    }, battleDuration);
}

function stopBattleSound() {
    sounds.battle.pause();
    sounds.battle.currentTime = 0;
}

function listenGame() {

    onValue(
        ref(database, "games/" + currentGameRoom),
        (snapshot) => {

            if (!snapshot.exists()) return;

            const game = snapshot.val();
            const myUID = auth.currentUser.uid;

            // ✅ START SYNC FIX

            update(ref(database, "games/" + currentGameRoom), {
                started: true
            });
            if (game.started && !prepStarted) {
                startPreparation();
            }

            let myMove = "";
            let enemyMove = "";

            if (game.player1 === myUID) {
                myMove = game.player1Choice;
                enemyMove = game.player2Choice;
            } else if (game.player2 === myUID) {
                myMove = game.player2Choice;
                enemyMove = game.player1Choice;
            }

            // WAITING
            if (myMove && !enemyMove) {
                resultText.innerText = "⏳ Waiting for opponent...";
                return;
            }

            if (!myMove && enemyMove) {
                resultText.innerText = "⚡ Opponent already picked!";
                return;
            }

            // BOTH READY
            if (myMove && enemyMove) {

                // 👉 iwas double animation
                startBattleSound();
                if (window.isAnimating) return;
                window.isAnimating = true;

                startBattleAnimation(myMove, enemyMove, () => {

                    let result = "";

                    if (myMove === enemyMove) {
                        result = "🤝 DRAW GAME";
                    }
                    else if (
                        (myMove === "rock" && enemyMove === "scissors") ||
                        (myMove === "paper" && enemyMove === "rock") ||
                        (myMove === "scissors" && enemyMove === "paper")
                    ) {
                        result = "🏆 YOU WIN!";
                        userScore++;

                        const user = auth.currentUser;

                        if (user) {
                            const userRef = ref(database, "users/" + user.uid);

                            get(userRef).then(snapshot => {
                                if (snapshot.exists()) {
                                    const currentWins = snapshot.val().wins || 0;

                                    update(userRef, {
                                        wins: currentWins + 1
                                    });
                                }
                            });
                        }
                    }
                    else {
                        result = "💀 YOU LOSE!";
                        opponentScore++;
                    }

                    userScoreText.innerText = userScore;
                    computerScoreText.innerText = opponentScore;

                    update(ref(database, "games/" + currentGameRoom), {
                        player1Choice: "",
                        player2Choice: ""
                    });

                    gamePopup.style.display = "flex";

                    popupContent.innerHTML = `
                    <h1>${result}</h1>
                    <h3>You: ${myMove.toUpperCase()}</h3>
                    <h3>Opponent: ${enemyMove.toUpperCase()}</h3>
                    <button id="closeGamePopup">CONTINUE</button>
                `;

                    window.isAnimating = false;


                });

            }
        }
    );

    resetScores();

}

function showPlayNotif(data) {

    playNotif();

    notifModal.style.display = "flex";

    const notifCard = document.createElement("div");
    notifCard.classList.add("user-result");

    notifCard.innerHTML = `
    <div style="flex:1;">
        <h3>${data.accepter}</h3>
        <p>accepted your challenge</p>

        <div class="notif-buttons">
            <button class="play-btn">▶ Play</button>
            <button class="delete-btn">🗑 Delete</button>
        </div>
    </div>
`;

    notifCard.querySelector(".play-btn")
        .addEventListener("click", () => {

            currentGameRoom = data.roomID;
            gameStarted = true;

            opponentName.innerText = data.accepter;

            // START GAME FLAG
            update(
                ref(database, "games/" + currentGameRoom),
                { started: true }
            );

            startPreparation();
            listenGame();

            notifModal.style.display = "none";

        });

    // DELETE BUTTON
    notifCard.querySelector(".delete-btn")
        .addEventListener("click", () => {

            const myUID = auth.currentUser.uid;

            remove(
                ref(
                    database,
                    "gameResponses/" + myUID + "/" + data.roomID
                )
            ).then(() => {

                notifCard.remove();

            });

        });

    notifList.appendChild(notifCard);

}


document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        sounds.click.currentTime = 2.2;
        sounds.click.play();
    });
});

function listenGameResponses() {

    const myUID = auth.currentUser.uid;

    console.log("Listening for responses...");

    onValue(
        ref(database, "gameResponses/" + myUID),
        (snapshot) => {

            console.log("Snapshot:", snapshot.val());

            if (snapshot.exists()) {

                snapshot.forEach((snap) => {

                    const data = snap.val();

                    console.log("May accept:", data);

                    showPlayNotif(data);

                });

            }

        }
    );

}


auth.onAuthStateChanged((user) => {
    if (user) {

        loadNotifications(user);
        listenGameResponses();

    }
});


setTimeout(() => {

    gamePopup.style.display = "none";

    resultText.innerText = "Choose Your Move";
    movesText.innerText = "You: - | Opponent: -";

    playerHand.innerText = "✊";
    computerHand.innerText = "✊";

}, 3000);

function resetToAI() {

    resetScores();

    gameStarted = false;
    currentGameRoom = "";
    prepStarted = false;
    canPick = false;

    opponentName.innerText = "BOT";

}

const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderboardModal = document.getElementById("leaderboardModal");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardList = document.getElementById("leaderboardList");

leaderboardBtn.addEventListener("click", () => {

    leaderboardModal.style.display = "flex";

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    loadLeaderboard();

});

closeLeaderboard.addEventListener("click", () => {
    leaderboardModal.style.display = "none";
});


function loadLeaderboard() {

    leaderboardList.innerHTML = "Loading...";

    get(ref(database, "users"))
        .then((snapshot) => {

            leaderboardList.innerHTML = "";

            if (!snapshot.exists()) {
                leaderboardList.innerHTML = "<p>No players yet.</p>";
                return;
            }

            let players = [];

            snapshot.forEach((userSnap) => {

                const user = userSnap.val();

                players.push({
                    uid: userSnap.key,
                    username: user.username || "Unknown",
                    image: user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    wins: user.wins || 0,
                    bio: user.bio || "No bio",
                    age: user.age || "N/A",
                    gender: user.gender || "N/A",
                    status: user.status || "offline"
                });

            });

            // 🔥 SORT BY WINS (HIGH → LOW)
            players.sort((a, b) => b.wins - a.wins);

            const myUID = auth.currentUser.uid;
            let myRank = 0;

            players.forEach((player, index) => {

                if (player.uid === myUID) {
                    myRank = index + 1;
                }

                const card = document.createElement("div");

                card.classList.add("user-result");

                // SPECIAL TOP CARDS
                if (index === 0) {
                    card.classList.add("top1");
                }
                else if (index === 1) {
                    card.classList.add("top2");
                }
                else if (index === 2) {
                    card.classList.add("top3");
                }

                card.style.cursor = "pointer";

                const medals = ["👑", "🥈", "🥉"];

                card.innerHTML = `
<div class="leader-rank">

    ${index < 3 ? medals[index] : "#" + (index + 1)}

</div>

<img src="${player.image}">

<div style="flex:1;">

    <h3>${player.username}</h3>

    <p class="leader-wins">
        🏆 ${player.wins} Wins
    </p>

</div>
`;
                // CLICKABLE
                card.onclick = () => {

                    leaderboardModal.style.display = "none";

                    // ===== KUNG SARILI ANG PININDOT =====
                    if (player.uid === auth.currentUser.uid) {

                        profileModal.style.display = "flex";

                        profileActionButtons.style.display = "none";

                        editProfileBtn.style.display = "block";

                        return;
                    }

                    // ===== KUNG IBANG PLAYER =====
                    profileActionButtons.style.display = "flex";

                    viewUserModal.style.display = "flex";

                    viewUserImage.src = player.image;
                    viewUserName.innerText = player.username;
                    viewUserStatus.innerText = player.status;
                    viewUserBio.innerText = player.bio;
                    viewUserAge.innerText = "Age: " + player.age;
                    viewUserGender.innerText = "Gender: " + player.gender;

                    startChatBtn.dataset.uid = player.uid;
                    startChatBtn.dataset.username = player.username;
                    startChatBtn.dataset.image = player.image;

                };

                leaderboardList.appendChild(card);

            });

            const me = document.createElement("div");

            me.style.marginTop = "5px";
            me.style.borderTop = "2px solid gold";
            me.style.paddingTop = "15px";

            me.innerHTML = `
<div style="
background:#111;
border:2px solid gold;
border-radius:12px;
padding:7px;
position:fixed;
top: 40px;
left:30px;
text-align:center;">

<h1 style="color:white;">
#${myRank}
</h1>

</div>
`;

            leaderboardList.appendChild(me);

        });

}
// SETTINGS TAB SWITCH
const tabs = document.querySelectorAll(".settings-tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        const target = tab.dataset.tab;
        document.getElementById(target).classList.add("active");

    });
});

chatProfileHeader.addEventListener("click", () => {

    openUserProfileFromChat();

});

window.playGame = playGame;