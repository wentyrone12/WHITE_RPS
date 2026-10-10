/* WHITE_RPS PWA installation and offline-shell registration. No Firebase dependencies. */
const $ = (id) => document.getElementById(id);
let deferredInstallPrompt = null;
let installPromptIsAvailable = false;

const installEls = {
  button: $("installAppBtn"),
  label: $("installAppLabel"),
  modal: $("installHelpModal"),
  close: $("closeInstallHelp"),
  title: $("installHelpTitle"),
  description: $("installHelpDescription"),
  stepOne: $("installStepOne"),
  stepTwo: $("installStepTwo"),
  stepThree: $("installStepThree"),
  note: $("installHelpNote"),
  tryButton: $("installHelpTryBtn"),
  toastContainer: $("appToastContainer")
};

function isAppInstalled() {
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function installToast(message, type = "info") {
  if (!installEls.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `app-toast${type && type !== "success" ? ` ${type}` : ""}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  installEls.toastContainer.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(6px)";
    window.setTimeout(() => toast.remove(), 220);
  }, 3800);
}

function setInstallButtonState() {
  if (!installEls.button || !installEls.label) return;
  if (isAppInstalled()) {
    installEls.label.textContent = "App Installed";
    installEls.button.classList.add("app-installed");
    installEls.button.title = "WHITE_RPS is installed on this device";
    return;
  }
  installEls.label.textContent = "Install App";
  installEls.button.classList.remove("app-installed");
  installEls.button.title = installPromptIsAvailable ? "Install WHITE_RPS on this device" : "View instructions to install WHITE_RPS";
}

function setInstallHelpContent() {
  if (!installEls.modal) return;
  if (isAppInstalled()) {
    installEls.title.textContent = "WHITE_RPS is installed";
    installEls.description.textContent = "The arena is already available as an app on this device.";
    installEls.stepOne.textContent = "Find WHITE_RPS on your Home Screen or in your apps list.";
    installEls.stepTwo.textContent = "Open it directly to launch the app-like experience.";
    installEls.stepThree.textContent = "Use your browser to manage or remove the installed app.";
    installEls.note.textContent = "Your account and realtime features still use the same Firebase service.";
    installEls.tryButton.classList.add("hidden");
    return;
  }

  installEls.title.textContent = "Install WHITE_RPS";
  installEls.description.textContent = "Add WHITE_RPS to your device for quick access and a dedicated app window.";
  installEls.tryButton.classList.toggle("hidden", !installPromptIsAvailable);
  const ua = navigator.userAgent || "";
  if (location.protocol === "file:") {
    installEls.stepOne.textContent = "Upload the project to a secure HTTPS host, or run it from localhost.";
    installEls.stepTwo.textContent = "Open the hosted website in a supported browser.";
    installEls.stepThree.textContent = "Tap Install App again after the site is hosted.";
    installEls.note.textContent = "PWA installation and service workers do not work when opening index.html directly as a file.";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    installEls.stepOne.textContent = "Open WHITE_RPS in Safari (not an in-app browser).";
    installEls.stepTwo.textContent = "Tap the Share button in Safari.";
    installEls.stepThree.textContent = "Choose Add to Home Screen, then tap Add.";
    installEls.note.textContent = "On iPhone and iPad, installation is usually done from Safari's Share menu.";
  } else if (/Android/i.test(ua)) {
    installEls.stepOne.textContent = "Open WHITE_RPS in Chrome or another supported browser.";
    installEls.stepTwo.textContent = "Open the browser menu (⋮).";
    installEls.stepThree.textContent = "Choose Install app or Add to Home screen.";
    installEls.note.textContent = installPromptIsAvailable ? "Your browser supports the install prompt. Use Try Install Again below." : "If Install app is not listed, update your browser and check that the website uses HTTPS.";
  } else {
    installEls.stepOne.textContent = "Open WHITE_RPS in an up-to-date Chrome or Edge browser.";
    installEls.stepTwo.textContent = "Look for the install icon in the address bar, or open the browser menu.";
    installEls.stepThree.textContent = "Choose Install WHITE_RPS or Install app.";
    installEls.note.textContent = installPromptIsAvailable ? "This browser has an install prompt available. Use Try Install Again below." : "The install option appears only when the browser considers the secure website installable.";
  }
}

function openInstallHelp() {
  if (!installEls.modal) return;
  setInstallHelpContent();
  installEls.modal.style.display = "flex";
  installEls.modal.setAttribute("aria-hidden", "false");
  const sidebar = $("sidebar");
  const overlay = $("overlay");
  const menuBtn = $("menuBtn");
  sidebar?.classList.remove("active");
  overlay?.classList.remove("active");
  menuBtn?.setAttribute("aria-expanded", "false");
}

async function requestAppInstall() {
  if (isAppInstalled() || !deferredInstallPrompt) {
    openInstallHelp();
    return;
  }
  const promptEvent = deferredInstallPrompt;
  deferredInstallPrompt = null;
  installPromptIsAvailable = false;
  setInstallButtonState();
  try {
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice?.outcome === "accepted") installToast("WHITE_RPS installation was accepted. Follow your browser's setup to finish.", "success");
    else installToast("Installation was dismissed. You can try again from the sidebar.", "info");
  } catch {
    installToast("Your browser could not open the install prompt. Follow the install guide instead.", "info");
    openInstallHelp();
  }
  setInstallButtonState();
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("WHITE_RPS offline app setup was unavailable:", error);
    });
  }, { once: true });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installPromptIsAvailable = true;
  setInstallButtonState();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installPromptIsAvailable = false;
  setInstallButtonState();
  installToast("WHITE_RPS was installed successfully.", "success");
});

installEls.button?.addEventListener("click", requestAppInstall);
installEls.close?.addEventListener("click", () => {
  installEls.modal.style.display = "none";
  installEls.modal.setAttribute("aria-hidden", "true");
});
installEls.tryButton?.addEventListener("click", requestAppInstall);
if (installEls.modal) {
  installEls.modal.addEventListener("click", (event) => {
    if (event.target === installEls.modal) {
      installEls.modal.style.display = "none";
      installEls.modal.setAttribute("aria-hidden", "true");
    }
  });
}
setInstallButtonState();
