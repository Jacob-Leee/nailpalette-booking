/*
 * nailpalette.syd — Firebase Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a project → "nailpalette-booking"
 * 3. Add a Web app → copy the config values below
 * 4. Enable Firestore → Start in test mode
 * 5. Replace each "YOUR_..." placeholder with your real values
 *
 * EmailJS (for owner email notifications):
 * 1. Go to https://www.emailjs.com → sign up free
 * 2. Add an Email Service → get your Service ID
 * 3. Create an Email Template → get your Template ID
 * 4. Get your Public Key from Account → API Keys
 * 5. Replace the EmailJS placeholders below
 */

// ── FIREBASE CONFIG ──────────────────────────────
window.firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ── EMAILJS CONFIG ───────────────────────────────
window._EMAILJS_SERVICE_ID  = "YOUR_EMAILJS_SERVICE_ID";   // e.g. "service_abc123"
window._EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";  // e.g. "template_xyz789"
window._EMAILJS_PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";   // e.g. "abcDEF123456"

// ── OWNER NOTIFICATION EMAIL ─────────────────────
window._OWNER_EMAIL = "lucklkh88@gmail.com";

// Initialise EmailJS (only if configured)
if (window._EMAILJS_PUBLIC_KEY && window._EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  // EmailJS SDK loaded via CDN in admin.html
  // emailjs.init(window._EMAILJS_PUBLIC_KEY);
}
