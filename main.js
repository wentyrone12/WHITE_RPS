
import {
    remove,
    update,
    push,
    increment,
    onDisconnect,
    off
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    auth,
    database,
    ref,
    set,
    get,
    child,
    onValue,
    update as dbUpdate,
    remove as dbRemove,
    push as dbPush,
    increment as dbIncrement,
    onDisconnect as dbOnDisconnect,
    off as dbOff,
    updateProfile,
    signOut
} from "./firebase.js";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const PREFS_KEY = "whiteRpsPreferencesV2";
const READ_NOTIFS_KEY = "whiteRpsReadNotificationsV1";

const $ = (id) => document.getElementById(id);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
    sidebar: $("sidebar"),
    menuBtn: $("menuBtn"),
    overlay: $("overlay"),
    profileBtn: $("profileBtn"),
    topProfileBtn: $("topProfileBtn"),
    searchBtn: $("searchBtn"),
    leaderboardBtn: $("leaderboardBtn"),
    quickLeaderboardBtn: $("quickLeaderboardBtn"),
    chatBtn: $("chatBtn"),
    publicChatBtn: $("publicChatBtn"),
    settingsBtn: $("settingsBtn"),
    installAppBtn: $("installAppBtn"),
    installAppLabel: $("installAppLabel"),
    installHelpModal: $("installHelpModal"),
    closeInstallHelp: $("closeInstallHelp"),
    installHelpTitle: $("installHelpTitle"),
    installHelpDescription: $("installHelpDescription"),
    installStepOne: $("installStepOne"),
    installStepTwo: $("installStepTwo"),
    installStepThree: $("installStepThree"),
    installHelpNote: $("installHelpNote"),
    installHelpTryBtn: $("installHelpTryBtn"),
    pinLockModal: $("pinLockModal"),
    closePinLock: $("closePinLock"),
    cancelPinLock: $("cancelPinLock"),
    pinLockForm: $("pinLockForm"),
    pinLockEmblem: $("pinLockEmblem"),
    pinLockEyebrow: $("pinLockEyebrow"),
    pinLockTitle: $("pinLockTitle"),
    pinLockDescription: $("pinLockDescription"),
    pinLockChatName: $("pinLockChatName"),
    pinPrimaryLabel: $("pinPrimaryLabel"),
    pinPrimaryInput: $("pinPrimaryInput"),
    pinConfirmField: $("pinConfirmField"),
    pinConfirmInput: $("pinConfirmInput"),
    pinLockFeedback: $("pinLockFeedback"),
    submitPinLock: $("submitPinLock"),
    appToastContainer: $("appToastContainer"),
    logoutBtn: $("logoutBtn"),

    miniProfileImage: $("miniProfileImage"),
    miniProfileName: $("miniProfileName"),
    miniProfileStatus: $("miniProfileStatus"),
    topProfileImage: $("topProfileImage"),
    topProfileName: $("topProfileName"),
    battlePlayerAvatar: $("battlePlayerAvatar"),

    roundStatus: $("roundStatus"),
    heroRecord: $("heroRecord"),
    result: $("result"),
    moves: $("moves"),
    countdown: $("countdown"),
    playerHand: $("playerHand"),
    computerHand: $("computerHand"),
    userScore: $("userScore"),
    computerScore: $("computerScore"),
    opponentName: document.querySelector(".opponent"),
    choices: $$(".choices .choice"),
    mobileChooseWeaponBtn: $("mobileChooseWeaponBtn"),
    weaponPickerModal: $("weaponPickerModal"),
    closeWeaponPicker: $("closeWeaponPicker"),
    mobileChoices: $$(".mobile-choice"),
    chatEditBar: $("chatEditBar"),
    cancelEditBtn: $("cancelEditBtn"),
    chatChallengeBtn: $("chatChallengeBtn"),
    quickRecord: $("quickRecord"),
    quickWinRate: $("quickWinRate"),
    quickRank: $("quickRank"),

    gamePopup: $("gamePopup"),
    popupContent: $("popupContent"),
    closeGamePopup: $("closeGamePopup"),

    profileModal: $("profileModal"),
    closeProfile: $("closeProfile"),
    profileImage: $("profileImage"),
    profileUsername: $("profileUsername"),
    profileBio: $("profileBio"),
    profileAge: $("profileAge"),
    profileGender: $("profileGender"),
    profileStatusText: $("profileStatusText"),
    profilePresence: $("profilePresence"),
    profileWins: $("profileWins"),
    profileGames: $("profileGames"),
    profileWinRate: $("profileWinRate"),
    profileRank: $("profileRank"),
    editProfileBtn: $("editProfileBtn"),
    editSection: $("editSection"),
    profileUpload: $("profileUpload"),
    editBio: $("editBio"),
    editAge: $("editAge"),
    editGender: $("editGender"),
    saveProfileBtn: $("saveProfileBtn"),
    cancelEditProfileBtn: $("cancelEditProfileBtn"),

    searchModal: $("searchModal"),
    closeSearch: $("closeSearch"),
    searchInput: $("searchInput"),
    clearSearchBtn: $("clearSearchBtn"),
    searchUserBtn: $("searchUserBtn"),
    searchResult: $("searchResult"),

    viewUserModal: $("viewUserModal"),
    closeViewUser: $("closeViewUser"),
    viewUserImage: $("viewUserImage"),
    viewUserName: $("viewUserName"),
    viewUserStatus: $("viewUserStatus"),
    viewUserPresence: $("viewUserPresence"),
    viewUserBio: $("viewUserBio"),
    viewUserAge: $("viewUserAge"),
    viewUserGender: $("viewUserGender"),
    startChatBtn: $("startChatBtn"),
    challengeBtn: $("challengeBtn"),

    chatListModal: $("chatListModal"),
    closeChatList: $("closeChatList"),
    newChatBtn: $("newChatBtn"),
    chatListSearch: $("chatListSearch"),
    chatList: $("chatList"),
    chatBadge: $("chatBadge"),
    conversationMenu: $("conversationMenu"),

    publicChatModal: $("publicChatModal"),
    closePublicChat: $("closePublicChat"),
    publicChatMessages: $("publicChatMessages"),
    publicChatInput: $("publicChatInput"),
    publicChatCharCount: $("publicChatCharCount"),
    publicSendBtn: $("publicSendBtn"),
    publicChallengeBtn: $("publicChallengeBtn"),

    chatModal: $("chatModal"),
    closeChat: $("closeChat"),
    chatProfileHeader: $("chatProfileHeader"),
    chatUserImage: $("chatUserImage"),
    chatUserName: $("chatUserName"),
    chatUserStatus: $("chatUserStatus"),
    chatTyping: $("chatTyping"),
    chatMessages: $("chatMessages"),
    chatInput: $("chatInput"),
    chatCharCount: $("chatCharCount"),
    clearChatInputBtn: $("clearChatInputBtn"),
    sendMessageBtn: $("sendMessageBtn"),

    notifBtn: $("notifBtn"),
    notifCount: $("notifCount"),
    notifModal: $("notifModal"),
    closeNotif: $("closeNotif"),
    notifList: $("notifList"),
    markNotifReadBtn: $("markNotifReadBtn"),

    settingsModal: $("settingsModal"),
    closeSettings: $("closeSettings"),
    settingsProfileImage: $("settingsProfileImage"),
    settingsDisplayName: $("settingsDisplayName"),
    settingsEmail: $("settingsEmail"),
    settingsUID: $("settingsUID"),
    copyUidBtn: $("copyUidBtn"),
    newUsername: $("newUsername"),
    changeUsernameBtn: $("changeUsernameBtn"),
    exportProfileBtn: $("exportProfileBtn"),
    resetSettingsBtn: $("resetSettingsBtn"),
    themeDarkBtn: $("themeDarkBtn"),
    themeLightBtn: $("themeLightBtn"),
    reducedMotion: $("reducedMotion"),
    compactMode: $("compactMode"),
    soundEnabled: $("soundEnabled"),
    challengeNotifications: $("challengeNotifications"),
    desktopNotifications: $("desktopNotifications"),
    notificationVolume: $("notificationVolume"),
    currentPassword: $("currentPassword"),
    newPassword: $("newPassword"),
    confirmPassword: $("confirmPassword"),
    changePasswordBtn: $("changePasswordBtn"),
    onlineStatus: $("onlineStatus"),
    gameRequest: $("gameRequest"),
    enterToSend: $("enterToSend"),
    savePrivacyBtn: $("savePrivacyBtn"),
    deleteAccountBtn: $("deleteAccountBtn"),

    leaderboardModal: $("leaderboardModal"),
    closeLeaderboard: $("closeLeaderboard"),
    leaderboardSort: $("leaderboardSort"),
    leaderboardPodium: $("leaderboardPodium"),
    leaderboardMe: $("leaderboardMe"),
    leaderboardList: $("leaderboardList")
};

let currentUserData = {};
let currentChatUID = "";
let currentChatName = "";
let currentChatImage = "";
let currentChatReadAt = 0;
let currentChatAllowsChallenges = true;
let editingMessageKey = "";
let editingMessageOriginalText = "";
let currentGameRoom = "";
let gameStarted = false;
let prepStarted = false;
let canPick = false;
let myChoice = "";
let roundAnimating = false;

let userScore = 0;
let opponentScore = 0;

let chatUnsubscribe = null;
let chatTypingUnsubscribe = null;
let chatTypingTimer = null;
let chatListUnsubscribe = null;
let publicChatUnsubscribe = null;
let activeConversationMenuChat = null;
const unlockedChatSessions = new Set();
let activePinLockChat = null;
let activePinLockMode = "create";
let notifUnsubscribe = null;
let responseUnsubscribe = null;

let cachedPlayers = [];
let knownNotificationKeys = new Set();
let sessionNotifiedNotifKeys = new Set();
let handledResponseKeys = new Set();
let cachedChats = [];

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

const sounds = {
    notif: new Audio("bell.mp3"),
    battle: new Audio("battle.mp3"),
    click: new Audio("clicker.mp3")
};

const defaultPrefs = {
    theme: "dark",
    reducedMotion: false,
    compactMode: false,
    soundEnabled: true,
    challengeNotifications: true,
    desktopNotifications: false,
    notificationVolume: 0.7,
    enterToSend: true
};

let prefs = loadPrefs();

function loadPrefs() {
    try {
        return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || "{}") };
    } catch {
        return { ...defaultPrefs };
    }
}

function savePrefs() {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function applyPreferences() {
    document.documentElement.dataset.theme = prefs.theme;
    document.documentElement.dataset.reducedMotion = prefs.reducedMotion ? "true" : "false";
    document.body.classList.toggle("compact-mode", prefs.compactMode);

    sounds.notif.volume = Number(prefs.notificationVolume);
    sounds.battle.volume = Math.min(Number(prefs.notificationVolume) * 0.72, 1);
    sounds.click.volume = Math.min(Number(prefs.notificationVolume) * 0.5, 1);
    sounds.battle.loop = true;

    if (els.themeDarkBtn && els.themeLightBtn) {
        els.themeDarkBtn.classList.toggle("active", prefs.theme === "dark");
        els.themeLightBtn.classList.toggle("active", prefs.theme === "light");
    }
    if (els.reducedMotion) els.reducedMotion.checked = prefs.reducedMotion;
    if (els.compactMode) els.compactMode.checked = prefs.compactMode;
    if (els.soundEnabled) els.soundEnabled.checked = prefs.soundEnabled;
    if (els.challengeNotifications) els.challengeNotifications.checked = prefs.challengeNotifications;
    if (els.desktopNotifications) els.desktopNotifications.checked = prefs.desktopNotifications;
    if (els.notificationVolume) els.notificationVolume.value = prefs.notificationVolume;
    if (els.enterToSend) els.enterToSend.checked = prefs.enterToSend;
}

applyPreferences();

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));
}

function normalizeUsername(value = "") {
    return String(value).trim().toLowerCase();
}

function formatTime(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatRelativeTime(timestamp) {
    if (!timestamp) return "";
    const diff = Math.max(0, Date.now() - timestamp);
    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "now";
    if (diff < hour) return `${Math.floor(diff / minute)}m`;
    if (diff < day) return `${Math.floor(diff / hour)}h`;
    if (diff < 7 * day) return `${Math.floor(diff / day)}d`;

    return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" });
}

function calculateWinRate(data) {
    const games = Number(data.games || 0);
    const wins = Number(data.wins || 0);
    return games > 0 ? Math.round((wins / games) * 100) : 0;
}

function getPlayersSorted(sort = "wins") {
    const list = [...cachedPlayers];
    list.sort((a, b) => {
        if (sort === "games") return (b.games - a.games) || (b.wins - a.wins);
        if (sort === "rate") return (b.rate - a.rate) || (b.wins - a.wins);
        return (b.wins - a.wins) || (b.games - a.games);
    });
    return list;
}

function openModal(modal) {
    if (!modal) return;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
    if (!modal) return;
    if (modal === els.publicChatModal && typeof stopPublicChatListener === "function") stopPublicChatListener();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

function closeSidebar() {
    els.sidebar.classList.remove("active");
    els.overlay.classList.remove("active");
    els.menuBtn.setAttribute("aria-expanded", "false");
}

function hideAllModals(except = null) {
    $$(".profile-modal, .game-popup").forEach((modal) => {
        if (modal !== except) closeModal(modal);
    });
}

function openNavigationModal(modal) {
    hideAllModals(modal);
    openModal(modal);
    closeSidebar();
}

function playClick() {
    if (!prefs.soundEnabled) return;
    sounds.click.currentTime = 2;
    sounds.click.play().catch(() => {});
}

function playNotif() {
    if (!prefs.soundEnabled || !prefs.challengeNotifications) return;
    sounds.notif.currentTime = 0;
    sounds.notif.play().catch(() => {});
}

function startBattleSound() {
    if (!prefs.soundEnabled) return;
    sounds.battle.currentTime = 0.25;
    sounds.battle.play().catch(() => {});
}


function showAppToast(message, type = "success", duration = 3300) {
    if (!els.appToastContainer) return;
    const toast = document.createElement("div");
    toast.className = `app-toast${type && type !== "success" ? ` ${type}` : ""}`;
    toast.setAttribute("role", "status");
    toast.textContent = String(message || "Done.");
    els.appToastContainer.appendChild(toast);
    window.setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(6px)";
        window.setTimeout(() => toast.remove(), 220);
    }, duration);
}


function stopBattleSound() {
    sounds.battle.pause();
    sounds.battle.currentTime = 0;
}

function setButtonLoading(button, loading, label) {
    if (!button) return;
    button.disabled = loading;
    if (!button.dataset.defaultText) button.dataset.defaultText = label || button.textContent;
    button.textContent = loading ? "Saving…" : button.dataset.defaultText;
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard.");
    } catch {
        const area = document.createElement("textarea");
        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        alert("Copied to clipboard.");
    }
}

function refreshUserIdentity(data) {
    const username = data.username || auth.currentUser?.displayName || "Player";
    const image = data.image || DEFAULT_AVATAR;
    const statusVisible = data.showOnlineStatus !== false;
    const online = statusVisible && data.status === "online";

    els.miniProfileName.textContent = username;
    els.miniProfileImage.src = image;
    els.topProfileName.textContent = username;
    els.topProfileImage.src = image;
    els.battlePlayerAvatar.src = image;

    els.profileUsername.textContent = username;
    els.profileImage.src = image;
    els.profileBio.textContent = data.bio || "No bio yet.";
    els.profileAge.textContent = data.age || "N/A";
    els.profileGender.textContent = data.gender || "N/A";
    els.profileStatusText.textContent = online ? "Online" : "Offline";
    els.miniProfileStatus.innerHTML = `<i></i> ${online ? "Online" : "Offline"}`;
    els.profilePresence.classList.toggle("online", online);

    els.settingsDisplayName.textContent = username;
    els.settingsProfileImage.src = image;
    els.settingsEmail.textContent = `Email: ${auth.currentUser?.email || data.email || "—"}`;
    els.settingsUID.textContent = `User ID: ${auth.currentUser?.uid || "—"}`;
    els.newUsername.value = username;

    updateRecordCards(data);
}

function updateRecordCards(data = currentUserData) {
    const wins = Number(data.wins || 0);
    const losses = Number(data.losses || 0);
    const draws = Number(data.draws || 0);
    const games = Number(data.games || (wins + losses + draws));
    const rate = calculateWinRate({ wins, games });

    els.heroRecord.textContent = `${wins}W • ${losses}L • ${draws}D`;
    els.quickRecord.textContent = `${wins} Win${wins === 1 ? "" : "s"}`;
    els.quickWinRate.textContent = `${rate}%`;
    els.profileWins.textContent = wins;
    els.profileGames.textContent = games;
    els.profileWinRate.textContent = `${rate}%`;
}

async function updateMyRankPreview() {
    try {
        const snapshot = await get(ref(database, "users"));
        if (!snapshot.exists()) {
            els.quickRank.textContent = "#—";
            els.profileRank.textContent = "#—";
            return;
        }
        const players = [];
        snapshot.forEach((snap) => {
            const u = snap.val() || {};
            players.push({
                uid: snap.key,
                wins: Number(u.wins || 0),
                games: Number(u.games || 0),
                rate: calculateWinRate(u)
            });
        });
        players.sort((a, b) => b.wins - a.wins || b.games - a.games);
        const index = players.findIndex((p) => p.uid === auth.currentUser?.uid);
        const rank = index >= 0 ? index + 1 : null;
        els.quickRank.textContent = rank ? `#${rank}` : "#—";
        els.profileRank.textContent = rank ? `#${rank}` : "#—";
    } catch {
        els.quickRank.textContent = "#—";
    }
}

function syncSettingsUI(data = currentUserData) {
    if (els.onlineStatus) els.onlineStatus.checked = data.showOnlineStatus !== false;
    if (els.gameRequest) els.gameRequest.checked = data.allowGameRequests !== false;
    applyPreferences();
}

/* NAVIGATION */
els.menuBtn.addEventListener("click", () => {
    const active = els.sidebar.classList.toggle("active");
    els.overlay.classList.toggle("active", active);
    els.menuBtn.setAttribute("aria-expanded", active ? "true" : "false");
});
els.overlay.addEventListener("click", closeSidebar);

els.profileBtn.addEventListener("click", () => {
    openOwnProfile();
});
els.topProfileBtn.addEventListener("click", openOwnProfile);

function openOwnProfile() {
    openNavigationModal(els.profileModal);
    els.editProfileBtn.style.display = "block";
    els.editSection.style.display = "none";
    els.profileBio.style.display = "block";
    els.profileAge.style.display = "block";
    els.profileGender.style.display = "block";
    populateProfileEditor();
}

function populateProfileEditor() {
    els.editBio.value = currentUserData.bio || "";
    els.editAge.value = currentUserData.age || "";
    els.editGender.value = currentUserData.gender || "";
}

/* PROFILE */
els.editProfileBtn.addEventListener("click", () => {
    populateProfileEditor();
    els.editSection.style.display = "block";
    els.editProfileBtn.style.display = "none";
});
els.cancelEditProfileBtn.addEventListener("click", () => {
    els.editSection.style.display = "none";
    els.editProfileBtn.style.display = "block";
});

els.saveProfileBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    const bio = els.editBio.value.trim();
    const age = els.editAge.value.trim();
    const gender = els.editGender.value;
    const file = els.profileUpload.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
        alert("Profile image must be 2 MB or smaller.");
        return;
    }

    setButtonLoading(els.saveProfileBtn, true, "Save Profile");

    try {
        let image = currentUserData.image || "";
        if (file) {
            image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        await update(ref(database, `users/${user.uid}`), {
            bio,
            age,
            gender,
            image,
            lastSeen: Date.now()
        });

        currentUserData = { ...currentUserData, bio, age, gender, image };
        refreshUserIdentity(currentUserData);

        els.editSection.style.display = "none";
        els.editProfileBtn.style.display = "block";
        els.profileUpload.value = "";
        alert("Profile saved successfully.");
    } catch (error) {
        alert(error.message || "Could not save your profile.");
    } finally {
        setButtonLoading(els.saveProfileBtn, false, "Save Profile");
    }
});

/* SEARCH */
els.searchBtn.addEventListener("click", () => {
    openNavigationModal(els.searchModal);
    setTimeout(() => els.searchInput.focus(), 60);
});

els.closeSearch.addEventListener("click", () => closeModal(els.searchModal));
els.clearSearchBtn.addEventListener("click", () => {
    els.searchInput.value = "";
    els.searchResult.innerHTML = "";
    els.searchInput.focus();
});

async function searchUsers() {
    const query = normalizeUsername(els.searchInput.value);
    els.searchResult.innerHTML = "";

    if (!query) {
        els.searchResult.innerHTML = `<div class="empty-state">Type a username to search.</div>`;
        return;
    }

    const snapshot = await get(child(ref(database), "users"));
    const matches = [];

    if (snapshot.exists()) {
        snapshot.forEach((snap) => {
            const user = snap.val() || {};
            const username = String(user.username || "");

            if (
                snap.key !== auth.currentUser?.uid &&
                normalizeUsername(username).includes(query)
            ) {
                matches.push({
                    uid: snap.key,
                    username,
                    image: user.image || DEFAULT_AVATAR,
                    status: user.showOnlineStatus === false ? "offline" : (user.status || "offline"),
                    bio: user.bio || "No bio yet.",
                    age: user.age || "N/A",
                    gender: user.gender || "N/A",
                    allowGameRequests: user.allowGameRequests !== false
                });
            }
        });
    }

    if (!matches.length) {
        els.searchResult.innerHTML = `<div class="empty-state">No players found for “${escapeHTML(query)}”.</div>`;
        return;
    }

    matches.sort((a, b) => a.username.localeCompare(b.username));

    matches.forEach((user) => {
        const card = document.createElement("div");
        card.className = "user-result";
        card.innerHTML = `
            <img src="${escapeHTML(user.image)}" alt="">
            <div class="user-result-copy">
                <strong>${escapeHTML(user.username)}</strong>
                <p>${escapeHTML(user.bio)}</p>
                <span class="user-status ${user.status === "online" ? "online" : ""}">
                    <i></i>${user.status === "online" ? "Online now" : "Offline"}
                </span>
            </div>
            <div class="result-actions">
                <span class="small-action">View</span>
            </div>
        `;
        card.addEventListener("click", () => openUserProfile(user));
        els.searchResult.appendChild(card);
    });
}

function openUserProfile(user) {
    els.searchResult.innerHTML = "";
    els.searchInput.value = "";

    if (user.uid === auth.currentUser?.uid) {
        openOwnProfile();
        return;
    }

    closeModal(els.searchModal);
    openModal(els.viewUserModal);

    const online = user.status === "online";
    els.viewUserImage.src = user.image || DEFAULT_AVATAR;
    els.viewUserName.textContent = user.username || "Unknown";
    els.viewUserStatus.textContent = online ? "Online now" : "Offline";
    els.viewUserPresence.classList.toggle("online", online);
    els.viewUserBio.textContent = user.bio || "No bio yet.";
    els.viewUserAge.textContent = user.age || "N/A";
    els.viewUserGender.textContent = user.gender || "N/A";

    els.startChatBtn.dataset.uid = user.uid;
    els.startChatBtn.dataset.username = user.username || "Player";
    els.startChatBtn.dataset.image = user.image || DEFAULT_AVATAR;
    els.challengeBtn.textContent = "⚔ Challenge";
    els.challengeBtn.disabled = user.allowGameRequests === false;
    els.challengeBtn.title = user.allowGameRequests === false ? "This player does not accept game requests." : "";
}

els.searchUserBtn.addEventListener("click", () => searchUsers().catch((error) => {
    els.searchResult.innerHTML = `<div class="empty-state">${escapeHTML(error.message || "Search failed.")}</div>`;
}));
els.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchUsers().catch(() => {});
    }
});

/* CHAT */
function stopChatListeners() {
    if (typeof chatUnsubscribe === "function") {
        chatUnsubscribe();
        chatUnsubscribe = null;
    } else if (chatUnsubscribe) {
        dbOff(ref(database, `messages/${getRoomId()}`));
        chatUnsubscribe = null;
    }

    if (typeof chatTypingUnsubscribe === "function") {
        chatTypingUnsubscribe();
        chatTypingUnsubscribe = null;
    }
}

function getRoomId(uid = currentChatUID) {
    return [auth.currentUser?.uid, uid].sort().join("_");
}

els.chatBtn.addEventListener("click", () => {
    openNavigationModal(els.chatListModal);
    els.chatListSearch.value = "";
    loadChats();
});

els.newChatBtn.addEventListener("click", () => {
    closeModal(els.chatListModal);
    openNavigationModal(els.searchModal);
    setTimeout(() => els.searchInput.focus(), 60);
});

els.closeChatList.addEventListener("click", () => { hideConversationMenu(); closeModal(els.chatListModal); });

els.startChatBtn.addEventListener("click", () => {
    currentChatUID = els.startChatBtn.dataset.uid || "";
    currentChatName = els.startChatBtn.dataset.username || "Player";
    currentChatImage = els.startChatBtn.dataset.image || DEFAULT_AVATAR;
    openChat();
});

async function openChat() {
    if (!currentChatUID || !auth.currentUser) return;

    closeModal(els.viewUserModal);
    closeModal(els.chatListModal);
    openModal(els.chatModal);

    els.chatUserName.textContent = currentChatName;
    els.chatUserImage.src = currentChatImage;
    els.chatUserStatus.textContent = "Loading…";
    els.chatTyping.textContent = "";
    currentChatAllowsChallenges = true;
    if (els.chatChallengeBtn) { els.chatChallengeBtn.disabled = true; els.chatChallengeBtn.textContent = "⚔ Challenge"; }
    els.chatMessages.innerHTML = "";
    exitChatEditMode();

    currentChatReadAt = Date.now();
    await markChatRead();

    stopChatListeners();

    const roomId = getRoomId();

    const messagesRef = ref(database, `messages/${roomId}`);
    chatUnsubscribe = onValue(messagesRef, (snapshot) => {
        renderMessages(snapshot);
    });

    const typingRef = ref(database, `typing/${roomId}/${currentChatUID}`);
    chatTypingUnsubscribe = onValue(typingRef, (snapshot) => {
        els.chatTyping.textContent = snapshot.val()?.value ? "typing…" : "";
    });

    get(ref(database, `users/${currentChatUID}`)).then((snap) => {
        const data = snap.val() || {};
        const visible = data.showOnlineStatus !== false;
        currentChatAllowsChallenges = data.allowGameRequests !== false;
        els.chatChallengeBtn.disabled = !currentChatAllowsChallenges;
        els.chatChallengeBtn.title = currentChatAllowsChallenges ? "Challenge this player" : "This player does not accept game requests.";
        els.chatUserStatus.textContent = visible && data.status === "online" ? "Online now" : "Offline";
    }).catch(() => {
        els.chatUserStatus.textContent = "";
    });

    updateTypingState(false);
    setTimeout(() => els.chatInput.focus(), 50);
}

async function markChatRead() {
    const user = auth.currentUser;
    if (!user || !currentChatUID) return;
    await update(ref(database, `chatList/${user.uid}/${currentChatUID}`), {
        readAt: Date.now(),
        manualUnread: false
    });
}

function exitChatEditMode() {
    editingMessageKey = "";
    editingMessageOriginalText = "";
    els.chatEditBar?.classList.add("hidden");
    els.sendMessageBtn.textContent = "Send ↗";
}

function enterChatEditMode(key, text) {
    editingMessageKey = key;
    editingMessageOriginalText = text;
    els.chatInput.value = text;
    els.chatInput.focus();
    els.chatEditBar?.classList.remove("hidden");
    els.sendMessageBtn.textContent = "Save edit";
    updateChatCharCount();
    els.chatInput.style.height = "auto";
    els.chatInput.style.height = `${Math.min(130, els.chatInput.scrollHeight)}px`;
}

async function unsendMessage(messageKey) {
    const user = auth.currentUser;
    if (!user || !messageKey) return;
    if (!confirm("Unsend this message for everyone?")) return;

    try {
        await update(ref(database, `messages/${getRoomId()}/${messageKey}`), {
            text: "",
            unsent: true,
            editedAt: null,
            unsentAt: Date.now()
        });
        await syncLastMessage();
    } catch (error) {
        alert(error.message || "Could not unsend this message.");
    }
}

function renderMessages(snapshot) {
    els.chatMessages.innerHTML = "";

    if (!snapshot.exists()) {
        els.chatMessages.innerHTML = `
            <div class="chat-empty">
                <div>
                    <strong>No messages yet.</strong>
                    <p style="margin-top:5px;color:var(--muted);font-size:11px">Start the conversation with ${escapeHTML(currentChatName)}.</p>
                </div>
            </div>
        `;
        return;
    }

    const myUID = auth.currentUser.uid;
    snapshot.forEach((msgSnap) => {
        const msg = msgSnap.val() || {};
        const mine = msg.sender === myUID;
        const row = document.createElement("div");
        row.className = `message-row ${mine ? "mine" : "theirs"}`;

        const stack = document.createElement("div");
        stack.className = "message-stack";

        const bubble = document.createElement("div");
        bubble.className = `message-bubble ${mine ? "my-bubble" : "their-bubble"} ${msg.unsent ? "message-unsent" : ""}`;
        bubble.textContent = msg.unsent ? "Message unsent" : (msg.text || "");

        const meta = document.createElement("div");
        meta.className = "message-meta";
        meta.innerHTML = `<span>${formatTime(msg.time)}${msg.editedAt ? " • edited" : ""}</span>`;

        if (mine && !msg.unsent) {
            const editBtn = document.createElement("button");
            editBtn.className = "message-action";
            editBtn.textContent = "Edit";
            editBtn.title = "Edit message";
            editBtn.addEventListener("click", () => enterChatEditMode(msgSnap.key, msg.text || ""));

            const unsendBtn = document.createElement("button");
            unsendBtn.className = "message-action message-unsend-action";
            unsendBtn.textContent = "Unsend";
            unsendBtn.title = "Unsend message for everyone";
            unsendBtn.addEventListener("click", () => unsendMessage(msgSnap.key));

            meta.append(editBtn, unsendBtn);
        }

        stack.appendChild(bubble);
        stack.appendChild(meta);

        if (mine) {
            row.appendChild(stack);
        } else {
            const avatar = document.createElement("img");
            avatar.className = "chat-avatar";
            avatar.src = currentChatImage || DEFAULT_AVATAR;
            avatar.alt = "";
            row.appendChild(avatar);
            row.appendChild(stack);
        }

        els.chatMessages.appendChild(row);
    });

    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

async function syncLastMessage() {
    const roomId = getRoomId();
    const snapshot = await get(ref(database, `messages/${roomId}`));
    const messages = [];
    if (snapshot.exists()) snapshot.forEach((snap) => messages.push({ ...snap.val(), key: snap.key }));
    const last = messages.sort((a, b) => (a.time || 0) - (b.time || 0)).at(-1);
    const myUID = auth.currentUser.uid;

    const payload = last ? {
        lastMessage: last.text || "",
        lastTimestamp: last.time || Date.now()
    } : {
        lastMessage: "",
        lastTimestamp: 0
    };

    await update(ref(database, `chatList/${myUID}/${currentChatUID}`), payload);
    await update(ref(database, `chatList/${currentChatUID}/${myUID}`), payload);
}

els.sendMessageBtn.addEventListener("click", sendMessage);

async function sendMessage() {
    const text = els.chatInput.value.trim();
    const me = auth.currentUser;
    if (!text || !me || !currentChatUID) return;

    const now = Date.now();
    const roomId = getRoomId();
    playClick();

    try {
        if (editingMessageKey) {
            await update(ref(database, `messages/${roomId}/${editingMessageKey}`), {
                text,
                editedAt: now,
                unsent: false
            });
            exitChatEditMode();
        } else {
            await push(ref(database, `messages/${roomId}`), {
                sender: me.uid,
                text,
                time: now,
                unsent: false
            });
        }

        await update(ref(database, `chatList/${me.uid}/${currentChatUID}`), {
            uid: currentChatUID,
            username: currentChatName,
            image: currentChatImage,
            lastMessage: text,
            lastTimestamp: now,
            readAt: now
        });

        await update(ref(database, `chatList/${currentChatUID}/${me.uid}`), {
            uid: me.uid,
            username: currentUserData.username || me.displayName || "Player",
            image: currentUserData.image || DEFAULT_AVATAR,
            lastMessage: text,
            lastTimestamp: now
        });

        els.chatInput.value = "";
        updateChatCharCount();
        updateTypingState(false);
        els.chatInput.style.height = "auto";
    } catch (error) {
        alert(error.message || "Could not send message.");
    }
}

function updateChatCharCount() {
    els.chatCharCount.textContent = `${els.chatInput.value.length} / 1000`;
}
function updateTypingState(isTyping) {
    if (!auth.currentUser || !currentChatUID) return;
    clearTimeout(chatTypingTimer);
    const path = ref(database, `typing/${getRoomId()}/${auth.currentUser.uid}`);
    dbUpdate(path, { value: isTyping, at: Date.now() }).catch(() => {});
    if (isTyping) {
        chatTypingTimer = setTimeout(() => updateTypingState(false), 1400);
    }
}

els.chatInput.addEventListener("input", () => {
    updateChatCharCount();
    els.chatInput.style.height = "auto";
    els.chatInput.style.height = `${Math.min(130, els.chatInput.scrollHeight)}px`;
    updateTypingState(els.chatInput.value.trim().length > 0);
});

els.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && prefs.enterToSend) {
        event.preventDefault();
        sendMessage();
    }
});

els.clearChatInputBtn.addEventListener("click", () => {
    els.chatInput.value = "";
    els.chatInput.style.height = "auto";
    updateChatCharCount();
    updateTypingState(false);
});

els.closeChat.addEventListener("click", () => {
    updateTypingState(false);
    stopChatListeners();
    exitChatEditMode();
    closeModal(els.chatModal);
});
els.cancelEditBtn?.addEventListener("click", exitChatEditMode);

els.chatProfileHeader.addEventListener("click", (event) => {
    if (event.target.closest(".back-chat")) return;
    openChatUserProfile();
});

async function openChatUserProfile() {
    if (!currentChatUID) return;

    const snapshot = await get(ref(database, `users/${currentChatUID}`));
    if (!snapshot.exists()) return;

    const data = snapshot.val() || {};
    const user = {
        uid: currentChatUID,
        username: data.username || currentChatName,
        image: data.image || DEFAULT_AVATAR,
        status: data.showOnlineStatus === false ? "offline" : (data.status || "offline"),
        bio: data.bio || "No bio yet.",
        age: data.age || "N/A",
        gender: data.gender || "N/A",
        allowGameRequests: data.allowGameRequests !== false
    };

    closeModal(els.chatModal);
    openUserProfile(user);
}

function getLocalChatLocks() {
    try {
        return JSON.parse(localStorage.getItem(`whiteRpsChatLocks:${auth.currentUser?.uid || "guest"}`) || "{}");
    } catch {
        return {};
    }
}

function saveLocalChatLocks(locks) {
    localStorage.setItem(`whiteRpsChatLocks:${auth.currentUser?.uid || "guest"}`, JSON.stringify(locks));
}

function isChatLocked(uid) {
    return Boolean(getLocalChatLocks()[uid]);
}

async function digestLegacyChatPin(pin, salt) {
    if (!globalThis.crypto?.subtle) throw new Error("Conversation lock requires a secure browser context (HTTPS).");
    const bytes = new TextEncoder().encode(`${salt}:${pin}`);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function digestChatPin(pin, salt, iterations = 120000) {
    if (!globalThis.crypto?.subtle) throw new Error("Conversation lock requires a secure browser context (HTTPS).");
    const encoder = new TextEncoder();
    const keyMaterial = await globalThis.crypto.subtle.importKey(
        "raw", encoder.encode(pin), "PBKDF2", false, ["deriveBits"]
    );
    const derived = await globalThis.crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations,
        hash: "SHA-256"
    }, keyMaterial, 256);
    return [...new Uint8Array(derived)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyChatPin(uid, pin) {
    const lock = getLocalChatLocks()[uid];
    if (!lock) return true;
    // Preserve locks saved by the earlier SHA-256 format; newly created locks use PBKDF2.
    const candidate = lock.algorithm === "PBKDF2-SHA-256"
        ? await digestChatPin(pin, lock.salt, Number(lock.iterations) || 120000)
        : await digestLegacyChatPin(pin, lock.salt);
    return candidate === lock.hash;
}

function openPinLockModal(mode, chat) {
    if (!els.pinLockModal || !chat?.uid) return;
    activePinLockChat = chat;
    activePinLockMode = mode;
    const copy = {
        create: {
            emblem: "🔐", eyebrow: "PRIVATE CONVERSATION", title: "Lock conversation",
            description: "Create a 4–8 digit PIN to add a local privacy lock to this conversation on this device.",
            label: "Create a 4–8 digit PIN", placeholder: "Enter 4–8 digits", submit: "Lock conversation", autocomplete: "new-password", showConfirm: true
        },
        open: {
            emblem: "🔓", eyebrow: "PIN REQUIRED", title: "Unlock conversation",
            description: "Enter the PIN for this conversation to open it for this session.",
            label: "Conversation PIN", placeholder: "Enter your PIN", submit: "Unlock & open", autocomplete: "current-password", showConfirm: false
        },
        remove: {
            emblem: "🛡️", eyebrow: "LOCK SETTINGS", title: "Remove conversation lock",
            description: "Verify your existing PIN before removing the local lock from this device.",
            label: "Current conversation PIN", placeholder: "Enter your PIN", submit: "Remove lock", autocomplete: "current-password", showConfirm: false
        }
    }[mode] || null;
    if (!copy) return;

    els.pinLockEmblem.textContent = copy.emblem;
    els.pinLockEyebrow.textContent = copy.eyebrow;
    els.pinLockTitle.textContent = copy.title;
    els.pinLockDescription.textContent = copy.description;
    els.pinLockChatName.textContent = chat.username || "Player";
    els.pinPrimaryLabel.textContent = copy.label;
    els.pinPrimaryInput.placeholder = copy.placeholder;
    els.pinPrimaryInput.autocomplete = copy.autocomplete;
    els.pinPrimaryInput.value = "";
    els.pinConfirmInput.value = "";
    els.pinConfirmField.classList.toggle("hidden", !copy.showConfirm);
    els.pinConfirmInput.required = copy.showConfirm;
    els.pinPrimaryInput.minLength = mode === "create" ? 4 : 4;
    els.pinLockFeedback.textContent = "";
    els.pinLockFeedback.classList.remove("success");
    els.submitPinLock.textContent = copy.submit;
    els.submitPinLock.disabled = false;
    openModal(els.pinLockModal);
    window.setTimeout(() => els.pinPrimaryInput.focus(), 70);
}

function closePinLockModal() {
    closeModal(els.pinLockModal);
    if (els.pinLockForm) els.pinLockForm.reset();
    if (els.pinLockFeedback) {
        els.pinLockFeedback.textContent = "";
        els.pinLockFeedback.classList.remove("success");
    }
    activePinLockChat = null;
}

async function openListedConversation(chat) {
    if (!chat?.uid) return;
    if (isChatLocked(chat.uid) && !unlockedChatSessions.has(chat.uid)) {
        openPinLockModal("open", chat);
        return;
    }
    currentChatUID = chat.uid;
    currentChatName = chat.username || "Player";
    currentChatImage = chat.image || DEFAULT_AVATAR;
    await openChat();
}

function showConversationMenu(chat, trigger) {
    const menu = els.conversationMenu;
    if (!menu || !chat || !trigger) return;
    activeConversationMenuChat = chat;
    const isPinned = Boolean(chat.pinned);
    const unread = Boolean(chat.manualUnread) || Number(chat.lastTimestamp || 0) > Number(chat.readAt || 0);
    const locked = isChatLocked(chat.uid);
    const pinButton = menu.querySelector('[data-conversation-action="pin"]');
    const unreadButton = menu.querySelector('[data-conversation-action="unread"]');
    const lockButton = menu.querySelector('[data-conversation-action="lock"]');
    pinButton.textContent = isPinned ? "📌 Unpin conversation" : "📌 Pin conversation";
    unreadButton.textContent = unread ? "✓ Mark as read" : "✉ Mark as unread";
    lockButton.textContent = locked ? "🔓 Unlock conversation" : "🔒 Lock conversation";
    const rect = trigger.getBoundingClientRect();
    menu.classList.remove("hidden");
    menu.style.visibility = "hidden";
    const menuRect = menu.getBoundingClientRect();
    const left = Math.max(8, Math.min(window.innerWidth - menuRect.width - 8, rect.right - menuRect.width));
    const top = rect.bottom + menuRect.height + 8 <= window.innerHeight ? rect.bottom + 5 : Math.max(8, rect.top - menuRect.height - 5);
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.visibility = "visible";
}

function hideConversationMenu() {
    els.conversationMenu?.classList.add("hidden");
    activeConversationMenuChat = null;
}

function configureConversationLock(chat) {
    if (!chat?.uid) return;
    openPinLockModal(isChatLocked(chat.uid) ? "remove" : "create", chat);
}

els.closePinLock?.addEventListener("click", closePinLockModal);
els.cancelPinLock?.addEventListener("click", closePinLockModal);
els.pinPrimaryInput?.addEventListener("input", () => {
    els.pinPrimaryInput.value = els.pinPrimaryInput.value.replace(/\D/g, "").slice(0, 8);
    els.pinLockFeedback.textContent = "";
    els.pinLockFeedback.classList.remove("success");
});
els.pinConfirmInput?.addEventListener("input", () => {
    els.pinConfirmInput.value = els.pinConfirmInput.value.replace(/\D/g, "").slice(0, 8);
    els.pinLockFeedback.textContent = "";
    els.pinLockFeedback.classList.remove("success");
});
els.pinLockForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const chat = activePinLockChat;
    const mode = activePinLockMode;
    const pin = els.pinPrimaryInput.value.trim();
    const confirmPin = els.pinConfirmInput.value.trim();
    if (!chat?.uid || !auth.currentUser) {
        els.pinLockFeedback.textContent = "Please sign in again before changing a conversation lock.";
        return;
    }
    if (!/^\d{4,8}$/.test(pin)) {
        els.pinLockFeedback.textContent = "Enter a PIN containing 4–8 digits.";
        els.pinPrimaryInput.focus();
        return;
    }
    if (mode === "create" && pin !== confirmPin) {
        els.pinLockFeedback.textContent = "The PIN entries do not match. Check both fields and try again.";
        els.pinConfirmInput.focus();
        return;
    }

    els.submitPinLock.disabled = true;
    els.submitPinLock.textContent = "Please wait…";
    els.pinLockFeedback.textContent = "Verifying securely on this device…";
    try {
        if (mode === "create") {
            const locks = getLocalChatLocks();
            const saltBytes = crypto.getRandomValues(new Uint8Array(16));
            const salt = [...saltBytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
            const iterations = 120000;
            locks[chat.uid] = {
                salt,
                hash: await digestChatPin(pin, salt, iterations),
                algorithm: "PBKDF2-SHA-256",
                iterations,
                createdAt: Date.now()
            };
            saveLocalChatLocks(locks);
            unlockedChatSessions.delete(chat.uid);
            renderChatList(cachedChats);
            closePinLockModal();
            showAppToast(`Conversation with ${chat.username || "Player"} is locked on this device.`, "success");
            return;
        }

        const valid = await verifyChatPin(chat.uid, pin);
        if (!valid) {
            els.pinLockFeedback.textContent = "That PIN is incorrect. Try again.";
            els.pinPrimaryInput.value = "";
            els.pinPrimaryInput.focus();
            return;
        }

        if (mode === "remove") {
            const locks = getLocalChatLocks();
            delete locks[chat.uid];
            saveLocalChatLocks(locks);
            unlockedChatSessions.delete(chat.uid);
            renderChatList(cachedChats);
            closePinLockModal();
            showAppToast(`Conversation with ${chat.username || "Player"} is now unlocked on this device.`, "success");
            return;
        }

        if (mode === "open") {
            unlockedChatSessions.add(chat.uid);
            currentChatUID = chat.uid;
            currentChatName = chat.username || "Player";
            currentChatImage = chat.image || DEFAULT_AVATAR;
            closePinLockModal();
            await openChat();
            return;
        }
    } catch (error) {
        els.pinLockFeedback.textContent = error?.message || "Could not update the conversation lock. Please try again.";
    } finally {
        if (els.pinLockModal?.style.display === "flex") {
            els.submitPinLock.disabled = false;
            const buttonText = mode === "create" ? "Lock conversation" : mode === "open" ? "Unlock & open" : "Remove lock";
            els.submitPinLock.textContent = buttonText;
        }
    }
});

els.conversationMenu?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-conversation-action]");
    const chat = activeConversationMenuChat;
    if (!button || !chat || !auth.currentUser) return;
    const action = button.dataset.conversationAction;
    hideConversationMenu();
    const chatRef = ref(database, `chatList/${auth.currentUser.uid}/${chat.uid}`);
    try {
        if (action === "pin") {
            await update(chatRef, { pinned: !chat.pinned });
        } else if (action === "unread") {
            const isUnread = Boolean(chat.manualUnread) || Number(chat.lastTimestamp || 0) > Number(chat.readAt || 0);
            if (isUnread) {
                await update(chatRef, { manualUnread: false, readAt: Date.now() });
            } else {
                await update(chatRef, { manualUnread: true, readAt: 0 });
            }
        } else if (action === "lock") {
            await configureConversationLock(chat);
        } else if (action === "delete") {
            const ok = confirm(`Delete the conversation with ${chat.username || "this player"} from your message list? The other person's copy and stored messages will not be deleted.`);
            if (ok) {
                if (chat.uid === currentChatUID) {
                    stopChatListeners();
                    closeModal(els.chatModal);
                    currentChatUID = "";
                }
                await remove(chatRef);
                unlockedChatSessions.delete(chat.uid);
                const locks = getLocalChatLocks();
                delete locks[chat.uid];
                saveLocalChatLocks(locks);
            }
        }
    } catch (error) {
        alert(error.message || "Could not update this conversation.");
    }
});

document.addEventListener("click", (event) => {
    if (!event.target.closest("#conversationMenu") && !event.target.closest("[data-chat-more]")) hideConversationMenu();
});
window.addEventListener("resize", hideConversationMenu);
window.addEventListener("scroll", hideConversationMenu, true);

function renderChatList(chats = cachedChats) {
    cachedChats = chats;
    const filter = normalizeUsername(els.chatListSearch.value);
    els.chatList.innerHTML = "";

    const locks = getLocalChatLocks();
    const visibleChats = chats.filter((chat) => chat && chat.uid && !chat.deletedForMe);
    const filtered = visibleChats.filter((chat) => normalizeUsername(chat.username).includes(filter));
    filtered.sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));

    if (!filtered.length) {
        els.chatList.innerHTML = `<div class="empty-state">${filter ? "No matching conversations." : "No conversations yet. Start a new chat."}</div>`;
        const totalUnreadEmpty = visibleChats.filter((chat) => Boolean(chat.manualUnread) || Number(chat.lastTimestamp || 0) > Number(chat.readAt || 0)).length;
        els.chatBadge.classList.toggle("hidden", totalUnreadEmpty === 0);
        els.chatBadge.textContent = totalUnreadEmpty > 99 ? "99+" : String(totalUnreadEmpty);
        return;
    }

    filtered.forEach((chat) => {
        const unread = Boolean(chat.manualUnread) || (Number(chat.lastTimestamp || 0) > Number(chat.readAt || 0) && chat.uid !== currentChatUID);
        const locked = Boolean(locks[chat.uid]);
        const item = document.createElement("div");
        item.className = `chat-item${chat.pinned ? " conversation-pinned" : ""}${unread ? " conversation-unread" : ""}`;
        item.dataset.uid = chat.uid;
        item.innerHTML = `
            <img src="${escapeHTML(chat.image || DEFAULT_AVATAR)}" alt="">
            <div class="chat-item-copy">
                <strong>${chat.pinned ? '<span class="chat-pin-icon" aria-label="Pinned">📌 </span>' : ""}${locked ? '<span class="chat-lock-icon" aria-label="Locked">🔒 </span>' : ""}${escapeHTML(chat.username || "Player")}</strong>
                <p>${escapeHTML(chat.lastMessage || "Start chatting…")}</p>
            </div>
            <div class="chat-item-meta">
                <span class="chat-time">${escapeHTML(formatRelativeTime(chat.lastTimestamp))}</span>
                ${unread ? '<span class="unread-dot"></span>' : ""}
            </div>
            <button type="button" class="conversation-more-btn" data-chat-more aria-label="Conversation options" title="Conversation options">⋮</button>
        `;
        const more = item.querySelector("[data-chat-more]");
        more.addEventListener("click", (event) => {
            event.stopPropagation();
            showConversationMenu(chat, more);
        });
        item.addEventListener("click", (event) => {
            if (event.target.closest("[data-chat-more]")) return;
            openListedConversation(chat);
        });
        els.chatList.appendChild(item);
    });

    const totalUnread = visibleChats.filter((chat) => Boolean(chat.manualUnread) || Number(chat.lastTimestamp || 0) > Number(chat.readAt || 0)).length;
    els.chatBadge.classList.toggle("hidden", totalUnread === 0);
    els.chatBadge.textContent = totalUnread > 99 ? "99+" : String(totalUnread);
}

function loadChats() {
    if (!auth.currentUser) return;
    if (typeof chatListUnsubscribe === "function") chatListUnsubscribe();

    chatListUnsubscribe = onValue(ref(database, `chatList/${auth.currentUser.uid}`), (snapshot) => {
        const chats = [];
        if (snapshot.exists()) {
            snapshot.forEach((snap) => chats.push({ ...(snap.val() || {}), uid: snap.key }));
        }
        chats.sort((a, b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
        cachedChats = chats;
        renderChatList(cachedChats);
    }, (error) => {
        els.chatList.innerHTML = `<div class="empty-state">Could not load conversations: ${escapeHTML(error.message || "permission denied")}</div>`;
    });
}
els.chatListSearch.addEventListener("input", () => renderChatList(cachedChats));

/* PUBLIC GLOBAL CHAT */
function stopPublicChatListener() {
    if (typeof publicChatUnsubscribe === "function") {
        publicChatUnsubscribe();
        publicChatUnsubscribe = null;
    }
}

function formatPublicMessage(message) {
    const me = auth.currentUser;
    const mine = message.senderUID === me?.uid;
    const row = document.createElement("div");
    row.className = `public-message-row${mine ? " public-message-mine" : ""}${message.type === "challenge" ? " public-message-challenge" : ""}`;

    const avatar = document.createElement("img");
    avatar.className = "public-message-avatar";
    avatar.src = message.senderImage || DEFAULT_AVATAR;
    avatar.alt = "";

    const stack = document.createElement("div");
    stack.className = "public-message-stack";
    const bubble = document.createElement("div");
    bubble.className = `public-message-bubble${mine ? " public-message-my-bubble" : ""}${message.type === "challenge" ? " public-challenge-bubble" : ""}`;

    const name = document.createElement("strong");
    name.className = "public-message-name";
    name.textContent = mine ? `${message.senderName || "You"} · You` : (message.senderName || "Player");
    bubble.appendChild(name);

    const text = document.createElement("p");
    if (message.type === "challenge") {
        text.textContent = "⚔ Challenge anyone in the arena to a Rock Paper Scissors match!";
        const small = document.createElement("small");
        small.textContent = "Anyone can accept this challenge to send a direct match request.";
        bubble.append(text, small);
    } else {
        text.textContent = message.text || "";
        bubble.appendChild(text);
    }

    const meta = document.createElement("div");
    meta.className = "public-message-meta";
    const time = document.createElement("span");
    time.textContent = formatTime(message.time);
    meta.appendChild(time);

    if (message.type === "challenge" && !mine) {
        const accept = document.createElement("button");
        accept.type = "button";
        accept.className = "public-accept-challenge";
        accept.textContent = "Accept challenge";
        accept.addEventListener("click", async () => {
            accept.disabled = true;
            try {
                const sent = await sendChallengeToPlayer(message.senderUID, message.senderName || "Player");
                if (sent) {
                    accept.textContent = "✓ Request sent";
                } else {
                    accept.disabled = false;
                }
            } catch (error) {
                accept.disabled = false;
                alert(error.message || "Could not accept the public challenge.");
            }
        });
        meta.appendChild(accept);
    }

    stack.append(bubble, meta);
    if (!mine) row.appendChild(avatar);
    row.appendChild(stack);
    if (mine) row.appendChild(avatar);
    return row;
}

function renderPublicMessages(snapshot) {
    const messages = [];
    if (snapshot.exists()) snapshot.forEach((child) => messages.push({ ...(child.val() || {}), key: child.key }));
    messages.sort((a, b) => Number(a.time || 0) - Number(b.time || 0));
    const recent = messages.slice(-120);
    els.publicChatMessages.innerHTML = "";
    if (!recent.length) {
        els.publicChatMessages.innerHTML = `<div class="chat-empty"><div><strong>Welcome to Public Chat</strong><p style="margin-top:6px;font-size:12px">Be respectful, meet other players, or post a public match challenge.</p></div></div>`;
        return;
    }
    recent.forEach((message) => {
        if (!message.senderUID) return;
        els.publicChatMessages.appendChild(formatPublicMessage(message));
    });
    els.publicChatMessages.scrollTop = els.publicChatMessages.scrollHeight;
}

function loadPublicChat() {
    if (!auth.currentUser) return;
    stopPublicChatListener();
    els.publicChatMessages.innerHTML = `<div class="empty-state">Connecting to global chat…</div>`;
    publicChatUnsubscribe = onValue(ref(database, "publicMessages"), renderPublicMessages, (error) => {
        els.publicChatMessages.innerHTML = `<div class="empty-state">Could not load public chat. Check Firebase Realtime Database rules for the publicMessages path. ${escapeHTML(error.message || "Access denied")}</div>`;
    });
}

async function publishPublicMessage(type = "message") {
    const me = auth.currentUser;
    if (!me) return;
    const text = els.publicChatInput.value.trim();
    if (type === "message" && !text) return;
    if (text.length > 1000) {
        alert("Public messages can be up to 1000 characters.");
        return;
    }
    const button = type === "challenge" ? els.publicChallengeBtn : els.publicSendBtn;
    button.disabled = true;
    try {
        await push(ref(database, "publicMessages"), {
            senderUID: me.uid,
            senderName: currentUserData.username || me.displayName || "Player",
            senderImage: currentUserData.image || me.photoURL || DEFAULT_AVATAR,
            text: type === "message" ? text : "",
            type,
            time: Date.now()
        });
        if (type === "message") {
            els.publicChatInput.value = "";
            els.publicChatInput.style.height = "auto";
            els.publicChatCharCount.textContent = "0 / 1000";
        }
    } catch (error) {
        alert(error.message || "Could not send to public chat. Check Firebase Database access rules.");
    } finally {
        button.disabled = false;
        els.publicChatInput.focus();
    }
}

els.publicChatBtn?.addEventListener("click", () => {
    openNavigationModal(els.publicChatModal);
    loadPublicChat();
    setTimeout(() => els.publicChatInput.focus(), 70);
});
els.closePublicChat?.addEventListener("click", () => {
    stopPublicChatListener();
    closeModal(els.publicChatModal);
});
els.publicSendBtn?.addEventListener("click", () => publishPublicMessage("message"));
els.publicChallengeBtn?.addEventListener("click", () => publishPublicMessage("challenge"));
els.publicChatInput?.addEventListener("input", () => {
    els.publicChatCharCount.textContent = `${els.publicChatInput.value.length} / 1000`;
    els.publicChatInput.style.height = "auto";
    els.publicChatInput.style.height = `${Math.min(130, els.publicChatInput.scrollHeight)}px`;
});
els.publicChatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && prefs.enterToSend) {
        event.preventDefault();
        publishPublicMessage("message");
    }
});


/* NOTIFICATIONS */
function getReadNotifications() {
    try {
        return new Set(JSON.parse(localStorage.getItem(READ_NOTIFS_KEY) || "[]"));
    } catch {
        return new Set();
    }
}

function saveReadNotifications(setValue) {
    localStorage.setItem(READ_NOTIFS_KEY, JSON.stringify([...setValue].slice(-200)));
}

function requestDesktopNotifications() {
    if (!("Notification" in window)) {
        prefs.desktopNotifications = false;
        els.desktopNotifications.checked = false;
        savePrefs();
        alert("Desktop notifications are not supported in this browser.");
        return;
    }

    if (Notification.permission === "granted") return;

    Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
            prefs.desktopNotifications = false;
            els.desktopNotifications.checked = false;
            savePrefs();
            alert("Browser notification permission was not granted.");
        }
    });
}

function notifyDesktop(title, body) {
    if (!prefs.desktopNotifications || !("Notification" in window) || Notification.permission !== "granted") return;
    try {
        new Notification(title, { body, icon: "white.png" });
    } catch {}
}

els.notifBtn.addEventListener("click", () => {
    openNavigationModal(els.notifModal);
});
els.closeNotif.addEventListener("click", () => closeModal(els.notifModal));

els.markNotifReadBtn.addEventListener("click", () => {
    const read = getReadNotifications();
    knownNotificationKeys.forEach((key) => read.add(key));
    saveReadNotifications(read);
    renderNotificationCount();
});

function renderNotificationCount() {
    const read = getReadNotifications();
    const unread = [...knownNotificationKeys].filter((key) => !read.has(key)).length;
    els.notifCount.textContent = unread > 99 ? "99+" : String(unread);
    els.notifCount.style.display = unread ? "grid" : "none";
}

function loadNotifications() {
    const user = auth.currentUser;
    if (!user) return;

    if (typeof notifUnsubscribe === "function") notifUnsubscribe();

    notifUnsubscribe = onValue(ref(database, `notifications/${user.uid}`), (snapshot) => {
        els.notifList.innerHTML = "";
        knownNotificationKeys = new Set();

        const notifications = [];
        if (snapshot.exists()) {
            snapshot.forEach((snap) => {
                const value = snap.val() || {};
                const key = snap.key;
                knownNotificationKeys.add(key);
                notifications.push({ ...value, key });
            });
        }

        notifications.sort((a, b) => Number(b.time || 0) - Number(a.time || 0));

        if (!notifications.length) {
            els.notifList.innerHTML = `<div class="empty-state">No game requests yet.</div>`;
        }

        let newIncoming = 0;
        notifications.forEach((notif) => {
            const readSet = getReadNotifications();
            if (!readSet.has(notif.key) && !sessionNotifiedNotifKeys.has(notif.key)) newIncoming++;

            const card = document.createElement("div");
            card.className = "notification-item";
            card.innerHTML = `
                <img src="${escapeHTML(notif.senderImage || DEFAULT_AVATAR)}" alt="">
                <div class="notification-copy">
                    <h3>${escapeHTML(notif.senderName || "Player")} challenged you</h3>
                    <p>Accept the request to start a realtime Rock Paper Scissors match.</p>
                    <div class="notification-time">${escapeHTML(formatRelativeTime(notif.time))}</div>
                    <div class="notif-buttons">
                        <button class="accept-btn">Accept</button>
                        <button class="decline-btn">Decline</button>
                    </div>
                </div>
            `;

            card.querySelector(".accept-btn").addEventListener("click", () => acceptChallenge(notif, card));
            card.querySelector(".decline-btn").addEventListener("click", () => declineChallenge(notif, card));
            els.notifList.appendChild(card);
            sessionNotifiedNotifKeys.add(notif.key);
        });

        const readSet = getReadNotifications();
        if (newIncoming > 0) {
            playNotif();
            const newest = notifications[0];
            if (newest) notifyDesktop("WHITE_RPS Challenge", `${newest.senderName || "A player"} challenged you.`);
        }
        renderNotificationCount();
    });
}

async function acceptChallenge(notif, card) {
    const me = auth.currentUser;
    if (!me || !notif.senderUID || !notif.roomID) return;

    try {
        const gameRef = ref(database, `games/${notif.roomID}`);
        await set(gameRef, {
            player1: notif.senderUID,
            player2: me.uid,
            player1Name: notif.senderName || "Player",
            player2Name: currentUserData.username || me.displayName || "Player",
            player1Choice: "",
            player2Choice: "",
            accepted: true,
            started: true,
            createdAt: Date.now()
        });

        await set(ref(database, `gameResponses/${notif.senderUID}/${notif.roomID}`), {
            accepted: true,
            accepter: currentUserData.username || me.displayName || "Player",
            roomID: notif.roomID,
            time: Date.now()
        });

        await remove(ref(database, `notifications/${me.uid}/${notif.key}`));

        currentGameRoom = notif.roomID;
        gameStarted = true;
        prepStarted = false;
        canPick = false;
        myChoice = "";
        els.opponentName.textContent = notif.senderName || "Player";
        els.roundStatus.textContent = "MULTIPLAYER • MATCH FOUND";
        closeModal(els.notifModal);

        resetScores();
        startPreparation();
        listenGame();

        card?.remove();
    } catch (error) {
        alert(error.message || "Could not accept the challenge.");
    }
}

async function declineChallenge(notif, card) {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    try {
        await remove(ref(database, `notifications/${uid}/${notif.key}`));
        const read = getReadNotifications();
        read.add(notif.key);
        saveReadNotifications(read);
        card?.remove();
        renderNotificationCount();
    } catch (error) {
        alert(error.message || "Could not decline the challenge.");
    }
}

/* MOBILE WEAPON PICKER */
function openWeaponPicker() {
    if (!els.weaponPickerModal) return;
    openModal(els.weaponPickerModal);
    els.weaponPickerModal.setAttribute("aria-hidden", "false");
}
function closeWeaponPicker() {
    if (!els.weaponPickerModal) return;
    closeModal(els.weaponPickerModal);
    els.weaponPickerModal.setAttribute("aria-hidden", "true");
}
els.mobileChooseWeaponBtn?.addEventListener("click", openWeaponPicker);
els.closeWeaponPicker?.addEventListener("click", closeWeaponPicker);
els.mobileChoices?.forEach((button) => {
    button.addEventListener("click", () => {
        const choice = button.dataset.choice;
        closeWeaponPicker();
        playGame(choice);
    });
});

/* GAME */
function resetScores() {
    userScore = 0;
    opponentScore = 0;
    els.userScore.textContent = "0";
    els.computerScore.textContent = "0";
    els.result.textContent = "Choose Your Move";
    els.moves.innerHTML = "You: — <span>•</span> Opponent: —";
    els.playerHand.textContent = "✊";
    els.computerHand.textContent = "✊";
    roundAnimating = false;
}

function resetToAI() {
    resetScores();
    gameStarted = false;
    currentGameRoom = "";
    prepStarted = false;
    canPick = false;
    myChoice = "";
    els.opponentName.textContent = "BOT";
    els.roundStatus.textContent = "SOLO • BOT MATCH";
    stopBattleSound();
}

function startPreparation() {
    if (prepStarted) return;

    prepStarted = true;
    canPick = false;
    myChoice = "";

    let count = 5;
    els.countdown.textContent = String(count);

    const timer = setInterval(() => {
        count -= 1;
        els.countdown.textContent = count > 0 ? String(count) : "GO!";

        if (count <= 0) {
            clearInterval(timer);
            setTimeout(() => {
                els.countdown.textContent = "VS";
                canPick = true;
            }, 700);
        }
    }, 1000);
}

function playGame(choice) {
    playClick();

    if (!gameStarted) {
        playSoloRound(choice);
        return;
    }

    if (!canPick || myChoice) return;
    myChoice = choice;

    const myUID = auth.currentUser?.uid;
    if (!myUID || !currentGameRoom) return;

    get(ref(database, `games/${currentGameRoom}`)).then((snapshot) => {
        if (!snapshot.exists()) return;

        const game = snapshot.val();
        const key = game.player1 === myUID ? "player1Choice" : "player2Choice";

        update(ref(database, `games/${currentGameRoom}`), { [key]: choice }).then(() => {
            els.playerHand.textContent = emojis[choice];
            els.result.textContent = "⏳ Waiting for opponent…";
            els.moves.textContent = `You: ${choice.toUpperCase()} • Opponent: ?`;
            canPick = false;
        }).catch(() => {});
    });
}

function playSoloRound(choice) {
    if (roundAnimating) return;

    roundAnimating = true;
    canPick = false;

    const aiChoices = ["rock", "paper", "scissors"];
    const aiMove = aiChoices[Math.floor(Math.random() * aiChoices.length)];

    animateBattle(choice, aiMove, async () => {
        const outcome = getOutcome(choice, aiMove);
        userScore += outcome === "win" ? 1 : 0;
        opponentScore += outcome === "loss" ? 1 : 0;

        els.userScore.textContent = String(userScore);
        els.computerScore.textContent = String(opponentScore);
        renderRoundResult(outcome, choice, aiMove, "AI");

        await recordResult(outcome);
        stopBattleSound();
        roundAnimating = false;
        canPick = true;
    });
}

function getOutcome(myMove, enemyMove) {
    if (myMove === enemyMove) return "draw";
    if (
        (myMove === "rock" && enemyMove === "scissors") ||
        (myMove === "paper" && enemyMove === "rock") ||
        (myMove === "scissors" && enemyMove === "paper")
    ) return "win";
    return "loss";
}

function animateBattle(myMove, enemyMove, callback) {
    els.playerHand.textContent = "✊";
    els.computerHand.textContent = "✊";
    els.playerHand.classList.add("shake");
    els.computerHand.classList.add("shake");

    let count = 3;
    els.countdown.textContent = String(count);
    startBattleSound();

    const timer = setInterval(() => {
        count -= 1;
        els.countdown.textContent = count > 0 ? String(count) : "GO!";
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        els.playerHand.classList.remove("shake");
        els.computerHand.classList.remove("shake");
        els.playerHand.textContent = emojis[myMove];
        els.computerHand.textContent = emojis[enemyMove];
        els.countdown.textContent = "VS";
        callback();
    }, 3000);
}

function renderRoundResult(outcome, myMove, enemyMove, opponentLabel) {
    const resultText = outcome === "win"
        ? "🏆 YOU WIN!"
        : outcome === "loss"
            ? "💀 YOU LOSE!"
            : "🤝 DRAW";

    els.result.textContent = resultText;
    els.moves.textContent = `You: ${myMove.toUpperCase()} • ${opponentLabel}: ${enemyMove.toUpperCase()}`;

    openModal(els.gamePopup);
    els.popupContent.innerHTML = `
        <div class="popup-result">
            <span class="section-kicker">ROUND COMPLETE</span>
            <h1>${resultText}</h1>
            <div class="popup-scoreline">
                <span>You: ${escapeHTML(myMove.toUpperCase())}</span>
                <span>•</span>
                <span>${escapeHTML(opponentLabel)}: ${escapeHTML(enemyMove.toUpperCase())}</span>
            </div>
            <p>${outcome === "win" ? "Nice read. Keep the streak going." : outcome === "loss" ? "Shake it off and choose again." : "Dead even. One more round?"}</p>
            <button class="primary-btn" id="continueGameBtn">Continue</button>
        </div>
    `;

    $("continueGameBtn").addEventListener("click", () => closeModal(els.gamePopup));
}

els.closeGamePopup.addEventListener("click", () => closeModal(els.gamePopup));

async function recordResult(outcome) {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const updates = {
        games: increment(1),
        lastSeen: Date.now()
    };

    if (outcome === "win") updates.wins = increment(1);
    if (outcome === "loss") updates.losses = increment(1);
    if (outcome === "draw") updates.draws = increment(1);

    await update(ref(database, `users/${uid}`), updates).catch(() => {});
}

/* MULTIPLAYER GAME LISTENER */
let gameListenerUnsubscribe = null;

function listenGame() {
    if (!currentGameRoom || !auth.currentUser) return;

    if (typeof gameListenerUnsubscribe === "function") gameListenerUnsubscribe();

    const gameRef = ref(database, `games/${currentGameRoom}`);
    gameListenerUnsubscribe = onValue(gameRef, async (snapshot) => {
        if (!snapshot.exists()) return;

        const game = snapshot.val() || {};
        const myUID = auth.currentUser.uid;

        if (game.player1 !== myUID && game.player2 !== myUID) return;

        gameStarted = true;
        els.roundStatus.textContent = `MULTIPLAYER • ${game.player1 === myUID ? escapeHTML(game.player2Name || "PLAYER 2") : escapeHTML(game.player1Name || "PLAYER 1")}`;

        const myMove = game.player1 === myUID ? game.player1Choice : game.player2Choice;
        const enemyMove = game.player1 === myUID ? game.player2Choice : game.player1Choice;

        if (game.player1 === myUID) {
            els.opponentName.textContent = game.player2Name || "PLAYER 2";
        } else {
            els.opponentName.textContent = game.player1Name || "PLAYER 1";
        }

        if (game.started && !prepStarted) startPreparation();

        if (myMove && !enemyMove) {
            els.playerHand.textContent = emojis[myMove];
            els.result.textContent = "⏳ Waiting for opponent…";
            return;
        }
        if (!myMove && enemyMove) {
            els.computerHand.textContent = emojis[enemyMove];
            els.result.textContent = "⚡ Opponent is ready";
            return;
        }

        if (myMove && enemyMove && !roundAnimating) {
            roundAnimating = true;
            canPick = false;

            animateBattle(myMove, enemyMove, async () => {
                const outcome = getOutcome(myMove, enemyMove);

                if (outcome === "win") userScore++;
                if (outcome === "loss") opponentScore++;

                els.userScore.textContent = String(userScore);
                els.computerScore.textContent = String(opponentScore);
                renderRoundResult(outcome, myMove, enemyMove, els.opponentName.textContent || "Opponent");

                await recordResult(outcome);
                await update(gameRef, {
                    player1Choice: "",
                    player2Choice: ""
                }).catch(() => {});

                myChoice = "";
                prepStarted = false;
                canPick = true;
                roundAnimating = false;
                stopBattleSound();
            });
        }
    });
}

async function sendChallengeToPlayer(targetUID, targetName = "player") {
    const me = auth.currentUser;
    if (!me || !targetUID) return false;
    if (targetUID === me.uid) {
        alert("You cannot challenge yourself.");
        return false;
    }

    const targetSnapshot = await get(ref(database, `users/${targetUID}`));
    const target = targetSnapshot.val() || {};
    if (target.allowGameRequests === false) {
        alert(`${targetName || "This player"} is not accepting game requests.`);
        return false;
    }

    const roomID = [me.uid, targetUID].sort().join("_");
    await push(ref(database, `notifications/${targetUID}`), {
        roomID,
        senderUID: me.uid,
        senderName: currentUserData.username || me.displayName || "Player",
        senderImage: currentUserData.image || DEFAULT_AVATAR,
        receiverUID: targetUID,
        status: "pending",
        source: "chat",
        time: Date.now()
    });
    return true;
}

els.chatChallengeBtn?.addEventListener("click", async () => {
    if (!currentChatUID) return;
    try {
        const sent = await sendChallengeToPlayer(currentChatUID, currentChatName);
        if (sent) {
            els.chatChallengeBtn.textContent = "✓ Sent";
            els.chatChallengeBtn.disabled = true;
            setTimeout(() => {
                els.chatChallengeBtn.textContent = "⚔ Challenge";
                els.chatChallengeBtn.disabled = !currentChatAllowsChallenges;
            }, 1800);
        }
    } catch (error) {
        alert(error.message || "Could not send the challenge.");
    }
});

/* GAME REQUEST / CHALLENGE */
els.challengeBtn.addEventListener("click", async () => {
    const targetUID = els.startChatBtn.dataset.uid;
    const targetName = els.startChatBtn.dataset.username;
    if (!targetUID) return;

    els.challengeBtn.disabled = true;
    try {
        const sent = await sendChallengeToPlayer(targetUID, targetName);
        if (sent) {
            alert(`Challenge sent to ${targetName || "player"}.`);
            els.challengeBtn.textContent = "✓ Challenge sent";
        } else {
            els.challengeBtn.disabled = false;
        }
    } catch (error) {
        els.challengeBtn.disabled = false;
        alert(error.message || "Could not send the challenge.");
    }
});

/* GAME RESPONSES */
function loadGameResponses() {
    const me = auth.currentUser;
    if (!me) return;

    if (typeof responseUnsubscribe === "function") responseUnsubscribe();

    responseUnsubscribe = onValue(ref(database, `gameResponses/${me.uid}`), (snapshot) => {
        if (!snapshot.exists()) return;

        snapshot.forEach((snap) => {
            if (handledResponseKeys.has(snap.key)) return;
            handledResponseKeys.add(snap.key);
            showPlayNotification({ ...snap.val(), key: snap.key });
        });
    });
}

function showPlayNotification(data) {
    playNotif();
    openModal(els.notifModal);

    const wrapper = document.createElement("div");
    wrapper.className = "notification-item";
    wrapper.innerHTML = `
        <img src="${escapeHTML(currentChatImage || DEFAULT_AVATAR)}" alt="">
        <div class="notification-copy">
            <h3>${escapeHTML(data.accepter || "Player")} accepted your challenge</h3>
            <p>Your match is ready. Enter the arena to begin.</p>
            <div class="notification-time">Just now</div>
            <div class="notif-buttons">
                <button class="play-btn">▶ Play</button>
                <button class="delete-btn">Dismiss</button>
            </div>
        </div>
    `;

    wrapper.querySelector(".play-btn").addEventListener("click", async () => {
        currentGameRoom = data.roomID;
        gameStarted = true;
        prepStarted = false;
        canPick = false;
        myChoice = "";
        els.opponentName.textContent = data.accepter || "Player";
        els.roundStatus.textContent = "MULTIPLAYER • MATCH FOUND";

        await update(ref(database, `games/${data.roomID}`), { started: true }).catch(() => {});
        await startAndListenMultiplayer();
        await remove(ref(database, `gameResponses/${auth.currentUser.uid}/${data.key}`)).catch(() => {});
        wrapper.remove();
        closeModal(els.notifModal);
    });

    wrapper.querySelector(".delete-btn").addEventListener("click", async () => {
        await remove(ref(database, `gameResponses/${auth.currentUser.uid}/${data.key}`)).catch(() => {});
        handledResponseKeys.delete(data.key);
        wrapper.remove();
    });

    els.notifList.prepend(wrapper);
}

async function startAndListenMultiplayer() {
    resetScores();
    startPreparation();
    listenGame();
}

/* LEADERBOARD */
els.leaderboardBtn.addEventListener("click", () => {
    openLeaderboard();
});
els.quickLeaderboardBtn.addEventListener("click", () => {
    openLeaderboard();
});
els.closeLeaderboard.addEventListener("click", () => closeModal(els.leaderboardModal));
els.leaderboardSort.addEventListener("change", renderLeaderboard);

async function openLeaderboard() {
    openNavigationModal(els.leaderboardModal);
    els.leaderboardList.innerHTML = `<div class="empty-state">Loading rankings…</div>`;

    try {
        const snapshot = await get(ref(database, "users"));
        cachedPlayers = [];

        if (snapshot.exists()) {
            snapshot.forEach((snap) => {
                const u = snap.val() || {};
                const games = Number(u.games || ((u.wins || 0) + (u.losses || 0) + (u.draws || 0)));
                cachedPlayers.push({
                    uid: snap.key,
                    username: u.username || "Unknown",
                    image: u.image || DEFAULT_AVATAR,
                    wins: Number(u.wins || 0),
                    losses: Number(u.losses || 0),
                    draws: Number(u.draws || 0),
                    games,
                    rate: calculateWinRate({ wins: u.wins || 0, games }),
                    status: u.showOnlineStatus === false ? "offline" : (u.status || "offline"),
                    bio: u.bio || "No bio yet.",
                    age: u.age || "N/A",
                    gender: u.gender || "N/A",
                    allowGameRequests: u.allowGameRequests !== false
                });
            });
        }

        renderLeaderboard();
        const me = cachedPlayers.find((p) => p.uid === auth.currentUser?.uid);
        if (me) {
            els.profileRank.textContent = `#${cachedPlayers.findIndex((p) => p.uid === me.uid) + 1}`;
        }
    } catch (error) {
        els.leaderboardList.innerHTML = `<div class="empty-state">${escapeHTML(error.message || "Could not load rankings.")}</div>`;
    }
}

function renderLeaderboard() {
    const sorted = getPlayersSorted(els.leaderboardSort.value || "wins");
    els.leaderboardPodium.innerHTML = "";
    els.leaderboardMe.innerHTML = "";
    els.leaderboardList.innerHTML = "";

    if (!sorted.length) {
        els.leaderboardList.innerHTML = `<div class="empty-state">No players yet.</div>`;
        return;
    }

    const medals = ["👑", "🥈", "🥉"];
    const top = sorted.slice(0, 3);

    [...top].sort((a, b) => {
        const order = { 0: 1, 1: 2, 2: 0 };
        return order[sorted.indexOf(a)] - order[sorted.indexOf(b)];
    }).forEach((player) => {
        const rank = sorted.indexOf(player);
        const card = document.createElement("button");
        card.className = `podium-card rank-${rank + 1}`;
        card.innerHTML = `
            <div class="podium-medal">${medals[rank]}</div>
            <img src="${escapeHTML(player.image)}" alt="">
            <strong>${escapeHTML(player.username)}</strong>
            <span>${player.wins} wins • ${player.rate}%</span>
        `;
        card.addEventListener("click", () => openUserFromLeaderboard(player));
        els.leaderboardPodium.appendChild(card);
    });

    const myRankIndex = sorted.findIndex((p) => p.uid === auth.currentUser?.uid);
    if (myRankIndex >= 0) {
        const me = sorted[myRankIndex];
        els.leaderboardMe.innerHTML = `
            <div><strong>Your rank: #${myRankIndex + 1}</strong><span>${me.wins} wins • ${me.rate}% win rate</span></div>
            <span>Keep climbing ↑</span>
        `;
        els.quickRank.textContent = `#${myRankIndex + 1}`;
        els.profileRank.textContent = `#${myRankIndex + 1}`;
    }

    sorted.slice(3).forEach((player, index) => {
        const rank = index + 4;
        const row = document.createElement("div");
        row.className = `leader-row ${player.uid === auth.currentUser?.uid ? "me" : ""}`;
        row.innerHTML = `
            <div class="leader-rank">#${rank}</div>
            <img src="${escapeHTML(player.image)}" alt="">
            <div class="leader-copy">
                <strong>${escapeHTML(player.username)}</strong>
                <span>${player.games} games • ${player.losses} losses</span>
            </div>
            <div class="leader-stat">
                <strong>${els.leaderboardSort.value === "rate" ? `${player.rate}%` : player[els.leaderboardSort.value] ?? player.wins}</strong>
                <span>${els.leaderboardSort.value === "games" ? "games" : els.leaderboardSort.value === "rate" ? "win rate" : "wins"}</span>
            </div>
        `;
        row.addEventListener("click", () => openUserFromLeaderboard(player));
        els.leaderboardList.appendChild(row);
    });

    if (sorted.length <= 3) {
        els.leaderboardList.innerHTML = `<div class="empty-state">Top players are featured above.</div>`;
    }
}

function openUserFromLeaderboard(player) {
    if (player.uid === auth.currentUser?.uid) {
        closeModal(els.leaderboardModal);
        openOwnProfile();
        return;
    }
    closeModal(els.leaderboardModal);
    openUserProfile(player);
}

/* SETTINGS */
$$(".settings-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        $$(".settings-tab").forEach((t) => t.classList.remove("active"));
        $$(".tab-content").forEach((content) => content.classList.remove("active"));
        tab.classList.add("active");
        const target = $(tab.dataset.tab);
        if (target) target.classList.add("active");
    });
});

els.settingsBtn.addEventListener("click", () => {
    openNavigationModal(els.settingsModal);
    syncSettingsUI();
});

els.closeSettings.addEventListener("click", () => closeModal(els.settingsModal));

els.themeDarkBtn.addEventListener("click", () => {
    prefs.theme = "dark";
    savePrefs();
    applyPreferences();
});
els.themeLightBtn.addEventListener("click", () => {
    prefs.theme = "light";
    savePrefs();
    applyPreferences();
});
els.reducedMotion.addEventListener("change", () => {
    prefs.reducedMotion = els.reducedMotion.checked;
    savePrefs();
    applyPreferences();
});
els.compactMode.addEventListener("change", () => {
    prefs.compactMode = els.compactMode.checked;
    savePrefs();
    applyPreferences();
});
els.soundEnabled.addEventListener("change", () => {
    prefs.soundEnabled = els.soundEnabled.checked;
    savePrefs();
    applyPreferences();
    playClick();
});
els.challengeNotifications.addEventListener("change", () => {
    prefs.challengeNotifications = els.challengeNotifications.checked;
    savePrefs();
});
els.desktopNotifications.addEventListener("change", () => {
    prefs.desktopNotifications = els.desktopNotifications.checked;
    savePrefs();
    if (prefs.desktopNotifications) requestDesktopNotifications();
});
els.notificationVolume.addEventListener("input", () => {
    prefs.notificationVolume = Number(els.notificationVolume.value);
    savePrefs();
    applyPreferences();
});
els.enterToSend.addEventListener("change", () => {
    prefs.enterToSend = els.enterToSend.checked;
    savePrefs();
});

els.copyUidBtn.addEventListener("click", () => {
    if (auth.currentUser?.uid) copyText(auth.currentUser.uid);
});

els.exportProfileBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const snapshot = await get(ref(database, `users/${user.uid}`));
        const data = snapshot.val() || currentUserData;
        const exportData = {
            exportedAt: new Date().toISOString(),
            username: data.username || user.displayName || "Player",
            email: user.email || data.email || "",
            bio: data.bio || "",
            age: data.age || "",
            gender: data.gender || "",
            wins: Number(data.wins || 0),
            losses: Number(data.losses || 0),
            draws: Number(data.draws || 0),
            games: Number(data.games || 0)
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `white-rps-${normalizeUsername(exportData.username) || "profile"}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        alert(error.message || "Could not export profile.");
    }
});

els.resetSettingsBtn.addEventListener("click", () => {
    prefs = { ...defaultPrefs };
    savePrefs();
    applyPreferences();
    alert("App preferences reset to defaults.");
});

els.changeUsernameBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    const newUsername = els.newUsername.value.trim();

    if (!user) return;
    if (newUsername.length < 3) {
        alert("Username must be at least 3 characters.");
        return;
    }
    if (newUsername.length > 24) {
        alert("Username must be 24 characters or fewer.");
        return;
    }

    setButtonLoading(els.changeUsernameBtn, true, "Save username");

    try {
        const allUsers = await get(ref(database, "users"));
        let taken = false;
        if (allUsers.exists()) {
            allUsers.forEach((snap) => {
                if (snap.key !== user.uid && normalizeUsername(snap.val()?.username) === normalizeUsername(newUsername)) {
                    taken = true;
                }
            });
        }
        if (taken) {
            alert("That username is already in use.");
            return;
        }

        await updateProfile(user, { displayName: newUsername });
        await update(ref(database, `users/${user.uid}`), {
            username: newUsername,
            email: user.email || currentUserData.email,
            lastSeen: Date.now()
        });

        currentUserData = { ...currentUserData, username: newUsername };
        refreshUserIdentity(currentUserData);
        alert("Username updated successfully.");
    } catch (error) {
        alert(error.message || "Could not update username.");
    } finally {
        setButtonLoading(els.changeUsernameBtn, false, "Save username");
    }
});

els.savePrivacyBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await update(ref(database, `users/${user.uid}`), {
            showOnlineStatus: els.onlineStatus.checked,
            allowGameRequests: els.gameRequest.checked,
            lastSeen: Date.now(),
            status: els.onlineStatus.checked ? "online" : "offline"
        });

        currentUserData = {
            ...currentUserData,
            showOnlineStatus: els.onlineStatus.checked,
            allowGameRequests: els.gameRequest.checked,
            status: els.onlineStatus.checked ? "online" : "offline"
        };
        refreshUserIdentity(currentUserData);
        alert("Privacy settings saved.");
    } catch (error) {
        alert(error.message || "Could not save privacy settings.");
    }
});

els.changePasswordBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user?.email) {
        alert("No signed-in email account found.");
        return;
    }

    const currentPass = els.currentPassword.value;
    const newPass = els.newPassword.value;
    const confirmPass = els.confirmPassword.value;

    if (!currentPass || !newPass || !confirmPass) {
        alert("Please fill in all password fields.");
        return;
    }
    if (newPass.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
    }
    if (newPass !== confirmPass) {
        alert("New password and confirmation do not match.");
        return;
    }
    if (currentPass === newPass) {
        alert("New password must be different from the current password.");
        return;
    }

    setButtonLoading(els.changePasswordBtn, true, "Update Password");

    try {
        const credential = EmailAuthProvider.credential(user.email, currentPass);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPass);

        els.currentPassword.value = "";
        els.newPassword.value = "";
        els.confirmPassword.value = "";
        alert("Password changed successfully.");
    } catch (error) {
        const message = error.code === "auth/invalid-credential" || error.code === "auth/wrong-password"
            ? "Current password is incorrect."
            : error.code === "auth/requires-recent-login"
                ? "Please sign in again before changing your password."
                : error.message;
        alert(message);
    } finally {
        setButtonLoading(els.changePasswordBtn, false, "Update Password");
    }
});

els.deleteAccountBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmed = confirm("Delete your WHITE_RPS account permanently? This cannot be undone.");
    if (!confirmed) return;

    try {
        await dbRemove(ref(database, `users/${user.uid}`));
        await dbRemove(ref(database, `chatList/${user.uid}`));
        await dbRemove(ref(database, `notifications/${user.uid}`));
        await dbRemove(ref(database, `gameResponses/${user.uid}`));
        await deleteUser(user);

        localStorage.removeItem(PREFS_KEY);
        localStorage.removeItem(READ_NOTIFS_KEY);
        window.location.href = "index.html";
    } catch (error) {
        alert(error.code === "auth/requires-recent-login"
            ? "For security, please sign in again and then delete the account."
            : error.message || "Could not delete account.");
    }
});

/* MODAL UX */
$$(".profile-modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target !== modal) return;
        if (modal === els.chatModal) {
            updateTypingState(false);
            stopChatListeners();
        }
        if (modal === els.publicChatModal) stopPublicChatListener();
        if (modal === els.pinLockModal) closePinLockModal();
        else closeModal(modal);
    });
});

els.closeProfile.addEventListener("click", () => closeModal(els.profileModal));
els.closeViewUser.addEventListener("click", () => closeModal(els.viewUserModal));

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const open = $$(".profile-modal, .game-popup").reverse().find((modal) => modal.style.display === "flex");
    if (open) {
        if (open === els.pinLockModal) closePinLockModal();
        else closeModal(open);
        if (open === els.weaponPickerModal) closeWeaponPicker();
        if (open === els.chatModal) {
            stopChatListeners();
            updateTypingState(false);
        }
        if (open === els.publicChatModal) stopPublicChatListener();
    }
});

$$("button").forEach((button) => {
    button.addEventListener("click", () => {
        if (!button.closest(".settings-container") || prefs.soundEnabled) playClick();
    });
});

/* AUTH + PRESENCE */
let userUnsubscribe = null;

auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    if (typeof userUnsubscribe === "function") userUnsubscribe();

    const userRef = ref(database, `users/${user.uid}`);
    const statusRef = ref(database, `users/${user.uid}/status`);

    try {
        await onDisconnect(statusRef).set("offline");
    } catch {}

    await update(userRef, {
        lastSeen: Date.now(),
        status: "online"
    }).catch(() => {});

    userUnsubscribe = onValue(userRef, (snapshot) => {
        currentUserData = snapshot.val() || {
            username: user.displayName || "Player",
            email: user.email || ""
        };

        refreshUserIdentity(currentUserData);
        syncSettingsUI(currentUserData);

        if (currentUserData.showOnlineStatus === false) {
            update(statusRef, "offline").catch(() => {});
        } else {
            update(statusRef, "online").catch(() => {});
        }
    });

    loadNotifications();
    loadGameResponses();
    await updateMyRankPreview();

    // Prepare default game state.
    resetToAI();
});

els.logoutBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await set(ref(database, `users/${user.uid}/status`), "offline");
        await update(ref(database, `users/${user.uid}`), { lastSeen: Date.now() });
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        alert(error.message || "Could not log out.");
    }
});

// Initial values / keyboard shortcuts.
els.chatCharCount.textContent = "0 / 1000";
els.gamePopup.setAttribute("aria-hidden", "true");
els.profileModal.setAttribute("aria-hidden", "true");
els.searchModal.setAttribute("aria-hidden", "true");
els.viewUserModal.setAttribute("aria-hidden", "true");
els.chatListModal.setAttribute("aria-hidden", "true");
els.chatModal.setAttribute("aria-hidden", "true");
els.publicChatModal?.setAttribute("aria-hidden", "true");
els.pinLockModal?.setAttribute("aria-hidden", "true");
els.installHelpModal?.setAttribute("aria-hidden", "true");
els.notifModal.setAttribute("aria-hidden", "true");
els.settingsModal.setAttribute("aria-hidden", "true");
els.leaderboardModal.setAttribute("aria-hidden", "true");
els.weaponPickerModal?.setAttribute("aria-hidden", "true");

window.playGame = playGame;
