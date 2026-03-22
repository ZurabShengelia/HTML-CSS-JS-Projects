'use strict';
 
const products = [
  { id:1, name:"GEO Whey Isolate", category:"Protein", price:59.99, oldPrice:74.99, badge:"BESTSELLER", badgeColor:"", rating:5, reviews:312, image:"Images/Protein_Isolate.png", description:"Ultra-pure whey protein isolate with 27g protein per serving. Cold-processed to preserve bioactive fractions. No artificial colors or fillers. Perfect for post-workout recovery and lean muscle growth." },
  { id:2, name:"GEO Protein Concentrate", category:"Protein", price:54.99, oldPrice:69.99, badge:"POPULAR", badgeColor:"", rating:5, reviews:298, image:"Images/Protein_Concentrate.png", description:"Premium whey protein concentrate with 24g protein per serving. Excellent amino acid profile with natural flavor. Ideal for muscle building and post-workout nutrition with superior mixability." },
  { id:3, name:"GEO Mass Gainer", category:"Gainer", price:69.99, oldPrice:null, badge:"NEW", badgeColor:"blue", rating:4, reviews:89, image:"Images/Mass Gainer.png", description:"High-calorie mass builder with 50g protein and 250g carbs per serving. Engineered for hardgainers who need serious caloric surplus to build muscle mass. Fortified with digestive enzymes." },
  { id:4, name:"GEO Plant Protein", category:"Protein", price:49.99, oldPrice:null, badge:null, badgeColor:"", rating:4, reviews:156, image:"Images/Plant Protein.png", description:"Complete plant-based protein blend from pea, brown rice, and hemp. 24g protein per serving. Smooth texture, no chalky taste. Ideal for vegans and those with dairy sensitivities." },
  { id:5, name:"GEO Creatine Monohydrate", category:"Creatine", price:29.99, oldPrice:39.99, badge:"BESTSELLER", badgeColor:"", rating:5, reviews:521, image:"Images/Creatine_Monohydrate.png", description:"Pharmaceutical-grade creatine monohydrate. 5g per serving, Creapure® certified. The most researched supplement in sports science — proven to increase strength, power, and muscle mass." },
  { id:6, name:"GEO Pre-Ignite", category:"Pre-Workout", price:44.99, oldPrice:54.99, badge:"HOT", badgeColor:"red", rating:5, reviews:287, image:"Images/Pre-ignite.png", description:"High-stimulant pre-workout formula with 300mg caffeine, beta-alanine, and citrulline malate. Engineered for intense training sessions. Delivers explosive energy, focus, and skin-splitting pumps." },
  { id:7, name:"GEO Pump Formula", category:"Pre-Workout", price:39.99, oldPrice:null, badge:null, badgeColor:"", rating:4, reviews:143, image:"Images/Pump_Formula.png", description:"Stimulant-free pre-workout focused entirely on blood flow and muscle pumps. Contains 8g L-citrulline, 3g glycerpump, and 2g betaine. Perfect for those who train in the evening." },
  { id:8, name:"GEO Multivitamin Elite", category:"Vitamins", price:34.99, oldPrice:44.99, badge:null, badgeColor:"", rating:4, reviews:198, image:"Images/Multi Vitamine.png", description:"Comprehensive multivitamin engineered for active individuals. 30+ vitamins and minerals at clinically effective doses. Enhanced with fruit and vegetable extracts for added antioxidant support." },
  { id:9, name:"GEO Omega-3 Ultra", category:"Omega-3", price:32.99, oldPrice:null, badge:null, badgeColor:"", rating:5, reviews:234, image:"Images/Omega3.png", description:"Ultra-concentrated fish oil with 3g EPA+DHA per serving. Molecularly distilled for purity. Supports cardiovascular health, joint recovery, and cognitive function. Enteric coated — no fishy burps." },
  { id:10, name:"GEO D3+K2 Complex", category:"Vitamin D3+K2", price:24.99, oldPrice:null, badge:null, badgeColor:"", rating:5, reviews:167, image:"Images/D3K2.png", description:"The ultimate combination for bone health, immune function, and testosterone optimization. 5000 IU Vitamin D3 paired with 100mcg Vitamin K2 (MK-7) to ensure calcium goes where it belongs." },
  { id:11, name:"GEO Zinc Bisglycinate", category:"Zinc", price:19.99, oldPrice:null, badge:null, badgeColor:"", rating:4, reviews:112, image:"Images/Zinc.png", description:"Highly bioavailable zinc bisglycinate form — 50mg elemental zinc per serving. Essential for testosterone production, immune defense, and protein synthesis. Gentle on the stomach." },
  { id:12, name:"GEO Ashwagandha KSM-66", category:"Ashwagandha", price:27.99, oldPrice:34.99, badge:"BESTSELLER", badgeColor:"", rating:5, reviews:389, image:"Images/Ashwagandha_KSM-66.png", description:"Premium KSM-66 Ashwagandha root extract — the world's most studied ashwagandha. 600mg per serving. Clinically proven to reduce cortisol, improve testosterone levels, and enhance recovery." },
  { id:13, name:"GEO Ashwagandha + Shilajit", category:"Ashwagandha", price:39.99, oldPrice:null, badge:"NEW", badgeColor:"blue", rating:4, reviews:67, image:"Images/GEO_Ashwagandha Shilajit.png", description:"Advanced adaptogenic stack combining 600mg KSM-66 ashwagandha with purified Himalayan shilajit. The ultimate stress-resilience and vitality formula for peak performers." },
  { id:14, name:"GEO Magnesium Glycinate", category:"Magnesium", price:26.99, oldPrice:null, badge:null, badgeColor:"", rating:5, reviews:276, image:"Images/Magnesium_Glycinate.png", description:"400mg magnesium glycinate — the most absorbable form for relaxation, sleep quality, and muscle recovery. Essential mineral depleted by intense training. No laxative effect unlike magnesium oxide." },
  { id:15, name:"GEO Magnesium Malate", category:"Magnesium", price:28.99, oldPrice:null, badge:null, badgeColor:"", rating:4, reviews:134, image:"Images/Magnesium_Malate.png", description:"Magnesium malate — the energizing form of magnesium. 400mg per serving. Bound to malic acid for superior absorption and energy metabolism support. Ideal for daytime use." },
];
 
const reviewsData = [
  { name:"Marcus T.", tag:"Pro Athlete", avatar:"M", rating:5, text:"The Whey Isolate is seriously next-level. Mixes instantly, tastes incredible, and my recovery has been noticeably faster. Been using it for 6 months straight." },
  { name:"Sarah K.", tag:"CrossFit Coach", avatar:"S", rating:5, text:"The Ashwagandha KSM-66 changed my sleep quality overnight. I'm managing stress better and my performance metrics are consistently improving. Can't recommend it enough." },
  { name:"Jordan R.", tag:"Powerlifter", avatar:"J", rating:5, text:"GEO Creatine is the cleanest I've tried. No bloating, no water weight drama — just pure strength gains. I'm hitting PRs I never thought possible. Worth every penny." },
  { name:"Lisa M.", tag:"Marathon Runner", avatar:"L", rating:4, text:"The Omega-3 Ultra has been amazing for joint health during heavy training cycles. No fishy taste whatsoever. My inflammation is way down and my knees feel better than they have in years." },
  { name:"Derek W.", tag:"Bodybuilder", avatar:"D", rating:5, text:"Pre-Ignite is absolutely elite. Clean energy that lasts 3+ hours with no crash. The focus is insane. I've tried everything on the market and nothing comes close to this formula." },
  { name:"Anya P.", tag:"Personal Trainer", avatar:"A", rating:5, text:"I recommend GEO to every single one of my clients. Third-party tested, transparent labeling, and the results speak for themselves. Finally a brand that actually delivers." },
];
 
const articlesData = [
  { id:1, title:"The Complete Guide to Protein Supplementation", icon:"fa-dumbbell", category:"Nutrition", readTime:"8 min read", excerpt:"When to take protein, how much you need, and which types work best for your specific training goals. Science-backed protocols for maximum results.", content:"Protein supplementation has revolutionized how athletes approach muscle growth and recovery. Whether you're a competitive bodybuilder, CrossFit athlete, or casual gym-goer, understanding protein timing, quantity, and type is crucial.\n\n**PROTEIN QUANTITY**\nThe consensus among sports nutritionists is 0.7-1g of protein per pound of body weight daily. For a 200lb athlete, that's 140-200g daily spread across 4-5 meals.\n\n**PROTEIN TIMING**\nWhile total daily intake matters most, consuming 20-40g protein within 1-2 hours post-workout optimizes muscle protein synthesis. Whey isolate is ideal here due to fast absorption.\n\n**PROTEIN TYPES**\nWhey Isolate: 27g protein, fastest absorption, perfect post-workout\nWhey Concentrate: 24g protein, more lactose, cost-effective\nPlant-Based: Complete amino profiles, excellent for vegans\n\nConsistency beats perfection. Track your intake for 2 weeks to establish your baseline." },
  { id:2, title:"Pre-Workout Timing: Maximize Your Performance", icon:"fa-fire", category:"Training", readTime:"6 min read", excerpt:"Science-backed timing strategies for optimal energy and focus during training. Find the ideal pre-workout window for your specific training style.", content:"Pre-workout timing is a science. Take it too early and you're crashing by set 5. Too late and the caffeine hasn't kicked in. Here's the exact protocol most elite athletes use.\n\n**THE OPTIMAL WINDOW**\nFor caffeine-based pre-workouts: 45-60 minutes before training\nFor pump-focused (stim-free): 30-45 minutes before\n\n**WHY THIS TIMING WORKS**\nCaffeine peaks in blood plasma 30-60 minutes after ingestion. Beta-alanine and L-Citrulline take 45+ minutes to fully saturate muscles. Syncing these windows gives you maximum performance during peak exertion.\n\n**GI CONSIDERATIONS**\nIf you're sensitive to stomach upset, take with light carbs (banana, rice crisp) 15 minutes prior. This buffers gastric distress while maintaining absorption.\n\n**TESTING YOUR WINDOW**\nTry 45 minutes on first heavy compound movement. Adjust ±15 minutes based on when you feel peak energy and focus during your most critical lifts." },
  { id:3, title:"Recovery Nutrition: Build Muscle While You Sleep", icon:"fa-moon", category:"Recovery", readTime:"7 min read", excerpt:"How proper post-workout and pre-sleep nutrition dramatically accelerates muscle growth, repair, and recovery between sessions.", content:"Muscle doesn't grow in the gym — it grows during recovery. The 24-36 hour window after training is when your body repairs micro-tears and adds contractile proteins. Nutrition during this window determines whether you gain 1lb or 5lbs of muscle mass per month.\n\n**POST-WORKOUT (0-2 HOURS)**\n40g fast-digesting protein (whey isolate)\n60g fast carbs (white rice, dextrose, banana)\nCreatine: 5g (if you're on a protocol)\n\n**EVENING MEAL (4-6 HOURS POST)**\n30g protein (any source)\n40g complex carbs\n10-15g healthy fats\n\n**PRE-SLEEP (30 MINS BEFORE BED)**\n30g casein, cottage cheese, or Greek yogurt\n1 magnesium glycinate (400mg) — enhances sleep quality AND recovery\nOptional: 2-3g conjugated linoleic acid (CLA)\n\n**THE SCIENCE**\nDuring REM sleep, growth hormone peaks. Slow-digesting casein ensures amino acid availability throughout the night. Combined with proper magnesium, you're optimizing every recovery variable." },
  { id:4, title:"Adaptogens for Athletes: The Science of Stress", icon:"fa-brain", category:"Supplementation", readTime:"9 min read", excerpt:"How Ashwagandha, Shilajit, and other adaptogens can lower cortisol, improve testosterone, and make you a more resilient competitor.", content:"Adaptogens are non-toxic herbs that help your body adapt to stress. For athletes juggling training, nutrition, sleep, and life stress, adaptogens can be game-changers. Let's break down the science.\n\n**ASHWAGANDHA (KSM-66 PREFERRED)**\nDosage: 600mg daily\nEffect: Reduces cortisol by 27-28%, increases testosterone by 17-18%\nBest used: During high-stress training blocks\nMechanism: Blocks stress hormone signaling at the cellular level\n\n**SHILAJIT (PURIFIED)**\nDosage: 300-500mg daily\nEffect: Increases ATP production (cellular energy), improves mitochondrial function\nBest used: Daily for sustained energy and recovery\nBonus: Contains 85+ minerals and fulvic acid for nutrient absorption\n\n**RHODIOLA ROSEA**\nDosage: 300-600mg daily\nEffect: Reduces mental fatigue, improves endurance performance\nBest used: During competition phases\n\n**STACK RECOMMENDATION**\nKSM-66 Ashwagandha: 600mg daily (morning or evening)\nShilajit: 400mg daily (morning with food)\nThis combination addresses both physical and mental stress resilience." },
  { id:5, title:"Creatine: Everything You Need to Know in 2026", icon:"fa-bolt", category:"Supplementation", readTime:"10 min read", excerpt:"The most researched supplement in sports science, decoded. Loading phases, maintenance doses, timing, and what the latest studies actually show.", content:"Creatine monohydrate is the single most researched supplement ever created — over 1000 peer-reviewed studies confirm its safety and efficacy. Yet myths persist. Here's what the actual science says.\n\n**DO YOU NEED A LOADING PHASE?**\nNo. It's optional and only saves 5-7 days.\nLoading protocol: 20g/day split into 4x5g doses for 5-7 days, then 3-5g daily\nNo loading: Just 3-5g daily for 3-4 weeks until saturation\nResult: Same endpoint, different timeline\n\n**HOW MUCH TO TAKE**\n3-5g daily (5g is standard dose)\nBased on body weight: 0.03g per lb\n200lb athlete = 6g daily optimal\n\n**BEST TIMING**\nWith a meal containing carbs and protein (maximizes absorption via glucose-SGLT1 transporter)\nTime of day doesn't matter — creatine works via cumulative saturation, not acute timing\n\n**REAL RESULTS YOU CAN EXPECT**\nStrength: +5-10% in compound movements by week 4\nMuscle mass: +2-5lbs (includes water, which is normal and desirable)\nReps: +1-2 extra reps on max effort sets\nTimeline: Most benefit visible by week 3-4\n\n**TRUTH ABOUT SIDE EFFECTS**\nWater retention: Normal, beneficial for joint health\nHair loss: Zero scientific evidence\nKidney damage: Only in people with pre-existing kidney disease\nDehydration: Increase water intake by 0.5-1L daily" },
  { id:6, title:"Vitamin D3 & K2: The Athlete's Unsung Heroes", icon:"fa-sun", category:"Nutrition", readTime:"8 min read", excerpt:"Why nearly every athlete is deficient, and what optimal levels actually look like for performance, testosterone, and immune resilience.", content:"Most athletes are deficient in Vitamin D3, even those training outdoors regularly. This deficiency costs them 15-20% of potential performance gains, recovery speed, and testosterone levels. Here's the science and the fix.\n\n**DEFICIENCY EPIDEMIC**\nOptimal blood level: 50-80 ng/mL\nAverage athlete: 25-35 ng/mL\nDeficiency (<20 ng/mL): Impairs testosterone, recovery, immune function\n\n**WHY ATHLETES ARE DEFICIENT**\nSun exposure insufficient (need 20-30 mins midday, year-round)\nIndoor training (most athletes train early morning or evening)\nSkin tone (darker skin requires 3-6x more sun exposure)\nGeographic location (winter months produce zero D3)\n\n**THE D3+K2 SYNERGY**\nVitamin D3 increases calcium absorption\nVitamin K2 ensures calcium goes to bones/teeth, NOT arteries\nWithout K2, D3 supplementation can increase arterial calcification\nAlways pair them: 5000 IU D3 + 100mcg K2 (MK-7) daily\n\n**PERFORMANCE BENEFITS**\nTestosterone: +25-30% at optimal D3 levels\nRecovery speed: Faster protein synthesis\nMuscle soreness: Reduced DOMS by 20-25%\nImmune function: 40% fewer colds/infections\nBone density: Massive advantage for athletes over 40\n\n**TESTING & PROTOCOL**\nGet blood test: Ask for 25-hydroxy vitamin D3\nTarget: 60-70 ng/mL\nDosing: 5000 IU daily (or 50000 IU once weekly for compliance)" },
];
 
let cart = [];
try { cart = JSON.parse(localStorage.getItem('geoCart') || '[]'); } catch(e) { cart = []; }
let currentFilter = 'All';
let searchQuery = '';
let modalProductId = null;
let modalQtyVal = 1;
let modalBasePrice = 0;
 
function $(id) { return document.getElementById(id); }
function $$(sel) { return document.querySelectorAll(sel); }
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
 
function saveCart() {
  try { localStorage.setItem('geoCart', JSON.stringify(cart)); } catch(e) {}
}
 
function addToCart(productId, qty = 1) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const existing = cart.find(x => x.id === productId);
  if (existing) { existing.qty = Math.min(existing.qty + qty, 99); }
  else { cart.push({ id: productId, qty }); }
  saveCart();
  updateCartUI();
  showToast(p.name, qty);
}
 
function removeFromCart(productId) {
  cart = cart.filter(x => x.id !== productId);
  saveCart();
  updateCartUI();
  renderCart();
}
 
function changeQty(productId, delta) {
  const item = cart.find(x => x.id === productId);
  if (!item) return;
  item.qty = Math.max(1, Math.min(item.qty + delta, 99));
  saveCart();
  updateCartUI();
  renderCart();
}
 
function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
 
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}
 
function updateCartUI() {
  const countEl = $('cartCount');
  const totalEl = $('cartTotal');
  if (!countEl || !totalEl) return;
  const count = getCartCount();
  countEl.textContent = count;
  totalEl.textContent = '$' + getCartTotal().toFixed(2);
  
  countEl.style.transform = 'scale(1.4)';
  setTimeout(() => { countEl.style.transform = ''; }, 200);
}
 
function renderCart() {
  const el = $('cartItems');
  if (!el) return;
  if (cart.length === 0) {
    el.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <div class="cart-empty-text">CART IS EMPTY</div>
      <p style="color:var(--text3);font-size:12px;font-family:var(--font-mono);letter-spacing:1px;margin-top:4px">Add some products to get started</p>
    </div>`;
    return;
  }
  el.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    return `<div class="cart-item">
      <img class="cart-item-img" src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-cat">${p.category}</div>
        <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty">
          <button onclick="changeQty(${p.id},-1)" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${p.id},1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${p.id})">Remove</button>
      </div>
    </div>`;
  }).join('');
}
 
function showToast(name, qty) {
  const container = $('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<div class="toast-icon">✅</div>
    <div class="toast-text">
      <strong>${name}</strong>
      <span>×${qty} added to cart</span>
      <div class="toast-bar"></div>
    </div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 2800);
}
 
function showToast2(msg, type = 'success') {
  const container = $('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? '✅' : '⚠️';
  toast.innerHTML = `<div class="toast-icon">${icon}</div>
    <div class="toast-text">
      <strong>${msg}</strong>
      <div class="toast-bar"></div>
    </div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3200);
}
 
function renderStars(rating, wrapClass = 'stars') {
  let html = `<div class="${wrapClass}">`;
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star${i > rating ? ' empty' : ''}">★</span>`;
  }
  html += '</div>';
  return html;
}
 
function updateModalPrice() {
  const totalPrice = (modalBasePrice * modalQtyVal).toFixed(2);
  $('modalPrice').textContent = '$' + totalPrice;
}
 
function openProductModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  modalProductId = productId;
  modalQtyVal = 1;
  modalBasePrice = p.price;
  const modalEl = $('productModal');
  if (!modalEl) return;
  $('modalQty').value = 1;
  $('modalImg').src = p.image;
  $('modalImg').alt = p.name;
  $('modalCat').textContent = p.category;
  $('modalName').textContent = p.name;
  $('modalDesc').textContent = p.description;
  updateModalPrice();
  $('modalOldPrice').textContent = p.oldPrice ? '$' + p.oldPrice.toFixed(2) : '';
  $('modalStars').innerHTML = renderStars(p.rating) + `<span style="font-size:11px;color:var(--text3);font-family:var(--font-mono)">(${p.reviews} reviews)</span>`;
  modalEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeProductModal() {
  const modalEl = $('productModal');
  if (modalEl) modalEl.classList.remove('open');
  document.body.style.overflow = '';
}
 
function openCart() {
  renderCart();
  const overlay = $('cartOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateCartUI();
}
 
function closeCart() {
  const overlay = $('cartOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
function renderProducts(filter = 'All', query = '') {
  const grid = $('productsGrid');
  if (!grid) return;
  let filtered = filter === 'All' ? [...products] : products.filter(p => p.category === filter);
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-products">NO PRODUCTS FOUND</div>`;
    return;
  }
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card reveal" style="transition-delay:${i * 40}ms" onclick="openProductModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<div class="product-badge ${p.badgeColor || ''}">${p.badge}</div>` : ''}
        <div class="product-overlay">
          <button class="overlay-btn" onclick="event.stopPropagation();addToCart(${p.id})">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        ${renderStars(p.rating)}<span class="review-count">(${p.reviews})</span>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom">
          <div style="display:flex;align-items:baseline;gap:6px">
            <div class="product-price">$${p.price.toFixed(2)}</div>
            ${p.oldPrice ? `<div class="product-price-old">$${p.oldPrice.toFixed(2)}</div>` : ''}
          </div>
          <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})" aria-label="Add to cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>`).join('');
  observeReveal();
  
  attachCursorListeners();
}
 
function renderFilters() {
  const bar = $('filterBar');
  if (!bar) return;
  const cats = ['All', ...new Set(products.map(p => p.category))];
  bar.innerHTML = cats.map(c =>
    `<button class="filter-btn${c === 'All' ? ' active' : ''}" onclick="setFilter('${c}',this)">${c}</button>`
  ).join('');
}
 
function setFilter(cat, btn) {
  currentFilter = cat;
  $$('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts(cat, searchQuery);
}
 
function filterByCategory(cat) {
  if (!$('filterBar') || !$('productsGrid')) {
    
    window.location.href = `shop.html?cat=${encodeURIComponent(cat)}`;
    return;
  }
  currentFilter = cat;
  $$('.filter-btn').forEach(b => {
    b.classList.remove('active');
    if (b.textContent.trim() === cat) b.classList.add('active');
  });
  $$('.cat-card').forEach(c => c.classList.remove('active'));
  const catCard = qs(`[data-cat="${cat}"]`);
  if (catCard) catCard.classList.add('active');
  renderProducts(cat, searchQuery);
  const shopSection = $('shop');
  if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
}
 
function renderFeatured() {
  const el = $('featuredList');
  if (!el) return;
  const featured = products.filter(p => p.badge === 'BESTSELLER').slice(0, 4);
  el.innerHTML = featured.map(p => `
    <div class="featured-item" onclick="openProductModal(${p.id})">
      <img class="featured-item-img" src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="featured-item-info">
        <div class="featured-item-name">${p.name}</div>
        <div class="featured-item-cat">${p.category}</div>
        <div class="featured-item-price">$${p.price.toFixed(2)}</div>
      </div>
      <div class="featured-arrow">→</div>
    </div>`).join('');
}
 
function renderReviews() {
  const grid = $('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = reviewsData.map((r, i) => `
    <div class="review-card reveal" style="transition-delay:${i * 80}ms">
      <div class="review-stars">
        ${Array.from({length:5}, (_,j) => `<span style="color:${j<r.rating?'var(--green)':'var(--border2)'};font-size:14px">★</span>`).join('')}
      </div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-tag">${r.tag}</div>
        </div>
      </div>
    </div>`).join('');
}
 
let revealObserver = null;
function observeReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  $$('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (!el.classList.contains('visible')) revealObserver.observe(el);
  });
}
 
function initParticles() {
  const canvas = $('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], w, h;
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.35 + 0.08,
      color: Math.random() > 0.55 ? '0,255,135' : '0,180,255'
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,255,135,${0.05*(1-dist/110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
 
let cursorEl, cursorRingEl, mx = 0, my = 0, rx = 0, ry = 0;
 
function attachCursorListeners() {
  $$('a, button, [onclick], .product-card, .cat-card, .featured-item, .filter-btn').forEach(el => {
    if (el._cursorBound) return;
    el._cursorBound = true;
    el.addEventListener('mouseenter', () => { cursorEl?.classList.add('active'); cursorRingEl?.classList.add('active'); });
    el.addEventListener('mouseleave', () => { cursorEl?.classList.remove('active'); cursorRingEl?.classList.remove('active'); });
  });
}
 
function initCursor() {
  cursorEl = $('cursor');
  cursorRingEl = $('cursorRing');
  if (!cursorEl || !cursorRingEl) return;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorEl.style.left = mx + 'px';
    cursorEl.style.top = my + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursorEl.classList.add('hidden');
    cursorRingEl.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursorEl.classList.remove('hidden');
    cursorRingEl.classList.remove('hidden');
  });
  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    cursorRingEl.style.left = rx + 'px';
    cursorRingEl.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  attachCursorListeners();
}
 
function initNavbar() {
  const nav = $('navbar');
  if (!nav) return;
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const page = href.split('/').pop().split('#')[0];
    if (page === currentPage || (currentPage === '' && page === 'index.html')) {
      a.classList.add('active');
    }
  });
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}
 
function initHamburger() {
  const hamburger = $('hamburger');
  const mobileMenu = $('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMobile(); closeProductModal(); closeCart(); }
  });
}
 
function closeMobile() {
  const hamburger = $('hamburger');
  const mobileMenu = $('mobileMenu');
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
 
function initModal() {
  const closeBtn = $('modalClose');
  const overlay = $('productModal');
  const minusBtn = $('modalQtyMinus');
  const plusBtn = $('modalQtyPlus');
  const addBtn = $('modalAddBtn');
  if (!overlay) return;
  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProductModal(); });
  if (minusBtn) minusBtn.addEventListener('click', () => {
    modalQtyVal = Math.max(1, modalQtyVal - 1);
    const qtyEl = $('modalQty');
    if (qtyEl) qtyEl.value = modalQtyVal;
    updateModalPrice();
  });
  if (plusBtn) plusBtn.addEventListener('click', () => {
    modalQtyVal = Math.min(10, modalQtyVal + 1);
    const qtyEl = $('modalQty');
    if (qtyEl) qtyEl.value = modalQtyVal;
    updateModalPrice();
  });
  if (addBtn) addBtn.addEventListener('click', () => {
    if (modalProductId) { addToCart(modalProductId, modalQtyVal); closeProductModal(); }
  });
}
 
function openAppModal(position) {
  const modal = $('appModal');
  const form = $('appForm');
  const posEl = $('appModalPosition');
  if (!modal) return;
  if (posEl) posEl.textContent = position;
  if (form) form.reset();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  window.currentPosition = position;
}
 
function closeAppModal() {
  const modal = $('appModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
 
function initAppModal() {
  const closeBtn = $('appModalClose');
  const overlay = $('appModal');
  const form = $('appForm');
  if (!overlay) return;
  if (closeBtn) closeBtn.addEventListener('click', closeAppModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAppModal(); });
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('appName')?.value || '';
    const email = $('appEmail')?.value || '';
    const phone = $('appPhone')?.value || '';
    const linkedin = $('appLinkedIn')?.value || '';
    const message = $('appMessage')?.value || '';
    const position = window.currentPosition || 'General Application';
    if (!name || !email || !message) {
      showToast2('Please fill in all required fields', 'error');
      return;
    }
    
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
      showToast2(`Application submitted for ${position}! We'll be in touch.`, 'success');
      closeAppModal();
      form.style.opacity = '1';
      form.style.pointerEvents = '';
      form.reset();
    }, 800);
  });
}
 
function openArticleModal(articleId) {
  const article = articlesData.find(a => a.id === articleId);
  if (!article) return;
  const modal = $('articleModal');
  if (!modal) return;
  $('articleIcon').innerHTML = `<i class="fa-solid ${article.icon}"></i>`;
  $('articleCategory').textContent = article.category;
  $('articleTitle').textContent = article.title;
  $('articleReadTime').textContent = article.readTime;
  $('articleContent').textContent = article.content;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);
}
 
function closeArticleModal() {
  const modal = $('articleModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
 
function initArticleModal() {
  const closeBtn = $('articleModalClose');
  const overlay = $('articleModal');
  if (!overlay) return;
  if (closeBtn) closeBtn.addEventListener('click', closeArticleModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeArticleModal(); });
}
 
function checkout() {
  if (cart.length === 0) {
    showToast2('Your cart is empty! Add some products first.', 'error');
    return;
  }
  const total = getCartTotal();
  const itemCount = getCartCount();
  closeCart();
  const checkoutEl = document.createElement('div');
  checkoutEl.id = 'checkoutModal';
  checkoutEl.className = 'checkout-modal-overlay active';
  checkoutEl.innerHTML = `<div class="checkout-modal">
    <button class="modal-close" onclick="closeCheckout()">\u2715</button>
    <div class="checkout-header">
      <div class="checkout-icon">\u2705</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase</p>
    </div>
    <div class="checkout-details">
      <div class="checkout-row">
        <span>Items</span>
        <span>${itemCount}</span>
      </div>
      <div class="checkout-row">
        <span>Subtotal</span>
        <span>$${(total * 0.95).toFixed(2)}</span>
      </div>
      <div class="checkout-row">
        <span>Shipping</span>
        <span>${total >= 60 ? 'FREE' : '$9.99'}</span>
      </div>
      <div class="checkout-row total">
        <span>Total</span>
        <span>$${(total >= 60 ? total : total + 9.99).toFixed(2)}</span>
      </div>
    </div>
    <div class="checkout-info">
      <p style="font-size:12px;color:var(--text3);margin-bottom:12px">Order #${Math.random().toString().substr(2, 10).toUpperCase()}</p>
      <p style="font-size:13px;color:var(--text2)">A confirmation email has been sent to your registered email address. Your order will be shipped within 1-2 business days.</p>
    </div>
    <button class="btn-primary" onclick="finishCheckout()" style="width:100%">Continue Shopping \u2192</button>
  </div>`;
  document.body.appendChild(checkoutEl);
  document.body.style.overflow = 'hidden';
}
 
function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
  document.body.style.overflow = '';
}
 
function finishCheckout() {
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  showToast2('Order placed successfully! Thank you for shopping with GEO Supplements!', 'success');
}
 
function initCart() {
  const cartBtn = $('cartBtn');
  const cartClose = $('cartClose');
  const cartOverlay = $('cartOverlay');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', e => { if (e.target === cartOverlay) closeCart(); });
  $$('.checkout-btn').forEach(btn => btn.addEventListener('click', checkout));
}
 
function initSearch() {
  const searchInput = $('searchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    renderProducts(currentFilter, searchQuery);
  });
}
 
function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat && $('filterBar')) {
    
    setTimeout(() => {
      const btn = Array.from($$('.filter-btn')).find(b => b.textContent.trim() === cat);
      setFilter(cat, btn || null);
    }, 50);
  }
}
 
function hideLoader() {
  const loader = $('loader');
  if (!loader) return;
  
  setTimeout(() => {
    loader.classList.add('hidden');
    observeReveal();
  }, 1200);
}
 
window.addEventListener('load', () => {
  try {
    initParticles();
    initCursor();
    initNavbar();
    initHamburger();
    initModal();
    initAppModal();
    initArticleModal();
    initCart();
    renderFilters();
    renderProducts();
    renderFeatured();
    renderReviews();
    initSearch();
    handleUrlParams();
    updateCartUI();
    initAuth();
    hideLoader();
  } catch(err) {
    console.error('[GEO] Init error:', err);
    
    const loader = $('loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 800);
  }
});
 
const AUTH_KEY   = 'geoUsers';
const SESSION_KEY = 'geoSession';
 
function getUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users) {
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(users)); } catch {}
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
function saveSession(user) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch {}
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}
function hashPassword(str) {
  
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(16);
}
 
let currentUser = getSession();
 
function updateAuthNav() {
  const loginBtn  = $('authLoginBtn');
  const userMenu  = $('authUserMenu');
  const userLabel = $('authUserLabel');
  if (!loginBtn || !userMenu) return;
 
  if (currentUser) {
    loginBtn.style.display  = 'none';
    userMenu.style.display  = 'flex';
    if (userLabel) {
      const initials = currentUser.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      userLabel.textContent = initials;
    }
    updateDropdownInfo();
  } else {
    loginBtn.style.display  = 'flex';
    userMenu.style.display  = 'none';
  }
}
 
function openAuthModal(tab = 'login') {
  const modal = $('authModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab);
  clearAuthErrors();
}
 
function closeAuthModal() {
  const modal = $('authModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  clearAuthErrors();
}
 
function switchAuthTab(tab) {
  const loginForm    = $('authLoginForm');
  const registerForm = $('authRegisterForm');
  const tabLogin     = $('authTabLogin');
  const tabRegister  = $('authTabRegister');
  if (!loginForm || !registerForm) return;
 
  if (tab === 'login') {
    loginForm.style.display    = 'flex';
    registerForm.style.display = 'none';
    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');
  } else {
    loginForm.style.display    = 'none';
    registerForm.style.display = 'flex';
    tabLogin?.classList.remove('active');
    tabRegister?.classList.add('active');
  }
  clearAuthErrors();
}
 
function clearAuthErrors() {
  $$('.auth-error').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
  $$('.auth-input').forEach(el => el.classList.remove('error'));
}
 
function showAuthError(id, msg) {
  const el = $(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
 
function handleRegister(e) {
  e.preventDefault();
  clearAuthErrors();
 
  const name     = $('regName')?.value.trim()     || '';
  const email    = $('regEmail')?.value.trim()    || '';
  const password = $('regPassword')?.value        || '';
  const confirm  = $('regConfirm')?.value         || '';
 
  let valid = true;
 
  if (name.length < 2) {
    showAuthError('regNameError', 'Name must be at least 2 characters.');
    $('regName')?.classList.add('error'); valid = false;
  }
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    showAuthError('regEmailError', 'Please enter a valid email address.');
    $('regEmail')?.classList.add('error'); valid = false;
  }
  if (password.length < 6) {
    showAuthError('regPasswordError', 'Password must be at least 6 characters.');
    $('regPassword')?.classList.add('error'); valid = false;
  }
  if (password !== confirm) {
    showAuthError('regConfirmError', 'Passwords do not match.');
    $('regConfirm')?.classList.add('error'); valid = false;
  }
  if (!valid) return;
 
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    showAuthError('regEmailError', 'An account with this email already exists.');
    $('regEmail')?.classList.add('error'); return;
  }
 
  const newUser = {
    id:        Date.now(),
    name,
    email:     email.toLowerCase(),
    password:  hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
 
  const { password: _pw, ...safeUser } = newUser;
  currentUser = safeUser;
  saveSession(safeUser);
 
  closeAuthModal();
  updateAuthNav();
  showToast2(`Welcome to GEO, ${name.split(' ')[0]}! 🎉`, 'success');
}
 
function handleLogin(e) {
  e.preventDefault();
  clearAuthErrors();
 
  const email    = $('loginEmail')?.value.trim() || '';
  const password = $('loginPassword')?.value     || '';
 
  let valid = true;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    showAuthError('loginEmailError', 'Please enter a valid email address.');
    $('loginEmail')?.classList.add('error'); valid = false;
  }
  if (!password) {
    showAuthError('loginPasswordError', 'Please enter your password.');
    $('loginPassword')?.classList.add('error'); valid = false;
  }
  if (!valid) return;
 
  const users = getUsers();
  const user  = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === hashPassword(password)
  );
 
  if (!user) {
    showAuthError('loginEmailError', 'Incorrect email or password.');
    $('loginEmail')?.classList.add('error');
    $('loginPassword')?.classList.add('error');
    return;
  }
 
  const { password: _pw, ...safeUser } = user;
  currentUser = safeUser;
  saveSession(safeUser);
 
  closeAuthModal();
  updateAuthNav();
  showToast2(`Welcome back, ${user.name.split(' ')[0]}! 💪`, 'success');
}
 
function logout() {
  currentUser = null;
  clearSession();
  updateAuthNav();
  closeUserDropdown();
  showToast2('You have been logged out.', 'success');
}
 
function toggleUserDropdown() {
  const drop = $('userDropdown');
  if (!drop) return;
  drop.classList.toggle('open');
}
 
function closeUserDropdown() {
  const drop = $('userDropdown');
  if (drop) drop.classList.remove('open');
}
 
function togglePasswordVisibility(inputId, btn) {
  const input = $(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.innerHTML = isText
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
}
 
function injectAuthHTML() {
  
  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'auth-modal-overlay';
  modal.innerHTML = `
    <div class="auth-modal" role="dialog" aria-modal="true" aria-label="Account">
      <button class="auth-modal-close" onclick="closeAuthModal()" aria-label="Close">✕</button>
      <div class="auth-logo">GEO</div>
 
      <div class="auth-tabs">
        <button id="authTabLogin"    class="auth-tab active" onclick="switchAuthTab('login')">Sign In</button>
        <button id="authTabRegister" class="auth-tab"        onclick="switchAuthTab('register')">Create Account</button>
      </div>
 
      <!-- LOGIN FORM -->
      <form id="authLoginForm" class="auth-form" onsubmit="handleLogin(event)" novalidate>
        <div class="auth-field">
          <label for="loginEmail">Email</label>
          <input id="loginEmail" class="auth-input" type="email" placeholder="you@example.com" autocomplete="email" required>
          <span id="loginEmailError" class="auth-error"></span>
        </div>
        <div class="auth-field">
          <label for="loginPassword">Password</label>
          <div class="auth-input-wrap">
            <input id="loginPassword" class="auth-input" type="password" placeholder="Your password" autocomplete="current-password" required>
            <button type="button" class="auth-eye" onclick="togglePasswordVisibility('loginPassword',this)" aria-label="Toggle password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <span id="loginPasswordError" class="auth-error"></span>
        </div>
        <button type="submit" class="auth-submit">Sign In →</button>
        <p class="auth-switch">No account? <button type="button" onclick="switchAuthTab('register')">Create one</button></p>
      </form>
 
      <!-- REGISTER FORM -->
      <form id="authRegisterForm" class="auth-form" style="display:none" onsubmit="handleRegister(event)" novalidate>
        <div class="auth-field">
          <label for="regName">Full Name</label>
          <input id="regName" class="auth-input" type="text" placeholder="Jane Doe" autocomplete="name" required>
          <span id="regNameError" class="auth-error"></span>
        </div>
        <div class="auth-field">
          <label for="regEmail">Email</label>
          <input id="regEmail" class="auth-input" type="email" placeholder="you@example.com" autocomplete="email" required>
          <span id="regEmailError" class="auth-error"></span>
        </div>
        <div class="auth-field">
          <label for="regPassword">Password</label>
          <div class="auth-input-wrap">
            <input id="regPassword" class="auth-input" type="password" placeholder="Min. 6 characters" autocomplete="new-password" required>
            <button type="button" class="auth-eye" onclick="togglePasswordVisibility('regPassword',this)" aria-label="Toggle password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <span id="regPasswordError" class="auth-error"></span>
        </div>
        <div class="auth-field">
          <label for="regConfirm">Confirm Password</label>
          <div class="auth-input-wrap">
            <input id="regConfirm" class="auth-input" type="password" placeholder="Repeat password" autocomplete="new-password" required>
            <button type="button" class="auth-eye" onclick="togglePasswordVisibility('regConfirm',this)" aria-label="Toggle password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <span id="regConfirmError" class="auth-error"></span>
        </div>
        <button type="submit" class="auth-submit">Create Account →</button>
        <p class="auth-switch">Have an account? <button type="button" onclick="switchAuthTab('login')">Sign in</button></p>
      </form>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) closeAuthModal(); });
 
  
  const nav = $('navbar');
  if (!nav) return;
  const navRight = nav.querySelector('[style*="display:flex"]') || nav.lastElementChild;
 
  
  const loginBtn = document.createElement('button');
  loginBtn.id = 'authLoginBtn';
  loginBtn.className = 'auth-nav-btn';
  loginBtn.innerHTML = '<i class="fa-solid fa-user"></i><span>Sign In</span>';
  loginBtn.onclick = () => openAuthModal('login');
 
  
  const userMenu = document.createElement('div');
  userMenu.id = 'authUserMenu';
  userMenu.className = 'auth-user-menu';
  userMenu.style.display = 'none';
  userMenu.innerHTML = `
    <button class="auth-avatar-btn" onclick="toggleUserDropdown()" aria-label="Account menu">
      <span id="authUserLabel">?</span>
      <i class="fa-solid fa-chevron-down" style="font-size:9px;color:var(--text3)"></i>
    </button>
    <div id="userDropdown" class="auth-dropdown">
      <div class="auth-dropdown-header">
        <div class="auth-dropdown-name" id="dropdownUserName"></div>
        <div class="auth-dropdown-email" id="dropdownUserEmail"></div>
      </div>
      <div class="auth-dropdown-divider"></div>
      <button class="auth-dropdown-item" onclick="logout()">
        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
      </button>
    </div>`;
 
  navRight.insertBefore(loginBtn, navRight.firstChild);
  navRight.insertBefore(userMenu, navRight.firstChild);
 
  
  document.addEventListener('click', e => {
    const menu = $('authUserMenu');
    if (menu && !menu.contains(e.target)) closeUserDropdown();
  });
}
 
function updateDropdownInfo() {
  const nameEl  = $('dropdownUserName');
  const emailEl = $('dropdownUserEmail');
  if (nameEl  && currentUser) nameEl.textContent  = currentUser.name;
  if (emailEl && currentUser) emailEl.textContent = currentUser.email;
}
 
function initAuth() {
  injectAuthHTML();
  updateAuthNav();
  if (currentUser) updateDropdownInfo();
}