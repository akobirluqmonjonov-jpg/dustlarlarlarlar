/**
 * UzTech PC Market - Do'kon Holati va Ma'lumotlar Boshqaruvi (Store)
 * LocalStorage orqali foydalanuvchi ma'lumotlari saqlanadi va real vaqtda yangilanadi.
 */

class Store {
  constructor() {
    this.currency = localStorage.getItem('uztech_currency') || 'UZS';
    this.products = this.loadProducts();
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.recentlyViewed = this.loadRecentlyViewed();
    this.orders = this.loadOrders();
    this.creditApplications = this.loadCreditApplications();
    this.listeners = [];
  }

  // Obuna tizimi (Event Emitter)
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(eventType, data) {
    this.listeners.forEach(cb => cb(eventType, data));
  }

  // --- Mahsulotlar ---
  loadProducts() {
    const saved = localStorage.getItem('uztech_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Mahsulotlarni yuklashda xatolik:", e);
      }
    }
    return [...INITIAL_PRODUCTS];
  }

  saveProducts() {
    localStorage.setItem('uztech_products', JSON.stringify(this.products));
    this.notify('products-updated', this.products);
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  // --- Valyuta ---
  setCurrency(curr) {
    if (curr !== 'UZS' && curr !== 'RUB') return;
    this.currency = curr;
    localStorage.setItem('uztech_currency', curr);
    this.notify('currency-changed', curr);
  }

  getCurrency() {
    return this.currency;
  }

  // --- Savat (Cart) ---
  loadCart() {
    const saved = localStorage.getItem('uztech_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Savatni yuklashda xatolik:", e);
      }
    }
    return [];
  }

  saveCart() {
    localStorage.setItem('uztech_cart', JSON.stringify(this.cart));
    this.notify('cart-updated', this.cart);
  }

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return false;

    const existingIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    showToast(`"${product.name}" savatga qo'shildi!`, 'success');
    return true;
  }

  updateCartQuantity(productId, quantity) {
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index > -1) {
      if (quantity <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity = quantity;
      }
      this.saveCart();
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
    showToast("Mahsulot savatdan olib tashlandi", 'info');
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartItems() {
    return this.cart.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product
      };
    }).filter(item => item.product); // O'chirilgan mahsulotlarni filtrlash
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotalUZS() {
    return this.cart.reduce((total, item) => {
      const product = this.getProductById(item.productId);
      if (product) {
        return total + (product.priceUZS * item.quantity);
      }
      return total;
    }, 0);
  }

  // --- Sevimlilar (Wishlist) ---
  loadWishlist() {
    const saved = localStorage.getItem('uztech_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  }

  saveWishlist() {
    localStorage.setItem('uztech_wishlist', JSON.stringify(this.wishlist));
    this.notify('wishlist-updated', this.wishlist);
  }

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = this.getProductById(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      showToast(`"${product?.name || 'Mahsulot'}" sevimlilardan o'chirildi`, 'info');
      return false;
    } else {
      this.wishlist.push(productId);
      this.saveWishlist();
      showToast(`"${product?.name || 'Mahsulot'}" sevimlilarga qo'shildi!`, 'success');
      return true;
    }
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  // --- Yaqinda ko'rilgan mahsulotlar ---
  loadRecentlyViewed() {
    const saved = localStorage.getItem('uztech_recently_viewed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  }

  addRecentlyViewed(productId) {
    this.recentlyViewed = this.recentlyViewed.filter(id => id !== productId);
    this.recentlyViewed.unshift(productId);
    if (this.recentlyViewed.length > 8) {
      this.recentlyViewed.pop();
    }
    localStorage.setItem('uztech_recently_viewed', JSON.stringify(this.recentlyViewed));
    this.notify('recently-viewed-updated', this.recentlyViewed);
  }

  getRecentlyViewedProducts() {
    return this.recentlyViewed
      .map(id => this.getProductById(id))
      .filter(p => !!p);
  }

  // --- Buyurtmalar (Orders) ---
  loadOrders() {
    const saved = localStorage.getItem('uztech_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [...INITIAL_ORDERS];
  }

  saveOrders() {
    localStorage.setItem('uztech_orders', JSON.stringify(this.orders));
    this.notify('orders-updated', this.orders);
  }

  createOrder(orderData) {
    const newOrder = {
      id: "UZ-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleString('uz-UZ'),
      status: "Yangi",
      ...orderData
    };
    this.orders.unshift(newOrder);
    this.saveOrders();
    this.clearCart();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrders();
      showToast(`Buyurtma #${orderId} holati: "${newStatus}"ga o'zgartirildi`, 'success');
      return true;
    }
    return false;
  }

  // --- Kredit Arizalari ---
  loadCreditApplications() {
    const saved = localStorage.getItem('uztech_credit_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [...INITIAL_CREDIT_APPLICATIONS];
  }

  saveCreditApplications() {
    localStorage.setItem('uztech_credit_apps', JSON.stringify(this.creditApplications));
    this.notify('credit-apps-updated', this.creditApplications);
  }

  createCreditApplication(data) {
    const newApp = {
      id: "CR-" + Math.floor(100 + Math.random() * 900),
      date: new Date().toLocaleString('uz-UZ'),
      status: "Ko'rib chiqilmoqda",
      ...data
    };
    this.creditApplications.unshift(newApp);
    this.saveCreditApplications();
    return newApp;
  }

  // --- Admin: Mahsulotlar CRUD ---
  adminAddProduct(productData) {
    const newProduct = {
      id: "prod-" + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      ...productData
    };
    this.products.unshift(newProduct);
    this.saveProducts();
    showToast(`"${newProduct.name}" muvaffaqiyatli qo'shildi!`, 'success');
    return newProduct;
  }

  adminUpdateProduct(id, updatedFields) {
    const index = this.products.findIndex(p => p.id === id);
    if (index > -1) {
      this.products[index] = {
        ...this.products[index],
        ...updatedFields
      };
      this.saveProducts();
      showToast(`"${this.products[index].name}" yangilandi!`, 'success');
      return true;
    }
    return false;
  }

  adminDeleteProduct(id) {
    const prod = this.getProductById(id);
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts();
    showToast(`"${prod?.name || 'Mahsulot'}" o'chirildi!`, 'info');
  }

  // Boshlang'ich test ma'lumotlariga qaytarish (Reset to factory demo)
  resetToDefaultData() {
    localStorage.removeItem('uztech_products');
    localStorage.removeItem('uztech_orders');
    localStorage.removeItem('uztech_credit_apps');
    localStorage.removeItem('uztech_cart');
    localStorage.removeItem('uztech_wishlist');
    localStorage.removeItem('uztech_recently_viewed');
    this.products = [...INITIAL_PRODUCTS];
    this.orders = [...INITIAL_ORDERS];
    this.creditApplications = [...INITIAL_CREDIT_APPLICATIONS];
    this.cart = [];
    this.wishlist = [];
    this.recentlyViewed = [];
    this.saveProducts();
    this.saveOrders();
    this.saveCreditApplications();
    this.saveCart();
    this.saveWishlist();
    showToast("Do'kon ma'lumotlari boshlang'ich holatga qaytarildi!", 'success');
  }
}

// Global do'kon obyekti
const store = new Store();
