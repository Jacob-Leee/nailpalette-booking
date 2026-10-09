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
  apiKey:            "AIzaSyAvdUFormvRkT0qRhlSBXU6RiC0U17Mgk4",
  authDomain:        "nailpalettesyd.firebaseapp.com",
  projectId:         "nailpalettesyd",
  storageBucket:     "nailpalettesyd.firebasestorage.app",
  messagingSenderId: "549472425633",
  appId:             "1:549472425633:web:948d61607c04e2b87202e0",
  measurementId:     "G-V77JTEE296"
};

// ── EMAILJS CONFIG ───────────────────────────────
window._EMAILJS_SERVICE_ID          = "nailpalette";
window._EMAILJS_TEMPLATE_ID         = "template_4mo51jl";        // new booking → owner
window._EMAILJS_TEMPLATE_CLIENT_ID  = "template_pfpmh68";         // booking confirmed → client
// Booking declined → client. Create this template in EmailJS, then paste its
// ID here. Until then, declines are saved but the client is NOT emailed.
window._EMAILJS_TEMPLATE_DECLINE_ID = "YOUR_DECLINE_TEMPLATE_ID";
window._EMAILJS_PUBLIC_KEY          = "xWF-q9QCw1VKVP9Nb";

// ── OWNER NOTIFICATION EMAIL ─────────────────────
window._OWNER_EMAIL = "J891016@gmail.com";

// Initialise EmailJS (only if configured)
if (window._EMAILJS_PUBLIC_KEY && window._EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  // EmailJS SDK loaded via CDN in admin.html
  // emailjs.init(window._EMAILJS_PUBLIC_KEY);
}
