/* ══════════════════════════════════════════════
   nailpalette.syd — Booking App Logic
   ══════════════════════════════════════════════ */

// ── STATE ────────────────────────────────────────
const state = {
  step: 1,
  service: null,
  addons: [],
  date: null,        // JS Date object
  timeSlot: null,    // "7:00 PM"
  name: '',
  contactMethod: 'instagram',
  contactHandle: '',
  notes: '',
  email: ''
};

// ── WEEKLY SCHEDULE TEMPLATE (fallback if Firebase not set up yet) ──
// Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=0
const DEFAULT_SCHEDULE = {
  0: ['3:00 PM', '4:30 PM', '6:00 PM'],          // Sunday from 3pm
  1: ['7:00 PM', '8:30 PM'],                       // Mon evening
  2: ['7:00 PM', '8:30 PM'],                       // Tue evening
  3: ['7:00 PM', '8:30 PM'],                       // Wed evening
  4: ['7:00 PM', '8:30 PM'],                       // Thu evening
  5: ['7:00 PM', '8:30 PM'],                       // Fri evening
  6: ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'] // Saturday all day
};

// ── DOM REFS ─────────────────────────────────────
const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const stepLabels = document.querySelectorAll('.step-label');

// ── NAVIGATION ───────────────────────────────────
function goStep(n) {
  steps.forEach(s => s.classList.remove('active'));
  document.getElementById(`step${n}`).classList.add('active');

  stepLabels.forEach(l => {
    l.classList.toggle('active', parseInt(l.dataset.step) === n);
  });

  const pct = Math.round((n / 5) * 100);
  progressBar.style.width = pct + '%';
  state.step = n;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (n === 3) renderSummaryMini();
  if (n === 4) renderReview();
}

// ── STEP 1: SERVICE SELECTION ─────────────────────
const serviceCards = document.querySelectorAll('.service-card');
const nextStep1 = document.getElementById('nextStep1');

function updateServiceState() {
  const selected = Array.from(document.querySelectorAll('.service-card.selected'));
  state.services = selected.map(c => ({
    name: c.dataset.service,
    price: c.dataset.price,
    duration: c.dataset.duration
  }));
  // Keep backward compat: state.service = first non-pedicure, or first selected
  state.service = state.services.find(s => !s.name.includes('Pedicure')) || state.services[0] || null;
  nextStep1.disabled = state.services.length === 0;
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const isPedicure = card.dataset.service.includes('Pedicure');
    if (isPedicure) {
      // Pedicure toggles independently
      card.classList.toggle('selected');
    } else {
      // Manicure: single select among non-pedicure cards
      serviceCards.forEach(c => {
        if (!c.dataset.service.includes('Pedicure')) c.classList.remove('selected');
      });
      card.classList.add('selected');
    }
    updateServiceState();
  });
});

// Add-ons
document.querySelectorAll('.addon-item input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    state.addons = Array.from(
      document.querySelectorAll('.addon-item input[type="checkbox"]:checked')
    ).map(c => c.value);
  });
});

nextStep1.addEventListener('click', () => goStep(2));

// ── STEP 2: CALENDAR ─────────────────────────────
let calDate = new Date();
calDate.setDate(1);

const calMonthEl = document.getElementById('calMonth');
const calGrid = document.getElementById('calGrid');

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const today = new Date();
today.setHours(0,0,0,0);

// Dates blocked as vacations from Firestore (filled in after Firebase loads)
let blockedDates = new Set();
// Individual slot overrides from Firestore { "YYYY-MM-DD": ["10:00 AM", ...] or [] (block all) }
let slotOverrides = {};

function renderCalendar() {
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  calMonthEl.textContent = `${MONTHS[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calGrid.innerHTML = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    calGrid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    const isPast = date < today;
    const dateKey = formatDateKey(date);
    const isBlocked = blockedDates.has(dateKey);
    const dow = date.getDay();
    const hasSlots = DEFAULT_SCHEDULE[dow] && DEFAULT_SCHEDULE[dow].length > 0;

    if (date.getTime() === today.getTime()) el.classList.add('today');

    if (isPast || isBlocked || !hasSlots) {
      el.classList.add(isPast ? 'past' : 'unavailable');
    } else {
      el.classList.add('available');
      el.addEventListener('click', () => selectDate(date, el));
    }

    // Mark selected
    if (state.date && date.getTime() === state.date.getTime()) {
      el.classList.add('selected');
    }

    calGrid.appendChild(el);
  }
}

function selectDate(date, el) {
  document.querySelectorAll('.cal-day.selected').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.date = date;
  state.timeSlot = null;
  document.getElementById('nextStep2').disabled = true;
  loadTimeSlots(date);
}

function loadTimeSlots(date) {
  const wrap = document.getElementById('timeSlotsWrap');
  const loading = document.getElementById('loadingSlots');
  const noSlots = document.getElementById('noSlots');
  const timeGrid = document.getElementById('timeGrid');
  const dateLabel = document.getElementById('selectedDateLabel');

  wrap.style.display = 'none';
  noSlots.style.display = 'none';
  loading.style.display = 'flex';

  dateLabel.textContent = date.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });

  // Load from Firestore (or fall back to default schedule)
  fetchAvailableSlots(date).then(slots => {
    loading.style.display = 'none';

    if (!slots || slots.length === 0) {
      noSlots.style.display = 'block';
      return;
    }

    timeGrid.innerHTML = '';
    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.className = 'time-slot' + (slot.booked ? ' booked' : '');
      btn.textContent = slot.time;
      btn.disabled = slot.booked;
      if (!slot.booked) {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.time-slot.selected').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.timeSlot = slot.time;
          document.getElementById('nextStep2').disabled = false;
        });
      }
      timeGrid.appendChild(btn);
    });

    wrap.style.display = 'block';
  });
}

async function fetchAvailableSlots(date) {
  const dateKey = formatDateKey(date);
  const dow = date.getDay();
  let rawSlots = DEFAULT_SCHEDULE[dow] || [];

  // If Firestore is ready, check for overrides and existing bookings
  if (window._db) {
    try {
      // Check slot overrides
      const overrideDoc = await window._db.collection('settings').doc('slots_' + dateKey).get();
      if (overrideDoc.exists) {
        rawSlots = overrideDoc.data().slots || [];
      }

      // Get booked slots for this date
      const bookingsSnap = await window._db
        .collection('bookings')
        .where('date', '==', dateKey)
        .where('status', '!=', 'cancelled')
        .get();

      const bookedTimes = new Set(bookingsSnap.docs.map(d => d.data().time));

      return rawSlots.map(time => ({ time, booked: bookedTimes.has(time) }));
    } catch (e) {
      console.warn('Firebase not configured yet, using default schedule', e);
    }
  }

  // Fallback: all slots available
  return rawSlots.map(time => ({ time, booked: false }));
}

document.getElementById('prevMonth').addEventListener('click', () => {
  calDate.setMonth(calDate.getMonth() - 1);
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  calDate.setMonth(calDate.getMonth() + 1);
  renderCalendar();
});

document.getElementById('nextStep2').addEventListener('click', () => goStep(3));

// ── STEP 3: DETAILS ──────────────────────────────
// Dynamic label for contact handle field
document.querySelectorAll('input[name="contactMethod"]').forEach(radio => {
  radio.addEventListener('change', () => {
    state.contactMethod = radio.value;
    const labelEl = document.getElementById('contactHandleLabel');
    const inputEl = document.getElementById('contactHandle');
    if (radio.value === 'instagram') {
      labelEl.textContent = 'Instagram handle *';
      inputEl.placeholder = '@yourusername';
    } else if (radio.value === 'kakaotalk') {
      labelEl.textContent = 'KakaoTalk ID *';
      inputEl.placeholder = 'your KakaoTalk ID';
    } else {
      labelEl.textContent = 'Phone number *';
      inputEl.placeholder = '04xx xxx xxx';
    }
  });
});

function renderSummaryMini() {
  const el = document.getElementById('bookingSummaryMini');
  const servicesText = (state.services || [state.service]).filter(Boolean)
    .map(s => `${s.name} (${s.price})`).join(' + ');
  el.innerHTML = `
    <strong>${servicesText}</strong><br>
    ${state.date ? state.date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }) : ''}
    at ${state.timeSlot || ''}
    ${state.addons.length ? `<br>+ ${state.addons.join(', ')}` : ''}
  `;
}

document.getElementById('nextStep3').addEventListener('click', () => {
  const name = document.getElementById('clientName').value.trim();
  const handle = document.getElementById('contactHandle').value.trim();

  if (!name) {
    document.getElementById('clientName').focus();
    return;
  }
  if (!handle) {
    document.getElementById('contactHandle').focus();
    return;
  }

  state.name = name;
  state.contactHandle = handle;
  state.notes = document.getElementById('clientNotes').value.trim();
  state.email = document.getElementById('clientEmail').value.trim();
  state.contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;

  goStep(4);
});

// ── STEP 4: REVIEW ───────────────────────────────
function renderReview() {
  const el = document.getElementById('bookingReview');
  const contactLabel = { instagram: 'Instagram', kakaotalk: 'KakaoTalk', phone: 'Phone' };

  let addonsHTML = '';
  if (state.addons.length) {
    addonsHTML = `<div class="review-row">
      <span class="review-label">Add-ons</span>
      <span class="review-val">${state.addons.join('<br>')}</span>
    </div>`;
  }

  let notesHTML = '';
  if (state.notes) {
    notesHTML = `<div class="review-row">
      <span class="review-label">Notes</span>
      <span class="review-val">${state.notes}</span>
    </div>`;
  }

  const services = (state.services?.length ? state.services : [state.service]).filter(Boolean);
  const servicesHTML = services.map((s, i) => `
    <div class="review-row">
      <span class="review-label">${i === 0 ? 'Service' : '+'}</span>
      <span class="review-val gold">${s.name} — ${s.price}</span>
    </div>
  `).join('');

  el.innerHTML = `
    ${servicesHTML}
    ${addonsHTML}
    <div class="review-row">
      <span class="review-label">Date</span>
      <span class="review-val">${state.date?.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
    </div>
    <div class="review-row">
      <span class="review-label">Time</span>
      <span class="review-val">${state.timeSlot}</span>
    </div>
    <div class="review-row">
      <span class="review-label">Name</span>
      <span class="review-val">${state.name}</span>
    </div>
    <div class="review-row">
      <span class="review-label">${contactLabel[state.contactMethod]}</span>
      <span class="review-val">${state.contactHandle}</span>
    </div>
    ${notesHTML}
  `;
}

// ── STEP 4 → SUBMIT ──────────────────────────────
document.getElementById('confirmBtn').addEventListener('click', submitBooking);

async function submitBooking() {
  const btn = document.getElementById('confirmBtn');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const dateKey = formatDateKey(state.date);

  // ── Check for duplicate booking before saving ──
  if (window._db) {
    try {
      const existing = await window._db.collection('bookings')
        .where('date', '==', dateKey)
        .where('time', '==', state.timeSlot)
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

      if (!existing.empty) {
        btn.disabled = false;
        btn.textContent = 'Confirm Booking ✓';
        alert('Sorry, this time slot was just booked by someone else. Please go back and choose another time.');
        goStep(2);
        return;
      }
    } catch (e) {
      console.warn('Duplicate check failed:', e);
    }
  }

  const allServices = (state.services?.length ? state.services : [state.service]).filter(Boolean);
  const booking = {
    service: allServices.map(s => s.name).join(' + '),
    price: allServices.map(s => s.price).join(' + '),
    addons: state.addons,
    date: dateKey,
    time: state.timeSlot,
    name: state.name,
    contactMethod: state.contactMethod,
    contactHandle: state.contactHandle,
    notes: state.notes,
    email: state.email,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  let bookingId = null;

  // 1. Save to Firestore
  if (window._db) {
    try {
      const ref = await window._db.collection('bookings').add(booking);
      bookingId = ref.id;
    } catch (e) {
      console.warn('Firestore write failed:', e);
    }
  }

  // 2. Send email to owner with confirm/decline links
  if (window._EMAILJS_SERVICE_ID && window._EMAILJS_TEMPLATE_ID &&
      window._EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    try {
      const baseUrl = window.location.origin + window.location.pathname.replace('index.html','');
      const confirmLink = bookingId
        ? `${baseUrl}action.html?id=${bookingId}&action=confirm`
        : `${baseUrl}admin.html`;
      const declineLink = bookingId
        ? `${baseUrl}action.html?id=${bookingId}&action=decline`
        : `${baseUrl}admin.html`;

      await emailjs.send(window._EMAILJS_SERVICE_ID, window._EMAILJS_TEMPLATE_ID, {
        to_name:      'nailpalette.syd',
        client_name:  state.name,
        service:      booking.service,
        date:         state.date?.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        time:         state.timeSlot,
        contact:      `${state.contactMethod}: ${state.contactHandle}`,
        notes:        state.notes || 'None',
        addons:       state.addons.join(', ') || 'None',
        confirm_link: confirmLink,
        decline_link: declineLink
      });
    } catch (e) {
      console.warn('EmailJS send failed:', e);
    }
  }

  showSuccess(booking);
}

function showSuccess(booking) {
  const detail = document.getElementById('successDetail');
  detail.innerHTML = `
    <strong>${booking.service}</strong><br>
    ${state.date?.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })} at ${booking.time}
    ${booking.addons.length ? `<br>+ ${booking.addons.join(', ')}` : ''}
    <br>Total: ${booking.price}
    <br><br>
    <em style="font-size:12px;color:#9A8F94">We'll reach you via ${booking.contactMethod}: ${booking.contactHandle}</em>
  `;
  goStep(5);
}

// ── HELPERS ──────────────────────────────────────
function formatDateKey(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ── FIREBASE INIT ────────────────────────────────
// firebase-config.js runs first and sets window.firebaseConfig
// This runs after DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();

  if (window.firebaseConfig && window.firebaseConfig.apiKey && window.firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    try {
      if (!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
      window._db = firebase.firestore();
      console.log('✓ Firebase connected');
    } catch (e) {
      console.warn('Firebase init failed:', e);
    }
  } else {
    console.info('ℹ Firebase not configured yet — running in demo mode');
  }
});
