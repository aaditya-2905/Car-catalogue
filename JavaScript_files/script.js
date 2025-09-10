/* Enhanced site JS for Car Catalogue Project */
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  document.addEventListener('DOMContentLoaded', () => {
    console.log('Bimmer Beasts enhancements loaded');

    injectUtilityStyles();
    highlightActiveNav();
    enhanceExternalLinks();
    lazyLoadImages();
    lightboxImages();
    backToTop();
    smoothAnchors();
    qnaAccordion();
    counselingFormHandler();
    loginPageEnhancements();
    carsSearchAndSort();
    mobileNav();
  });

  function injectUtilityStyles(){
    const css = `
    .hidden{display:none !important;}
    .bb-backtotop{position:fixed;right:1rem;bottom:1rem;padding:.6rem .8rem;border:0;border-radius:.75rem;box-shadow:0 2px 10px rgba(0,0,0,.2);cursor:pointer;display:none;z-index:9999;background:#111;color:#fff}
    .bb-backtotop.show{display:block}
    .bb-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;z-index:9998;padding:1rem}
    .bb-lightbox.open{display:flex}
    .bb-lightbox img{max-width:90vw;max-height:85vh;display:block}
    .bb-lightbox figcaption{color:#fff;margin-top:.5rem;text-align:center;font-size:.95rem}
    .bb-toolbar{display:flex;gap:.5rem;align-items:center;margin:1rem 0}
    .bb-toolbar input[type="search"]{flex:1;max-width:480px;padding:.5rem .75rem;border:1px solid #ccc;border-radius:.6rem}
    .bb-toolbar select{padding:.45rem .5rem;border:1px solid #ccc;border-radius:.6rem}
    .bb-mobile-toggle{display:none;position:absolute;left:1rem;top:.75rem;background:transparent;border:1px solid #888;border-radius:.5rem;padding:.25rem .5rem;color:#fff}
    @media (max-width: 768px){
      header nav ul{display:none}
      header nav ul.open{display:block}
      .bb-mobile-toggle{display:block}
    }
    .qa-item{cursor:pointer}
    .qa-item.collapsed p{display:none}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function highlightActiveNav(){
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('nav a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href && file.endsWith(href.toLowerCase())) {
        a.classList.add('active');
        a.style.textDecoration = 'underline';
      }
    });
  }

  function enhanceExternalLinks(){
    $$('a[href^="http"]').forEach(a => {
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener noreferrer');
    });
  }

  function lazyLoadImages(){
    $$('img').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
      if (!img.getAttribute('alt')) img.setAttribute('alt','');
    });
  }

  function lightboxImages(){
    const container = document.createElement('figure');
    container.className = 'bb-lightbox';
    container.innerHTML = `<div><img alt=""><figcaption></figcaption></div>`;
    document.body.appendChild(container);
    const imgEl = $('img', container);
    const capEl = $('figcaption', container);

    on(container, 'click', (e)=>{
      // close when clicking backdrop
      if (e.target === container) container.classList.remove('open');
    });
    on(document, 'keydown', (e)=>{
      if (e.key === 'Escape') container.classList.remove('open');
    });

    $$('main img, section img, .models img, .service img, .bmwmodels img, .bmw3series img, .bmw5series img, .bmwe520 img, .e39 img, .i3 img, .bmwm8 img, .m5 img, .m4 img, .x5 img, .x7 img, .x1 img, .bmw2002 img, .bmwe30 img, .m1 img, .V1965 img')
      .forEach(img => {
        on(img, 'click', ()=>{
          imgEl.src = img.currentSrc || img.src;
          capEl.textContent = img.getAttribute('alt') || '';
          container.classList.add('open');
        });
      });
  }

  function backToTop(){
    const btn = document.createElement('button');
    btn.className = 'bb-backtotop';
    btn.textContent = '↑ Top';
    document.body.appendChild(btn);

    on(window, 'scroll', ()=>{
      if (window.scrollY > 300) btn.classList.add('show');
      else btn.classList.remove('show');
    });
    on(btn, 'click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
  }

  function smoothAnchors(){
    $$('a[href^="#"]').forEach(a=>{
      on(a,'click',(e)=>{
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  }

  function qnaAccordion(){
    const items = $$('.qa-item');
    if (!items.length) return;
    items.forEach(item => {
      item.classList.add('collapsed');
      on(item, 'click', (e)=>{
        // avoid toggling when clicking links inside
        if (e.target.closest('a')) return;
        item.classList.toggle('collapsed');
      });
    });
  }

  function counselingFormHandler(){
    const form = document.getElementById('consultation-form');
    const btn = form ? form.querySelector('button[type="submit"], button') : null;
    if (btn) btn.disabled = false; // ensure button stays enabled
    if (!form) return;
    const msg = document.getElementById('success-message');
    on(form, 'submit', (e)=>{
      e.preventDefault();
      const required = Array.from(form.querySelectorAll('[required]'));
      const missing = required.filter(el => !el.value.trim());
      if (missing.length){
        alert('Please fill all required fields.');
        missing[0].focus();
        return;
      }
      if (msg){ msg.style.display='block'; }
      form.reset();
    });
  }

  function loginPageEnhancements(){
    const form = document.getElementById('loginForm');
    const pwd = document.getElementById('password');
    if (!form || !pwd) return;

    // Toggle visibility
    let toggle = document.getElementById('bb-toggle-pwd');
    if (!toggle){
      toggle = document.createElement('button');
      toggle.id = 'bb-toggle-pwd';
      toggle.type = 'button';
      toggle.textContent = 'Show';
      toggle.style.marginLeft = '8px';
      const pwdWrapper = pwd.parentElement || form;
      pwdWrapper.appendChild(toggle);
    }
    on(toggle, 'click', ()=>{
      const t = pwd.getAttribute('type') === 'password' ? 'text' : 'password';
      pwd.setAttribute('type', t);
      toggle.textContent = t === 'password' ? 'Show' : 'Hide';
    });

    // Simple remember username
    const user = document.getElementById('username');
    try{
      const last = localStorage.getItem('bb:lastUser');
      if (last && user && !user.value) user.value = last;
      on(form, 'submit', ()=>{
        if (user) localStorage.setItem('bb:lastUser', user.value || '');
      });
    }catch(e){}
  }

  function carsSearchAndSort(){
    // Only run on catalog pages
    const isCatalog = /sedan\.html|suv\.html|Suv\.html|supercar\.html|vintage\.html|Cars\.html/i.test(location.pathname);
    if (!isCatalog) return;

    // Guess cards: divs inside the first section that contain an <img>
    const section = document.querySelector('section') || document.querySelector('main') || document.body;
    let cards = Array.from(section.querySelectorAll('div')).filter(d => d.querySelector('img'));
    // Remove very large layout containers by requiring some text (name/specs)
    cards = cards.filter(d => (d.textContent || '').trim().length > 20);
    if (!cards.length) return;

    // Build toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'bb-toolbar';
    toolbar.innerHTML = `
      <input type="search" placeholder="Search cars (model, feature, power...)" aria-label="Search cars" />
      <select aria-label="Sort cars">
        <option value="name-asc">Sort: Name A→Z</option>
        <option value="name-desc">Sort: Name Z→A</option>
        <option value="hp-desc">Sort: Horsepower High→Low</option>
        <option value="hp-asc">Sort: Horsepower Low→High</option>
      </select>
    `;
    section.prepend(toolbar);
    const input = toolbar.querySelector('input[type="search"]');
    const select = toolbar.querySelector('select');

    // Extract metadata for sorting/filtering
    cards.forEach((card, i)=>{
      const nameEl = card.querySelector('h2,h3,h4') || card.querySelector('b,strong');
      const name = nameEl ? nameEl.textContent.trim() : (card.querySelector('img')?.getAttribute('alt') || `Car ${i+1}`);
      card.dataset.name = name.toLowerCase();

      // parse horsepower (first number before 'hp' or 'bhp')
      const txt = card.textContent.toLowerCase();
      const m = txt.match(/(\d{2,4})\s*(bhp|hp)/);
      card.dataset.hp = m ? parseInt(m[1],10) : 0;
    });

    function apply(){
      const q = (input.value || '').toLowerCase().trim();
      cards.forEach(card => {
        const hay = (card.dataset.name + ' ' + card.textContent.toLowerCase());
        const show = q ? hay.includes(q) : true;
        card.style.display = show ? '' : 'none';
      });

      const [key, dir] = (select.value || 'name-asc').split('-');
      const cmp = (a,b)=>{
        if (key === 'name'){
          return a.dataset.name.localeCompare(b.dataset.name) * (dir==='asc'?1:-1);
        } else if (key === 'hp'){
          return (parseInt(b.dataset.hp)-parseInt(a.dataset.hp)) * (dir==='desc'?1:-1);
        }
        return 0;
      };
      // Reorder in DOM
      const sorted = cards.slice().sort(cmp);
      sorted.forEach(c => c.parentElement.appendChild(c));
    }

    on(input, 'input', apply);
    on(select, 'change', apply);
  }

  function mobileNav(){
    const nav = document.querySelector('header nav ul');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.className = 'bb-mobile-toggle';
    btn.type = 'button';
    btn.textContent = 'Menu';
    const header = document.querySelector('header');
    header && header.appendChild(btn);
    on(btn, 'click', ()=>{
      nav.classList.toggle('open');
    });
  }

})();

