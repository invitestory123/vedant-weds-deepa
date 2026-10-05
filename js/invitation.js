(() => {
  'use strict';
  const data = window.WEDDING_DATA;
  const theme = window.INVITATION_THEMES[data.theme] || window.INVITATION_THEMES['petrol-dahlia'];
  const root = document.documentElement;
  ['paper','ink','accent'].forEach(key => root.style.setProperty(`--${key}`, theme[key]));
  const asset = name => `./assets/${name}`;
  root.style.setProperty('--botanical', `url("${asset('botanical.jpg')}")`);
  root.style.setProperty('--timeline-flower', 'url("./assets/timeline-flower.png")');
  document.body.classList.add(`theme-${data.theme}`, 'locked');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => { try { const u = new URL(value, location.href); return ['http:','https:','file:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const text = escape;
  const date = new Date(data.wedding.dateISO);
  const validDate = !Number.isNaN(date.getTime());
  document.title = `${data.couple.first} & ${data.couple.second} | Wedding Invitation`;
  
  document.querySelector('#app').innerHTML = `
    <div class="entrance" id="entrance">
      <img class="envelope" src="${data.media.openingPoster ? text(safeURL(data.media.openingPoster)) : asset('envelope-first.jpg')}" alt="${text(theme.name)} floral embossed envelope with a wax seal" fetchpriority="high">
      <img class="envelope envelope-end" id="envelope-end" data-src="${asset('envelope-last.jpg')}" alt="" hidden>
      <button class="open-invitation" id="open" aria-label="Open the wedding invitation">
        <span class="open-caption">
          Open your invitation
          <small class="open-names">${text(data.couple.first)} &amp; ${text(data.couple.second)}</small>
          <small class="open-date">2nd &amp; 3rd Dec 2026</small>
        </span>
      </button>
      <video class="opening-video" id="opening-video" muted playsinline preload="none" hidden></video>
      <button class="skip-opening" id="skip" hidden>Skip opening</button>
    </div>
    <main class="invitation" id="invitation" inert>
      <section class="hero" aria-label="Wedding invitation">
        <img class="hero-art" src="${data.media.heroPoster ? text(safeURL(data.media.heroPoster)) : asset('hero-first.jpg')}" alt="${text(theme.scene)}" decoding="async">
        <video class="hero-video" id="hero-video" muted loop playsinline preload="none" hidden></video>
        <div class="hero-copy">
          <p class="occasion">Wedding Celebration</p>
          <p class="date">${text(data.wedding.dateLabel)}</p>
          <h1 class="names" id="names" tabindex="-1"><span>${text(data.couple.first)}</span><i>&amp;</i><span>${text(data.couple.second)}</span></h1>
          <p class="hero-note">${text(data.couple.heroNote)}</p>
          <a class="hero-scroll-btn" href="#our-invitation" aria-label="Scroll down to invitation">
            <span class="scroll-arrow" aria-hidden="true">&#x2193;</span>
            <span class="scroll-text">SCROLL DOWN</span>
            <span class="scroll-arrow" aria-hidden="true">&#x2193;</span>
          </a>
        </div>
      </section>

      <section class="paper-section floral intro" id="our-invitation" aria-label="Our invitation">
        <div class="ganesh-block reveal">
          <img class="ganesh-pic" src="${asset('ganesha.png')}" alt="Lord Ganesha" width="80" height="80">
          <p class="ganesh-shloka">॥ श्री गणेशाय नमः ॥</p>
          <p class="ganesh-name">Shree Ganeshay Namah</p>
        </div>

        <h2 class="script reveal">${text(data.couple.subtitle)}</h2>
        <div class="rule" aria-hidden="true"></div>

        <div class="family-tribute reveal">
          <div class="family-side">
            <span class="role-badge">Groom</span>
            <h3 class="person-title">${text(data.couple.first)}</h3>
            <p class="relation-text">Son of</p>
            <p class="parents-line"><strong>Dr. Rajesh Chhabria</strong><br>&amp; <strong>Dr. Sneha Chhabria</strong></p>
          </div>
          <div class="family-knot-center" aria-hidden="true">
            <span class="knot-motif">❦</span>
            <span class="knot-word">weds</span>
            <span class="knot-motif">❦</span>
          </div>
          <div class="family-side">
            <span class="role-badge">Bride</span>
            <h3 class="person-title">${text(data.couple.second)}</h3>
            <p class="relation-text">Daughter of</p>
            <p class="parents-line"><strong>Mr. Hasanand Balwani</strong><br>&amp; <strong>Mrs. Sunita Balwani</strong></p>
          </div>
        </div>

        <div class="rule" aria-hidden="true"></div>
        <p class="reveal salutation-text">${text(data.wedding.salutation)}</p>
        <p class="invitation-note reveal">${text(data.wedding.invitationNote)}</p>
      </section>

      <section class="paper-section countdown-section torn" aria-labelledby="countdown-title">
        <h2 class="script" id="countdown-title">Until the celebrations begin</h2>
        <div class="countdown" id="countdown" role="timer" aria-label="Time until the wedding">
          <div><strong data-count="days">00</strong><span>Days</span></div>
          <div><strong data-count="hours">00</strong><span>Hours</span></div>
          <div><strong data-count="minutes">00</strong><span>Minutes</span></div>
          <div><strong data-count="seconds">00</strong><span>Seconds</span></div>
        </div>
        <p class="countdown-note" id="countdown-note"><strong>2nd &amp; 3rd Dec 2026</strong></p>
      </section>

      <section class="paper-section floral schedule-section" aria-labelledby="schedule-title">
        <h2 class="script reveal" id="schedule-title">Wedding Itinerary</h2>
        <div class="rule" aria-hidden="true"></div>
        <p class="schedule-intro reveal">Join us across two glorious days of celebration and love</p>
        <div class="festivities-grid">
          ${(data.events || []).map(event => `
            <article class="festivity-card reveal">
              <div class="festivity-top">
                <span class="festivity-date">${text(event.date)}</span>
              </div>
              <h3 class="festivity-title">${text(event.title)}</h3>
              <p class="festivity-theme">“${text(event.theme)}”</p>
              <div class="festivity-details">
                <div class="detail-pill">
                  <svg class="pill-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <span>${text(event.time)}</span>
                </div>
                <div class="detail-pill">
                  <svg class="pill-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  <span>${text(event.venue)}</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
        <p class="schedule-note reveal">${data.wedding.scheduleNote}</p>
      </section>

      <section class="paper-section torn couple-gallery" aria-labelledby="couple-gallery-title">
        <h2 class="script reveal" id="couple-gallery-title">Vedant &amp; Deepa</h2>
        <div class="rule" aria-hidden="true"></div>
        <p class="gallery-quote reveal">“Two souls, one sacred journey of love and laughter.”</p>
        <div class="couple-portraits single-portrait reveal">
          <div class="portrait-card royal-portrait">
            <div class="portrait-frame">
              <img src="${asset('couple-royal.jpg')}" alt="Vedant and Deepa" class="portrait-image" loading="lazy">
            </div>
            <p class="portrait-label">A Royal Union</p>
          </div>
        </div>
      </section>

      <section class="paper-section venue-section torn" aria-labelledby="venue-title">
        <h2 class="script reveal" id="venue-title">Where we celebrate</h2>
        <img class="venue-scene reveal" src="${asset('hero-first.jpg')}" alt="Regenta Convention Centre Nagpur" loading="lazy">
        <p class="venue-caption">${text(data.venue.sceneCaption)}</p>
        <div class="location-frame reveal">
          <h3 class="venue-name"><strong>Regenta Convention Centre Nagpur</strong></h3>
          <div class="rule" aria-hidden="true"></div>
          <p class="venue-date-highlight"><strong>2nd &amp; 3rd Dec 2026</strong></p>
          <div class="actions">
            <a class="action" id="maps" target="_blank" rel="noopener noreferrer">Open in maps</a>
            <button class="action secondary" id="calendar">Add to calendar</button>
          </div>
        </div>
      </section>

      <section class="paper-section floral etiquette" aria-label="Guest details">
        <article class="reveal">
          <h2 class="script">Dress code</h2>
          <p>${text(data.details.dressCode)}</p>
        </article>
        <div class="rule" aria-hidden="true"></div>
        <article class="reveal">
          <h2 class="script">Your presence, our present</h2>
          <p>${text(data.details.giftPreference)}</p>
        </article>
      </section>

      <section class="paper-section floral rsvp-section" id="rsvp-section" aria-labelledby="rsvp-title">
        <div class="rsvp-card reveal">
          <span class="rsvp-kicker">Kindly reply</span>
          <div class="rsvp-wa-icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="42" height="42" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.13-1.47-.73-1.7-.82-.23-.09-.39-.13-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.07-.25-.13-1.04-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43-.15 0-.31 0-.48 0-.17 0-.44.06-.66.31-.23.24-.85.82-.85 2.01s.87 2.32.99 2.48c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.17.21-.57.21-1.06.15-1.17-.06-.1-.22-.16-.47-.29z"/>
            </svg>
          </div>
          <h2 class="script" id="rsvp-title">${text(data.rsvp?.heading || 'Celebrate With Us')}</h2>
          <p>${text(data.rsvp?.note || 'Your presence will make our celebration complete.')}</p>
          <p class="rsvp-deadline">Kindly RSVP via WhatsApp by 20th November 2026</p>
          <form class="rsvp-form" id="rsvp-form"></form>
        </div>
      </section>

      <footer class="closing" aria-labelledby="closing-title">
        <div class="closing-scene">
          <img class="closing-art" src="${asset('couple-2.jpg')}" alt="Vedant and Deepa" width="720" height="1280" loading="lazy" decoding="async">
          <div class="closing-copy reveal">
            <p class="closing-eyebrow">The beginning of our forever</p>
            <h2 class="closing-title" id="closing-title">With all<br><em>our love</em></h2>
            <div class="closing-rule" aria-hidden="true"></div>
            <p class="closing-names"><span>${text(data.couple.first)}</span><i>&amp;</i><span>${text(data.couple.second)}</span></p>
            <p class="closing-date">${text(data.wedding.dateLabel)}</p>
            <p class="closing-note">The days will be memorable.<br>Even more so with your blessings.</p>
            <a class="closing-rsvp" href="#rsvp-section">RSVP via WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
          <p class="closing-caption">Vedant &amp; Deepa · Regenta Convention Centre Nagpur</p>
        </div>
        <div class="closing-colophon">
          <button class="reopen" id="reopen">Open the envelope again <span aria-hidden="true">↺</span></button>
          <a class="dearly-signature" href="#" aria-label="Vedant weds Deepa">Vedant &amp; Deepa<small>2nd &amp; 3rd Dec 2026</small></a>
          ${data.media.music && data.media.musicTitle ? `<p class="music-credit">Music: <a href="${text(safeURL(data.media.musicSource))}" target="_blank" rel="noopener noreferrer">${text(data.media.musicTitle)}</a><br>Kevin MacLeod · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a><br><small>Volume adjusted · soft fade-in</small></p>` : ''}
        </div>
      </footer>
    </main>
    <div class="media-controls" id="media-controls" hidden>
      <button class="media-button" id="motion" aria-pressed="false" hidden>Pause motion</button>
      <button class="media-button" id="music" aria-pressed="false" hidden>Play music</button>
    </div>
    <audio id="audio" loop preload="none"></audio>
    <p id="status" class="status" role="status" hidden></p>`;

  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = $('hero-video'), opening = $('opening-video'), audio = $('audio');
  let musicAttempted = false;
  let opened = false, openingTimer, fadeTimer, statusTimer, observersStarted = false;
  let motionPaused = reduced.matches;
  const ambience = window.initInvitationMotion({theme:data.theme,reduced});

  function syncMotion() {
    const stopped = motionPaused || reduced.matches;
    ambience.setPaused(stopped || !opened);
    $('motion').hidden=false;
    $('motion').disabled=reduced.matches;
    $('motion').textContent=reduced.matches ? 'Reduced motion' : (motionPaused ? 'Play motion' : 'Pause motion');
    $('motion').setAttribute('aria-pressed',String(stopped));
    hero.hidden=stopped || !source('heroVideo');
    if(stopped || !opened) hero.pause();
    else if(source('heroVideo')) hero.play().catch(()=>{hero.hidden=true;});
  }

  const notify = message => { $('status').textContent = message; $('status').hidden=false; clearTimeout(statusTimer); statusTimer=setTimeout(()=>$('status').hidden=true,4500); };
  const source = name => data.media[name] ? safeURL(data.media[name]) : '';
  if (source('openingVideo')) { opening.src=source('openingVideo'); opening.poster=source('openingPoster') || asset('envelope-first.jpg'); opening.preload='auto'; }
  if (source('heroVideo')) { hero.src=source('heroVideo'); hero.poster=source('heroPoster') || asset('hero-first.jpg'); }
  if (source('music')) { audio.src=source('music'); audio.volume=.45; }
  audio.addEventListener('error',()=>{ $('music').textContent='Play music'; $('music').setAttribute('aria-pressed','false'); if(opened) notify('Music could not be loaded. You can still enjoy the invitation.'); });
  const mapsURL = data.venue.mapsUrl ? safeURL(data.venue.mapsUrl) : '';
  $('maps').hidden = !mapsURL && !data.venue.address.trim();
  $('maps').href=mapsURL || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue.name+' '+data.venue.address)}`;

  window.initWeddingRSVP($('rsvp-form'), data.rsvp || {}, `${data.couple.first} & ${data.couple.second}`);

  function beginObservers() {
    if(observersStarted || !('IntersectionObserver' in window)) return;
    observersStarted=true;
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches && !motionPaused) entry.target.classList.add('arriving');reveal.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
    const timeline=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.festivity-card').forEach(el=>el.classList.remove('is-current'));entry.target.classList.add('is-current');}}),{rootMargin:'-30% 0px -45% 0px'});
    document.querySelectorAll('.festivity-card').forEach(el=>timeline.observe(el));
  }

  function finishOpening() {
    if($('entrance').classList.contains('leaving') || $('entrance').hidden)return;
    clearTimeout(openingTimer);
    $('entrance').classList.add('leaving');
    $('invitation').inert=false;
    document.body.classList.remove('locked');
    $('media-controls').hidden=false;
    syncMotion();
    $('music').hidden=!source('music');
    beginObservers();
    $('names').focus({preventScroll:true});
    fadeTimer=setTimeout(()=>{$('entrance').hidden=true;opening.pause();},reduced.matches?0:900);
  }

  async function openInvitation() {
    if(opened)return;opened=true;$('open').disabled=true;
    if(source('heroVideo') && !reduced.matches) { hero.preload='auto'; hero.load(); }
    if(source('music')) {
      $('media-controls').hidden=false; $('music').hidden=false;
      if(!musicAttempted) { musicAttempted=true; audio.play().then(()=>{ $('music').textContent='Pause music'; $('music').setAttribute('aria-pressed','true'); }).catch(()=>{}); }
    }
    if(source('openingVideo') && !reduced.matches){
      $('skip').hidden=false;$('skip').focus();opening.hidden=false;
      openingTimer=setTimeout(finishOpening,20000);
      try{await opening.play();}catch{finishOpening();}
    }else if(reduced.matches){finishOpening();}
    else{const end=$('envelope-end');end.src=end.dataset.src;end.hidden=false;$('entrance').classList.add('opening');openingTimer=setTimeout(finishOpening,1800);}
  }

  $('open').addEventListener('click',openInvitation);
  $('skip').addEventListener('click',finishOpening);
  opening.addEventListener('ended',finishOpening);
  opening.addEventListener('error',()=>{if(opened)finishOpening();});
  opening.addEventListener('timeupdate',()=>{if(Number.isFinite(opening.duration)&&opening.currentTime>=opening.duration-.8)finishOpening();});
  hero.addEventListener('error',()=>{hero.hidden=true;});
  $('reopen').addEventListener('click',()=>{clearTimeout(fadeTimer);clearTimeout(openingTimer);window.scrollTo({top:0,behavior:'instant'});opened=false;ambience.setPaused(true);opening.pause();opening.currentTime=0;opening.hidden=true;hero.pause();hero.currentTime=0;$('entrance').hidden=false;$('entrance').classList.remove('leaving','opening');$('open').disabled=false;$('skip').hidden=true;$('invitation').inert=true;$('media-controls').hidden=true;document.body.classList.add('locked');$('open').focus();});
  $('music').addEventListener('click',async()=>{if(audio.paused){try{await audio.play();$('music').textContent='Pause music';$('music').setAttribute('aria-pressed','true');}catch{notify('Music could not be played. Please try again.');}}else{audio.pause();$('music').textContent='Play music';$('music').setAttribute('aria-pressed','false');}});
  $('motion').addEventListener('click',()=>{if(reduced.matches)return;motionPaused=!motionPaused;syncMotion();});
  reduced.addEventListener('change',event=>{motionPaused=event.matches;if(event.matches && opened)finishOpening();syncMotion();});

  function tick(){
    if(!validDate){$('countdown').hidden=true;$('countdown-note').textContent=data.wedding.longDate;return;}
    const remaining=Math.max(0,date.getTime()-Date.now()), seconds=Math.floor(remaining/1000);
    const values={days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
    for(const [key,value] of Object.entries(values)) {
      const el = document.querySelector(`[data-count="${key}"]`);
      if (el) el.textContent=String(value).padStart(2,'0');
    }
    if(!remaining){$('countdown-title').textContent='Our celebration has begun';$('countdown-note').textContent='Thank you for being part of our story.';}
  }
  tick();setInterval(tick,1000);

  const icsEscape=value=>String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const stamp=value=>value.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  $('calendar').disabled=!validDate;
  $('calendar').addEventListener('click',()=>{
    const configuredEnd=new Date(data.wedding.endISO);const end=Number.isFinite(configuredEnd.getTime())&&configuredEnd>date?configuredEnd:new Date(date.getTime()+36*3600000);
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Floral Invitations//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${icsEscape(data.theme)}-${date.getTime()}@floral-invitations.local`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(date)}`,`DTEND:${stamp(end)}`,`SUMMARY:${icsEscape(data.couple.first+' & '+data.couple.second+' Wedding Festivities')}`,`LOCATION:${icsEscape(data.venue.name+', '+data.venue.address)}`,`DESCRIPTION:${icsEscape(data.wedding.invitationNote)}`,'END:VEVENT','END:VCALENDAR'];
    const url=URL.createObjectURL(new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`${data.couple.first}-weds-${data.couple.second}-wedding.ics`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Your calendar invitation has been downloaded.');
  });
})();
