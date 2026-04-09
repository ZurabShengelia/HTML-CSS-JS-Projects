const RC = (() => {

  const SKILLS = [
    'JavaScript','TypeScript','Python','Java','C++','C#','Go','Rust','Swift','Kotlin','PHP','Ruby','Scala','R',
    'React','Vue.js','Angular','Next.js','Nuxt.js','Svelte','Solid.js','Node.js','Express.js','FastAPI','Django','Flask',
    'Spring Boot','Laravel','Rails','GraphQL','REST API','WebSockets','gRPC',
    'PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch','SQLite','DynamoDB','Cassandra','Supabase','Firebase',
    'Docker','Kubernetes','AWS','Azure','Google Cloud','Terraform','Ansible','CI/CD','Jenkins','GitHub Actions',
    'CircleCI','Prometheus','Grafana','Datadog','Linux','Bash','PowerShell','Nginx','Apache',
    'Git','GitHub','GitLab','Bitbucket','JIRA','Confluence','Notion','Figma','Sketch','Adobe XD',
    'Photoshop','Illustrator','InDesign','After Effects','Blender',
    'HTML5','CSS3','Sass','Tailwind CSS','Bootstrap','Webpack','Vite','Rollup','Jest','Vitest','Cypress','Playwright',
    'Machine Learning','Deep Learning','TensorFlow','PyTorch','Scikit-learn','Pandas','NumPy','OpenCV','NLP','LLMs',
    'Data Analysis','Data Visualization','Power BI','Tableau','Looker','Snowflake','dbt',
    'Agile','Scrum','Kanban','SAFe','Product Management','Project Management','Leadership','Communication',
    'Problem Solving','Critical Thinking','Team Management','Stakeholder Management','Strategic Planning',
    'User Research','UX Design','UI Design','Wireframing','Prototyping','A/B Testing','Design Systems',
    'SEO','Google Analytics','Google Ads','Meta Ads','Email Marketing','HubSpot','Salesforce','Zendesk',
    'Content Strategy','Copywriting','Technical Writing','Social Media Marketing','Brand Strategy',
    'Financial Modeling','Excel','SQL','Business Analysis','Six Sigma','Lean','OKRs',
    'iOS Development','Android Development','React Native','Flutter','Unity',
    'Blockchain','Web3','Solidity','Smart Contracts','Cybersecurity','Penetration Testing','DevSecOps',
    'API Design','Microservices','Event-Driven Architecture','Domain-Driven Design','System Design',
    'Customer Success','Sales','Account Management','Business Development','Negotiation',
    'Research','Statistics','Quantitative Analysis','Forecasting','Operations Management'
  ];

  const COLOR_MAP = {
    gold:     '#c9a96e',
    midnight: '#2a4a7f',
    forest:   '#2d6a4f',
    burgundy: '#7b2d3e',
    slate:    '#546e7a'
  };

  const FONT_MAP = {
    serif: { heading: 'Georgia, "Times New Roman", serif', body: 'Arial, sans-serif' },
    sans:  { heading: 'Arial, sans-serif',                  body: 'Arial, sans-serif' },
    mixed: { heading: 'Georgia, "Times New Roman", serif',  body: 'Arial, sans-serif' }
  };

  const TPL_NAMES = {
    classic: 'Classic Elegant',
    modern: 'Modern Minimal',
    executive: 'Bold Executive',
    creative: 'Creative Pro',
    minimalist: 'Minimalist',
    academic: 'Academic'
  };

  let state = {
    step: 1,
    totalSteps: 7,
    template: 'classic',
    color: 'gold',
    font: 'serif',
    photo: null,
    fields: { fullName:'', jobTitle:'', email:'', phone:'', location:'', linkedin:'', portfolio:'', github:'', summary:'' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certs: [],
    certPhotos: [],
    eid: 0, did: 0, pid: 0, cid: 0, cpid: 0,
    zoomLevel: 1,
    draftSaveTimeout: null
  };

  const $ = id => document.getElementById(id);
  const $q = (sel, ctx) => (ctx || document).querySelector(sel);
  const $all = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  const toast = (msg, type = 'info') => {
    const port = $('toastPort');
    const t = document.createElement('div');
    t.className = `toast ${type === 'success' ? 'ok' : type === 'error' ? 'err' : 'info'}`;
    const icons = { success:'✓', error:'✕', info:'›' };
    t.innerHTML = `<span class="toast-ico">${icons[type] || '›'}</span><span>${msg}</span>`;
    port.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'toastOut .28s ease forwards';
      setTimeout(() => t.remove(), 280);
    }, 3200);
  };

  const esc = s => {
    if (!s) return '';
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  };

  const fmtDate = val => {
    if (!val) return '';
    const [y, m] = val.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const mi = parseInt(m, 10) - 1;
    return months[mi] ? `${months[mi]} ${y}` : val;
  };

  const validate = step => {
    if (step !== 1) return true;
    const name = $('fullName').value.trim();
    const email = $('email').value.trim();
    let ok = true;
    if (!name) { fieldErr('fullName', 'Full name is required'); ok = false; }
    else clearErr('fullName');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fieldErr('email', 'Enter a valid email'); ok = false; }
    else clearErr('email');
    return ok;
  };

  const fieldErr = (id, msg) => {
    const el = $(id);
    const err = $(`${id}-error`);
    if (el) { el.classList.add('err'); setTimeout(() => el.classList.remove('err'), 700); }
    if (err) err.textContent = msg;
  };

  const clearErr = id => {
    const el = $(id);
    const err = $(`${id}-error`);
    if (el) el.classList.remove('err');
    if (err) err.textContent = '';
  };

  const goStep = target => {
    if (target === state.step) return;
    if (target > state.step && !validate(state.step)) return;
    const cur = $q(`.step-pane[data-step="${state.step}"]`);
    const nxt = $q(`.step-pane[data-step="${target}"]`);
    if (!cur || !nxt) return;
    cur.classList.remove('active');
    nxt.classList.add('active');
    state.step = target;
    syncStepUI();
    $q('.steps-wrap').scrollTop = 0;
  };

  const syncStepUI = () => {
    const pct = (state.step / state.totalSteps) * 100;
    $('progressFill').style.width = pct + '%';
    $('stepLabelDisplay').textContent = `${state.step} / ${state.totalSteps}`;
    $('backBtn').disabled = state.step === 1;
    if (state.step === state.totalSteps) {
      $('nextBtn').innerHTML = 'Finish <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="20 6 9 18 4 13"/></svg>';
    } else {
      $('nextBtn').innerHTML = 'Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>';
    }
    $all('.step-node').forEach(n => {
      const s = parseInt(n.dataset.step);
      n.classList.remove('active','done');
      if (s === state.step) n.classList.add('active');
      else if (s < state.step) n.classList.add('done');
    });
    $all('.step-rail').forEach((rail, i) => {
      rail.classList.toggle('done', (i + 1) < state.step);
    });
  };

  const closeMobileMenu = () => {
    const menu = $('navMobileMenu');
    const burger = $('navHamburger');
    if (menu) menu.classList.remove('open');
    if (burger) burger.classList.remove('open');
  };

  const scrollToBuilder = () => {
    const main = $('appMain');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const inp = $('fullName');
        if (inp) inp.focus();
      }, 600);
    }
  };

  const smoothScrollTo = (elementId, offset = 0) => {
    const el = document.getElementById(elementId);
    if (el) {
      window.scrollBy({ top: el.getBoundingClientRect().top - offset, behavior: 'smooth' });
    }
  };

  const initNavLinks = () => {
    const hamburger = $('navHamburger');
    const mobileMenu = $('navMobileMenu');

    if (hamburger) {
      hamburger.addEventListener('click', e => {
        e.stopPropagation();
        const open = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
      });
    }

    document.addEventListener('click', e => {
      if (mobileMenu && hamburger && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger?.classList.remove('open');
      }
    });

    const navActions = {
      features: () => {
        closeMobileMenu();
        smoothScrollTo('features-section', 60);
      },
      templates: () => {
        closeMobileMenu();
        scrollToBuilder();
        setTimeout(() => { if (goStep) goStep(7); }, 300);
      },
      export: () => {
        closeMobileMenu();
        scrollToBuilder();
        setTimeout(() => {
          if (goStep) goStep(7);
          setTimeout(() => smoothScrollTo('export-section', 100), 300);
        }, 300);
      },
      startBuild: () => {
        closeMobileMenu();
        scrollToBuilder();
      }
    };

    const linkMap = {
      'featuresLink': navActions.features,
      'featuresLinkM': navActions.features,
      'templatesLink': navActions.templates,
      'templatesLinkM': navActions.templates,
      'exportLink': navActions.export,
      'exportLinkM': navActions.export,
      'navStartBtn': navActions.startBuild,
      'navStartBtnM': navActions.startBuild
    };

    Object.entries(linkMap).forEach(([id, handler]) => {
      const el = $(id);
      if (el) {
        el.addEventListener('click', e => {
          e.preventDefault();
          handler();
        });
      }
    });

    window.addEventListener('scroll', () => {
      const navbar = $('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
      }
    }, { passive: true });
  };

  const initNav = () => {
    $('nextBtn').addEventListener('click', () => {
      if (state.step < state.totalSteps) {
        goStep(state.step + 1);
      } else {
        toast('Resume complete! Download your PDF below.', 'success');
      }
    });
    $('backBtn').addEventListener('click', () => { if (state.step > 1) goStep(state.step - 1); });
    $all('.step-node').forEach(n => {
      n.addEventListener('click', () => {
        const t = parseInt(n.dataset.step);
        if (t <= state.step || t === state.step + 1) goStep(t);
        else toast('Complete the current step first', 'info');
      });
    });
  };

  const initFields = () => {
    Object.keys(state.fields).forEach(key => {
      const el = $q(`[data-key="${key}"]`);
      if (!el) return;
      el.addEventListener('input', e => {
        state.fields[key] = e.target.value;
        if (key === 'summary') syncSummaryCounts();
        scheduleDraftSave();
        renderResume();
      });
    });
  };

  const syncSummaryCounts = () => {
    const val = state.fields.summary;
    $('summaryCount').textContent = val.length;
    $('wordCount').textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
  };

  const initPhoto = () => {
    const zone = $('photoZone');
    const input = $('photoInput');
    const preview = $('photoPreview');
    const ghost = $('photoGhost');
    const clear = $('photoClear');

    zone.addEventListener('click', e => { if (!e.target.closest('#photoClear')) input.click(); });
    zone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
    });

    input.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { toast('Photo must be under 5MB', 'error'); return; }
      if (!file.type.startsWith('image/')) { toast('Please upload a valid image file', 'error'); return; }
      const reader = new FileReader();
      reader.onload = ev => {
        state.photo = ev.target.result;
        preview.src = ev.target.result;
        preview.classList.remove('hidden');
        ghost.style.display = 'none';
        clear.classList.remove('hidden');
        scheduleDraftSave();
        renderResume();
        toast('Photo uploaded', 'success');
      };
      reader.readAsDataURL(file);
    });

    clear.addEventListener('click', e => {
      e.stopPropagation();
      state.photo = null;
      preview.src = '';
      preview.classList.add('hidden');
      ghost.style.display = '';
      clear.classList.add('hidden');
      input.value = '';
      scheduleDraftSave();
      renderResume();
    });
  };

  const makeExpEntry = id => {
    const d = document.createElement('div');
    d.className = 'dyn-entry'; d.dataset.id = id;
    d.innerHTML = `
      <button class="rm-btn" type="button" title="Remove entry" aria-label="Remove experience">×</button>
      <div class="ent-grid">
        <div class="ent-half fg"><label class="fl">Job Title</label><input type="text" class="fi" data-exp="${id}" data-f="title" placeholder="Senior Designer"></div>
        <div class="ent-half fg"><label class="fl">Company</label><input type="text" class="fi" data-exp="${id}" data-f="company" placeholder="Acme Studio"></div>
        <div class="ent-half fg"><label class="fl">Start Date</label><input type="month" class="fi" data-exp="${id}" data-f="startDate"></div>
        <div class="ent-half fg"><label class="fl">End Date <em style="font-weight:400;text-transform:none;letter-spacing:0;font-size:.65rem;color:var(--ivory-4)">(blank = Present)</em></label><input type="month" class="fi" data-exp="${id}" data-f="endDate"></div>
        <div class="date-err" data-derr="${id}">End date cannot precede start date</div>
        <div class="ent-full fg">
          <label class="fl">Key Achievements / Responsibilities</label>
          <textarea class="fi ft" data-exp="${id}" data-f="description" placeholder="• Increased conversion rate by 34% by redesigning the checkout flow&#10;• Led a team of 5 engineers to ship MVP in 6 weeks&#10;• Reduced infrastructure costs by 40% through optimization" rows="5"></textarea>
          <div class="desc-hint">Press Enter for a new bullet point. Quantify results where possible.</div>
        </div>
      </div>`;
    $all('[data-exp]', d).forEach(el => {
      el.addEventListener('input', e => {
        const entry = state.experience.find(x => x.id === id);
        if (!entry) return;
        const f = e.target.dataset.f;
        entry[f] = e.target.value;
        if (f === 'startDate' || f === 'endDate') {
          const derr = d.querySelector(`[data-derr="${id}"]`);
          if (entry.startDate && entry.endDate && entry.endDate < entry.startDate) {
            derr.classList.add('show');
          } else {
            derr.classList.remove('show');
          }
        }
        scheduleDraftSave();
        renderResume();
      });
      if (el.tagName === 'TEXTAREA') {
        el.addEventListener('keydown', e => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const ta = e.target;
          const pos = ta.selectionStart;
          const val = ta.value;
          const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
          const currentLine = val.slice(lineStart, pos);
          const prefix = currentLine.trim() === '' ? '• ' : '• ';
          const newVal = val.slice(0, pos) + '\n' + prefix + val.slice(pos);
          ta.value = newVal;
          ta.selectionStart = ta.selectionEnd = pos + 1 + prefix.length;
          const entry = state.experience.find(x => x.id === id);
          if (entry) entry.description = newVal;
          scheduleDraftSave();
          renderResume();
        });
      }
    });
    d.querySelector('.rm-btn').addEventListener('click', () => {
      state.experience = state.experience.filter(x => x.id !== id);
      d.style.animation = 'none';
      d.style.opacity = '0';
      d.style.transform = 'translateY(-4px)';
      d.style.transition = 'all .2s ease';
      setTimeout(() => { d.remove(); renderResume(); }, 200);
      scheduleDraftSave();
    });
    return d;
  };

  const makeEduEntry = id => {
    const d = document.createElement('div');
    d.className = 'dyn-entry'; d.dataset.id = id;
    d.innerHTML = `
      <button class="rm-btn" type="button" aria-label="Remove education">×</button>
      <div class="ent-grid">
        <div class="ent-half fg"><label class="fl">Degree / Qualification</label><input type="text" class="fi" data-edu="${id}" data-f="degree" placeholder="B.Sc. Computer Science"></div>
        <div class="ent-half fg"><label class="fl">Institution</label><input type="text" class="fi" data-edu="${id}" data-f="institution" placeholder="MIT"></div>
        <div class="ent-half fg"><label class="fl">Graduation Year</label><input type="text" class="fi" data-edu="${id}" data-f="year" placeholder="2020" maxlength="4"></div>
        <div class="ent-half fg"><label class="fl">GPA <em style="font-weight:400;text-transform:none;letter-spacing:0;font-size:.65rem;color:var(--ivory-4)">(optional)</em></label><input type="text" class="fi" data-edu="${id}" data-f="gpa" placeholder="3.9 / 4.0"></div>
      </div>`;
    $all('[data-edu]', d).forEach(el => {
      el.addEventListener('input', e => {
        const entry = state.education.find(x => x.id === id);
        if (entry) { entry[e.target.dataset.f] = e.target.value; scheduleDraftSave(); renderResume(); }
      });
    });
    d.querySelector('.rm-btn').addEventListener('click', () => {
      state.education = state.education.filter(x => x.id !== id);
      d.style.opacity = '0'; d.style.transition = 'opacity .2s';
      setTimeout(() => { d.remove(); renderResume(); }, 200);
      scheduleDraftSave();
    });
    return d;
  };

  const makeProjEntry = id => {
    const d = document.createElement('div');
    d.className = 'dyn-entry'; d.dataset.id = id;
    d.innerHTML = `
      <button class="rm-btn" type="button" aria-label="Remove project">×</button>
      <div class="ent-grid">
        <div class="ent-half fg"><label class="fl">Project Name</label><input type="text" class="fi" data-proj="${id}" data-f="name" placeholder="DesignOS — Productivity Platform"></div>
        <div class="ent-half fg"><label class="fl">Technologies / URL</label><input type="text" class="fi" data-proj="${id}" data-f="tech" placeholder="React, Node.js · github.com/you/project"></div>
        <div class="ent-full fg"><label class="fl">Description</label><textarea class="fi ft" data-proj="${id}" data-f="description" placeholder="Built a real-time collaboration tool used by 2000+ teams, reducing meeting overhead by 30%." rows="3"></textarea></div>
      </div>`;
    $all('[data-proj]', d).forEach(el => {
      el.addEventListener('input', e => {
        const entry = state.projects.find(x => x.id === id);
        if (entry) { entry[e.target.dataset.f] = e.target.value; scheduleDraftSave(); renderResume(); }
      });
    });
    d.querySelector('.rm-btn').addEventListener('click', () => {
      state.projects = state.projects.filter(x => x.id !== id);
      d.style.opacity = '0'; d.style.transition = 'opacity .2s';
      setTimeout(() => { d.remove(); renderResume(); }, 200);
      scheduleDraftSave();
    });
    return d;
  };

  const makeCertEntry = id => {
    const photo = state.certPhotos.find(p => p.id === id);
    const d = document.createElement('div');
    d.className = 'photo-thumb'; d.dataset.id = id;
    d.innerHTML = `
      <div class="photo-img" style="background-image:url('${photo.dataUrl}')"></div>
      <button class="rm-btn" type="button" aria-label="Remove photo">×</button>`;
    d.querySelector('.rm-btn').addEventListener('click', () => {
      state.certPhotos = state.certPhotos.filter(x => x.id !== id);
      d.style.opacity = '0'; d.style.transform = 'scale(0.9)'; d.style.transition = 'all .2s';
      setTimeout(() => { d.remove(); renderResume(); }, 200);
      scheduleDraftSave();
    });
    return d;
  };

  const populateEntry = (el, fields, entry) => {
    fields.forEach(f => {
      const inp = el.querySelector(`[data-f="${f}"]`);
      if (inp) inp.value = entry[f] || '';
    });
  };

  const initDynLists = () => {
    $('addExperienceBtn').addEventListener('click', () => {
      const id = ++state.eid;
      state.experience.push({ id, title:'', company:'', startDate:'', endDate:'', description:'' });
      const el = makeExpEntry(id);
      $('experienceList').appendChild(el);
      el.querySelector('input').focus();
    });
    $('addEducationBtn').addEventListener('click', () => {
      const id = ++state.did;
      state.education.push({ id, degree:'', institution:'', year:'', gpa:'' });
      const el = makeEduEntry(id);
      $('educationList').appendChild(el);
      el.querySelector('input').focus();
    });
    $('addProjectBtn').addEventListener('click', () => {
      const id = ++state.pid;
      state.projects.push({ id, name:'', tech:'', description:'' });
      const el = makeProjEntry(id);
      $('projectsList').appendChild(el);
      el.querySelector('input').focus();
    });
  };

  const initSkills = () => {
    const inp = $('skillInput');
    const dropdown = $('skillDropdown');
    const countHint = $('skillsCountHint');
    let focusIdx = -1;

    const updateCountHint = () => {
      const c = state.skills.length;
      countHint.textContent = c === 0 ? '' : `${c} skill${c > 1 ? 's' : ''} added`;
    };

    const addSkill = val => {
      const s = val.trim();
      if (!s) return;
      if (state.skills.includes(s)) { toast('Skill already added', 'error'); return; }
      state.skills.push(s);
      renderChip(s);
      inp.value = '';
      closeDropdown();
      scheduleDraftSave();
      renderResume();
      updateCountHint();
    };

    const renderChip = skill => {
      const chip = document.createElement('div');
      chip.className = 'sk-chip';
      chip.textContent = skill;
      chip.title = 'Click to remove';
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      const removeSkill = () => {
        state.skills = state.skills.filter(x => x !== skill);
        chip.style.opacity = '0'; chip.style.transition = 'opacity .15s';
        setTimeout(() => chip.remove(), 150);
        scheduleDraftSave();
        renderResume();
        updateCountHint();
      };
      chip.addEventListener('click', removeSkill);
      chip.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') removeSkill(); });
      $('skillChips').appendChild(chip);
    };

    const openDropdown = matches => {
      dropdown.innerHTML = '';
      focusIdx = -1;
      matches.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'sk-item'; item.textContent = s; item.dataset.idx = i;
        item.addEventListener('mousedown', e => { e.preventDefault(); addSkill(s); });
        dropdown.appendChild(item);
      });
      dropdown.classList.remove('hidden');
    };
    const closeDropdown = () => { dropdown.classList.add('hidden'); dropdown.innerHTML = ''; focusIdx = -1; };
    const moveFocus = dir => {
      const items = $all('.sk-item', dropdown);
      if (!items.length) return;
      items.forEach(i => i.classList.remove('focus'));
      focusIdx = (focusIdx + dir + items.length) % items.length;
      items[focusIdx].classList.add('focus');
      items[focusIdx].scrollIntoView({ block: 'nearest' });
    };

    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (!q) { closeDropdown(); return; }
      const matches = SKILLS.filter(s => s.toLowerCase().includes(q) && !state.skills.includes(s)).slice(0, 9);
      if (matches.length) openDropdown(matches); else closeDropdown();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const items = $all('.sk-item', dropdown);
        if (focusIdx >= 0 && items[focusIdx]) addSkill(items[focusIdx].textContent);
        else addSkill(inp.value);
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
      if (e.key === 'Escape') { closeDropdown(); inp.blur(); }
    });
    inp.addEventListener('blur', () => setTimeout(closeDropdown, 160));
  };

  const initDesign = () => {
    $all('.tpl-card').forEach(card => {
      card.addEventListener('click', () => {
        $all('.tpl-card').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
        card.classList.add('active');
        card.setAttribute('aria-pressed','true');
        state.template = card.dataset.template;
        $('tplBadge').textContent = TPL_NAMES[state.template] || state.template;
        scheduleDraftSave();
        renderResume();
      });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
    });
    $all('.ac-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        $all('.ac-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        state.color = sw.dataset.color;
        scheduleDraftSave();
        renderResume();
      });
    });
    $all('.font-pair').forEach(fp => {
      fp.addEventListener('click', () => {
        $all('.font-pair').forEach(f => f.classList.remove('active'));
        fp.classList.add('active');
        state.font = fp.dataset.font;
        scheduleDraftSave();
        renderResume();
      });
    });
  };

  const initAiEnhance = () => {
    $('aiEnhanceBtn').addEventListener('click', () => {
      const ta = $('summary');
      const raw = ta.value.trim();
      if (!raw) { toast('Write a summary first, then enhance it', 'error'); return; }

      const powerVerbs = ['Architected','Orchestrated','Spearheaded','Pioneered','Accelerated','Transformed','Championed','Elevated','Delivered','Led','Scaled','Optimized','Streamlined','Launched','Drove','Shaped','Established','Cultivated','Engineered','Directed'];
      const weakMap = {
        'responsible for': 'led',
        'worked on': 'delivered',
        'helped': 'enabled',
        'managed': 'orchestrated',
        'did': 'executed',
        'made': 'built',
        'worked with': 'collaborated with',
        'in charge of': 'oversaw',
        'tasked with': 'spearheaded',
        'assisted': 'supported',
        'handled': 'managed',
        'tried to': 'sought to',
        'was involved in': 'contributed to'
      };

      let improved = raw;
      Object.entries(weakMap).forEach(([weak, strong]) => {
        improved = improved.replace(new RegExp(`\\b${weak}\\b`, 'gi'), strong);
      });
      improved = improved.replace(/\b(i have|i've|i am|i'm|i was|i)\b/gi, '').replace(/\s{2,}/g, ' ');

      const sentences = improved.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
      const processed = sentences.map((s, idx) => {
        s = s.charAt(0).toUpperCase() + s.slice(1);
        if (!s.match(/[.!?]$/)) s += '.';
        if (idx === 0 && !/^(A |An |The |With |Over |Seasoned|Experienced|Passionate|Dynamic|Results|Strategic|Led|Delivered|Architected|Orchestrated|Spearheaded)/i.test(s)) {
          const verb = powerVerbs[Math.floor(Math.random() * powerVerbs.length)];
          s = verb + ' ' + s.charAt(0).toLowerCase() + s.slice(1);
        }
        return s;
      });

      const result = processed.join(' ');
      ta.value = result;
      state.fields.summary = result;
      syncSummaryCounts();
      renderResume();
      scheduleDraftSave();
      toast('Summary enhanced ✦', 'success');
    });
  };

  const initZoom = () => {
    const setZoom = level => {
      state.zoomLevel = Math.min(1.4, Math.max(0.35, level));
      const a4 = $('resumeA4');
      const stage = $('a4Stage');
      a4.style.transform = `scale(${state.zoomLevel})`;
      a4.style.transformOrigin = 'top center';
      const scaledH = Math.ceil(1123 * state.zoomLevel) + 8;
      stage.style.height = scaledH + 'px';
      $('zoomVal').textContent = Math.round(state.zoomLevel * 100) + '%';
    };
    $('zoomInBtn').addEventListener('click', () => setZoom(+(state.zoomLevel + 0.1).toFixed(2)));
    $('zoomOutBtn').addEventListener('click', () => setZoom(+(state.zoomLevel - 0.1).toFixed(2)));

    const autoFit = () => {
      const scroll = $('previewScroll');
      if (!scroll) return;
      const avail = scroll.clientWidth - 40;
      if (avail < 794) setZoom(+(avail / 794).toFixed(2));
      else setZoom(1);
    };
    window.addEventListener('resize', autoFit, { passive: true });
    setTimeout(autoFit, 200);
  };

  const initExport = () => {
    const doPrint = () => window.print();
    const doCopy = () => {
      const f = state.fields;
      const lines = [];
      if (f.fullName) lines.push(f.fullName.toUpperCase());
      if (f.jobTitle) lines.push(f.jobTitle);
      const contacts = [f.email, f.phone, f.location, f.linkedin, f.portfolio, f.github].filter(Boolean);
      if (contacts.length) lines.push(contacts.join(' | '));
      if (f.summary) { lines.push('', 'PROFESSIONAL SUMMARY', f.summary); }
      if (state.experience.length) {
        lines.push('', 'EXPERIENCE');
        state.experience.forEach(e => {
          if (!e.title && !e.company) return;
          lines.push(`${e.title || ''}${e.company ? ' — ' + e.company : ''}`);
          if (e.startDate) lines.push(`${fmtDate(e.startDate)} – ${e.endDate ? fmtDate(e.endDate) : 'Present'}`);
          if (e.description) lines.push(e.description);
          lines.push('');
        });
      }
      if (state.education.length) {
        lines.push('EDUCATION');
        state.education.forEach(e => {
          if (!e.degree && !e.institution) return;
          lines.push(`${e.degree || ''}${e.institution ? ' — ' + e.institution : ''}`);
          if (e.year) lines.push(`${e.year}${e.gpa ? ' · GPA: ' + e.gpa : ''}`);
        });
        lines.push('');
      }
      if (state.skills.length) { lines.push('SKILLS', state.skills.join(' · '), ''); }
      if (state.projects.length) {
        lines.push('PROJECTS');
        state.projects.forEach(p => { if (p.name) { lines.push(p.name + (p.tech ? ' | ' + p.tech : '')); if (p.description) lines.push(p.description); } });
        lines.push('');
      }
      if (state.certs.length) {
        lines.push('CERTIFICATIONS');
        state.certs.forEach(c => { if (c.name) lines.push(c.name + (c.issuer ? ' — ' + c.issuer : '')); });
      }
      navigator.clipboard.writeText(lines.join('\n'))
        .then(() => toast('Copied to clipboard ✓', 'success'))
        .catch(() => toast('Copy failed — try again', 'error'));
    };

    $('downloadBtn').addEventListener('click', doPrint);
    $('copyBtn').addEventListener('click', doCopy);

    const exportDownloadBtn = $('exportDownloadBtn');
    const exportCopyBtn = $('exportCopyBtn');
    if (exportDownloadBtn) exportDownloadBtn.addEventListener('click', doPrint);
    if (exportCopyBtn) exportCopyBtn.addEventListener('click', doCopy);
  };

  const scheduleDraftSave = () => {
    clearTimeout(state.draftSaveTimeout);
    state.draftSaveTimeout = setTimeout(saveDraft, 1500);
  };

  const saveDraft = () => {
    try {
      const snap = {
        fields: state.fields, experience: state.experience, education: state.education,
        skills: state.skills, projects: state.projects, certs: state.certs,
        certPhotos: state.certPhotos, template: state.template, color: state.color, font: state.font,
        eid: state.eid, did: state.did, pid: state.pid, cid: state.cid, cpid: state.cpid,
        photo: state.photo, savedAt: Date.now()
      };
      localStorage.setItem('rc_draft_v3', JSON.stringify(snap));
    } catch(e) {
    }
  };

  const restoreDraft = () => {
    let raw = localStorage.getItem('rc_draft_v3') || localStorage.getItem('rc_draft_v2') || localStorage.getItem('resumecraft_draft');
    if (!raw) return;

    try {
      const d = JSON.parse(raw);
      state.fields    = { ...state.fields, ...(d.fields || {}) };
      state.experience= d.experience || [];
      state.education = d.education  || [];
      state.skills    = d.skills     || [];
      state.projects  = d.projects   || [];
      state.certs     = d.certs || d.certifications || [];
      state.certPhotos= d.certPhotos || [];
      state.template  = d.template || d.currentTemplate || 'classic';
      state.color     = d.color    || d.currentColor   || 'gold';
      state.font      = d.font     || 'serif';
      state.eid       = d.eid || d.expIdCounter || 0;
      state.did       = d.did || d.eduIdCounter || 0;
      state.pid       = d.pid || d.projIdCounter || 0;
      state.cid       = d.cid || d.certIdCounter || 0;
      state.cpid      = d.cpid || 0;
      state.photo     = d.photo || d.photoDataUrl || null;

      Object.entries(state.fields).forEach(([k, v]) => {
        const el = $q(`[data-key="${k}"]`);
        if (el) el.value = v || '';
      });
      syncSummaryCounts();

      state.experience.forEach(e => { const el = makeExpEntry(e.id); $('experienceList').appendChild(el); populateEntry(el, ['title','company','startDate','endDate','description'], e); });
      state.education.forEach(e => { const el = makeEduEntry(e.id); $('educationList').appendChild(el); populateEntry(el, ['degree','institution','year','gpa'], e); });
      state.projects.forEach(p => { const el = makeProjEntry(p.id); $('projectsList').appendChild(el); populateEntry(el, ['name','tech','description'], p); });
      state.certPhotos.forEach(p => { const el = makeCertEntry(p.id); $('certsList').appendChild(el); });
      state.skills.forEach(s => {
        const chip = document.createElement('div');
        chip.className = 'sk-chip'; chip.textContent = s; chip.title = 'Click to remove';
        chip.setAttribute('role','button'); chip.setAttribute('tabindex','0');
        const removeSkill = () => {
          state.skills = state.skills.filter(x => x !== s);
          chip.remove(); renderResume(); scheduleDraftSave();
          const hint = $('skillsCountHint');
          if (hint) hint.textContent = state.skills.length > 0 ? `${state.skills.length} skill${state.skills.length > 1 ? 's' : ''} added` : '';
        };
        chip.addEventListener('click', removeSkill);
        chip.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') removeSkill(); });
        $('skillChips').appendChild(chip);
      });
      const hint = $('skillsCountHint');
      if (hint && state.skills.length) hint.textContent = `${state.skills.length} skill${state.skills.length > 1 ? 's' : ''} added`;

      if (state.photo) {
        const pv = $('photoPreview'); const gh = $('photoGhost'); const cl = $('photoClear');
        pv.src = state.photo; pv.classList.remove('hidden'); gh.style.display = 'none'; cl.classList.remove('hidden');
      }

      $all('.tpl-card').forEach(c => { c.classList.toggle('active', c.dataset.template === state.template); c.setAttribute('aria-pressed', String(c.dataset.template === state.template)); });
      $all('.ac-swatch').forEach(s => s.classList.toggle('active', s.dataset.color === state.color));
      $all('.font-pair').forEach(f => f.classList.toggle('active', f.dataset.font === state.font));
      $('tplBadge').textContent = TPL_NAMES[state.template] || state.template;

      renderResume();
      toast('Draft restored ✓', 'success');
    } catch(err) {
    }
  };

  const initSaveDraftBtn = () => {
    $('saveDraftBtn').addEventListener('click', () => { saveDraft(); toast('Draft saved ✓', 'success'); });
    setInterval(saveDraft, 60000);
  };

  const initReset = () => {
    $('resetBtn').addEventListener('click', () => {
      $('resetModal').classList.remove('hidden');
      $('resetModal').querySelector('.mb.ghost').focus();
    });
    $('cancelResetBtn').addEventListener('click', () => $('resetModal').classList.add('hidden'));
    $('resetModal').addEventListener('click', e => { if (e.target === $('resetModal')) $('resetModal').classList.add('hidden'); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !$('resetModal').classList.contains('hidden')) {
        $('resetModal').classList.add('hidden');
      }
    });
    $('confirmResetBtn').addEventListener('click', () => {
      ['rc_draft_v3','rc_draft_v2','resumecraft_draft'].forEach(k => localStorage.removeItem(k));
      $('resetModal').classList.add('hidden');
      toast('Starting fresh...', 'info');
      setTimeout(() => location.reload(), 500);
    });
  };

  const initMobilePreview = () => {
    const btn = $('mobPrevBtn');
    const panel = $('previewPanel');
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('mobile-open');
      btn.innerHTML = open
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg> Back to Form`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Preview Resume`;
      if (open) panel.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const checkOverflow = () => {
    const content = $('resumeContent');
    const warn = $('overflowWarn');
    if (!content || !warn) return;
    setTimeout(() => {
      warn.classList.toggle('hidden', content.scrollHeight <= 1135);
    }, 60);
  };

  const contactIcons = {
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="8" height="8" class="rc-s-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="8" height="8" class="rc-s-icon"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="8" height="8" class="rc-s-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="8" height="8" class="rc-s-icon"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`
  };

  const renderResume = () => {
    const container = $('resumeContent');
    if (!container) return;
    const accent = COLOR_MAP[state.color] || '#c9a96e';
    const fonts = FONT_MAP[state.font] || FONT_MAP.serif;
    const style = `--rv-accent:${accent};--rv-font:${fonts.heading};`;
    let html = '';
    switch(state.template) {
      case 'classic': html = buildClassic(accent, fonts); break;
      case 'modern': html = buildModern(accent, fonts); break;
      case 'executive': html = buildExecutive(accent, fonts); break;
      case 'creative': html = buildCreative(accent, fonts); break;
      case 'minimalist': html = buildMinimalist(accent, fonts); break;
      case 'academic': html = buildAcademic(accent, fonts); break;
      default: html = buildClassic(accent, fonts);
    }
    container.style.cssText = style;
    container.innerHTML = html;
    checkOverflow();
  };

  const buildClassic = (accent) => {
    const f = state.fields;
    const photo = state.photo
      ? `<img src="${state.photo}" class="rc-photo" alt="${esc(f.fullName)}">`
      : `<div class="rc-photo-ph">◉</div>`;

    const contactItems = [
      f.email    && `<div class="rc-s-item">${contactIcons.email}<span>${esc(f.email)}</span></div>`,
      f.phone    && `<div class="rc-s-item">${contactIcons.phone}<span>${esc(f.phone)}</span></div>`,
      f.location && `<div class="rc-s-item">${contactIcons.location}<span>${esc(f.location)}</span></div>`,
      f.linkedin && `<div class="rc-s-item">${contactIcons.link}<span>${esc(f.linkedin)}</span></div>`,
      f.portfolio&& `<div class="rc-s-item">${contactIcons.link}<span>${esc(f.portfolio)}</span></div>`,
      f.github&& `<div class="rc-s-item">${contactIcons.link}<span>${esc(f.github)}</span></div>`
    ].filter(Boolean).join('');

    const exp = state.experience.filter(e => e.title || e.company).map(e => `
      <div class="rc-exp">
        <div class="rc-exp-top"><span class="rc-exp-ttl">${esc(e.title||'')}</span><span class="rc-exp-dates">${fmtDate(e.startDate)}${e.startDate?' – ':''}${e.endDate?fmtDate(e.endDate):e.startDate?'Present':''}</span></div>
        <div class="rc-exp-co">${esc(e.company||'')}</div>
        ${e.description?`<div class="rc-exp-desc">${esc(e.description)}</div>`:''}
      </div>`).join('');

    const edu = state.education.filter(e => e.degree||e.institution).map(e => `
      <div class="rc-edu">
        <div class="rc-edu-deg">${esc(e.degree||'')}</div>
        <div class="rc-edu-sch">${esc(e.institution||'')}</div>
        <div class="rc-edu-meta">${[e.year, e.gpa?'GPA: '+e.gpa:''].filter(Boolean).join(' · ')}</div>
      </div>`).join('');

    const proj = state.projects.filter(p => p.name).map(p => `
      <div class="rc-proj">
        <div class="rc-proj-name">${esc(p.name)}${p.tech?` <span style="font-weight:400;font-size:7.5px;color:#888"> · ${esc(p.tech)}</span>`:''}</div>
        ${p.description?`<div class="rc-proj-desc">${esc(p.description)}</div>`:''}
      </div>`).join('');

    const certs = state.certs.filter(c => c.name).map(c =>
      `<div class="rc-cert">${esc(c.name)}${c.issuer?' — '+esc(c.issuer):''}</div>`).join('');

    return `<div class="rc-wrap">
      <div class="rc-side">
        <div class="rc-photo-wrap">${photo}</div>
        ${contactItems ? `<div class="rc-s-block"><div class="rc-s-label">Contact</div>${contactItems}</div>` : ''}
        ${state.skills.length ? `<div class="rc-s-block"><div class="rc-s-label">Skills</div>${state.skills.map(s=>`<span class="rc-skill-tag">${esc(s)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="rc-main">
        <div class="rc-name">${esc(f.fullName)||'<span style="color:#ccc">Your Name</span>'}</div>
        <div class="rc-role">${esc(f.jobTitle)||''}</div>
        ${f.summary?`<div class="rc-sec"><div class="rc-sec-ttl">Profile</div><div class="rc-summary">${esc(f.summary)}</div></div>`:''}
        ${exp?`<div class="rc-sec"><div class="rc-sec-ttl">Experience</div>${exp}</div>`:''}
        ${edu?`<div class="rc-sec"><div class="rc-sec-ttl">Education</div>${edu}</div>`:''}
        ${proj?`<div class="rc-sec"><div class="rc-sec-ttl">Projects</div>${proj}</div>`:''}
        ${certs?`<div class="rc-sec"><div class="rc-sec-ttl">Certifications</div>${certs}</div>`:''}
      </div>
    </div>`;
  };

  const buildModern = (accent) => {
    const f = state.fields;
    const contacts = [f.email, f.phone, f.location, f.linkedin, f.portfolio, f.github].filter(Boolean);

    const exp = state.experience.filter(e => e.title||e.company).map(e => `
      <div class="rm-exp">
        <div class="rm-dot"></div>
        <div class="rm-exp-body">
          <div class="rm-exp-ttl">${esc(e.title||'')}</div>
          <div class="rm-exp-meta">${[esc(e.company||''), e.startDate?(fmtDate(e.startDate)+' – '+(e.endDate?fmtDate(e.endDate):'Present')):''].filter(Boolean).join(' · ')}</div>
          ${e.description?`<div class="rm-exp-desc">${esc(e.description)}</div>`:''}
        </div>
      </div>`).join('');

    const edu = state.education.filter(e => e.degree||e.institution).map(e => `
      <div class="rm-edu">
        <div class="rm-edu-deg">${esc(e.degree||'')}</div>
        <div class="rm-edu-meta">${[esc(e.institution||''), e.year, e.gpa?'GPA '+e.gpa:''].filter(Boolean).join(' · ')}</div>
      </div>`).join('');

    const proj = state.projects.filter(p=>p.name).map(p=>`
      <div class="rm-proj">
        <div class="rm-proj-name">${esc(p.name)}${p.tech?` <span style="font-weight:400;font-size:7.5px;color:#888">${esc(p.tech)}</span>`:''}</div>
        ${p.description?`<div class="rm-proj-desc">${esc(p.description)}</div>`:''}
      </div>`).join('');

    const certs = state.certs.filter(c=>c.name).map(c=>`<div class="rm-cert">${esc(c.name)}${c.issuer?' — '+esc(c.issuer):''}</div>`).join('');

    return `<div class="rm-wrap">
      <div class="rm-header">
        <div class="rm-name">${esc(f.fullName)||'<span style="color:#ccc">Your Name</span>'}</div>
        ${f.jobTitle?`<div class="rm-role">${esc(f.jobTitle)}</div>`:''}
        ${contacts.length?`<div class="rm-contacts">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}</div>`:''}
      </div>
      <div class="rm-divider"></div>
      ${f.summary?`<div class="rm-sec"><div class="rm-sec-ttl">Profile</div><div class="rm-summary">${esc(f.summary)}</div></div>`:''}
      ${exp?`<div class="rm-sec"><div class="rm-sec-ttl">Experience</div>${exp}</div>`:''}
      ${edu?`<div class="rm-sec"><div class="rm-sec-ttl">Education</div>${edu}</div>`:''}
      ${state.skills.length?`<div class="rm-sec"><div class="rm-sec-ttl">Skills</div><div class="rm-skills">${state.skills.map(s=>`<span class="rm-skill">${esc(s)}</span>`).join('')}</div></div>`:''}
      ${proj?`<div class="rm-sec"><div class="rm-sec-ttl">Projects</div>${proj}</div>`:''}
      ${certs?`<div class="rm-sec"><div class="rm-sec-ttl">Certifications</div>${certs}</div>`:''}
    </div>`;
  };

  const buildExecutive = (accent) => {
    const f = state.fields;
    const contacts = [f.email, f.phone, f.location, f.linkedin, f.portfolio, f.github].filter(Boolean);

    const exp = state.experience.filter(e=>e.title||e.company).map(e=>`
      <div class="re-exp">
        <div class="re-exp-top"><span class="re-exp-ttl">${esc(e.title||'')}</span><span class="re-exp-dates">${fmtDate(e.startDate)}${e.startDate?' – ':''}${e.endDate?fmtDate(e.endDate):e.startDate?'Present':''}</span></div>
        <div class="re-exp-co">${esc(e.company||'')}</div>
        ${e.description?`<div class="re-exp-desc">${esc(e.description)}</div>`:''}
      </div>`).join('');

    const edu = state.education.filter(e=>e.degree||e.institution).map(e=>`
      <div class="re-edu">
        <div class="re-edu-deg">${esc(e.degree||'')}</div>
        <div class="re-edu-meta">${[esc(e.institution||''),e.year,e.gpa?'GPA '+e.gpa:''].filter(Boolean).join(' · ')}</div>
      </div>`).join('');

    const proj = state.projects.filter(p=>p.name).map(p=>`
      <div class="re-proj">
        <div class="re-proj-name">${esc(p.name)}${p.tech?` <span style="font-weight:400;font-size:7.5px;color:#888">${esc(p.tech)}</span>`:''}</div>
        ${p.description?`<div class="re-proj-desc">${esc(p.description)}</div>`:''}
      </div>`).join('');

    const certs = state.certs.filter(c=>c.name).map(c=>`<div class="re-cert">${esc(c.name)}${c.issuer?' — '+esc(c.issuer):''}</div>`).join('');

    return `<div class="re-wrap">
      <div class="re-header">
        <div class="re-name">${esc(f.fullName)||'<span style="color:rgba(255,255,255,.3)">Your Name</span>'}</div>
        ${f.jobTitle?`<div class="re-role">${esc(f.jobTitle)}</div>`:''}
        ${contacts.length?`<div class="re-contacts">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}</div>`:''}
      </div>
      <div class="re-accent-line"></div>
      <div class="re-body">
        ${f.summary?`<div class="re-sec"><div class="re-sec-ttl">Executive Summary</div><div class="re-summary">${esc(f.summary)}</div></div>`:''}
        ${exp?`<div class="re-sec"><div class="re-sec-ttl">Professional Experience</div>${exp}</div>`:''}
        ${state.skills.length?`<div class="re-sec"><div class="re-sec-ttl">Core Competencies</div><div class="re-skills">${state.skills.map(s=>`<span class="re-skill">${esc(s)}</span>`).join('')}</div></div>`:''}
        ${edu?`<div class="re-sec"><div class="re-sec-ttl">Education</div>${edu}</div>`:''}
        ${proj?`<div class="re-sec"><div class="re-sec-ttl">Notable Projects</div>${proj}</div>`:''}
        ${certs?`<div class="re-sec"><div class="re-sec-ttl">Certifications & Awards</div>${certs}</div>`:''}
      </div>
    </div>`;
  };

  const buildCreative = (accent) => {
    const f = state.fields;
    const exp = state.experience.filter(e=>e.title||e.company).map(e=>`
      <div class="cr-item">
        <div class="cr-title">${esc(e.title||'')}</div>
        <div class="cr-subtitle">${esc(e.company||'')} ${fmtDate(e.startDate)?'·':''}  ${fmtDate(e.startDate)}</div>
        ${e.description?`<div class="cr-desc">${esc(e.description)}</div>`:''}
      </div>`).join('');
    const edu = state.education.filter(e=>e.degree||e.institution).map(e=>`
      <div class="cr-item">
        <div class="cr-title">${esc(e.degree||'')}</div>
        <div class="cr-subtitle">${esc(e.institution||'')} ${e.year?'·':''} ${e.year}</div>
      </div>`).join('');
    const skills = state.skills.map(s=>`<span class="cr-skill">${esc(s)}</span>`).join('');
    return `<div class="cr-page">
      <div class="cr-header">
        <div class="cr-accent-bar"></div>
        <div class="cr-name">${esc(f.fullName)}</div>
        <div class="cr-job">${esc(f.jobTitle)}</div>
        <div class="cr-contact">${[f.email,f.phone,f.location,f.linkedin,f.portfolio,f.github].filter(Boolean).map(c=>`<span>${esc(c)}</span>`).join(' · ')}</div>
      </div>
      <div class="cr-body">
        ${f.summary?`<div class="cr-section"><div class="cr-section-title">Profile</div><div class="cr-text">${esc(f.summary)}</div></div>`:''}
        ${exp?`<div class="cr-section"><div class="cr-section-title">Experience</div>${exp}</div>`:''}
        ${skills?`<div class="cr-section"><div class="cr-section-title">Skills</div><div class="cr-skills">${skills}</div></div>`:''}
        ${edu?`<div class="cr-section"><div class="cr-section-title">Education</div>${edu}</div>`:''}
      </div>
    </div>`;
  };

  const buildMinimalist = (accent) => {
    const f = state.fields;
    const exp = state.experience.filter(e=>e.title||e.company).map(e=>`
      <div class="min-row">
        <span class="min-dot"></span>
        <div class="min-content">
          <div class="min-title">${esc(e.title||'')} <span class="min-co">@ ${esc(e.company||'')}</span></div>
          <div class="min-date">${fmtDate(e.startDate)}${e.startDate?' – ':''}${e.endDate?fmtDate(e.endDate):e.startDate?'Present':''}</div>
          ${e.description?`<div class="min-desc">${esc(e.description)}</div>`:''}
        </div>
      </div>`).join('');
    const edu = state.education.filter(e=>e.degree||e.institution).map(e=>`
      <div class="min-row">
        <span class="min-dot"></span>
        <div class="min-content">
          <div class="min-title">${esc(e.degree||'')}</div>
          <div class="min-date">${esc(e.institution||'')} · ${e.year}</div>
        </div>
      </div>`).join('');
    const skills = state.skills.slice(0,16).map(s=>`<span class="min-tag">${esc(s)}</span>`).join('');
    return `<div class="min-page">
      <div class="min-header">
        <h1>${esc(f.fullName)}</h1>
        <p>${esc(f.jobTitle)}</p>
        <div class="min-meta">${[f.email,f.phone,f.location,f.linkedin,f.portfolio,f.github].filter(Boolean).map(c=>`<span>${esc(c)}</span>`).join(' • ')}</div>
      </div>
      <div class="min-divider"></div>
      ${f.summary?`<section><h2>About</h2><p>${esc(f.summary)}</p></section>`:''}
      ${exp?`<section><h2>Experience</h2>${exp}</section>`:''}
      ${skills?`<section><h2>Skills</h2><div class="min-tags">${skills}</div></section>`:''}
      ${edu?`<section><h2>Education</h2>${edu}</section>`:''}
    </div>`;
  };

  const buildAcademic = (accent) => {
    const f = state.fields;
    const exp = state.experience.filter(e=>e.title||e.company).map(e=>`
      <div class="ac-exp">
        <div class="ac-exp-header">
          <span class="ac-exp-role"><strong>${esc(e.title||'')}</strong></span>
          <span class="ac-exp-date">${fmtDate(e.startDate)}–${e.endDate?fmtDate(e.endDate):'Present'}</span>
        </div>
        <div class="ac-exp-co"><em>${esc(e.company||'')}</em></div>
        ${e.description?`<div class="ac-exp-desc">${esc(e.description)}</div>`:''}
      </div>`).join('');
    const edu = state.education.filter(e=>e.degree||e.institution).map(e=>`
      <div class="ac-edu">
        <strong>${esc(e.degree||'')}</strong>
        <div>${esc(e.institution||'')}${e.year?' ('+e.year+')':''}</div>
        ${e.gpa?`<div style="font-size:9px;color:#666">GPA: ${esc(e.gpa)}</div>`:''}
      </div>`).join('');
    const skills = state.skills.map(s=>`<span>${esc(s)}</span>`).join(' • ');
    return `<div class="ac-page">
      <div class="ac-header">
        <h1>${esc(f.fullName)||'Applicant Name'}</h1>
        ${f.jobTitle?`<h3>${esc(f.jobTitle)}</h3>`:''}
        <p>${[f.email,f.phone,f.location,f.linkedin,f.portfolio,f.github].filter(Boolean).map(c=>`<span>${esc(c)}</span>`).join(' | ')}</p>
      </div>
      ${f.summary?`<div class="ac-section"><h4>Professional Summary</h4><p>${esc(f.summary)}</p></div>`:''}
      ${exp?`<div class="ac-section"><h4>Professional Experience</h4>${exp}</div>`:''}
      ${state.projects.length || state.certPhotos.length?`<div class="ac-section"><h4>Projects & Achievements</h4>${state.projects.filter(p=>p.name).map(p=>`<p><strong>${esc(p.name)}</strong> — ${esc(p.description||'')}</p>`).join('')}</div>`:''}
      ${edu?`<div class="ac-section"><h4>Education</h4>${edu}</div>`:''}
      ${skills?`<div class="ac-section"><h4>Core Competencies</h4><p>${skills}</p></div>`:''}
    </div>`;
  };

  const init = () => {
    setTimeout(() => $('shimmerScreen').classList.add('gone'), 750);
    initNavLinks();
    initNav();
    initFields();
    initPhoto();
    initDynLists();
    initSkills();
    initDesign();
    initAiEnhance();
    initZoom();
    initExport();
    initSaveDraftBtn();
    initReset();
    initMobilePreview();
    syncStepUI();
    renderResume();
    setTimeout(restoreDraft, 900);
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', RC.init);
