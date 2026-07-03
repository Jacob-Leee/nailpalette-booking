/* ══════════════════════════════════════════════
   nailpalette.syd — Booking App Styles
   Theme: Sage Bloom
   Palette: Beige #F5F4EF · Surface #EDECEA · Sage #7A8C5E · Dark #2E3028
   ══════════════════════════════════════════════ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #F5F4EF;
  --surface:  #EDECEA;
  --surface2: #E5E4DE;
  --sage:     #7A8C5E;
  --sage-lt:  #B5C49A;
  --dark:     #2E3028;
  --mid:      #5E5F52;
  --light:    #9A9B8A;
  --border:   rgba(122,140,94,0.22);
}

html { font-size: 16px; }

body {
  font-family: 'Raleway', sans-serif;
  background:
    radial-gradient(ellipse 70% 55% at 105% 0%, rgba(181,196,154,0.30) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at -5% 105%, rgba(210,205,182,0.40) 0%, transparent 60%),
    var(--bg);
  background-attachment: fixed;
  min-height: 100vh;
  color: var(--dark);
  -webkit-font-smoothing: antialiased;
}

/* ── HEADER ── */
.site-header {
  background: rgba(245,244,239,0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 0.5px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px 20px;
}

.header-inner { text-align: center; }

.brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 3px;
  color: var(--dark);
}
.brand em { color: var(--sage); font-style: italic; }
.brand span { color: var(--sage); font-size: 20px; }

.brand-sub {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--light);
  margin-top: 2px;
}

/* ── PROGRESS BAR ── */
.progress-wrap {
  height: 2px;
  background: rgba(122,140,94,0.12);
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--sage-lt), var(--sage));
  transition: width 0.4s ease;
  width: 25%;
}

.step-labels {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px 0;
}
.step-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--light);
  padding: 4px 10px;
  border-radius: 20px;
  transition: all 0.3s;
}
.step-label.active {
  color: var(--sage);
  background: rgba(122,140,94,0.10);
}

/* ── MAIN ── */
.main-wrap {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

/* ── STEPS ── */
.step {
  display: none;
  padding-top: 24px;
  animation: fadeIn 0.35s ease;
}
.step.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 1px;
  color: var(--dark);
  margin-bottom: 20px;
}

/* ── SERVICE CARDS ── */
.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}

.service-card {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  background: rgba(237,236,234,0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(181,196,154,0.18), rgba(210,205,182,0.14));
  opacity: 0;
  transition: opacity 0.2s;
}

.service-card:hover::before { opacity: 1; }

.service-card.selected {
  border-color: var(--sage);
  background: rgba(239,241,233,0.95);
  box-shadow: 0 0 0 1px rgba(122,140,94,0.28), 0 4px 16px rgba(122,140,94,0.10);
}
.service-card.selected::before { opacity: 1; }

.service-card.featured {
  grid-column: span 2;
}

.service-check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: transparent;
  transition: all 0.2s;
}
.service-card.selected .service-check {
  background: var(--sage);
  border-color: var(--sage);
  color: white;
}

.service-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 17px;
  font-weight: 500;
  color: var(--dark);
  margin-bottom: 4px;
  margin-right: 24px;
}

.service-desc {
  font-size: 11px;
  color: var(--light);
  line-height: 1.4;
  margin-bottom: 10px;
}

.service-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.service-price {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20px;
  font-weight: 500;
  color: var(--sage);
}

.service-duration {
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--light);
}

/* ── ADD-ONS ── */
.addon-section {
  margin-bottom: 20px;
}

.addon-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--light);
  margin-bottom: 10px;
}

.addon-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.addon-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 0.5px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 15px;
  color: var(--dark);
  transition: background 0.2s;
  background: rgba(237,236,234,0.5);
}
.addon-item:hover { background: rgba(122,140,94,0.06); }
.addon-item input[type="checkbox"] { accent-color: var(--sage); width: 15px; height: 15px; flex-shrink: 0; }
.addon-item span { margin-left: auto; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 15px; color: var(--sage); font-weight: 500; }

/* ── STEP NOTE ── */
.step-note {
  font-size: 11px;
  color: var(--light);
  text-align: center;
  margin-bottom: 16px;
}

/* ── BUTTONS ── */
.btn-next, .btn-confirm {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 50px;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
  background: linear-gradient(135deg, var(--sage), #5e6e46);
  color: white;
}
.btn-next:disabled {
  background: rgba(122,140,94,0.18);
  color: var(--light);
  cursor: not-allowed;
}
.btn-next:not(:disabled):hover {
  background: linear-gradient(135deg, #8fa06d, var(--sage));
  box-shadow: 0 6px 20px rgba(122,140,94,0.30);
  transform: translateY(-1px);
}
.btn-confirm {
  background: linear-gradient(135deg, var(--dark), #3d3f35);
  letter-spacing: 1.5px;
}
.btn-confirm:hover {
  box-shadow: 0 6px 20px rgba(46,48,40,0.28);
  transform: translateY(-1px);
}
.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-back {
  background: none;
  border: 0.5px solid var(--border);
  border-radius: 50px;
  padding: 12px 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--mid);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-back:hover {
  background: rgba(122,140,94,0.06);
  border-color: rgba(122,140,94,0.45);
}

.step-nav {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}
.step-nav .btn-next, .step-nav .btn-confirm { flex: 1; }

/* ── CALENDAR ── */
.calendar-wrap {
  background: rgba(237,236,234,0.8);
  border: 0.5px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 20px;
}

.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.cal-month {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--dark);
  letter-spacing: 1px;
}

.cal-nav {
  background: none;
  border: 0.5px solid var(--border);
  border-radius: 50%;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; line-height: 1;
  color: var(--mid);
  cursor: pointer;
  transition: all 0.2s;
}
.cal-nav:hover {
  border-color: var(--sage);
  color: var(--sage);
}

.cal-days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
}
.cal-days-header span {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--light);
  padding: 4px 0;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.cal-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 400;
  color: var(--dark);
  cursor: default;
  transition: all 0.18s;
  position: relative;
}
.cal-day.available {
  cursor: pointer;
  font-weight: 500;
}
.cal-day.available::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--sage);
  opacity: 0.6;
}
.cal-day.available:hover {
  background: rgba(122,140,94,0.12);
  color: var(--sage);
}
.cal-day.selected {
  background: var(--sage) !important;
  color: white !important;
  font-weight: 600;
}
.cal-day.selected::after { display: none; }
.cal-day.past, .cal-day.unavailable {
  color: rgba(46,48,40,0.22);
  cursor: not-allowed;
}
.cal-day.today {
  font-weight: 700;
  color: var(--sage);
}
.cal-day.empty { cursor: default; }

/* ── TIME SLOTS ── */
.time-slots-wrap {
  margin-bottom: 16px;
}
.time-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--mid);
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}
.time-label strong { color: var(--dark); }

.time-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.time-slot {
  padding: 9px 16px;
  border: 0.5px solid var(--border);
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  color: var(--dark);
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(237,236,234,0.8);
}
.time-slot:hover {
  border-color: var(--sage);
  background: rgba(122,140,94,0.06);
}
.time-slot.selected {
  background: var(--sage);
  border-color: var(--sage);
  color: white;
}
.time-slot.booked {
  color: var(--light);
  border-color: rgba(122,140,94,0.10);
  cursor: not-allowed;
  text-decoration: line-through;
  opacity: 0.5;
}

.loading-slots, .no-slots {
  text-align: center;
  padding: 20px;
  color: var(--light);
  font-size: 13px;
  font-style: italic;
}

.loader {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(122,140,94,0.2);
  border-top-color: var(--sage);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
  margin-right: 6px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── STEP 3: DETAILS FORM ── */
.booking-summary-mini {
  background: rgba(122,140,94,0.08);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--mid);
  margin-bottom: 20px;
  line-height: 1.6;
}

.details-form {}

.field-group {
  margin-bottom: 16px;
}

.field-group label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--light);
  margin-bottom: 7px;
}

.field-group input[type="text"],
.field-group input[type="email"],
.field-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 0.5px solid var(--border);
  border-radius: 12px;
  background: rgba(237,236,234,0.8);
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  color: var(--dark);
  outline: none;
  transition: border-color 0.2s;
  -webkit-appearance: none;
}
.field-group input:focus,
.field-group textarea:focus {
  border-color: rgba(122,140,94,0.55);
  background: var(--bg);
  box-shadow: 0 0 0 3px rgba(122,140,94,0.08);
}
.field-group textarea { resize: vertical; min-height: 80px; line-height: 1.5; }

.radio-group {
  display: flex;
  gap: 8px;
}
.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border: 0.5px solid var(--border);
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  color: var(--mid);
  transition: all 0.2s;
  background: rgba(237,236,234,0.7);
}
.radio-item:has(input:checked) {
  border-color: var(--sage);
  background: rgba(122,140,94,0.08);
  color: var(--dark);
}
.radio-item input[type="radio"] { accent-color: var(--sage); }

/* ── STEP 4: REVIEW ── */
.booking-review {
  background: rgba(237,236,234,0.9);
  border: 0.5px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
}

.review-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 0.5px solid rgba(122,140,94,0.10);
}
.review-row:last-child { border-bottom: none; padding-bottom: 0; }
.review-row:first-child { padding-top: 0; }

.review-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--light);
  min-width: 80px;
}
.review-val {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 17px;
  color: var(--dark);
  text-align: right;
}
.review-val.gold {
  color: var(--sage);
  font-weight: 500;
}

.policy-box {
  background: rgba(181,196,154,0.12);
  border: 0.5px solid rgba(122,140,94,0.18);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 4px;
}
.policy-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 8px;
}
.policy-text {
  font-size: 12px;
  line-height: 1.8;
  color: var(--mid);
}

/* ── STEP 5: SUCCESS ── */
.success-wrap {
  text-align: center;
  padding: 30px 0;
}
.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.success-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 30px;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 12px;
  letter-spacing: 1px;
}
.success-msg {
  font-size: 14px;
  color: var(--mid);
  line-height: 1.6;
  margin-bottom: 16px;
}
.success-detail {
  background: rgba(122,140,94,0.08);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 13px;
  color: var(--dark);
  line-height: 1.7;
  margin-bottom: 16px;
  text-align: left;
}
.success-note {
  font-size: 12px;
  color: var(--light);
  font-style: italic;
  margin-bottom: 20px;
}
.success-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: var(--mid);
}
.success-contact a {
  color: var(--sage);
  text-decoration: none;
}

/* ── FOOTER ── */
.site-footer {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(245,244,239,0.95);
  backdrop-filter: blur(10px);
  border-top: 0.5px solid var(--border);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--light);
}
.site-footer a {
  color: var(--light);
  text-decoration: none;
  font-size: 10px;
  letter-spacing: 1px;
}
.site-footer a:hover { color: var(--sage); }

/* ── RESPONSIVE ── */
@media (max-width: 360px) {
  .service-grid { grid-template-columns: 1fr; }
  .service-card.featured { grid-column: auto; }
  .radio-group { flex-wrap: wrap; }
}
