# Waitlist → Google Sheet + Gmail

When someone joins the waitlist, the website's `/api/waitlist` route checks it's a work email, then sends it to a Google Apps Script. The script:

- adds a row (time, email, domain, page, user agent) to a Google Sheet, skipping duplicates;
- emails you a "New Boro waitlist signup" notification from your own Gmail.

## Setup (about 5 minutes)

1. **Create the sheet.** In Google Sheets, create a new spreadsheet, e.g. "Boro waitlist".
2. **Add the script.** In that sheet, open **Extensions → Apps Script**. Replace everything in `Code.gs` with the contents of [`Code.gs`](./Code.gs) from this folder.
3. **Set a secret.** Generate one in your terminal with `openssl rand -hex 32` and paste it into `SECRET` at the top of the script. Save.
4. **Authorize and test.** In the toolbar's function dropdown, pick `testSetup` and click **Run**. Approve the permission prompts (Sheets and sending email as you). You should see a `Waitlist` tab with a test row, and get a test email. Delete the test row afterwards.
5. **Deploy.** Click **Deploy → New deployment** and choose type **Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
   - "Anyone" is needed so the website's server can call it. The secret is what keeps other people out.
6. **Connect the website.** Create `.env.local` in the project root, using `.env.example` as a template:

   ```bash
   WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
   WAITLIST_WEBHOOK_SECRET=the-same-secret-as-in-the-script
   ```

   Restart `pnpm dev`. When you deploy the site (e.g. Vercel), add the same two environment variables there.

## Options (top of `Code.gs`)

- `NOTIFY_TO`: where notifications go. Empty means the account that owns the script. You can use several addresses separated by commas.
- `SEND_CONFIRMATION`: set to `true` to also send each person a "You're on the Boro waitlist" email.

## Changing the script later

After editing, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same, so the website doesn't need updating.

## Behaviour without setup

If the two environment variables are missing:

- **local dev:** signups are accepted and only logged to the terminal;
- **production:** the form shows "The waitlist isn't available right now", so emails are never silently lost.
