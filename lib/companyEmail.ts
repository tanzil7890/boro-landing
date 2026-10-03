// Work-email rules for the waitlist. Shared by the browser (instant feedback)
// and the API route (the authoritative check, plus a DNS lookup).
import { EMAIL_RE } from "./utils";

// Personal / consumer mailbox providers.
const FREE_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com", "hotmail.com", "outlook.com",
  "live.com", "msn.com", "passport.com", "aol.com", "aim.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "protonmail.ch", "pm.me", "gmx.com", "gmx.net", "gmx.de", "web.de",
  "mail.com", "email.com", "inbox.com", "zoho.com", "zohomail.com", "yandex.com", "yandex.ru", "ya.ru",
  "mail.ru", "bk.ru", "list.ru", "inbox.ru", "rambler.ru", "qq.com", "163.com", "126.com", "yeah.net",
  "sina.com", "sohu.com", "aliyun.com", "naver.com", "daum.net", "hanmail.net", "rediffmail.com",
  "fastmail.com", "fastmail.fm", "hey.com", "tutanota.com", "tutanota.de", "tuta.io", "tuta.com",
  "hushmail.com", "lycos.com", "mailfence.com", "posteo.de", "posteo.net", "mailbox.org", "runbox.com",
  "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "bellsouth.net", "cox.net", "charter.net",
  "earthlink.net", "optonline.net", "juno.com", "netzero.net", "btinternet.com", "sky.com",
  "virginmedia.com", "talktalk.net", "orange.fr", "wanadoo.fr", "free.fr", "laposte.net", "sfr.fr",
  "libero.it", "virgilio.it", "tiscali.it", "t-online.de", "freenet.de", "seznam.cz", "wp.pl", "o2.pl",
  "interia.pl", "onet.pl", "bigpond.com", "optusnet.com.au", "shaw.ca", "rogers.com", "sympatico.ca",
  "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br",
  // Privacy relays that hide a personal inbox.
  "duck.com", "mozmail.com", "privaterelay.appleid.com", "simplelogin.com", "simplelogin.co",
  "aleeas.com", "slmail.me", "anonaddy.com", "anonaddy.me", "addy.io",
]);

// Big providers that also exist under many country TLDs (yahoo.co.uk, hotmail.fr, outlook.jp, ...).
const FREE_FAMILY = /^(yahoo|hotmail|outlook|live|windowslive|aol|gmx|yandex)\.[a-z]{2,3}(\.[a-z]{2})?$/;

// Throwaway / temporary inbox services.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "mailinator.net", "mailinator2.com", "guerrillamail.com", "guerrillamail.net",
  "guerrillamail.org", "guerrillamail.info", "guerrillamail.biz", "guerrillamail.de", "sharklasers.com",
  "grr.la", "guerrillamailblock.com", "pokemail.net", "spam4.me", "10minutemail.com", "10minutemail.net",
  "10minutemail.co.uk", "20minutemail.com", "temp-mail.org", "temp-mail.io", "tempmail.com", "tempmail.net",
  "tempmailo.com", "tempmail.plus", "tempail.com", "tempr.email", "tempinbox.com", "temp-inbox.com",
  "mytemp.email", "yopmail.com", "yopmail.fr", "yopmail.net", "cool.fr.nf", "jetable.fr.nf", "trashmail.com",
  "trashmail.de", "trashmail.net", "trashmail.io", "wegwerfmail.de", "getnada.com", "nada.email",
  "dispostable.com", "maildrop.cc", "mailnesia.com", "mintemail.com", "mohmal.com", "throwawaymail.com",
  "fakeinbox.com", "fakemail.net", "emailondeck.com", "mailcatch.com", "spamgourmet.com", "spambox.us",
  "burnermail.io", "moakt.com", "discard.email", "discardmail.com", "mailpoof.com", "inboxkitten.com",
  "33mail.com", "getairmail.com", "airmail.cc", "emailfake.com", "fakemailgenerator.com", "mail.tm",
  "mail.gw", "tmpmail.org", "tmpmail.net", "tmail.ws", "minuteinbox.com", "mailsac.com", "mailslurp.com",
  "inboxbear.com", "anonbox.net", "byom.de", "dropmail.me", "emltmp.com", "harakirimail.com",
  "incognitomail.org", "mailexpire.com", "mailforspam.com", "mailtemp.info", "meltmail.com", "mvrht.net",
  "nwldx.com", "spamex.com", "spamfree24.org", "tempemail.net", "tempmailaddress.com", "throwam.com",
  "trbvm.com", "wh4f.org", "zetmail.com", "luxusmail.org", "fexbox.org", "rover.info", "vomoto.com",
]);

/** The domain and each of its parents, so "eu.mailinator.com" also matches "mailinator.com". */
function withParents(domain: string) {
  const parts = domain.split(".");
  return parts.slice(0, -1).map((_, i) => parts.slice(i).join("."));
}

export function emailDomain(email: string) {
  return email.trim().toLowerCase().split("@").pop() ?? "";
}

/** Returns a user-facing error if this isn't an acceptable work email, otherwise null. */
export function workEmailError(email: string): string | null {
  const value = email.trim().toLowerCase();
  if (value.length > 254 || !EMAIL_RE.test(value)) return "Please enter a valid email address.";

  const domains = withParents(emailDomain(value));
  if (domains.some((d) => DISPOSABLE_DOMAINS.has(d))) {
    return "Disposable email addresses aren't accepted. Please use your work email.";
  }
  if (domains.some((d) => FREE_DOMAINS.has(d) || FREE_FAMILY.test(d))) {
    return `Please use your work email. @${emailDomain(value)} isn't accepted.`;
  }
  return null;
}
