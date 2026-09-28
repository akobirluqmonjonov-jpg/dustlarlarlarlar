// ==============================================================
// MENS LUXURY - Asosiy Dastur Mantiqi
// ==============================================================

// Dastur holati (State)
const state = {
  products: PRODUCTS,
  filteredProducts: PRODUCTS,
  currentCategory: "all",
  searchQuery: "",
  sortBy: "default",
  cart: JSON.parse(localStorage.getItem("mens_cart")) || [],
  selectedProductForView: null
};

// DOM Elementlari
const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.querySelectorAll(".cat-btn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartCountBadges = document.querySelectorAll(".cart-count");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const btnOpenCart = document.getElementById("btnOpenCart");
const btnCloseCart = document.getElementById("btnCloseCart");
const btnProceedCheckout = document.getElementById("btnProceedCheckout");

// Modallar
const quickViewModal = document.getElementById("quickViewModal");
const btnCloseQuickView = document.getElementById("btnCloseQuickView");
const quickViewContent = document.getElementById("quickViewContent");

const checkoutModal = document.getElementById("checkoutModal");
const btnCloseCheckout = document.getElementById("btnCloseCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutSummaryItems = document.getElementById("checkoutSummaryItems");
const checkoutSummaryTotal = document.getElementById("checkoutSummaryTotal");

const botSettingsModal = document.getElementById("botSettingsModal");
const btnOpenBotSettings = document.getElementById("btnOpenBotSettings");
const btnCloseBotSettings = document.getElementById("btnCloseBotSettings");
const botSettingsForm = document.getElementById("botSettingsForm");
const botTokenInput = document.getElementById("botTokenInput");
const chatIdInput = document.getElementById("chatIdInput");

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
  loadBotSettings();
});

// ==================== MAHSULOTLARNI RENDER QILISH ====================
function renderProducts() {
  applyFiltersAndSort();

  if (state.filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-products">
        <i class="fas fa-box-open"></i>
        <h3>Mahsulot topilmadi</h3>
        <p style="color: var(--text-muted); margin-top: 8px;">
          Qidiruv so'rovingizga yoki tanlangan toifaga mos kiyim topilmadi.
        </p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = state.filteredProducts.map(product => {
    const badgeHtml = product.badge 
      ? `<span class="product-badge">${product.badge}</span>` 
      : '';
      
    const oldPriceHtml = product.oldPrice 
      ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` 
      : '';

    const sizesHtml = product.sizes.slice(0, 4).map(s => `<span class="size-tag">${s}</span>`).join('');

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrapper">
          ${badgeHtml}
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80';" />
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">
            <i class="far fa-eye"></i> Tez ko'rish
          </button>
        </div>
        <div class="product-info">
          <span class="product-cat">${product.categoryName}</span>
          <h3 class="product-name">${product.name}</h3>
          
          <div class="product-rating">
            <span class="stars"><i class="fas fa-star"></i> ${product.rating}</span>
            <span>(${product.reviewsCount} ta baho)</span>
          </div>

          <div class="product-sizes-tags">
            ${sizesHtml}
          </div>

          <div class="product-bottom">
            <div class="product-prices">
              <span class="price-current">${formatPrice(product.price)}</span>
              ${oldPriceHtml}
            </div>
            <button class="btn-add-cart" onclick="addToCartQuick(${product.id})" title="Savatga qo'shish">
              <i class="fas fa-shopping-bag"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== FILTER VA SARALASH ====================
function applyFiltersAndSort() {
  let list = [...state.products];

  // Kategoriya bo'yicha filter
  if (state.currentCategory !== "all") {
    list = list.filter(item => item.category === state.currentCategory);
  }

  // Qidiruv bo'yicha filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q)
    );
  }

  // Saralash
  if (state.sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  state.filteredProducts = list;
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Kategoriya tugmalari
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentCategory = btn.getAttribute("data-category");
      renderProducts();
    });
  });

  // Qidiruv
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  // Saralash
  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Savatcha ochish/yopish
  btnOpenCart.addEventListener("click", openCart);
  btnCloseCart.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Buyurtma berish tugmasi
  btnProceedCheckout.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Savatchangiz bo'sh!", "warning");
      return;
    }
    closeCart();
    openCheckout();
  });

  // Modallarni yopish
  btnCloseQuickView.addEventListener("click", closeQuickView);
  btnCloseCheckout.addEventListener("click", closeCheckout);
  
  if (btnOpenBotSettings) {
    btnOpenBotSettings.addEventListener("click", openBotSettings);
  }
  if (btnCloseBotSettings) {
    btnCloseBotSettings.addEventListener("click", closeBotSettings);
  }

  // Modaldan tashqari bosilganda yopish
  window.addEventListener("click", (e) => {
    if (e.target === quickViewModal) closeQuickView();
    if (e.target === checkoutModal) closeCheckout();
    if (e.target === botSettingsModal) closeBotSettings();
  });

  // Buyurtma formasi
  checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Bot sozlamalari formasi
  if (botSettingsForm) {
    botSettingsForm.addEventListener("submit", handleBotSettingsSubmit);
  }
}

// ==================== SAVATCHA OPERATSIYALARI ====================
function saveCart() {
  localStorage.setItem("mens_cart", JSON.stringify(state.cart));
  updateCartUI();
}

function addToCartQuick(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  // Sukut bo'yicha birinchi o'lcham tanlanadi
  const defaultSize = product.sizes[0];
  addToCart(productId, defaultSize);
}

function addToCart(productId, size, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(
    item => item.id === productId && item.selectedSize === size
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName,
      selectedSize: size,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`"${product.name}" (${size}) savatga qo'shildi!`);
}

function updateCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
}

function removeFromCart(index) {
  if (!state.cart[index]) return;
  const removedName = state.cart[index].name;
  state.cart.splice(index, 1);
  saveCart();
  showToast(`"${removedName}" savatdan olib tashlandi.`);
}

function calculateTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadges.forEach(b => b.textContent = totalCount);

  const totalSum = calculateTotal();
  cartTotalPrice.textContent = formatPrice(totalSum);

  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h4>Savatchangiz bo'sh</h4>
        <p style="font-size: 0.85rem; margin-top: 8px;">Katalogdan o'zingizga yoqqan libosni tanlang.</p>
      </div>
    `;
    return;
  }

  cartItemsList.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80';" />
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-meta">
          <span>O'lcham: <b>${item.selectedSize}</b></span>
        </div>
        <div class="cart-item-bottom">
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
          <button class="btn-remove-item" onclick="removeFromCart(${index})" title="O'chirish">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  cartOverlay.classList.add("active");
  cartDrawer.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartOverlay.classList.remove("active");
  cartDrawer.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==================== TEZKOR KO'RISH (QUICK VIEW) ====================
let currentSelectedSize = null;

function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductForView = product;
  currentSelectedSize = product.sizes[0];

  const oldPriceHtml = product.oldPrice 
    ? `<span class="price-old" style="font-size: 1rem;">${formatPrice(product.oldPrice)}</span>` 
    : '';

  quickViewContent.innerHTML = `
    <div class="quick-view-grid">
      <div>
        <img src="${product.image}" alt="${product.name}" class="quick-view-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80';" />
      </div>
      <div>
        <span class="product-cat">${product.categoryName}</span>
        <h2 style="font-size: 1.5rem; margin-bottom: 8px;">${product.name}</h2>
        
        <div class="product-rating" style="margin-bottom: 14px;">
          <span class="stars"><i class="fas fa-star"></i> ${product.rating}</span>
          <span>(${product.reviewsCount} ta sharh)</span>
        </div>

        <div style="margin-bottom: 18px;">
          <span style="font-size: 1.6rem; font-weight: 800; color: var(--accent-gold); margin-right: 10px;">
            ${formatPrice(product.price)}
          </span>
          ${oldPriceHtml}
        </div>

        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
          ${product.description}
        </p>

        <label style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #fff;">
          O'lchamni tanlang:
        </label>
        <div class="qv-sizes" id="qvSizesContainer">
          ${product.sizes.map((s, idx) => `
            <button type="button" class="qv-size-btn ${idx === 0 ? 'selected' : ''}" onclick="selectQuickViewSize('${s}', this)">
              ${s}
            </button>
          `).join('')}
        </div>

        <button class="btn-primary" style="width: 100%; justify-content: center; margin-top: 10px;" onclick="addQuickViewToCart()">
          <i class="fas fa-shopping-bag"></i> Savatchaga qo'shish
        </button>

        <div style="margin-top: 20px; font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 8px;">
          <div><i class="fas fa-check-circle" style="color: var(--accent-green); margin-right: 6px;"></i> 100% Sifatli original mahsulot</div>
          <div><i class="fas fa-truck" style="color: var(--accent-gold); margin-right: 6px;"></i> Tezkor yetkazib berish xizmati</div>
        </div>
      </div>
    </div>
  `;

  quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function selectQuickViewSize(size, el) {
  currentSelectedSize = size;
  document.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("selected"));
  el.classList.add("selected");
}

function addQuickViewToCart() {
  if (!state.selectedProductForView) return;
  addToCart(state.selectedProductForView.id, currentSelectedSize);
  closeQuickView();
  openCart();
}

function closeQuickView() {
  quickViewModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==================== BUYURTMA RASMIYLASHTIRISH ====================
function openCheckout() {
  checkoutSummaryItems.innerHTML = state.cart.map(item => `
    <div class="checkout-summary-row">
      <span>${item.name} (${item.selectedSize}) x ${item.quantity}</span>
      <b>${formatPrice(item.price * item.quantity)}</b>
    </div>
  `).join('');

  const totalSum = calculateTotal();
  checkoutSummaryTotal.textContent = formatPrice(totalSum);

  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const address = document.getElementById("orderAddress").value.trim();
  const note = document.getElementById("orderNote").value.trim();

  if (!name || !phone) {
    showToast("Iltimos, ismingiz va telefon raqamingizni kiriting!", "warning");
    return;
  }

  const orderData = {
    customerName: name,
    customerPhone: phone,
    customerAddress: address,
    customerNote: note,
    items: state.cart,
    totalAmount: calculateTotal()
  };

  const submitBtn = checkoutForm.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Buyurtma yuborilmoqda...`;

  try {
    const result = await sendOrderNotification(orderData);

    // Muvaffaqiyat xabari
    closeCheckout();
    state.cart = [];
    saveCart();
    checkoutForm.reset();

    showToast("Buyurtmangiz qabul qilindi! Tez orada bog'lanamiz.", "success");

    // Xaridorni Telegramga buyurtma tafsilotlari bilan yo'naltirish
    setTimeout(() => {
      const confirmTg = confirm(
        "Buyurtmangiz muvaffaqiyatli qayd etildi!\nDo'kon egasi (@Lukhmonjonov_10) bilan Telegram orqali bog'lanishni xohlaysizmi?"
      );
      if (confirmTg) {
        window.open(result.telegramDirectUrl, "_blank");
      }
    }, 500);

  } catch (err) {
    console.error(err);
    showToast("Buyurtma yuborishda xatolik yuz berdi. Iltimos telefon qiling.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Buyurtmani Tasdiqlash`;
  }
}

// ==================== BOT SOZLAMALARI ====================
function loadBotSettings() {
  if (botTokenInput) botTokenInput.value = STORE_CONFIG.botToken;
  if (chatIdInput) chatIdInput.value = STORE_CONFIG.chatId;
}

function openBotSettings() {
  loadBotSettings();
  botSettingsModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBotSettings() {
  botSettingsModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function handleBotSettingsSubmit(e) {
  e.preventDefault();
  const token = botTokenInput.value.trim();
  const chatId = chatIdInput.value.trim();

  STORE_CONFIG.botToken = token;
  STORE_CONFIG.chatId = chatId;

  localStorage.setItem("store_bot_token", token);
  localStorage.setItem("store_chat_id", chatId);

  closeBotSettings();
  showToast("Telegram bildirishnoma sozlamalari saqlandi!", "success");
}

// ==================== TOAST BILDIRISHNOMA ====================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  
  let icon = "fa-check-circle";
  if (type === "warning") icon = "fa-exclamation-triangle";
  if (type === "error") icon = "fa-times-circle";

  toast.innerHTML = `
    <i class="fas ${icon}" style="color: var(--accent-gold); font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
