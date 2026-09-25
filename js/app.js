/**
 * UzTech PC Market - Asosiy Ilova Kontrolleri (app.js)
 * Sahifalar navigatsiyasi, filtrlar, qidiruv, savat va buyurtma berish
 */

class App {
  constructor() {
    this.currentRoute = 'home';
    this.searchQuery = '';
    this.activeFilters = {
      category: null,
      subcategory: null,
      condition: 'all', // 'all', 'new', 'used'
      brand: 'all',
      minPrice: 0,
      maxPrice: 30000000,
      ram: 'all',
      storage: 'all',
      creditOnly: false,
      sort: 'popular'
    };
    this.selectedDetailProduct = null;
  }

  init() {
    // Obunalarni o'rnatish
    store.subscribe((event, data) => {
      this.updateCounters();
      if (event === 'currency-changed') {
        this.renderCurrentView();
        if (this.selectedDetailProduct) {
          this.renderDetailModal(this.selectedDetailProduct.id);
        }
      }
    });

    // Hash orqali yo'nalishni kuzatish
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Dastlabki marshrutni tekshirish
    if (!window.location.hash) {
      window.location.hash = '#home';
    } else {
      this.handleHashChange();
    }

    this.updateCounters();
    adminController.init();
  }

  handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const [route, param] = hash.split('/');
    this.currentRoute = route;

    // Mobil menyuni yopish
    this.closeMobileMenu();

    // Navbardagi faol tugmani belgilash
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${route}`);
    });
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('href') === `#${route}`);
    });

    // Qidiruvni tozalash agar boshqa menyuga o'tsa
    if (route !== 'search') {
      const searchInput = document.getElementById('global-search-input');
      if (searchInput && this.searchQuery === '') {
        searchInput.value = '';
      }
    }

    this.renderCurrentView(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTo(route) {
    window.location.hash = route;
  }

  updateCounters() {
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlistCount();

    // Header counterlar
    const headerCartBadge = document.getElementById('header-cart-badge');
    const headerWishBadge = document.getElementById('header-wish-badge');
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    const mobileWishBadge = document.getElementById('mobile-wish-badge');

    if (headerCartBadge) headerCartBadge.innerText = cartCount;
    if (headerWishBadge) headerWishBadge.innerText = wishlistCount;
    if (mobileCartBadge) mobileCartBadge.innerText = cartCount;
    if (mobileWishBadge) mobileWishBadge.innerText = wishlistCount;

    // Savat sarlavhasi
    const cartDrawerCount = document.getElementById('cart-drawer-count');
    if (cartDrawerCount) cartDrawerCount.innerText = `(${cartCount} dona)`;
  }

  // ================= 1. VIEW ROUTER =================
  renderCurrentView(param) {
    const mainView = document.getElementById('main-content-view');
    const adminView = document.getElementById('admin-view-container');

    if (this.currentRoute === 'admin') {
      mainView.style.display = 'none';
      adminView.style.display = 'block';
      adminController.render();
      return;
    } else {
      mainView.style.display = 'block';
      adminView.style.display = 'none';
    }

    switch (this.currentRoute) {
      case 'home':
        this.renderHomeView();
        break;
      case 'yangi-kompyuterlar':
        this.renderCategoryView('yangi-kompyuterlar', "Yangi Kompyuterlar", "Zavod qutisida, eng so'nggi texnologiyalar va to'liq rasmiy kafolat bilan");
        break;
      case 'ishlatilgan-kompyuterlar':
        this.renderCategoryView('ishlatilgan-kompyuterlar', "Ishlatilgan Kompyuterlar (B/U)", "100% texnik sinovdan o'tgan, termopastasi yangilangan va kafolatlangan kompyuterlar");
        break;
      case 'noutbuklar':
        this.renderCategoryView('noutbuklar', "Noutbuklar", "O'qish, ish, dasturlash va og'ir o'yinlar uchun yangi va sifatli ishlatilgan noutbuklar");
        break;
      case 'aksessuarlar':
        this.renderCategoryView('aksessuarlar', "Kompyuter Aksessuarlari", "Klaviatura, sichqoncha, naushnik, veb-kamera va boshqa barcha kompyuter jihozlari");
        break;
      case 'kompyuter-detallari':
        this.renderCategoryView('kompyuter-detallari', "Kompyuter Detallari va Ehtiyot Qismlari", "Protsessor, videokarta, operativ xotira (RAM), SSD va boshqa yangi hamda ishlatilgan qismlar");
        break;
      case 'kreditga':
        this.renderCreditView();
        break;
      case 'sevimlilar':
        this.renderWishlistView();
        break;
      case 'savat':
        this.renderCartView();
        break;
      case 'search':
        this.renderSearchView();
        break;
      default:
        this.renderHomeView();
    }
  }

  // ================= 2. BOSH SAHIFA (HOME) =================
  renderHomeView() {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();

    // Mahsulot guruhlari
    const newPCs = store.products.filter(p => p.category === 'yangi-kompyuterlar').slice(0, 4);
    const usedPCs = store.products.filter(p => p.category === 'ishlatilgan-kompyuterlar').slice(0, 4);
    const laptops = store.products.filter(p => p.category === 'noutbuklar').slice(0, 4);
    const accessories = store.products.filter(p => p.category === 'aksessuarlar').slice(0, 4);
    const components = store.products.filter(p => p.category === 'kompyuter-detallari').slice(0, 4);
    const creditItems = store.products.filter(p => p.creditAvailable).slice(0, 4);
    const discounted = store.products.filter(p => p.discountPercent > 0).slice(0, 4);
    const bestSellers = store.products.filter(p => p.isBestSeller).slice(0, 4);
    const recentlyViewed = store.getRecentlyViewedProducts();

    mainView.innerHTML = `
      <div class="container">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-grid">
            <div>
              <div class="hero-pill">
                <span>⚡ O'zbekistondagi №1 Kompyuter Gipermarketi</span>
              </div>
              <h1 class="hero-title">
                Kompyuter va texnika <span>olamiga xush kelibsiz</span>
              </h1>
              <p class="hero-subtitle">
                Yangi va ishlatilgan kompyuterlar, kuchli noutbuklar, original aksessuarlar va 100% sinovdan o'tgan ehtiyot qismlar kafolati bilan.
              </p>
              <div class="hero-actions">
                <a href="#yangi-kompyuterlar" class="btn-primary">
                  🛒 Mahsulotlarni ko'rish
                </a>
                <a href="#kreditga" class="btn-secondary">
                  💳 Kreditga olish
                </a>
              </div>
            </div>
            <div class="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80" alt="UzTech Gaming PC">
            </div>
          </div>
        </section>

        <!-- Trust Features Bar -->
        <div class="trust-features">
          <div class="trust-item">
            <div class="trust-icon trust-icon-blue">🛡</div>
            <div>
              <div class="trust-title">36 oygacha Kafolat</div>
              <div class="trust-desc">Barcha yangi va b/u texnikalarga rasmiy servis kafolati</div>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon trust-icon-green">🚚</div>
            <div>
              <div class="trust-title">Tezkor Yetkazib Berish</div>
              <div class="trust-desc">O'zbekistonning barcha 12 viloyatiga xavfsiz jo'natish</div>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon trust-icon-amber">🔬</div>
            <div>
              <div class="trust-title">100% Texnik Ko'rik</div>
              <div class="trust-desc">Ishlatilgan qismlar FurMark va AIDA64 da sinovdan o'tgan</div>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon trust-icon-purple">💳</div>
            <div>
              <div class="trust-title">Qulay Muddatli To'lov</div>
              <div class="trust-desc">Boshlang'ich to'lovsiz, 24 oygacha qulay kredit shartlari</div>
            </div>
          </div>
        </div>

        <!-- 1. YANGI KOMPYUTERLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small">Premial Yig'uvlar</span>
              <h2 class="section-title">🖥 Yangi Kompyuterlar</h2>
            </div>
            <a href="#yangi-kompyuterlar" class="section-view-all">Barchasini ko'rish &rarr;</a>
          </div>
          <div class="products-grid">
            ${newPCs.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 2. ISHLATILGAN KOMPYUTERLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small" style="color: #D97706;">Tejamkor va Ishonchli</span>
              <h2 class="section-title">♻ Ishlatilgan Kompyuterlar (B/U)</h2>
            </div>
            <a href="#ishlatilgan-kompyuterlar" class="section-view-all">Barchasini ko'rish &rarr;</a>
          </div>
          <div class="products-grid">
            ${usedPCs.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 3. NOUTBUKLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small">Mobil Unumdorlik</span>
              <h2 class="section-title">💻 Noutbuklar (Yangi & B/U)</h2>
            </div>
            <a href="#noutbuklar" class="section-view-all">Barchasini ko'rish &rarr;</a>
          </div>
          <div class="products-grid">
            ${laptops.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 4. KREDITGA MAHSULOTLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small" style="color: #7C3AED;">Qulay Muddatli To'lov</span>
              <h2 class="section-title">💳 Kreditga Olish Mumkin Bo'lgan Mahsulotlar</h2>
            </div>
            <a href="#kreditga" class="section-view-all">Kredit Kalkulyatori &rarr;</a>
          </div>
          <div class="products-grid">
            ${creditItems.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 5. CHEGIRMADAGI MAHSULOTLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small" style="color: #DC2626;">Maxsus Takliflar</span>
              <h2 class="section-title">🔥 Chegirmadagi Mahsulotlar</h2>
            </div>
          </div>
          <div class="products-grid">
            ${discounted.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 6. AKSESSUARLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small">Geyming & Periferiya</span>
              <h2 class="section-title">🎧 Kompyuter Aksessuarlari</h2>
            </div>
            <a href="#aksessuarlar" class="section-view-all">Barchasini ko'rish &rarr;</a>
          </div>
          <div class="products-grid">
            ${accessories.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 7. KOMPYUTER DETALLARI -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small">Ehtiyot Qismlar & Yangilash</span>
              <h2 class="section-title">⚙ Kompyuter Detallari (Yangi va Ishlatilgan)</h2>
            </div>
            <a href="#kompyuter-detallari" class="section-view-all">Barchasini ko'rish &rarr;</a>
          </div>
          <div class="products-grid">
            ${components.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- 8. ENG KO'P SOTILGANLAR -->
        <section class="section-block">
          <div class="section-header">
            <div class="section-title-group">
              <span class="section-badge-small">Xaridorlar Tanlovi</span>
              <h2 class="section-title">⭐ Eng Ko'p Sotilgan Mahsulotlar</h2>
            </div>
          </div>
          <div class="products-grid">
            ${bestSellers.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </section>

        <!-- Yaqinda ko'rilgan mahsulotlar -->
        ${recentlyViewed.length > 0 ? `
          <section class="section-block" style="background: #F1F5F9; padding: 28px; border-radius: var(--radius-lg);">
            <div class="section-header" style="border-bottom-color: #CBD5E1;">
              <h2 class="section-title" style="font-size: 20px;">👁 Yaqinda ko'rgan mahsulotlaringiz</h2>
            </div>
            <div class="products-grid">
              ${recentlyViewed.slice(0, 4).map(p => this.renderProductCard(p, currency)).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `;
  }

  // ================= 3. KATEGORIYA SAHIFASI (FILTRLAR BILAN) =================
  renderCategoryView(categoryKey, title, description) {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();

    // Shu kategoriya uchun mahsulotlarni filtrlash
    let list = store.products.filter(p => p.category === categoryKey);

    // Kategoriya ichidagi subkategoriyalar va brendlarni yig'ish
    const brands = Array.from(new Set(list.map(p => p.brand).filter(Boolean)));
    const subcategories = Array.from(new Set(list.map(p => p.subcategory).filter(Boolean)));

    mainView.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 28px; font-weight: 800; color: var(--primary); margin-bottom: 6px;">${title}</h1>
          <p style="color: var(--text-muted); font-size: 14px;">${description}</p>
        </div>

        <div class="catalog-layout">
          <!-- Filtrlar Yon Paneli -->
          <aside class="filter-sidebar">
            <div class="filter-header">
              <div class="filter-title">🔍 Filtrlash</div>
              <button class="btn-reset-filters" onclick="app.resetCategoryFilters('${categoryKey}')">Tozalash</button>
            </div>

            <!-- Holat: Hammasi, Yangi, Ishlatilgan -->
            <div class="filter-group">
              <div class="filter-group-title">Holati</div>
              <div class="filter-options">
                <label class="filter-label">
                  <input type="radio" name="filter-condition" value="all" checked onchange="app.applyFilters()"> Hammasi
                </label>
                <label class="filter-label">
                  <input type="radio" name="filter-condition" value="new" onchange="app.applyFilters()"> Yangi (Muborak)
                </label>
                <label class="filter-label">
                  <input type="radio" name="filter-condition" value="used" onchange="app.applyFilters()"> Ishlatilgan (B/U)
                </label>
              </div>
            </div>

            <!-- Brendlar -->
            ${brands.length > 0 ? `
              <div class="filter-group">
                <div class="filter-group-title">Brend</div>
                <div class="filter-options">
                  <label class="filter-label">
                    <input type="radio" name="filter-brand" value="all" checked onchange="app.applyFilters()"> Barcha brendlar
                  </label>
                  ${brands.map(b => `
                    <label class="filter-label">
                      <input type="radio" name="filter-brand" value="${escapeHtml(b)}" onchange="app.applyFilters()"> ${escapeHtml(b)}
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Narx oralig'i -->
            <div class="filter-group">
              <div class="filter-group-title">Narx oralig'i (UZS)</div>
              <div class="price-inputs-row">
                <input type="number" id="filter-min-price" class="price-input-field" placeholder="Dan" oninput="app.applyFilters()">
                <input type="number" id="filter-max-price" class="price-input-field" placeholder="Gacha" oninput="app.applyFilters()">
              </div>
            </div>

            <!-- Faqat kreditga borlari -->
            <div class="filter-group">
              <label class="filter-label">
                <input type="checkbox" id="filter-credit-only" onchange="app.applyFilters()"> Faqat kreditga beriladiganlar
              </label>
            </div>
          </aside>

          <!-- Asosiy Mahsulotlar Ro'yxati -->
          <main>
            <!-- Toolbar -->
            <div class="catalog-toolbar">
              <div class="results-count">
                Jami topildi: <strong id="catalog-count-display">${list.length}</strong> ta mahsulot
              </div>
              <div class="sort-select-box">
                <span>Tartiblash:</span>
                <select class="sort-select" id="catalog-sort-select" onchange="app.applyFilters()">
                  <option value="popular">Mashhur mahsulotlar</option>
                  <option value="price-asc">Arzonidan qimmatga</option>
                  <option value="price-desc">Qimmatidan arzonga</option>
                  <option value="newest">Yangi qo'shilganlar</option>
                  <option value="bestseller">Eng ko'p sotilganlar</option>
                </select>
              </div>
            </div>

            <!-- Gridi -->
            <div class="products-grid" id="category-products-grid">
              ${list.map(p => this.renderProductCard(p, currency)).join('')}
            </div>
          </main>
        </div>
      </div>
    `;
  }

  applyFilters() {
    const grid = document.getElementById('category-products-grid');
    const countDisplay = document.getElementById('catalog-count-display');
    if (!grid) return;

    const conditionRadio = document.querySelector('input[name="filter-condition"]:checked');
    const condition = conditionRadio ? conditionRadio.value : 'all';

    const brandRadio = document.querySelector('input[name="filter-brand"]:checked');
    const brand = brandRadio ? brandRadio.value : 'all';

    const minPrice = parseFloat(document.getElementById('filter-min-price')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('filter-max-price')?.value) || Infinity;
    const creditOnly = document.getElementById('filter-credit-only')?.checked || false;
    const sort = document.getElementById('catalog-sort-select')?.value || 'popular';

    const currency = store.getCurrency();

    let list = store.products.filter(p => {
      if (this.currentRoute !== 'search' && p.category !== this.currentRoute) return false;
      if (condition === 'new' && !p.isNew) return false;
      if (condition === 'used' && p.isNew) return false;
      if (brand !== 'all' && p.brand !== brand) return false;
      if (p.priceUZS < minPrice || p.priceUZS > maxPrice) return false;
      if (creditOnly && !p.creditAvailable) return false;
      if (this.searchQuery && !matchSearch(p, this.searchQuery)) return false;
      return true;
    });

    // Tartiblash
    if (sort === 'price-asc') {
      list.sort((a, b) => a.priceUZS - b.priceUZS);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.priceUZS - a.priceUZS);
    } else if (sort === 'newest') {
      list.sort((a, b) => (b.id > a.id ? 1 : -1));
    } else if (sort === 'bestseller') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    if (countDisplay) countDisplay.innerText = list.length;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <div style="font-size: 40px; margin-bottom: 12px;">🔎</div>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">Mos mahsulot topilmadi</h3>
          <p style="color: var(--text-muted); font-size: 14px;">Filtrlarni o'zgartirib ko'ring yoki tozalang.</p>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(p => this.renderProductCard(p, currency)).join('');
    }
  }

  resetCategoryFilters(categoryKey) {
    this.renderCategoryView(categoryKey, "", "");
  }

  // ================= 4. QIDIRUV SAHIFASI (SEARCH VIEW) =================
  renderSearchView() {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();

    const results = store.products.filter(p => matchSearch(p, this.searchQuery));

    mainView.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 26px; font-weight: 800; color: var(--primary); margin-bottom: 6px;">
            Qidiruv natijalari: "${escapeHtml(this.searchQuery)}"
          </h1>
          <p style="color: var(--text-muted); font-size: 14px;">
            Jami topildi: <strong>${results.length}</strong> ta mahsulot
          </p>
        </div>

        <div class="products-grid">
          ${results.length > 0 
            ? results.map(p => this.renderProductCard(p, currency)).join('') 
            : `<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-md);">
                 <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                 <h3>Ushbu so'rov bo'yicha hech narsa topilmadi</h3>
                 <p style="color: var(--text-muted);">Boshqa so'zlar bilan qidirib ko'ring (masalan, RTX 4060, i5, Asus, Klaviatura).</p>
               </div>`
          }
        </div>
      </div>
    `;
  }

  executeSearch(query) {
    this.searchQuery = query || '';
    window.location.hash = '#search';
  }

  // ================= 5. KREDITGA SAHIFASI (CREDIT VIEW) =================
  renderCreditView() {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();
    const creditProducts = store.products.filter(p => p.creditAvailable);

    mainView.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        <!-- Banner -->
        <div style="background: linear-gradient(135deg, #4C1D95 0%, #6D28D9 100%); color: #FFFFFF; padding: 36px 32px; border-radius: var(--radius-lg); margin-bottom: 36px;">
          <div style="max-width: 680px;">
            <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
              Hamkorlikdagi qulay kredit
            </span>
            <h1 style="font-size: 32px; font-weight: 800; margin-top: 12px; margin-bottom: 10px;">
              Orzuingizdagi kompyuterni bugunoq bo'lib to'lang!
            </h1>
            <p style="font-size: 15px; color: #E9D5FF; line-height: 1.6; margin-bottom: 20px;">
              Boshlang'ich to'lovsiz, 3 oydan 24 oygacha bo'lgan muddatda istalgan yangi va ishlatilgan kompyuter hamda noutbuklarni rasmiylashtiring.
            </p>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px;">
                <span>✓ Pasport va plastik karta kifoya</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px;">
                <span>✓ 15 daqiqada tezkor tasdiq</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px;">
                <span>✓ Rasmiy shartnoma</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Kredit Kalkulyatori Bloki -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 30px; box-shadow: var(--shadow-sm); margin-bottom: 40px;">
          <h2 style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 6px;">
            🧮 Interaktiv Kredit Kalkulyatori
          </h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
            Mahsulotni tanlang, boshlang'ich to'lov va muddatni belgilang — oylik to'lov avtomatik hisoblanadi.
          </p>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: center;">
            <div>
              <div class="form-group">
                <label class="form-label">Mahsulotni tanlang:</label>
                <select id="calc-product-select" class="form-select" onchange="app.updateCreditCalc()">
                  ${creditProducts.map(p => `
                    <option value="${p.id}" data-price="${p.priceUZS}">
                      ${escapeHtml(p.name)} — ${formatPrice(p.priceUZS, 'UZS')}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="display: flex; justify-content: space-between;">
                  <span>Boshlang'ich to'lov (so'm):</span>
                  <strong id="calc-downpayment-text" style="color: var(--accent);">0 so'm (0%)</strong>
                </label>
                <input type="range" id="calc-downpayment-range" min="0" max="50" step="5" value="0" style="width: 100%; accent-color: var(--accent);" oninput="app.updateCreditCalc()">
              </div>

              <div class="form-group">
                <label class="form-label">Kredit muddati:</label>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                  <button type="button" class="btn-calc-month active" onclick="app.setCalcMonths(3, this)">3 oy</button>
                  <button type="button" class="btn-calc-month" onclick="app.setCalcMonths(6, this)">6 oy</button>
                  <button type="button" class="btn-calc-month" onclick="app.setCalcMonths(12, this)">12 oy</button>
                  <button type="button" class="btn-calc-month" onclick="app.setCalcMonths(24, this)">24 oy</button>
                </div>
              </div>
            </div>

            <!-- Natija kartochkasi -->
            <div style="background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: var(--radius-md); padding: 24px; text-align: center;">
              <div style="font-size: 13px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
                Taxminiy oylik to'lov
              </div>
              <div id="calc-monthly-result" style="font-size: 32px; font-weight: 900; color: #7C3AED; margin-bottom: 12px;">
                1 150 000 so'm
              </div>
              <div style="font-size: 13px; color: #475569; margin-bottom: 20px;">
                Jami to'lov: <strong id="calc-total-result">13 800 000 so'm</strong>
              </div>
              <button class="btn-primary" style="width: 100%; background: #7C3AED; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);" onclick="app.openCreditModalFromCalc()">
                📝 Kreditga ariza topshirish
              </button>
            </div>
          </div>
        </div>

        <!-- Kreditga mavjud mahsulotlar -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Barcha Kreditga Mavjud Mahsulotlar</h2>
          </div>
          <div class="products-grid">
            ${creditProducts.map(p => this.renderProductCard(p, currency)).join('')}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => this.updateCreditCalc(), 50);
  }

  calcMonths = 3;
  setCalcMonths(months, btn) {
    this.calcMonths = months;
    document.querySelectorAll('.btn-calc-month').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.updateCreditCalc();
  }

  updateCreditCalc() {
    const select = document.getElementById('calc-product-select');
    if (!select) return;
    const selectedOption = select.options[select.selectedIndex];
    const priceUZS = parseFloat(selectedOption.getAttribute('data-price')) || 10000000;

    const range = document.getElementById('calc-downpayment-range');
    const percent = parseInt(range?.value) || 0;
    const downPayment = Math.round(priceUZS * (percent / 100));

    const downPaymentText = document.getElementById('calc-downpayment-text');
    if (downPaymentText) {
      downPaymentText.innerText = `${formatPrice(downPayment, 'UZS')} (${percent}%)`;
    }

    const monthly = calculateCreditMonthly(priceUZS, downPayment, this.calcMonths);
    const total = downPayment + (monthly * this.calcMonths);

    const monthlyResult = document.getElementById('calc-monthly-result');
    const totalResult = document.getElementById('calc-total-result');
    if (monthlyResult) monthlyResult.innerText = `${formatPrice(monthly, 'UZS')} / oy`;
    if (totalResult) totalResult.innerText = formatPrice(total, 'UZS');
  }

  openCreditModalFromCalc() {
    const select = document.getElementById('calc-product-select');
    if (!select) return;
    const prodId = select.value;
    const range = document.getElementById('calc-downpayment-range');
    const percent = parseInt(range?.value) || 0;
    const prod = store.getProductById(prodId);
    const downPayment = prod ? Math.round(prod.priceUZS * (percent / 100)) : 0;

    this.openCreditModal(prodId, downPayment, this.calcMonths);
  }

  // ================= 6. SEVIMLILAR SAHIFASI (WISHLIST) =================
  renderWishlistView() {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();
    const items = store.wishlist.map(id => store.getProductById(id)).filter(Boolean);

    mainView.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 28px; font-weight: 800; color: var(--primary); margin-bottom: 6px;">
            ❤️ Sevimli Mahsulotlar
          </h1>
          <p style="color: var(--text-muted); font-size: 14px;">
            Siz saqlab qo'ygan mahsulotlar ro'yxati (${items.length} dona)
          </p>
        </div>

        <div class="products-grid">
          ${items.length > 0 
            ? items.map(p => this.renderProductCard(p, currency)).join('') 
            : `<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-md);">
                 <div style="font-size: 40px; margin-bottom: 12px;">🤍</div>
                 <h3>Sevimli mahsulotlar ro'yxati bo'sh</h3>
                 <p style="color: var(--text-muted); margin-bottom: 20px;">O'zingizga yoqqan mahsulotlarning yurakchasini bosib saqlang.</p>
                 <a href="#home" class="btn-primary" style="display: inline-flex;">Katalogga o'tish</a>
               </div>`
          }
        </div>
      </div>
    `;
  }

  // ================= 7. SAVAT SAHIFASI VA DRAWER =================
  renderCartView() {
    const mainView = document.getElementById('main-content-view');
    const currency = store.getCurrency();
    const cartItems = store.getCartItems();
    const totalUZS = store.getCartTotalUZS();

    mainView.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        <h1 style="font-size: 28px; font-weight: 800; color: var(--primary); margin-bottom: 24px;">
          🛒 Xaridlar Savati (${store.getCartCount()} dona)
        </h1>

        ${cartItems.length === 0 ? `
          <div style="text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 50px; margin-bottom: 16px;">🛍</div>
            <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Savatingiz hozircha bo'sh</h2>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Bizning do'konimizdan kompyuter va aksessuarlarni tanlang.</p>
            <a href="#home" class="btn-primary" style="display: inline-flex;">Xaridni boshlash</a>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 30px; align-items: start;">
            <!-- Mahsulotlar jadvali -->
            <div style="background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 20px;">
              ${cartItems.map(item => `
                <div class="cart-item">
                  <img src="${item.product.images?.[0] || 'https://via.placeholder.com/80'}" class="cart-item-img" alt="${escapeHtml(item.product.name)}">
                  <div class="cart-item-info">
                    <div class="cart-item-name">${escapeHtml(item.product.name)}</div>
                    <div class="cart-item-price">${formatPrice(item.product.priceUZS, currency)}</div>
                    <div class="cart-qty-control">
                      <button class="qty-btn" onclick="store.updateCartQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                      <span class="qty-number">${item.quantity}</span>
                      <button class="qty-btn" onclick="store.updateCartQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                    </div>
                  </div>
                  <button class="btn-remove-item" onclick="store.removeFromCart('${item.productId}')" title="O'chirish">&times;</button>
                </div>
              `).join('')}
              <div style="display: flex; justify-content: space-between; margin-top: 18px;">
                <button class="btn-secondary" onclick="store.clearCart()" style="color: var(--rose); border-color: #FECDD3; font-size: 13px;">
                  🗑 Savatni tozalash
                </button>
                <a href="#home" class="btn-secondary" style="color: var(--primary); border-color: var(--border-color); font-size: 13px;">
                  ← Xaridni davom ettirish
                </a>
              </div>
            </div>

            <!-- Jami hisob va Buyurtma berish -->
            <div style="background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 24px; position: sticky; top: 140px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--primary); margin-bottom: 18px;">
                Hisob-kitob
              </h3>
              <div class="cart-summary-row">
                <span>Mahsulotlar soni:</span>
                <span>${store.getCartCount()} dona</span>
              </div>
              <div class="cart-summary-row">
                <span>Yetkazib berish:</span>
                <span style="color: var(--emerald); font-weight: 700;">BEPUL (Aksiya)</span>
              </div>
              <div class="cart-total-row">
                <span>Jami:</span>
                <span>${formatPrice(totalUZS, currency)}</span>
              </div>
              <button class="btn-primary" style="width: 100%; justify-content: center; padding: 14px;" onclick="app.openCheckoutModal()">
                🛍 Buyurtma berish
              </button>
            </div>
          </div>
        `}
      </div>
    `;
  }

  openCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const container = document.getElementById('cart-drawer-items');
    const totalEl = document.getElementById('cart-drawer-total');
    const currency = store.getCurrency();

    if (!overlay || !container || !totalEl) return;

    const cartItems = store.getCartItems();
    const totalUZS = store.getCartTotalUZS();

    if (cartItems.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 50px 10px; color: var(--text-muted);">
          <div style="font-size: 44px; margin-bottom: 10px;">🛍</div>
          <p>Savatingiz bo'sh</p>
        </div>
      `;
    } else {
      container.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <img src="${item.product.images?.[0] || 'https://via.placeholder.com/80'}" class="cart-item-img" alt="${escapeHtml(item.product.name)}">
          <div class="cart-item-info">
            <div class="cart-item-name">${escapeHtml(item.product.name)}</div>
            <div class="cart-item-price">${formatPrice(item.product.priceUZS, currency)}</div>
            <div class="cart-qty-control">
              <button class="qty-btn" onclick="store.updateCartQuantity('${item.productId}', ${item.quantity - 1}); app.openCartDrawer();">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" onclick="store.updateCartQuantity('${item.productId}', ${item.quantity + 1}); app.openCartDrawer();">+</button>
            </div>
          </div>
          <button class="btn-remove-item" onclick="store.removeFromCart('${item.productId}'); app.openCartDrawer();">&times;</button>
        </div>
      `).join('');
    }

    totalEl.innerText = formatPrice(totalUZS, currency);
    overlay.classList.add('active');
  }

  closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ================= 8. MAHSULOT KARTOCHKASI SHABLONI =================
  renderProductCard(p, currency) {
    const isWishlist = store.isInWishlist(p.id);

    // Qisqa spetsifikatsiyalar
    let specsHtml = '';
    if (p.specs) {
      const s = p.specs;
      if (s.cpu) specsHtml += `<div class="spec-line"><strong>CPU:</strong> ${escapeHtml(s.cpu)}</div>`;
      if (s.gpu) specsHtml += `<div class="spec-line"><strong>GPU:</strong> ${escapeHtml(s.gpu)}</div>`;
      if (s.ram) specsHtml += `<div class="spec-line"><strong>RAM:</strong> ${escapeHtml(s.ram)}</div>`;
      if (s.storage) specsHtml += `<div class="spec-line"><strong>SSD/HDD:</strong> ${escapeHtml(s.storage)}</div>`;
      if (s.screenSize) specsHtml += `<div class="spec-line"><strong>Ekran:</strong> ${escapeHtml(s.screenSize)}</div>`;
      if (s.monitor && s.monitor.includes('Full HD')) specsHtml += `<div class="spec-line"><strong>Monitor:</strong> ${escapeHtml(s.monitor)}</div>`;
    }

    return `
      <div class="product-card">
        <!-- Floating Badges -->
        <div class="card-badges">
          ${p.isNew 
            ? `<span class="badge badge-new">YANGI</span>` 
            : `<span class="badge badge-used">ISHLATILGAN</span>`}
          ${p.discountPercent > 0 ? `<span class="badge badge-discount">-${p.discountPercent}%</span>` : ''}
          ${p.creditAvailable ? `<span class="badge badge-credit">KREDITGA</span>` : ''}
        </div>

        <!-- Wishlist toggle -->
        <button class="btn-wishlist-toggle ${isWishlist ? 'active' : ''}" onclick="store.toggleWishlist('${p.id}'); this.classList.toggle('active');" title="Sevimlilarga qo'shish">
          ♥
        </button>

        <!-- Media -->
        <div class="card-media" onclick="app.openDetailModal('${p.id}')" style="cursor: pointer;">
          <img src="${p.images?.[0] || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80'}" alt="${escapeHtml(p.name)}" loading="lazy">
        </div>

        <!-- Content -->
        <div class="card-content">
          <div class="card-category-brand">
            <span class="card-brand">${escapeHtml(p.brand || '')}</span>
            <span style="font-size: 11px; color: ${p.stock > 0 ? '#059669' : '#DC2626'}; font-weight: 600;">
              ${p.stock > 0 ? `Omborda: ${p.stock} ta` : 'Tugagan'}
            </span>
          </div>

          <h3 class="card-title" onclick="app.openDetailModal('${p.id}')">
            ${escapeHtml(p.name)}
          </h3>

          <!-- Agar ishlatilgan bo'lsa, holat nishoni -->
          ${!p.isNew && p.usageCondition ? `
            <div class="used-condition-alert">
              <strong>Holati:</strong> ${escapeHtml(p.usageCondition)}
            </div>
          ` : ''}

          <!-- Qisqa spetsifikatsiyalar -->
          ${specsHtml ? `<div class="card-specs">${specsHtml}</div>` : ''}

          <!-- Narx bloki -->
          <div class="card-price-box">
            <div class="price-row">
              <span class="current-price">${formatPrice(p.priceUZS, currency, p.priceRUB)}</span>
              ${p.oldPriceUZS ? `<span class="old-price">${formatPrice(p.oldPriceUZS, currency)}</span>` : ''}
            </div>
            ${p.creditAvailable ? `
              <div class="credit-monthly-pill">
                💳 ${formatPrice(p.monthlyPaymentUZS || calculateCreditMonthly(p.priceUZS, 0, 12), currency)} / oy
              </div>
            ` : ''}
          </div>

          <!-- Tugmalar -->
          <div class="card-actions">
            <button class="btn-card-cart" onclick="store.addToCart('${p.id}')">
              🛒 Savatga
            </button>
            <button class="btn-card-buy" onclick="app.buyNow('${p.id}')">
              Sotib olish
            </button>
            <button class="btn-card-detail" onclick="app.openDetailModal('${p.id}')">
              Batafsil ma'lumot &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ================= 9. MAHSULOT BATAFSIL MODALI =================
  openDetailModal(productId) {
    const prod = store.getProductById(productId);
    if (!prod) return;

    this.selectedDetailProduct = prod;
    store.addRecentlyViewed(productId);

    const overlay = document.getElementById('detail-modal-overlay');
    const content = document.getElementById('detail-modal-content');
    const currency = store.getCurrency();

    if (!overlay || !content) return;

    // Texnik spetsifikatsiyalar jadvali
    let specsRows = '';
    if (prod.specs) {
      for (const [key, val] of Object.entries(prod.specs)) {
        if (val) {
          let label = key.toUpperCase();
          if (key === 'cpu') label = 'Protsessor (CPU)';
          if (key === 'gpu') label = 'Videokarta (GPU)';
          if (key === 'ram') label = 'Tezkor xotira (RAM)';
          if (key === 'storage') label = 'Doimiy xotira (SSD/HDD)';
          if (key === 'motherboard') label = 'Ona plata (Motherboard)';
          if (key === 'powerSupply') label = 'Quvvat bloki (PSU)';
          if (key === 'cooler') label = 'Sovutish tizimi';
          if (key === 'case') label = 'Kompyuter korpusi';
          if (key === 'monitor') label = 'Monitor';
          if (key === 'screenSize') label = 'Ekran o\'lchami va paneli';
          if (key === 'battery') label = 'Batareya quvvati';
          if (key === 'weight') label = 'Og\'irligi';
          if (key === 'os') label = 'Operatsion tizim';
          if (key === 'socket') label = 'Soket turi';
          if (key === 'cores') label = 'Yadrolar soni';

          specsRows += `
            <tr>
              <td>${label}</td>
              <td>${escapeHtml(val)}</td>
            </tr>
          `;
        }
      }
    }

    content.innerHTML = `
      <div class="detail-modal-body">
        <div class="detail-grid">
          <!-- Galereya -->
          <div>
            <div class="gallery-main">
              <img id="detail-main-img" src="${prod.images?.[0] || 'https://via.placeholder.com/500'}" alt="${escapeHtml(prod.name)}">
            </div>
            ${prod.images && prod.images.length > 1 ? `
              <div class="gallery-thumbs">
                ${prod.images.map((img, idx) => `
                  <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="app.setGalleryImage('${img}', this)">
                    <img src="${img}" alt="Thumb">
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Asosiy tafsilotlar -->
          <div>
            <div class="detail-meta-header">
              <div style="display: flex; gap: 6px; margin-bottom: 8px;">
                ${prod.isNew 
                  ? `<span class="badge badge-new">YANGI MAHSULOT</span>` 
                  : `<span class="badge badge-used">ISHLATILGAN (B/U)</span>`}
                ${prod.discountPercent > 0 ? `<span class="badge badge-discount">-${prod.discountPercent}% CHEGIRMA</span>` : ''}
                ${prod.creditAvailable ? `<span class="badge badge-credit">KREDITGA MAVJUD</span>` : ''}
              </div>
              <h2 class="detail-title">${escapeHtml(prod.name)}</h2>
              <div style="font-size: 13px; color: var(--text-muted); display: flex; gap: 16px;">
                <span>Brend: <strong style="color: var(--accent);">${escapeHtml(prod.brand || 'UzTech')}</strong></span>
                <span>Kafolat: <strong>${escapeHtml(prod.warranty || '12 oy')}</strong></span>
                <span style="color: ${prod.stock > 0 ? '#059669' : '#DC2626'}; font-weight: 700;">
                  ${prod.stock > 0 ? `Omborda: ${prod.stock} dona mavjud` : 'Hozirda tugagan'}
                </span>
              </div>
            </div>

            <!-- Narx va Kredit bloki -->
            <div class="detail-price-section">
              <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px;">
                <span style="font-size: 26px; font-weight: 900; color: var(--primary);">
                  ${formatPrice(prod.priceUZS, currency, prod.priceRUB)}
                </span>
                ${prod.oldPriceUZS ? `
                  <span style="font-size: 16px; color: #94A3B8; text-decoration: line-through;">
                    ${formatPrice(prod.oldPriceUZS, currency)}
                  </span>
                ` : ''}
              </div>
              ${prod.creditAvailable ? `
                <div style="background: #EDE9FE; color: #6D28D9; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                  💳 Muddatli to'lovga: ${formatPrice(prod.monthlyPaymentUZS || calculateCreditMonthly(prod.priceUZS, 0, 12), currency)} / oy
                  <button onclick="app.closeDetailModal(); app.openCreditModal('${prod.id}')" style="color: #6D28D9; text-decoration: underline; font-weight: 800; margin-left: 6px;">Ariza berish</button>
                </div>
              ` : ''}
            </div>

            <!-- Ishlatilgan bo'lsa test holati -->
            ${!prod.isNew ? `
              <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-sm); padding: 14px; margin-bottom: 20px;">
                <div style="font-weight: 700; color: #92400E; margin-bottom: 4px; font-size: 13px;">
                  🔍 Mahsulot holati va Test natijalari:
                </div>
                <div style="font-size: 13px; color: #78350F; margin-bottom: 4px;">
                  <strong>Holati:</strong> ${escapeHtml(prod.usageCondition || 'A holat')}
                </div>
                <div style="font-size: 13px; color: #78350F;">
                  <strong>Sinovdan o'tganligi:</strong> ${escapeHtml(prod.testingStatus || 'Stress testdan muvaffaqiyatli o\'tgan')}
                </div>
              </div>
            ` : ''}

            <!-- Tugmalar -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
              <button class="btn-primary" style="justify-content: center; padding: 14px;" onclick="store.addToCart('${prod.id}')">
                🛒 Savatga qo'shish
              </button>
              <button class="btn-card-buy" style="justify-content: center; padding: 14px; font-size: 15px;" onclick="app.closeDetailModal(); app.buyNow('${prod.id}')">
                ⚡ Bir klikda sotib olish
              </button>
            </div>

            <!-- Kafolat va Yetkazish ko'rsatkichlari -->
            <div class="detail-guarantees">
              <div class="guarantee-box">
                <span style="font-size: 20px;">🚚</span>
                <div>
                  <div style="font-weight: 700; color: var(--primary);">Tezkor yetkazish</div>
                  <div style="font-size: 11px; color: var(--text-muted);">Toshkentda 3 soatda, viloyatlarga 24 soatda</div>
                </div>
              </div>
              <div class="guarantee-box">
                <span style="font-size: 20px;">🛡</span>
                <div>
                  <div style="font-weight: 700; color: var(--primary);">Rasmiy Kafolat</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(prod.warranty || 'Kafolatlangan')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tavsif va Xususiyatlar jadvali -->
        <div style="margin-top: 10px;">
          <h3 style="font-size: 18px; font-weight: 800; color: var(--primary); margin-bottom: 12px;">
            To'liq Texnik Xususiyatlar
          </h3>
          <table class="detail-specs-table">
            <tbody>
              ${specsRows || '<tr><td colspan="2">Qo\'shimcha parametrlar ko\'rsatilmagan</td></tr>'}
            </tbody>
          </table>

          ${prod.description ? `
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">
                Mahsulot Tavsifi
              </h3>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                ${escapeHtml(prod.description)}
              </p>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    overlay.classList.add('active');
  }

  setGalleryImage(src, thumbEl) {
    const mainImg = document.getElementById('detail-main-img');
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  closeDetailModal() {
    const overlay = document.getElementById('detail-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    this.selectedDetailProduct = null;
  }

  // ================= 10. CHECKOUT MODALI (BUYURTMA BERISH) =================
  buyNow(productId) {
    store.addToCart(productId, 1);
    this.openCheckoutModal();
  }

  openCheckoutModal() {
    this.closeCartDrawer();
    const overlay = document.getElementById('checkout-modal-overlay');
    const content = document.getElementById('checkout-modal-content');
    const currency = store.getCurrency();

    if (!overlay || !content) return;

    const cartItems = store.getCartItems();
    const totalUZS = store.getCartTotalUZS();

    if (cartItems.length === 0) {
      showToast("Savatingiz bo'sh. Avval mahsulot tanlang!", "warning");
      return;
    }

    content.innerHTML = `
      <div style="padding: 30px;">
        <h2 style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 6px;">
          🛍 Buyurtmani Rasmiylashtirish
        </h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 22px;">
          Ma'lumotlaringizni kiriting, operatorimiz tez orada buyurtmani tasdiqlash uchun bog'lanadi.
        </p>

        <form id="checkout-form" onsubmit="app.submitCheckout(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Ism va familiyangiz *</label>
              <input type="text" name="customerName" class="form-input" required placeholder="Masalan: Sardor Rahimov">
            </div>
            <div class="form-group">
              <label class="form-label">Telefon raqamingiz *</label>
              <input type="tel" name="phone" class="form-input" required placeholder="+998 88 385 17 10">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Viloyat *</label>
              <select name="region" class="form-select" required>
                ${UZBEKISTAN_REGIONS.map(r => `<option value="${r}">${r}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Shahar yoki Tuman *</label>
              <input type="text" name="city" class="form-input" required placeholder="Masalan: Yunusobod tumani">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Aniq yetkazib berish manzili *</label>
            <input type="text" name="address" class="form-input" required placeholder="Ko'cha, uy, xonadon raqami">
          </div>

          <div class="form-group">
            <label class="form-label">To'lov usulini tanlang *</label>
            <div class="payment-options-grid">
              <label class="payment-radio-box selected" onclick="app.selectPaymentBox(this)">
                <input type="radio" name="paymentType" value="naqd" checked>
                <div>
                  <div class="payment-title">💵 Naqd pul</div>
                  <small style="color: var(--text-muted);">Qabul qilib olinganda to'lash</small>
                </div>
              </label>

              <label class="payment-radio-box" onclick="app.selectPaymentBox(this)">
                <input type="radio" name="paymentType" value="karta">
                <div>
                  <div class="payment-title">💳 Karta orqali</div>
                  <small style="color: var(--text-muted);">Uzcard / Humo / Visa</small>
                </div>
              </label>

              <label class="payment-radio-box" onclick="app.selectPaymentBox(this)">
                <input type="radio" name="paymentType" value="yetkazib-berishda">
                <div>
                  <div class="payment-title">🚚 Yetkazib berishda to'lov</div>
                  <small style="color: var(--text-muted);">Kuryer orqali to'lash</small>
                </div>
              </label>

              <label class="payment-radio-box" onclick="app.selectPaymentBox(this)">
                <input type="radio" name="paymentType" value="kredit">
                <div>
                  <div class="payment-title">📋 Kreditga</div>
                  <small style="color: var(--text-muted);">Muddatli to'lovga olish</small>
                </div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Izoh yoki maxsus talablar (ixtiyoriy)</label>
            <textarea name="comment" class="form-textarea" rows="2" placeholder="Masalan: Soat 18:00 dan keyin yetkazilsin..."></textarea>
          </div>

          <!-- Xarid xulosasi -->
          <div style="background: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 16px; color: var(--primary);">
              <span>To'lov uchun jami summa:</span>
              <span style="color: var(--accent);">${formatPrice(totalUZS, currency)}</span>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button type="button" class="btn-secondary" onclick="app.closeCheckoutModal()" style="color: var(--primary);">Bekor qilish</button>
            <button type="submit" class="btn-primary" style="padding: 12px 28px;">
              ✓ Buyurtmani tasdiqlash
            </button>
          </div>
        </form>
      </div>
    `;

    overlay.classList.add('active');
  }

  selectPaymentBox(box) {
    document.querySelectorAll('.payment-radio-box').forEach(b => b.classList.remove('selected'));
    box.classList.add('selected');
  }

  closeCheckoutModal() {
    const overlay = document.getElementById('checkout-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  submitCheckout(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const paymentType = formData.get('paymentType');
    let paymentLabel = "Naqd pul";
    if (paymentType === 'karta') paymentLabel = "Karta orqali";
    if (paymentType === 'yetkazib-berishda') paymentLabel = "Yetkazib berishda to'lov";
    if (paymentType === 'kredit') paymentLabel = "Kreditga";

    const cartItems = store.getCartItems();
    const totalUZS = store.getCartTotalUZS();

    const orderData = {
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      region: formData.get('region'),
      city: formData.get('city'),
      address: formData.get('address'),
      paymentType: paymentType,
      paymentLabel: paymentLabel,
      comment: formData.get('comment') || '',
      items: cartItems.map(i => ({
        id: i.productId,
        name: i.product.name,
        priceUZS: i.product.priceUZS,
        quantity: i.quantity,
        image: i.product.images?.[0]
      })),
      totalUZS: totalUZS
    };

    const newOrder = store.createOrder(orderData);

    // Muvaffaqiyatli xabarni ko'rsatish
    const content = document.getElementById('checkout-modal-content');
    if (content) {
      content.innerHTML = `
        <div class="order-success-card">
          <div class="success-icon-large">✓</div>
          <h2 style="font-size: 24px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">
            Buyurtmangiz qabul qilindi!
          </h2>
          <div style="display: inline-block; background: #EFF6FF; color: var(--accent); padding: 6px 14px; border-radius: var(--radius-full); font-weight: 800; font-size: 14px; margin-bottom: 16px;">
            Buyurtma kodi: #${newOrder.id}
          </div>
          <p style="color: #475569; max-width: 440px; margin: 0 auto 24px; font-size: 15px; line-height: 1.5;">
            Rahmat, <strong>${escapeHtml(newOrder.customerName)}</strong>! Operatorimiz tez orada <strong>${escapeHtml(newOrder.phone)}</strong> raqamiga siz bilan bog'lanadi.
          </p>
          <button class="btn-primary" onclick="app.closeCheckoutModal(); window.location.hash = '#home';">
            Bosh sahifaga qaytish
          </button>
        </div>
      `;
    }
  }

  // ================= 11. KREDIT ARIZA MODALI =================
  openCreditModal(productId = null, initialPayment = 0, defaultMonths = 12) {
    const overlay = document.getElementById('credit-modal-overlay');
    const content = document.getElementById('credit-modal-content');
    const creditProducts = store.products.filter(p => p.creditAvailable);

    if (!overlay || !content) return;

    content.innerHTML = `
      <div style="padding: 30px;">
        <h2 style="font-size: 22px; font-weight: 800; color: #7C3AED; margin-bottom: 6px;">
          💳 Kreditga Olish Uchun Ariza
        </h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 22px;">
          Arizangizni to'ldiring, bank va moliyaviy mutaxassislarimiz tezda ko'rib chiqishadi.
        </p>

        <form id="credit-app-form" onsubmit="app.submitCreditApplication(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">To'liq ismingiz *</label>
              <input type="text" name="customerName" class="form-input" required placeholder="Masalan: Jamshid Aliyev">
            </div>
            <div class="form-group">
              <label class="form-label">Telefon raqamingiz *</label>
              <input type="tel" name="phone" class="form-input" required placeholder="+998 90 999 88 77">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Mahsulot *</label>
            <select name="productId" class="form-select" required>
              ${creditProducts.map(p => `
                <option value="${p.id}" ${productId === p.id ? 'selected' : ''}>
                  ${escapeHtml(p.name)} (${formatPrice(p.priceUZS, 'UZS')})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Boshlang'ich to'lov (so'm)</label>
              <input type="number" name="initialPayment" class="form-input" value="${initialPayment || 0}" placeholder="0">
            </div>
            <div class="form-group">
              <label class="form-label">Kredit muddati *</label>
              <select name="termMonths" class="form-select" required>
                <option value="3" ${defaultMonths === 3 ? 'selected' : ''}>3 oy</option>
                <option value="6" ${defaultMonths === 6 ? 'selected' : ''}>6 oy</option>
                <option value="12" ${defaultMonths === 12 ? 'selected' : ''}>12 oy (Tavsiya etiladi)</option>
                <option value="24" ${defaultMonths === 24 ? 'selected' : ''}>24 oy</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Qo'shimcha izoh yoki daromad ma'lumoti</label>
            <textarea name="comment" class="form-textarea" rows="2" placeholder="Masalan: Plastik karta aylanmasi mavjud..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn-secondary" onclick="app.closeCreditModal()" style="color: var(--primary);">Bekor qilish</button>
            <button type="submit" class="btn-primary" style="background: #7C3AED; border-color: #7C3AED;">
              Arizani jo'natish
            </button>
          </div>
        </form>
      </div>
    `;

    overlay.classList.add('active');
  }

  closeCreditModal() {
    const overlay = document.getElementById('credit-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  submitCreditApplication(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const productId = formData.get('productId');
    const prod = store.getProductById(productId);
    const initialPayment = parseFloat(formData.get('initialPayment')) || 0;
    const termMonths = parseInt(formData.get('termMonths')) || 12;

    const data = {
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      productName: prod ? prod.name : 'Noma\'lum',
      productId: productId,
      initialPayment: initialPayment,
      termMonths: termMonths,
      monthlyPaymentEstimate: prod ? calculateCreditMonthly(prod.priceUZS, initialPayment, termMonths) : 0,
      comment: formData.get('comment') || ''
    };

    store.createCreditApplication(data);

    const content = document.getElementById('credit-modal-content');
    if (content) {
      content.innerHTML = `
        <div class="order-success-card">
          <div class="success-icon-large" style="background: #EDE9FE; color: #7C3AED;">✓</div>
          <h2 style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">
            Arizangiz qabul qilindi!
          </h2>
          <p style="color: #475569; max-width: 420px; margin: 0 auto 24px; font-size: 15px; line-height: 1.5;">
            Tez orada operator siz bilan bog'lanadi va kredit shartnomasi bo'yicha ko'maklashadi.
          </p>
          <button class="btn-primary" style="background: #7C3AED;" onclick="app.closeCreditModal()">
            Tushundim
          </button>
        </div>
      `;
    }
  }

  // ================= 12. MOBIL MENYU BOSHQARUVI =================
  toggleMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (drawer && overlay) {
      drawer.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  }

  closeMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

// Global ilova obyekti
const app = new App();
window.app = app;

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
