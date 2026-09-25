/**
 * UzTech PC Market - Admin Dashboard Controller (admin.js)
 * Mahsulotlarni boshqarish (CRUD), buyurtmalar holati, kredit arizalari
 */

class AdminController {
  constructor() {
    this.currentTab = 'products';
    this.editingProductId = null;
  }

  init() {
    // Admin obunalar
    store.subscribe((event) => {
      if (['products-updated', 'orders-updated', 'credit-apps-updated'].includes(event)) {
        if (window.app && window.app.currentRoute === 'admin') {
          this.render();
        }
      }
    });
  }

  render() {
    const adminContainer = document.getElementById('admin-view-container');
    if (!adminContainer) return;

    const products = store.products;
    const orders = store.orders;
    const creditApps = store.creditApplications;
    const currency = store.getCurrency();

    // Statistika hisoblash
    const totalProductsCount = products.length;
    const newOrdersCount = orders.filter(o => o.status === 'Yangi').length;
    const pendingCreditCount = creditApps.filter(c => c.status === "Ko'rib chiqilmoqda").length;
    const lowStockCount = products.filter(p => p.stock <= 3).length;

    adminContainer.innerHTML = `
      <div class="container admin-wrapper">
        <div class="admin-header-row">
          <div>
            <h1 class="admin-title">⚙ Do'kon Boshqaruv Paneli</h1>
            <p style="color: var(--text-muted); font-size: 14px;">Mahsulotlar bazasi, tushgan buyurtmalar va kredit arizalarini to'liq nazorat qilish</p>
          </div>
          <div class="admin-header-actions">
            <button class="btn-primary" onclick="adminController.openProductModal()" style="padding: 10px 18px; font-size: 13px;">
              + Yangi Mahsulot Qo'shish
            </button>
            <button class="btn-secondary" onclick="if(confirm('Barcha ma\\'lumotlarni boshlang\\'ich holatga qaytarishni xohlaysizmi?')) store.resetToDefaultData()" style="padding: 10px 14px; font-size: 13px; color: var(--primary); background: #FFFFFF; border-color: var(--border-color);">
              🔄 Reset Demo
            </button>
          </div>
        </div>

        <!-- 4 ta Asosiy Statistika Kartochkalari -->
        <div class="admin-stats-grid">
          <div class="stat-card">
            <div>
              <div class="stat-info-title">Jami Mahsulotlar</div>
              <div class="stat-info-val">${totalProductsCount} ta</div>
            </div>
            <div class="stat-icon-wrapper" style="background: #DBEAFE; color: #1D4ED8;">📦</div>
          </div>
          <div class="stat-card">
            <div>
              <div class="stat-info-title">Yangi Buyurtmalar</div>
              <div class="stat-info-val" style="color: #2563EB;">${newOrdersCount} ta</div>
            </div>
            <div class="stat-icon-wrapper" style="background: #DCFCE7; color: #15803D;">🛒</div>
          </div>
          <div class="stat-card">
            <div>
              <div class="stat-info-title">Kredit Arizalari</div>
              <div class="stat-info-val" style="color: #7C3AED;">${pendingCreditCount} ta</div>
            </div>
            <div class="stat-icon-wrapper" style="background: #EDE9FE; color: #7C3AED;">💳</div>
          </div>
          <div class="stat-card">
            <div>
              <div class="stat-info-title">Kam Qolgan Tovar (≤3)</div>
              <div class="stat-info-val" style="color: #DC2626;">${lowStockCount} ta</div>
            </div>
            <div class="stat-icon-wrapper" style="background: #FEE2E2; color: #DC2626;">⚠</div>
          </div>
        </div>

        <!-- Tab Navigatsiyasi -->
        <div class="admin-nav-tabs">
          <button class="admin-tab-btn ${this.currentTab === 'products' ? 'active' : ''}" onclick="adminController.switchTab('products')">
            📦 Mahsulotlar Ro'yxati (${products.length})
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'orders' ? 'active' : ''}" onclick="adminController.switchTab('orders')">
            🛍 Xaridlar va Buyurtmalar (${orders.length})
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'credits' ? 'active' : ''}" onclick="adminController.switchTab('credits')">
            📋 Kredit Arizalari (${creditApps.length})
          </button>
        </div>

        <!-- Tab Kontenti -->
        <div id="admin-tab-content">
          ${this.currentTab === 'products' ? this.renderProductsTab(products, currency) : ''}
          ${this.currentTab === 'orders' ? this.renderOrdersTab(orders, currency) : ''}
          ${this.currentTab === 'credits' ? this.renderCreditsTab(creditApps) : ''}
        </div>
      </div>
    `;
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    this.render();
  }

  // --- Mahsulotlar Jadvali ---
  renderProductsTab(products, currency) {
    return `
      <div class="admin-panel-card">
        <div class="admin-panel-toolbar">
          <div style="font-weight: 700; font-size: 15px; color: var(--primary);">
            Mavjud tovarlar: ${products.length} ta
          </div>
          <input type="text" placeholder="Mahsulot nomi yoki brend bo'yicha saralash..." 
            oninput="adminController.filterAdminTable(this.value)" 
            style="padding: 8px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 13px; width: 280px;">
        </div>
        <div class="table-responsive">
          <table class="admin-table" id="admin-products-table">
            <thead>
              <tr>
                <th>Rasm & Nomi</th>
                <th>Kategoriya</th>
                <th>Holat</th>
                <th>Narx (UZS)</th>
                <th>Qoldiq</th>
                <th>Kredit</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td>
                    <div class="table-product-cell">
                      <img src="${p.images?.[0] || 'https://via.placeholder.com/80'}" class="table-thumb" alt="${escapeHtml(p.name)}">
                      <div>
                        <div style="font-weight: 700; color: var(--primary);">${escapeHtml(p.name)}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(p.brand || '')}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style="background: #F1F5F9; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 11px;">
                      ${this.formatCategoryName(p.category)}
                    </span>
                  </td>
                  <td>
                    ${p.isNew 
                      ? `<span class="table-badge-yangi">YANGI</span>` 
                      : `<span class="table-badge-ishlatilgan">ISHLATILGAN</span>`}
                  </td>
                  <td>
                    <div style="font-weight: 800; color: var(--primary);">${formatPrice(p.priceUZS, 'UZS')}</div>
                    ${p.oldPriceUZS ? `<div style="font-size: 11px; color: var(--text-muted); text-decoration: line-through;">${formatPrice(p.oldPriceUZS, 'UZS')}</div>` : ''}
                  </td>
                  <td>
                    <span style="font-weight: 700; color: ${p.stock <= 3 ? '#DC2626' : '#059669'};">
                      ${p.stock} dona
                    </span>
                  </td>
                  <td>
                    ${p.creditAvailable 
                      ? `<span style="color: #7C3AED; font-weight: 700; font-size: 11px;">✓ Kreditga bor</span>` 
                      : `<span style="color: #94A3B8; font-size: 11px;">Yo'q</span>`}
                  </td>
                  <td>
                    <div style="display: flex; gap: 6px;">
                      <button class="btn-table-action btn-edit" onclick="adminController.openProductModal('${p.id}')">✏ Tahrirlash</button>
                      <button class="btn-table-action btn-delete" onclick="adminController.deleteProduct('${p.id}')">🗑 O'chirish</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- Buyurtmalar Jadvali ---
  renderOrdersTab(orders, currency) {
    if (orders.length === 0) {
      return `<div style="padding: 40px; text-align: center; color: var(--text-muted);">Hozircha hech qanday buyurtma tushmagan.</div>`;
    }

    return `
      <div class="admin-panel-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID / Sana</th>
                <th>Mijoz</th>
                <th>Telefon</th>
                <th>Manzil</th>
                <th>Mahsulotlar & Jami</th>
                <th>To'lov Turi</th>
                <th>Holat (Status)</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td>
                    <div style="font-weight: 800; color: var(--primary);">${o.id}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${o.date}</div>
                  </td>
                  <td>
                    <div style="font-weight: 700;">${escapeHtml(o.customerName)}</div>
                  </td>
                  <td>
                    <a href="tel:${escapeHtml(o.phone)}" style="color: var(--accent); font-weight: 600;">${escapeHtml(o.phone)}</a>
                  </td>
                  <td>
                    <div style="font-weight: 600;">${escapeHtml(o.region || '')}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(o.city || '')}, ${escapeHtml(o.address || '')}</div>
                  </td>
                  <td>
                    <div style="font-size: 12px; margin-bottom: 4px;">
                      ${(o.items || []).map(i => `<div>• ${escapeHtml(i.name)} (${i.quantity}x)</div>`).join('')}
                    </div>
                    <div style="font-weight: 800; color: var(--primary);">${formatPrice(o.totalUZS, currency)}</div>
                  </td>
                  <td>
                    <span style="background: #F1F5F9; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 11px;">
                      ${escapeHtml(o.paymentLabel || o.paymentType)}
                    </span>
                  </td>
                  <td>
                    <select class="status-select ${this.getStatusClass(o.status)}" onchange="store.updateOrderStatus('${o.id}', this.value)">
                      <option value="Yangi" ${o.status === 'Yangi' ? 'selected' : ''}>Yangi</option>
                      <option value="Qabul qilindi" ${o.status === 'Qabul qilindi' ? 'selected' : ''}>Qabul qilindi</option>
                      <option value="Tayyorlanmoqda" ${o.status === 'Tayyorlanmoqda' ? 'selected' : ''}>Tayyorlanmoqda</option>
                      <option value="Yetkazilmoqda" ${o.status === 'Yetkazilmoqda' ? 'selected' : ''}>Yetkazilmoqda</option>
                      <option value="Yetkazildi" ${o.status === 'Yetkazildi' ? 'selected' : ''}>Yetkazildi</option>
                      <option value="Bekor qilindi" ${o.status === 'Bekor qilindi' ? 'selected' : ''}>Bekor qilindi</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- Kredit Arizalari Jadvali ---
  renderCreditsTab(credits) {
    if (credits.length === 0) {
      return `<div style="padding: 40px; text-align: center; color: var(--text-muted);">Hozircha kredit arizalari yo'q.</div>`;
    }

    return `
      <div class="admin-panel-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Ariza ID / Sana</th>
                <th>Mijoz Ismi</th>
                <th>Telefon</th>
                <th>Tanlangan Mahsulot</th>
                <th>Boshlang'ich To'lov</th>
                <th>Muddat</th>
                <th>Izoh</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              ${credits.map(c => `
                <tr>
                  <td>
                    <div style="font-weight: 800; color: var(--primary);">${c.id}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${c.date}</div>
                  </td>
                  <td><strong>${escapeHtml(c.customerName)}</strong></td>
                  <td><a href="tel:${escapeHtml(c.phone)}" style="color: var(--accent); font-weight: 600;">${escapeHtml(c.phone)}</a></td>
                  <td><div style="font-weight: 600;">${escapeHtml(c.productName || 'Ko\\'rsatilmagan')}</div></td>
                  <td>${formatPrice(c.initialPayment || 0, 'UZS')}</td>
                  <td><span style="font-weight: 700; color: #7C3AED;">${c.termMonths} oy</span></td>
                  <td><small style="color: var(--text-muted);">${escapeHtml(c.comment || 'Izoh yo\\'q')}</small></td>
                  <td>
                    <span style="background: #EDE9FE; color: #7C3AED; padding: 4px 8px; border-radius: 4px; font-weight: 700; font-size: 11px;">
                      ${c.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getStatusClass(status) {
    switch (status) {
      case 'Yangi': return 'status-yangi';
      case 'Qabul qilindi': return 'status-qabul';
      case 'Tayyorlanmoqda': return 'status-tayyor';
      case 'Yetkazilmoqda': return 'status-yetkazilmoqda';
      case 'Yetkazildi': return 'status-yetkazildi';
      case 'Bekor qilindi': return 'status-bekor';
      default: return '';
    }
  }

  formatCategoryName(cat) {
    switch (cat) {
      case 'yangi-kompyuterlar': return 'Yangi Kompyuterlar';
      case 'ishlatilgan-kompyuterlar': return 'Ishlatilgan Kompyuterlar';
      case 'noutbuklar': return 'Noutbuklar';
      case 'aksessuarlar': return 'Aksessuarlar';
      case 'kompyuter-detallari': return 'Kompyuter Detallari';
      default: return cat;
    }
  }

  filterAdminTable(keyword) {
    const q = keyword.toLowerCase().trim();
    const rows = document.querySelectorAll('#admin-products-table tbody tr');
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  }

  // --- Mahsulot Qo'shish / Tahrirlash Modali ---
  openProductModal(productId = null) {
    this.editingProductId = productId;
    const prod = productId ? store.getProductById(productId) : null;
    const isEdit = !!prod;

    const modalOverlay = document.getElementById('admin-product-modal-overlay');
    const modalContent = document.getElementById('admin-product-modal-content');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div style="padding: 28px;">
        <h2 style="font-size: 20px; font-weight: 800; color: var(--primary); margin-bottom: 20px;">
          ${isEdit ? '✏ Mahsulotni Tahrirlash' : '+ Yangi Mahsulot Qo\'shish'}
        </h2>

        <form id="admin-product-form" onsubmit="adminController.saveProduct(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Mahsulot Nomi *</label>
              <input type="text" name="name" class="form-input" required value="${isEdit ? escapeHtml(prod.name) : ''}" placeholder="Masalan: HyperPC Gaming RTX 4060">
            </div>
            <div class="form-group">
              <label class="form-label">Brend</label>
              <input type="text" name="brand" class="form-input" value="${isEdit ? escapeHtml(prod.brand || '') : ''}" placeholder="Masalan: ASUS, Lenovo, Intel">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Asosiy Kategoriya *</label>
              <select name="category" class="form-select" required>
                <option value="yangi-kompyuterlar" ${isEdit && prod.category === 'yangi-kompyuterlar' ? 'selected' : ''}>Yangi Kompyuterlar</option>
                <option value="ishlatilgan-kompyuterlar" ${isEdit && prod.category === 'ishlatilgan-kompyuterlar' ? 'selected' : ''}>Ishlatilgan Kompyuterlar</option>
                <option value="noutbuklar" ${isEdit && prod.category === 'noutbuklar' ? 'selected' : ''}>Noutbuklar</option>
                <option value="aksessuarlar" ${isEdit && prod.category === 'aksessuarlar' ? 'selected' : ''}>Aksessuarlar</option>
                <option value="kompyuter-detallari" ${isEdit && prod.category === 'kompyuter-detallari' ? 'selected' : ''}>Kompyuter Detallari</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Holat (Condition) *</label>
              <select name="isNew" class="form-select" required>
                <option value="true" ${!isEdit || prod.isNew ? 'selected' : ''}>Yangi (Muborak/Zavod)</option>
                <option value="false" ${isEdit && !prod.isNew ? 'selected' : ''}>Ishlatilgan (B/U)</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Narxi UZS (so'm) *</label>
              <input type="number" name="priceUZS" class="form-input" required value="${isEdit ? prod.priceUZS : ''}" placeholder="12500000">
            </div>
            <div class="form-group">
              <label class="form-label">Narxi RUB (Rossiya rubli)</label>
              <input type="number" name="priceRUB" class="form-input" value="${isEdit ? prod.priceRUB || '' : ''}" placeholder="Avtomatik yoki qo'lda">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Eski Narxi UZS (Chegirma bo'lsa)</label>
              <input type="number" name="oldPriceUZS" class="form-input" value="${isEdit ? prod.oldPriceUZS || '' : ''}" placeholder="14000000">
            </div>
            <div class="form-group">
              <label class="form-label">Ombordagi Qoldiq Soni *</label>
              <input type="number" name="stock" class="form-input" required value="${isEdit ? prod.stock : 5}" placeholder="10">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Kreditga Mavjudligi</label>
              <select name="creditAvailable" class="form-select">
                <option value="true" ${isEdit && prod.creditAvailable ? 'selected' : ''}>Ha, kreditga beriladi</option>
                <option value="false" ${isEdit && !prod.creditAvailable ? 'selected' : ''}>Yo'q, faqat naqd/karta</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Kafolat muddati</label>
              <input type="text" name="warranty" class="form-input" value="${isEdit ? escapeHtml(prod.warranty || '') : '12 oy kafolat'}" placeholder="12 oy rasmiy kafolat">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Protsessor (CPU)</label>
              <input type="text" name="cpu" class="form-input" value="${isEdit ? escapeHtml(prod.specs?.cpu || '') : ''}" placeholder="Intel Core i5-13400F">
            </div>
            <div class="form-group">
              <label class="form-label">Videokarta (GPU)</label>
              <input type="text" name="gpu" class="form-input" value="${isEdit ? escapeHtml(prod.specs?.gpu || '') : ''}" placeholder="RTX 4060 8GB">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">RAM Xotira</label>
              <input type="text" name="ram" class="form-input" value="${isEdit ? escapeHtml(prod.specs?.ram || '') : ''}" placeholder="16 GB DDR4 3200MHz">
            </div>
            <div class="form-group">
              <label class="form-label">SSD / HDD Saqlash</label>
              <input type="text" name="storage" class="form-input" value="${isEdit ? escapeHtml(prod.specs?.storage || '') : ''}" placeholder="1 TB M.2 NVMe SSD">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Ekran o'lchami (Noutbuk yoki Monitor)</label>
              <input type="text" name="screenSize" class="form-input" value="${isEdit ? escapeHtml(prod.specs?.screenSize || '') : ''}" placeholder="15.6 dyuym FHD 144Hz">
            </div>
            <div class="form-group">
              <label class="form-label">Ishlatilgan holati (Agar B/U bo'lsa)</label>
              <input type="text" name="usageCondition" class="form-input" value="${isEdit ? escapeHtml(prod.usageCondition || '') : ''}" placeholder="9/10 holat, tirnalishsiz">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Test holati (Agar ishlatilgan detal yoki kompyuter bo'lsa)</label>
            <input type="text" name="testingStatus" class="form-input" value="${isEdit ? escapeHtml(prod.testingStatus || '') : ''}" placeholder="Furmark va AIDA64 testlaridan 100% o'tgan">
          </div>

          <div class="form-group">
            <label class="form-label">Rasm Havolasi (URL) *</label>
            <input type="url" name="image" class="form-input" required value="${isEdit ? (prod.images?.[0] || '') : 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'}" placeholder="https://...">
          </div>

          <div class="form-group">
            <label class="form-label">Mahsulot Tavsifi</label>
            <textarea name="description" class="form-textarea" rows="3" placeholder="Mahsulot haqida batafsil ma'lumot...">${isEdit ? escapeHtml(prod.description || '') : ''}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn-secondary" onclick="adminController.closeProductModal()" style="color: var(--primary);">Bekor qilish</button>
            <button type="submit" class="btn-primary">Saqlash</button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');
  }

  closeProductModal() {
    const modalOverlay = document.getElementById('admin-product-modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
    this.editingProductId = null;
  }

  saveProduct(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const isNew = formData.get('isNew') === 'true';
    const priceUZS = parseFloat(formData.get('priceUZS')) || 0;
    let priceRUB = parseFloat(formData.get('priceRUB'));
    if (!priceRUB) priceRUB = Math.round(priceUZS / RUB_EXCHANGE_RATE);

    const oldPriceUZS = parseFloat(formData.get('oldPriceUZS')) || null;
    let discountPercent = 0;
    if (oldPriceUZS && oldPriceUZS > priceUZS) {
      discountPercent = Math.round(((oldPriceUZS - priceUZS) / oldPriceUZS) * 100);
    }

    const creditAvailable = formData.get('creditAvailable') === 'true';
    const monthlyPaymentUZS = creditAvailable ? calculateCreditMonthly(priceUZS, 0, 12) : 0;

    const specs = {
      cpu: formData.get('cpu') || '',
      gpu: formData.get('gpu') || '',
      ram: formData.get('ram') || '',
      storage: formData.get('storage') || '',
      screenSize: formData.get('screenSize') || ''
    };

    const productData = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      category: formData.get('category'),
      condition: isNew ? 'yangi' : 'ishlatilgan',
      conditionText: isNew ? 'Yangi' : 'Ishlatilgan',
      usageCondition: formData.get('usageCondition') || '',
      testingStatus: formData.get('testingStatus') || '',
      isNew: isNew,
      priceUZS: priceUZS,
      priceRUB: priceRUB,
      oldPriceUZS: oldPriceUZS,
      discountPercent: discountPercent,
      creditAvailable: creditAvailable,
      monthlyPaymentUZS: monthlyPaymentUZS,
      stock: parseInt(formData.get('stock')) || 1,
      warranty: formData.get('warranty') || '12 oy kafolat',
      description: formData.get('description') || '',
      specs: specs,
      images: [formData.get('image')]
    };

    if (this.editingProductId) {
      store.adminUpdateProduct(this.editingProductId, productData);
    } else {
      store.adminAddProduct(productData);
    }

    this.closeProductModal();
    this.render();
  }

  deleteProduct(productId) {
    if (confirm("Haqiqatan ham ushbu mahsulotni bazadan o'chirmoqchimisiz?")) {
      store.adminDeleteProduct(productId);
      this.render();
    }
  }
}

const adminController = new AdminController();
