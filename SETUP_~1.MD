# nailpalette.syd — Booking App Setup Guide

Your booking app is fully built. Follow these steps to get it live for free.

---

## STEP 1 — Firebase Setup (5 min)

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"** → name it `nailpalette-booking` → Continue
3. Disable Google Analytics (not needed) → **Create project**

### Enable Firestore Database
4. Left sidebar → **Build → Firestore Database**
5. Click **"Create database"** → choose **Start in test mode** → Next
6. Choose region: `australia-southeast1` → Enable

### Enable Authentication (for admin login)
7. Left sidebar → **Build → Authentication** → **Get started**
8. Click **Email/Password** → Enable → Save
9. Go to **Users** tab → **Add user**
   - Email: `lucklkh88@gmail.com`
   - Password: (choose a strong password — this is your admin login)

### Get your Firebase config
10. Left sidebar → ⚙️ **Project settings** → **Your apps** → click `</>`
11. Register app name: `nailpalette-web` → Register
12. Copy the `firebaseConfig` object — you'll need it in Step 3

---

## STEP 2 — EmailJS Setup (2 min, optional but recommended)

This sends you an email every time someone books.

1. Go to **https://www.emailjs.com** → Sign up free
2. **Email Services** → Add New Service → Gmail → Connect your Gmail
3. Copy your **Service ID** (e.g. `service_abc123`)
4. **Email Templates** → Create New Template
   - Subject: `New Booking — {{service}} on {{date}}`
   - Body:
     ```
     New booking request for nailpalette.syd!
     
     Service: {{service}}
     Date: {{date}} at {{time}}
     Client: {{client_name}}
     Contact: {{contact}}
     Add-ons: {{addons}}
     Notes: {{notes}}
     ```
5. Copy your **Template ID** (e.g. `template_xyz789`)
6. Go to **Account → API Keys** → copy your **Public Key**

---

## STEP 3 — Add Firebase Config to App

Open this file in any text editor (Notepad is fine):
```
nailpalette-booking/js/firebase-config.js
```

Replace the placeholder values with your real ones:
```javascript
window.firebaseConfig = {
  apiKey:            "AIzaSy...",        // ← paste your real values
  authDomain:        "nailpalette-booking.firebaseapp.com",
  projectId:         "nailpalette-booking",
  storageBucket:     "nailpalette-booking.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc..."
};

window._EMAILJS_SERVICE_ID  = "service_abc123";
window._EMAILJS_TEMPLATE_ID = "template_xyz789";
window._EMAILJS_PUBLIC_KEY  = "your_public_key";
```

Also add this line inside admin.html before `</script>` at the bottom (for EmailJS):
```javascript
emailjs.init(window._EMAILJS_PUBLIC_KEY);
```
(Already referenced in the code — just needs the SDK added to admin.html's `<head>`)

---

## STEP 4 — Upload to GitHub

### Create a GitHub account (if you don't have one)
1. Go to **https://github.com** → Sign up free

### Create a repository
2. Click **+** → **New repository**
3. Name: `nailpalette-booking`
4. Set to **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Upload your files
6. On the new repo page, click **uploading an existing file**
7. Drag the entire `nailpalette-booking` folder contents (not the folder itself — the files inside)
8. Scroll down → click **Commit changes**

---

## STEP 5 — Enable GitHub Pages

1. In your repository → **Settings** tab
2. Left sidebar → **Pages**
3. Under **Branch** → select `main` → folder `/ (root)` → **Save**
4. Wait 1–2 minutes → refresh the page
5. You'll see: **"Your site is live at https://YOUR-USERNAME.github.io/nailpalette-booking"**

That's your booking URL! Share it on Instagram bio, KakaoTalk, etc.

---

## HOW TO USE THE APP

### As a client:
- Visit your GitHub Pages URL
- Select service → pick date & time → enter details → confirm
- You get notified via EmailJS

### As admin (you):
- Go to `YOUR-URL/admin.html`
- Log in with the email/password you set in Firebase Auth
- **Bookings tab**: see all upcoming bookings, confirm or cancel
- **Manage Slots tab**: override slots for a specific date (e.g. add extra Saturday times)
- **Vacation tab**: block dates so clients can't book (e.g. 12 July – mid August)

---

## UPDATING YOUR APP LATER

To change anything (prices, slots, etc.):
1. Edit the file on your computer
2. Go to GitHub → your repo → find the file → click the pencil icon → paste new content → Commit
3. Changes go live in ~1 minute

---

## FIRESTORE SECURITY RULES (do this before going live)

After testing, update your Firestore rules so only you can read bookings:

1. Firebase Console → Firestore → **Rules** tab
2. Replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can create a booking (public)
    match /bookings/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    // Only admin can manage settings
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
3. Click **Publish**

---

## FILE STRUCTURE

```
nailpalette-booking/
├── index.html          ← Client booking page (share this URL)
├── admin.html          ← Your dashboard (keep this private-ish)
├── manifest.json       ← PWA config (makes it installable on phone)
├── sw.js               ← Service worker (offline support)
├── SETUP_GUIDE.md      ← This guide
├── css/
│   └── style.css       ← All styles
└── js/
    ├── firebase-config.js  ← ⚠️ Fill in your credentials here
    └── app.js              ← All booking logic
```

---

Questions? The app works in demo mode even before Firebase is connected — 
you can open index.html in Chrome and test the full booking flow locally.
