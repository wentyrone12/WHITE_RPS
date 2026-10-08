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
