# Routine Timer v26

Adds a training profile with optional physical data, indicative experience level, profile preferences, a planning calendar, active routines, scheduled-day streaks, stopwatch with laps, favorites, search, duplication, share/import codes, exercise ordering, supersets, unilateral exercises, dropsets, actual reps, extra rest, voice cues, records and achievements.

Content pending: recommended routines, exercise library, and 5/10/15/20-minute routines show the requested in-progress notice.

## Persistence
- Routines: existing Supabase `routines` table plus a user-scoped local cache and queued offline changes. Sync retries on reconnect. Updates use last successful write; there is no collaborative conflict editor.
- Profile: Supabase Auth user metadata plus a local pending copy. Metadata is never used for authorization.
- Calendar, preferences, favorites, records, workout and stopwatch history: local to each user and browser/device. They do not automatically appear on another device. Clearing site data removes these local records.
- Offline access requires a previous online sign-in and successful service worker install. Sign-out removes the offline account selection. No Supabase API responses or access tokens are cached by the service worker.
- A PWA update activates after old app windows close; it does not interrupt an active workout.

## Owner panel activation
Run `supabase/admin-setup.sql` once in the existing Supabase project's SQL Editor. It authorizes only the confirmed existing `justimanzano@gmail.com` account by immutable user ID. The browser only gates presentation; the database function and RLS authorize every write. The panel edits a public home announcement and seasonal design, not other users' data. The migration has not been applied by this release.

## Verification
`npm install && npm test` runs pure data tests and DOM integration tests with a mocked backend. Covers training sequences, logs and conversions, failure reps, multi-day sharing, streaks and account isolation. No real test accounts are created. Physical-device checks (speech, PWA suspension, drag gestures) still depend on the target browser/device.
