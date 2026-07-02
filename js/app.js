/* ══════════════════════════════════════════════
   nailpalette.syd — Booking App Logic
   ══════════════════════════════════════════════ */

// ── STATE ────────────────────────────────────────
const state = {
  step: 1,
  service: null,
  addons: [],
  date: null,
  timeSlot: null,
  name: '',
  contactMethod: 'instagram',
  contactHandle: '',
  notes: '',
  email: ''
};

const DEFAULT_SCHEDULE = {
  0: ['3:00 PM', '4:30 PM', '6:00 PM'],
  1: ['7:00 PM', '8:30 PM'],
  2: ['7:00 PM', '8:30 PM'],
  3: ['7:00 PM', '8:30 PM'],
  4: ['7:00 PM', '8:30 PM'],
  5: ['7:00 PM', '8:30 PM'],
  6: ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']
};

const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const stepLabels = document.querySelectorAll('.step-label');

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

const serviceCards = document.querySelectorAll('.service-card');
const nextStep1 = document.getElementById('nextStep1');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    serviceCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.service = {
      name: card.dataset.service,
      price: card.dataset.price,
      duration: card.dataset.duration
    };
    nextStep1.disabled = false;
  });
});

document.querySelectorAll('.addon-item input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    state.addons = Array.from(
      document.querySelectorAll('.addon-item input[type="checkbox"]:checked')
    ).map(c => c.value);
  });
});

nextStep1.addEventListener('click', () => goStep(2));

let calDate = new Date();
calDate.setDate(1);

const calMonthEl = document.getElementById('calMonth');
const calGrid = document.getElementById('calGrid');

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const today = new Date();
today.setHours(0,0,0,0);

let blockedDates = new Set();
let slotOverrides = {};

function renderCalendar() {
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  calMonthEl.textContent = `${MONTHS[month]} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  calGrid.innerHTML = '';
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
  if (window._db) {
    try {
      const overrideDoc = await window._db.collection('settings').doc('slots_' + dateKey).get();
      if (overrideDoc.exists) {
        rawSlots = overrideDoc.data().slots || [];
      }
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
  el.innerHTML = `
    <strong>${state.service?.name}</strong> — ${state.service?.price}<br>
    ${state.date ? state.date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }) : ''}
    at ${state.timeSlot || ''}
    ${state.addons.length ? `<br>+ ${state.addons.join(', ')}` : ''}
  `;
}

document.getElementById('nextStep3').addEventListener('click', () => {
  const name = document.getElementById('clientName').value.trim();
  const handle = document.getElementById('contactHandle').value.trim();
  if (!name) { document.getElementById('clientName').focus(); return; }
  if (!handle) { document.getElementById('contactHandle').focus(); return; }
  state.name = name;
  state.contactHandle = handle;
  state.notes = document.getElementById('clientNotes').value.trim();
  state.email = document.getElementById('clientEmail').value.trim();
  state.contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
