/* Shared WhatsApp RSVP behavior for Vedant & Deepa */
window.initWeddingRSVP = (form, config, names) => {
  const rawNumber = String(config.whatsapp || config.phone || '+919403420295').trim();
  const cleanNumber = rawNumber.replace(/\D/g, '') || '919403420295';
  const displayPhone = config.whatsappDisplay || (rawNumber.startsWith('+') ? rawNumber : '+' + rawNumber);

  form.innerHTML = `
    <div class="rsvp-wa-badge">
      <svg class="wa-badge-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.13-1.47-.73-1.7-.82-.23-.09-.39-.13-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.07-.25-.13-1.04-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43-.15 0-.31 0-.48 0-.17 0-.44.06-.66.31-.23.24-.85.82-.85 2.01s.87 2.32.99 2.48c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.17.21-.57.21-1.06.15-1.17-.06-.1-.22-.16-.47-.29z"/>
      </svg>
      <span>WhatsApp RSVP: <strong>${displayPhone}</strong></span>
    </div>

    <label for="rsvp-name">Your Full Name</label>
    <input id="rsvp-name" name="guestName" autocomplete="name" maxlength="120" placeholder="First and last name" required>

    <label for="rsvp-attendance">Will you be joining us?</label>
    <select id="rsvp-attendance" name="attendance" required>
      <option value="">Please select your response</option>
      <option value="yes">Joyfully accepts</option>
      <option value="no">Regretfully declines</option>
    </select>

    <div id="rsvp-party" hidden>
      <label for="rsvp-count">Number of guests attending</label>
      <input id="rsvp-count" name="guestCount" type="number" min="1" max="50" step="1" value="1" disabled aria-describedby="rsvp-count-help">
      <small id="rsvp-count-help">Including yourself</small>
    </div>

    <label for="rsvp-wishes">Wishes or note for the couple (Optional)</label>
    <textarea id="rsvp-wishes" name="wishes" rows="2" maxlength="300" placeholder="Heartfelt blessings or message..."></textarea>

    <button type="submit" class="action rsvp-link rsvp-wa-btn">
      <svg class="wa-btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.13-1.47-.73-1.7-.82-.23-.09-.39-.13-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.07-.25-.13-1.04-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43-.15 0-.31 0-.48 0-.17 0-.44.06-.66.31-.23.24-.85.82-.85 2.01s.87 2.32.99 2.48c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.17.21-.57.21-1.06.15-1.17-.06-.1-.22-.16-.47-.29z"/>
      </svg>
      <span>Send RSVP on WhatsApp</span>
    </button>

    <div class="rsvp-direct-wa">
      <a href="https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent('Hello Vedant & Deepa, I would like to RSVP for your wedding celebrations.')}" target="_blank" rel="noopener noreferrer" class="rsvp-wa-direct-link">
        Direct WhatsApp: ${displayPhone}
      </a>
    </div>

    <p class="rsvp-help" role="status">Tap the button above to send your RSVP via WhatsApp to ${displayPhone}.</p>
  `;

  const name = form.querySelector('#rsvp-name');
  const attendance = form.querySelector('#rsvp-attendance');
  const count = form.querySelector('#rsvp-count');
  const party = form.querySelector('#rsvp-party');
  const wishes = form.querySelector('#rsvp-wishes');
  const help = form.querySelector('.rsvp-help');

  const sync = () => {
    const attending = attendance.value === 'yes';
    party.hidden = !attending;
    count.disabled = !attending;
    count.required = attending;
  };

  attendance.addEventListener('change', sync);
  name.addEventListener('input', () => name.setCustomValidity(''));
  sync();

  form.addEventListener('submit', event => {
    event.preventDefault();
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your full name.');
    if (!form.reportValidity()) return;

    const attending = attendance.value === 'yes';
    const guestName = name.value.trim();
    const guestCount = attending ? count.value : '0';
    const personalWishes = (wishes.value || '').trim();

    const lines = [
      `🌸 *Wedding RSVP — ${names}* 🌸`,
      ``,
      `*Guest Name:* ${guestName}`,
      `*Response:* ${attending ? 'Joyfully accepts' : 'Regretfully declines'}`
    ];
    if (attending) {
      lines.push(`*Number of Guests:* ${guestCount}`);
    }
    if (personalWishes) {
      lines.push(`*Wishes:* ${personalWishes}`);
    }
    lines.push(``);
    lines.push(attending ? `Looking forward to celebrating with you!` : `Sending our warmest love and blessings to the couple!`);

    const waText = lines.join('\n');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    help.textContent = `Opening WhatsApp with your reply for ${names}... Please tap "Send" in WhatsApp to confirm!`;
  });
};
