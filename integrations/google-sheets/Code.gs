/**
 * Boro waitlist → Google Sheet + Gmail notification.
 *
 * Paste this into the Apps Script editor of your waitlist Google Sheet
 * (Extensions → Apps Script) and deploy it as a web app. Setup steps: README.md in this folder.
 */

// Must match WAITLIST_WEBHOOK_SECRET in the website's environment.
const SECRET = "PASTE_YOUR_SECRET_HERE";

// Who gets the "new signup" email. Leave empty to use the Google account that owns this script.
const NOTIFY_TO = "";

// Also send a confirmation email to the person who signed up?
// Uses your Gmail sending quota (about 100 emails/day on a free account, 1,500 on Workspace).
const SEND_CONFIRMATION = false;

const SHEET_NAME = "Waitlist";
const HEADERS = ["Submitted at", "Email", "Domain", "Page", "User agent"];

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "invalid json" });
  }
  if (!body || body.secret !== SECRET) return reply({ ok: false, error: "unauthorized" });

  const email = String(body.email || "").trim().toLowerCase();
  if (!email) return reply({ ok: false, error: "missing email" });

  // Serialize writes so two signups at the same moment can't clobber each other.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const existing = sheet
      .getRange(1, 2, sheet.getLastRow(), 1)
      .getValues()
      .map((row) => String(row[0]).replace(/^'/, "").toLowerCase());
    if (existing.includes(email)) return reply({ ok: true, duplicate: true });

    sheet.appendRow([new Date()].concat([email, body.domain, body.source, body.userAgent].map(safe)));
    notify(email, body, sheet.getLastRow() - 1);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Opening the web app URL in a browser shows this, which is handy to confirm the deployment works.
function doGet() {
  return reply({ ok: true, service: "boro-waitlist" });
}

/** Run once from the editor: grants permissions, adds a test row and sends you a test email. */
function testSetup() {
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        email: "test@example.com",
        domain: "example.com",
        source: "/setup-test",
        userAgent: "Apps Script testSetup()",
      }),
    },
  });
  Logger.log(res.getContent());
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function notify(email, body, total) {
  const to = NOTIFY_TO || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail({
    to: to,
    subject: "New Boro waitlist signup: " + email,
    body: [
      email + " just joined the Boro waitlist.",
      "",
      "Company domain: " + (body.domain || ""),
      "Signed up from: hey-boro.com" + (body.source || "/"),
      "Total signups: " + total,
      "",
      "Open the sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join("\n"),
  });

  if (SEND_CONFIRMATION) {
    MailApp.sendEmail({
      to: email,
      name: "Boro",
      subject: "You're on the Boro waitlist",
      body:
        "Thanks for joining the Boro waitlist. We'll email you as soon as early access opens.\n\n" +
        "The Boro team\nhey-boro.com",
    });
  }
}

// Stop values like "=HYPERLINK(...)" from being treated as spreadsheet formulas.
function safe(value) {
  const text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
