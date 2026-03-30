# Quickstart: Testing URL Encoding Fix

To verify the URL-safe encoding operates flawlessly:

1. Setup the game.
2. Click "Copy Link".
3. Verify the generated link is structurally: `?config=BASE64URL_STRING` (no `+`, `/`, or `=`).
4. Paste it into an incognito window -> Confirms basic load.
5. Create a legacy dummy link with `#config=...` and verify the Next.js `router.replace` logic triggers successfully, booting the user onto the new `?config=` pattern cleanly.
