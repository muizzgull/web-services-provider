/* ═══════════════════════════════════════════
   NEXUS WEB STUDIO — SCRIPT.JS
   ═══════════════════════════════════════════ */

// ─── LOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    initReveal();
    initCounters();
  }, 2000);
});

// ─── CURSOR ───
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── REVEAL ON SCROLL ───
function initReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ─── COUNTER ANIMATION ───
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 1800;
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    };
    requestAnimationFrame(update);
  });
}

// ─── DEMO FILTERS ───
const filterBtns = document.querySelectorAll('.filter-btn');
const demoCards = document.querySelectorAll('.demo-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    demoCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── DEMO MODAL ───
const demoContents = {
  ecommerce: {
    tag: 'E-Commerce',
    title: 'Luxe Fashion Store',
    html: `
      <div class="demo-page">
        <div class="ec-demo">
          <div class="ec-topbar">🎉 Summer Sale — Up to 40% Off | Free Shipping on Orders Over $75</div>
          <div class="ec-nav">
            <div class="ec-nav-logo">LUXÉ</div>
            <div class="ec-nav-links">
              <a href="#">Women</a><a href="#">Men</a><a href="#">Accessories</a><a href="#">Sale</a>
            </div>
            <div class="ec-nav-icons">
              <i class="fas fa-search"></i><i class="fas fa-heart"></i>
              <i class="fas fa-shopping-bag" style="position:relative">
                <span style="position:absolute;top:-8px;right:-8px;background:#e91e63;color:white;width:16px;height:16px;border-radius:50%;font-size:0.6rem;display:flex;align-items:center;justify-content:center;font-family:'DM Sans'">3</span>
              </i>
            </div>
          </div>
          <div class="ec-hero">
            <div class="ec-hero-text">
              <h2>Summer<br/>Collection '25</h2>
              <p>Effortless style for the modern wardrobe. Limited edition drops weekly.</p>
              <button class="ec-hero-btn" onclick="alert('Shop Now clicked! 🛍️')">Shop the Collection</button>
            </div>
            <div class="ec-hero-img">👗</div>
          </div>
          <div class="ec-products-section">
            <h3>New Arrivals</h3>
            <div class="ec-products">
              <div class="ec-product" onclick="addToCart('Floral Sundress')">
                <div class="ec-product-img">🌸</div>
                <div class="ec-product-info">
                  <div class="ec-product-name">Floral Sundress</div>
                  <div class="ec-product-price">$89.00</div>
                </div>
                <button class="ec-product-btn">Add to Cart</button>
              </div>
              <div class="ec-product p2" onclick="addToCart('Linen Blazer')">
                <div class="ec-product-img p2">🧥</div>
                <div class="ec-product-info">
                  <div class="ec-product-name">Linen Blazer</div>
                  <div class="ec-product-price">$145.00</div>
                </div>
                <button class="ec-product-btn">Add to Cart</button>
              </div>
              <div class="ec-product">
                <div class="ec-product-img p3">👟</div>
                <div class="ec-product-info">
                  <div class="ec-product-name">Canvas Sneakers</div>
                  <div class="ec-product-price">$65.00</div>
                </div>
                <button class="ec-product-btn">Add to Cart</button>
              </div>
              <div class="ec-product">
                <div class="ec-product-img p4">👜</div>
                <div class="ec-product-info">
                  <div class="ec-product-name">Leather Tote</div>
                  <div class="ec-product-price">$198.00</div>
                </div>
                <button class="ec-product-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  saas: {
    tag: 'Landing Page',
    title: 'SaaS Product Page',
    html: `
      <div class="demo-page">
        <div class="saas-demo">
          <div class="saas-nav">
            <div class="saas-logo">FLOWLY</div>
            <div class="saas-nav-links">
              <a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a><a href="#">Blog</a>
            </div>
            <button class="saas-cta" onclick="alert('Sign up clicked! 🚀')">Start Free Trial</button>
          </div>
          <div class="saas-hero">
            <div class="saas-badge">🎉 Trusted by 10,000+ teams</div>
            <h1>Automate your <span>workflow</span>,<br/>10x your output.</h1>
            <p>Flowly connects all your tools, automates repetitive tasks, and gives your team a single source of truth.</p>
            <div class="saas-hero-btns">
              <button class="saas-btn-p" onclick="alert('Starting free trial! 🎯')">Start for Free — No CC needed</button>
              <button class="saas-btn-g" onclick="alert('Watch demo! 🎬')">▶ Watch 2-min demo</button>
            </div>
          </div>
          <div class="saas-features">
            <div class="saas-feat">
              <div class="saas-feat-icon">⚡</div>
              <h4>Lightning Fast</h4>
              <p>Sub-100ms response times. Your team won't wait for tools to load.</p>
            </div>
            <div class="saas-feat">
              <div class="saas-feat-icon">🔗</div>
              <h4>300+ Integrations</h4>
              <p>Connect Slack, Jira, GitHub, Salesforce, and 300 more in one click.</p>
            </div>
            <div class="saas-feat">
              <div class="saas-feat-icon">🔒</div>
              <h4>Enterprise Security</h4>
              <p>SOC 2 Type II certified. SSO, RBAC, and audit logs included.</p>
            </div>
            <div class="saas-feat">
              <div class="saas-feat-icon">📊</div>
              <h4>Real-time Analytics</h4>
              <p>See exactly how your team spends time. Make data-driven decisions.</p>
            </div>
            <div class="saas-feat">
              <div class="saas-feat-icon">🤖</div>
              <h4>AI-Powered</h4>
              <p>AI suggestions to automate repetitive tasks you didn't even know were possible.</p>
            </div>
            <div class="saas-feat">
              <div class="saas-feat-icon">🌍</div>
              <h4>Global CDN</h4>
              <p>Data centers in 25 regions. 99.99% uptime SLA guaranteed.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  dashboard: {
    tag: 'Web App',
    title: 'Analytics Dashboard',
    html: `
      <div class="demo-page">
        <div class="dash-demo">
          <div class="dash-sidebar">
            <div class="dash-logo">DASH</div>
            <nav class="dash-nav">
              <div class="dash-nav-item"><i class="fas fa-chart-line"></i> Overview</div>
              <div class="dash-nav-item active"><i class="fas fa-chart-bar"></i> Analytics</div>
              <div class="dash-nav-item"><i class="fas fa-users"></i> Users</div>
              <div class="dash-nav-item"><i class="fas fa-shopping-cart"></i> Orders</div>
              <div class="dash-nav-item"><i class="fas fa-cog"></i> Settings</div>
            </nav>
          </div>
          <div class="dash-main">
            <div class="dash-header">
              <h2>Analytics Overview</h2>
              <div class="dash-header-right">
                <span>Last 30 days</span>
                <div class="dash-avatar"></div>
              </div>
            </div>
            <div class="dash-stats">
              <div class="dash-stat">
                <div class="dash-stat-label">Total Revenue</div>
                <div class="dash-stat-value">$84,291</div>
                <div class="dash-stat-change">↑ +23.5% vs last month</div>
              </div>
              <div class="dash-stat">
                <div class="dash-stat-label">Active Users</div>
                <div class="dash-stat-value">5,427</div>
                <div class="dash-stat-change">↑ +12.3% vs last month</div>
              </div>
              <div class="dash-stat">
                <div class="dash-stat-label">Conversion Rate</div>
                <div class="dash-stat-value">3.8%</div>
                <div class="dash-stat-change">↑ +0.4% vs last month</div>
              </div>
            </div>
            <div class="dash-chart-area">
              <div class="dash-chart-title">Revenue — Last 30 Days</div>
              <div class="dash-chart-bars" id="dashBars"></div>
            </div>
            <div class="dash-table">
              <div class="dash-table-header">
                <span>Customer</span><span>Revenue</span><span>Orders</span><span>Status</span>
              </div>
              <div class="dash-table-row">
                <span>Sarah Mitchell</span><span>$4,200</span><span>12</span>
                <span><span class="status-badge status-active">Active</span></span>
              </div>
              <div class="dash-table-row">
                <span>James Chen</span><span>$3,100</span><span>8</span>
                <span><span class="status-badge status-active">Active</span></span>
              </div>
              <div class="dash-table-row">
                <span>Ahmed Hassan</span><span>$2,800</span><span>6</span>
                <span><span class="status-badge status-pending">Pending</span></span>
              </div>
              <div class="dash-table-row">
                <span>Lena Kowalski</span><span>$1,950</span><span>4</span>
                <span><span class="status-badge status-active">Active</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  portfolio: {
    tag: 'Portfolio',
    title: 'Creative Portfolio',
    html: `
      <div class="demo-page">
        <div class="port-demo">
          <div class="port-nav">
            <div class="port-nav-name">Alex Rivera</div>
            <div class="port-nav-links">
              <a href="#">Work</a><a href="#">About</a><a href="#">Services</a><a href="#">Contact</a>
            </div>
          </div>
          <div class="port-hero-section">
            <div class="port-avatar-lg">🎨</div>
            <div class="port-hero-text">
              <h1>Creative Director<br/>& Visual Designer</h1>
              <p>I help brands find their visual identity and build digital experiences people love. Based in NYC — available worldwide.</p>
              <div class="port-hero-btns">
                <button class="port-btn-p" onclick="alert('View work! 🎨')">View My Work</button>
                <button class="port-btn-g" onclick="alert('Let\'s talk! 💬')">Let's Talk</button>
              </div>
            </div>
          </div>
          <div class="port-work-section">
            <h3>Selected Work</h3>
            <div class="port-grid">
              <div class="port-item g1" onclick="alert('Brand Identity — NovaBrew ☕')">☕</div>
              <div class="port-item g2" onclick="alert('E-Commerce Redesign — StyleHive 👗')">👗</div>
              <div class="port-item g3" onclick="alert('SaaS Dashboard — FlowMetrics 📊')">📊</div>
              <div class="port-item g4" onclick="alert('Restaurant Identity — Silk Route 🍜')">🍜</div>
              <div class="port-item g5" onclick="alert('Brand Campaign — Peaks Outdoor 🏔️')">🏔️</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  restaurant: {
    tag: 'Restaurant',
    title: 'Fine Dining Restaurant',
    html: `
      <div class="demo-page">
        <div class="rest-demo">
          <div class="rest-nav">
            <div class="rest-logo-name">VOLTA</div>
            <div class="rest-nav-links">
              <a href="#">Menu</a><a href="#">About</a><a href="#">Gallery</a><a href="#">Events</a>
            </div>
            <button class="rest-reserve-cta" onclick="alert('Reservation form opened! 📅')">Reserve a Table</button>
          </div>
          <div class="rest-hero-section">
            <div class="rest-subtitle">Modern Italian Kitchen</div>
            <h1>Where Every Meal<br/>Becomes a Memory</h1>
            <p>Farm-to-table Italian cuisine in the heart of the city. Open Tuesday–Sunday.</p>
            <div class="rest-hero-btns">
              <button class="rest-btn-gold" onclick="alert('Booking! 🍽️')">Book a Table</button>
              <button class="rest-btn-outline" onclick="document.querySelector('.rest-menu-section').scrollIntoView({behavior:'smooth'})">View Menu</button>
            </div>
          </div>
          <div class="rest-menu-section">
            <div class="rest-menu-tabs">
              <button class="rest-menu-tab active" onclick="switchTab(this)">Antipasti</button>
              <button class="rest-menu-tab" onclick="switchTab(this)">Primi</button>
              <button class="rest-menu-tab" onclick="switchTab(this)">Secondi</button>
              <button class="rest-menu-tab" onclick="switchTab(this)">Dolci</button>
            </div>
            <div class="rest-menu-grid">
              <div class="rest-menu-item">
                <div class="rest-item-img">🥗</div>
                <div class="rest-item-info">
                  <div class="rest-item-name">Burrata e Pomodoro</div>
                  <div class="rest-item-desc">Fresh burrata, heirloom tomatoes, basil oil</div>
                  <div class="rest-item-price">$18</div>
                </div>
              </div>
              <div class="rest-menu-item">
                <div class="rest-item-img">🦑</div>
                <div class="rest-item-info">
                  <div class="rest-item-name">Carpaccio di Polpo</div>
                  <div class="rest-item-desc">Thin-sliced octopus, lemon caper dressing</div>
                  <div class="rest-item-price">$24</div>
                </div>
              </div>
              <div class="rest-menu-item">
                <div class="rest-item-img">🍄</div>
                <div class="rest-item-info">
                  <div class="rest-item-name">Bruschetta ai Funghi</div>
                  <div class="rest-item-desc">Wild mushroom, truffle cream, aged pecorino</div>
                  <div class="rest-item-price">$16</div>
                </div>
              </div>
              <div class="rest-menu-item">
                <div class="rest-item-img">🥩</div>
                <div class="rest-item-info">
                  <div class="rest-item-name">Vitello Tonnato</div>
                  <div class="rest-item-desc">Roasted veal, tuna aioli, crispy capers</div>
                  <div class="rest-item-price">$22</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  agency: {
    tag: 'Landing Page',
    title: 'Agency Homepage',
    html: `
      <div class="demo-page">
        <div class="agency-demo">
          <div class="agency-nav">
            <div class="agency-logo-n">FORGE<span style="color:#ffa500">.</span></div>
            <div class="agency-nav-links">
              <a href="#">Work</a><a href="#">Services</a><a href="#">About</a><a href="#">Blog</a>
            </div>
            <button class="agency-cta-n" onclick="alert('Let\'s talk! 🔥')">Start a Project</button>
          </div>
          <div class="agency-hero-n">
            <div class="agency-hero-badge">🏆 Agency of the Year 2024</div>
            <h1>We Build <span>Brands</span><br/>That Lead<br/>Industries.</h1>
            <p>Strategic design and development for ambitious companies. From startup to enterprise — we make brands impossible to ignore.</p>
            <div class="agency-hero-btns-n">
              <button class="ag-btn-p" onclick="alert('View work! 💼')">See Our Work</button>
              <button class="ag-btn-g" onclick="alert('Services info! 📋')">Our Services</button>
            </div>
          </div>
          <div class="agency-clients-row">
            <div class="agency-client-logo">ADOBE</div>
            <div class="agency-client-logo">STRIPE</div>
            <div class="agency-client-logo">NOTION</div>
            <div class="agency-client-logo">LINEAR</div>
            <div class="agency-client-logo">FIGMA</div>
            <div class="agency-client-logo">VERCEL</div>
          </div>
          <div class="agency-services-n">
            <div class="agency-serv">
              <div class="ag-serv-icon">🎯</div>
              <div class="ag-serv-title">Brand Strategy</div>
              <div class="ag-serv-desc">Positioning, messaging, voice & visual identity systems</div>
            </div>
            <div class="agency-serv">
              <div class="ag-serv-icon">🖥️</div>
              <div class="ag-serv-title">Web Design</div>
              <div class="ag-serv-desc">Award-winning websites that convert and inspire</div>
            </div>
            <div class="agency-serv">
              <div class="ag-serv-icon">⚡</div>
              <div class="ag-serv-title">Development</div>
              <div class="ag-serv-desc">Fast, scalable, and beautifully coded web applications</div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

function openDemo(type) {
  const content = demoContents[type];
  if (!content) return;
  document.getElementById('modalTag').textContent = content.tag;
  document.getElementById('modalTitle').textContent = content.title;
  document.getElementById('modalBody').innerHTML = content.html;
  document.getElementById('demoModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Init dashboard bars if needed
  if (type === 'dashboard') {
    const bars = document.getElementById('dashBars');
    if (bars) {
      const heights = [35, 55, 42, 68, 50, 75, 60, 80, 65, 90, 70, 58, 82, 72, 95];
      bars.innerHTML = heights.map(h => `<div class="dash-bar" style="height:${h}%"></div>`).join('');
    }
  }
}

function closeDemo() {
  document.getElementById('demoModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDemo();
});

// Restaurant tab switch
window.switchTab = function(btn) {
  document.querySelectorAll('.rest-menu-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

// Add to cart feedback
window.addToCart = function(name) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background:#10b981; color:white; padding:1rem 1.5rem;
    border-radius:10px; font-family:'DM Sans',sans-serif; font-size:0.9rem;
    font-weight:600; box-shadow:0 10px 30px rgba(16,185,129,0.3);
    animation: slideInRight 0.3s ease; display:flex; align-items:center; gap:0.5rem;
  `;
  notification.innerHTML = `✓ ${name} added to cart!`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2500);
};

// ─── PRICING TOGGLE ───
let isMonthly = false;
window.togglePricing = function() {
  isMonthly = !isMonthly;
  const toggle = document.getElementById('pricingToggle');
  const monthLabel = document.getElementById('monthlyLabel');
  const monthLabel2 = document.getElementById('monthlyLabel2');
  toggle.classList.toggle('on', isMonthly);
  monthLabel.classList.toggle('active', !isMonthly);
  monthLabel2.classList.toggle('active', isMonthly);

  document.querySelectorAll('.price.one-time').forEach(p => p.classList.toggle('hidden', isMonthly));
  document.querySelectorAll('.price.monthly').forEach(p => p.classList.toggle('hidden', !isMonthly));
};

// ─── FAQ ───
window.toggleFaq = function(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-answer').classList.remove('open');
  });

  if (!isOpen) {
    item.classList.add('open');
    answer.classList.add('open');
  }
};

// ─── CONTACT FORM ───
window.toggleChip = function(el) {
  el.classList.toggle('selected');
};

window.submitForm = function(e) {
  e.preventDefault();
  const submitText = document.getElementById('submitText');
  const submitLoading = document.getElementById('submitLoading');
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');
  }, 1800);
};

// ─── FOOTER NEWSLETTER ───
window.subscribeNewsletter = function(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('footerSuccess').classList.remove('hidden');
};

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── DASHBOARD NAV ITEMS ───
document.addEventListener('click', e => {
  if (e.target.classList.contains('dash-nav-item') || e.target.closest('.dash-nav-item')) {
    const item = e.target.classList.contains('dash-nav-item') ? e.target : e.target.closest('.dash-nav-item');
    document.querySelectorAll('.dash-nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }
});

console.log('%c NEXUS WEB STUDIO ', 'background:#00d4ff; color:#080c14; font-size:1.2rem; font-weight:800; padding:6px 12px; border-radius:6px;');
console.log('%c Built with passion by NEXUS Studio ', 'color:#00d4ff; font-size:0.9rem;');