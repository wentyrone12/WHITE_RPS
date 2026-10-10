# WHITE_RPS Enhanced

This build contains a full UI/UX refresh for desktop and mobile while preserving the existing Firebase-based gameplay.

Highlights:
- Professional responsive desktop + mobile arena layout
- Dark / Light mode in Settings
- Reduced motion and compact mode
- Sound/notification controls and notification volume
- Browser desktop notification option
- Account/profile management and profile export
- Username uniqueness check and profile-save bug fix
- Responsive player search
- Reworked chat list with search, unread indicators, timestamps, Enter-to-send, character counter, message deletion, and realtime typing indicator
- Reworked game request inbox
- 3D-style leaderboard podium with sorting by wins, games, or win rate
- Win/loss/draw/game statistics
- Improved solo and multiplayer round flow
- Cleaner modal behavior, Escape/backdrop closing, and mobile-friendly controls
- Realtime listener cleanup to avoid duplicate chat/game listeners
- Safer rendering for chat/search text

Note:
Firebase Realtime Database security rules still control what can be read/written. This package cannot verify your deployed Firebase rules without access to your Firebase Console.


## Additional Auth + Chat + Mobile Updates (October 2026)

- Email registration now requires a confirm password, stronger password policy, Fair Play Rules acceptance, password visibility toggle, and password-strength feedback.
- Added Google Sign Up and Google Sign In. Google Sign In rejects first-time Google accounts and removes the temporary Auth account created by the OAuth attempt, so users must use Google Sign Up first.
- Added editable/unsendable outgoing chat messages. Edited messages show an edited marker; unsent messages remain as a non-content placeholder.
- Added a Challenge button beside Send in private chat. It creates a realtime game request for the person in the conversation.
- Added a mobile Choose Weapon action that opens a bottom-sheet style weapon picker, so Rock/Paper/Scissors can be selected without scrolling down the arena.

### Firebase console requirement

Enable **Google** under Firebase Authentication > Sign-in method/providers for the Google buttons to work. The code uses Firebase's current Google provider popup flow.


### Follow-up fixes and social features (October 2026)

- Fixed the Create Account rules checkbox ID mismatch that caused `Cannot read properties of null (reading 'checked')`.
- Added clearer Google authentication errors. In Firebase Console, Google must be enabled under Authentication → Sign-in method, and the website hostname must be listed under Authentication → Settings → Authorized domains.
- Added three-dot conversation actions: delete from your own list, pin/unpin, mark unread/read, and a device-local PIN lock. Deleting a conversation removes only your `chatList` entry; it does not erase the other person's copy or shared message history.
- The conversation lock is a local browser privacy feature, not message encryption or a server-enforced security boundary. Lock settings are specific to the current browser/device.
- Added realtime Public Chat backed by Realtime Database path `publicMessages`. Public challenge posts are visible to everyone; another user can press Accept challenge to send a normal direct match request to the challenge author.
- Firebase Realtime Database rules must permit authenticated users to read and write `publicMessages`, and read/write their permitted conversation entries. If the public chat reports permission denied, review the rules in Firebase Console; client code cannot override database rules.


Example Realtime Database rule branch for Public Chat (merge this into your existing `.rules`; do not replace unrelated rules):

```json
"publicMessages": {
  ".read": "auth != null",
  "$messageId": {
    ".write": "auth != null && ((!data.exists() && newData.child('senderUID').val() === auth.uid) || (data.exists() && data.child('senderUID').val() === auth.uid))"
  }
}
```

This allows signed-in users to read public posts and only create/update/delete posts where the `senderUID` matches their own authenticated UID. Review this alongside your existing rules before publishing.


### Installable app + custom conversation PIN cards

- Added an **Install App** entry in the dashboard sidebar, a web app manifest, branded 192/512 app icons, and a separate early-loading `pwa.js` install module plus service worker that caches the app shell for faster startup and offline page-shell access. Firebase authentication, public chat, and realtime messaging still require an internet connection.
- For installation, deploy the folder to an HTTPS website (or run it from `localhost` for development). Opening `index.html` directly using `file://` does not support PWA installation/service workers. On iPhone/iPad, use Safari's Share menu → Add to Home Screen.
- The conversation lock now uses a dedicated in-app PIN card for creating, confirming, entering, or removing a PIN. Incorrect PIN feedback is shown in the card; this PIN workflow does not use native JavaScript `prompt()` or `alert()` dialogs. New PIN hashes use salted PBKDF2-SHA-256 (120,000 iterations) and are stored in browser-local storage per signed-in user/device, so this is a local privacy lock rather than server-enforced encryption. Clearing browser storage or switching browsers/devices does not transfer the lock settings.

## Real-time clock, IP location, and weather (added)
- The dashboard top bar displays the current browser/device local time, date, and timezone.
- Settings → Device & Weather shows the public IP and an approximate IP-based city/region/country. It fetches IP metadata from ipapi.co, with ipwho.is as a fallback.
- Current weather is fetched from Open-Meteo using the approximate IP coordinates. Select **Use precise location** to request the browser's location permission and use its coordinates for weather; this is optional. **Use IP-based location** returns to the approximate estimate.
- These values are displayed in the browser only and are not written to Firebase or the account profile. The external IP lookup service receives the visitor's request/public IP when this panel loads.
- Location/weather lookup requires an internet connection and a browser that allows cross-origin requests. If a service is unavailable or rate-limited, use **Refresh** and try again later. Precise browser geolocation normally requires HTTPS or localhost.
- Weather data is provided by [Open-Meteo](https://open-meteo.com/).
