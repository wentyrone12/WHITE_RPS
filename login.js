
import {
    auth,
    database,
    ref,
    set,
    get,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    deleteUser,
    signOut
} from "./firebase.js";

const $ = (id) => document.getElementById(id);

const signupModal = $("signupModal");
const forgotModal = $("forgotModal");
const rulesModal = $("rulesModal");
const loginForm = $("loginForm");

function openModal(modal) {
    modal.style.display = "flex";
    const first = modal.querySelector("input");
    setTimeout(() => first?.focus(), 50);
}

function closeModal(modal) {
    modal.style.display = "none";
}

$("openSignup").addEventListener("click", () => openModal(signupModal));
$("openForgot").addEventListener("click", () => openModal(forgotModal));
$("closeSignup").addEventListener("click", () => closeModal(signupModal));
$("closeSignupBottom").addEventListener("click", () => closeModal(signupModal));
$("closeForgot").addEventListener("click", () => closeModal(forgotModal));
$("closeForgotBottom").addEventListener("click", () => closeModal(forgotModal));
$("closeRules").addEventListener("click", () => closeModal(rulesModal));
$("acceptRulesBtn").addEventListener("click", () => { $("agreeRules").checked = true; closeModal(rulesModal); });
$("openRules").addEventListener("click", () => openModal(rulesModal));

document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal(modal);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (signupModal.style.display === "flex") closeModal(signupModal);
    if (forgotModal.style.display === "flex") closeModal(forgotModal);
    if (rulesModal.style.display === "flex") closeModal(rulesModal);
});

function setLoading(button, loading, text, loadingText) {
    button.disabled = loading;
    button.dataset.originalHTML ??= button.innerHTML;
    button.innerHTML = loading ? loadingText : button.dataset.originalHTML;
}

function friendlyAuthError(error) {
    const messages = {
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/email-already-in-use": "That email is already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/user-not-found": "No account was found for that email.",
        "auth/too-many-requests": "Too many attempts. Please try again later."
    };
    return messages[error.code] || error.message || "Something went wrong.";
}

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = $("email").value.trim();
    const password = $("password").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const button = $("loginBtn");
    setLoading(button, true, "ENTER ARENA ↗", "SIGNING IN…");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(friendlyAuthError(error));
    } finally {
        setLoading(button, false, "ENTER ARENA ↗", "SIGNING IN…");
    }
});

function validateSignupFields() {
    const username = $("signupUsername").value.trim();
    const email = $("signupEmail").value.trim();
    const password = $("signupPassword").value;
    const confirmPassword = $("signupConfirmPassword").value;

    if (!username || !email || !password || !confirmPassword) throw new Error("Please complete all account fields.");
    if (username.length < 3) throw new Error("Username must be at least 3 characters.");
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(username)) throw new Error("Username can use letters, numbers, underscore, dot, and hyphen only.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) throw new Error("Use at least one uppercase letter, one lowercase letter, and one number in your password.");
    if (password !== confirmPassword) throw new Error("Passwords do not match.");
    if (!$("agreeRules").checked) throw new Error("Please agree to the WHITE_RPS Fair Play Rules before creating an account.");

    return { username, email, password };
}

function userProfilePayload(user, username = user.displayName || "Player") {
    return {
        username,
        email: user.email || "",
        bio: "No bio yet.",
        age: "",
        gender: "",
        image: user.photoURL || "",
        status: "online",
        showOnlineStatus: true,
        allowGameRequests: true,
        wins: 0,
        losses: 0,
        draws: 0,
        games: 0,
        createdAt: Date.now(),
        lastSeen: Date.now()
    };
}

async function ensureGoogleProfile(user, isNewUser = false) {
    const existing = await get(ref(database, `users/${user.uid}`));
    if (!existing.exists()) {
        const usernameBase = (user.displayName || "Player").replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 20) || "Player";
        const username = isNewUser ? `${usernameBase}${Math.floor(100 + Math.random() * 900)}`.slice(0, 24) : usernameBase;
        await set(ref(database, `users/${user.uid}`), userProfilePayload(user, username));
    }
}

$("signupBtn").addEventListener("click", async () => {
    let fields;
    try { fields = validateSignupFields(); }
    catch (error) { alert(error.message); return; }

    const button = $("signupBtn");
    setLoading(button, true, "CREATE ACCOUNT", "CREATING…");

    try {
        const credential = await createUserWithEmailAndPassword(auth, fields.email, fields.password);
        await updateProfile(credential.user, { displayName: fields.username });
        await set(ref(database, `users/${credential.user.uid}`), userProfilePayload(credential.user, fields.username));

        closeModal(signupModal);
        $("signupUsername").value = "";
        $("signupEmail").value = "";
        $("signupPassword").value = "";
        $("signupConfirmPassword").value = "";
        $("agreeRules").checked = false;
        updatePasswordStrength();
        alert("Account created successfully. Welcome to WHITE_RPS!");
    } catch (error) {
        alert(friendlyAuthError(error));
    } finally {
        setLoading(button, false, "CREATE ACCOUNT", "CREATING…");
    }
});

async function handleGoogleAuth(mode) {
    if (mode === "signup" && !$("agreeRules").checked) {
        alert("Please agree to the WHITE_RPS Fair Play Rules before signing up with Google.");
        return;
    }

    const button = mode === "signup" ? $("googleSignUpBtn") : $("googleSignInBtn");
    setLoading(button, true, mode === "signup" ? "Sign up with Google" : "Continue with Google", "CONNECTING…");

    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const additional = getAdditionalUserInfo(result);
        const isNewUser = Boolean(additional?.isNewUser);

        if (mode === "signin" && isNewUser) {
            // Firebase creates a temporary Auth account when OAuth succeeds.
            // Remove that just-created account so Google Sign In remains strictly
            // an existing-account flow for WHITE_RPS.
            await deleteUser(result.user).catch(() => signOut(auth));
            throw new Error("No existing Google account was found in WHITE_RPS. Please use Create Account first.");
        }

        if (mode === "signup" && !isNewUser) {
            await signOut(auth);
            throw new Error("A WHITE_RPS account already exists for this Google account. Please use Google Sign In instead.");
        }

        await ensureGoogleProfile(result.user, isNewUser);

        if (mode === "signup") {
            $("agreeRules").checked = false;
            closeModal(signupModal);
            alert("Google account created successfully. Welcome to WHITE_RPS!");
        }
        window.location.href = "dashboard.html";
    } catch (error) {
        const message = error.message || friendlyAuthError(error);
        alert(message);
    } finally {
        setLoading(button, false, mode === "signup" ? "Sign up with Google" : "Continue with Google", "CONNECTING…");
    }
}

$("googleSignInBtn").addEventListener("click", () => handleGoogleAuth("signin"));
$("googleSignUpBtn").addEventListener("click", () => handleGoogleAuth("signup"));

function updatePasswordStrength() {
    const password = $("signupPassword").value;
    const meter = $("passwordStrength");
    const fill = meter?.querySelector("span");
    const label = meter?.querySelector("small");
    if (!meter || !fill || !label) return;

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = ["—", "Very weak", "Weak", "Fair", "Strong", "Excellent"];
    fill.style.width = `${Math.min(100, score * 20)}%`;
    meter.dataset.level = String(score);
    label.textContent = `Password strength: ${levels[score]}`;
}

$("signupPassword").addEventListener("input", updatePasswordStrength);
$("signupConfirmPassword").addEventListener("input", () => {
    const value = $("signupConfirmPassword").value;
    $("signupConfirmPassword").setCustomValidity(value && value !== $("signupPassword").value ? "Passwords do not match" : "");
});
document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const input = $(toggle.dataset.target);
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
        toggle.textContent = input.type === "password" ? "◉" : "◌";
        toggle.setAttribute("aria-label", input.type === "password" ? "Show password" : "Hide password");
    });
});

$("forgotBtn").addEventListener("click", async () => {
    const email = $("forgotEmail").value.trim();

    if (!email) {
        alert("Please enter your account email.");
        return;
    }

    const button = $("forgotBtn");
    setLoading(button, true, "SEND RESET LINK", "SENDING…");

    try {
        await sendPasswordResetEmail(auth, email);
        closeModal(forgotModal);
        $("forgotEmail").value = "";
        alert("Password reset email sent. Check your inbox.");
    } catch (error) {
        alert(friendlyAuthError(error));
    } finally {
        setLoading(button, false, "SEND RESET LINK", "SENDING…");
    }
});
