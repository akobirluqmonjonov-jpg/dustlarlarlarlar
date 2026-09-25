/**
 * UzTech PC Market - Yordamchi Funksiyalar (Utilities)
 */

// Valyuta kursi: 1 RUB = 140 UZS (O'zbekiston bozoridagi o'rtacha amaldagi ko'rsatkich)
const RUB_EXCHANGE_RATE = 140;

/**
 * Narxni tanlangan valyutaga qarab chiroyli formatda chiqarish
 * @param {number} amountUZS - So'mdagi qiymat
 * @param {string} currency - 'UZS' yoki 'RUB'
 * @param {number} [manualRUB] - Agar mahsulotda qo'lda kiritilgan rubl narxi bo'lsa
 */
function formatPrice(amountUZS, currency = 'UZS', manualRUB = null) {
  if (amountUZS === undefined || amountUZS === null || isNaN(amountUZS)) {
    return "0 so'm";
  }

  if (currency === 'RUB') {
    const rubAmount = manualRUB ? manualRUB : Math.round(amountUZS / RUB_EXCHANGE_RATE);
    return rubAmount.toLocaleString('ru-RU') + ' ₽';
  }

  // UZS (O'zbek so'mi)
  return Math.round(amountUZS).toLocaleString('uz-UZ') + " so'm";
}

/**
 * Xabarnoma (Toast Alert) ko'rsatish
 * @param {string} message - Matn
 * @param {'success'|'info'|'warning'|'error'} type - Xabar turi
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'warning') icon = '⚠';
  if (type === 'info') icon = 'ℹ';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-message">${escapeHtml(message)}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 4000);
}

/**
 * XSS oldini olish uchun HTML matnini tozalash
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Kredit oylik to'lovini hisoblash
 * Standart yillik foiz yoki ustama hisobga olinadi
 */
function calculateCreditMonthly(priceUZS, downPayment = 0, months = 12) {
  const principal = Math.max(0, priceUZS - downPayment);
  if (principal <= 0) return 0;
  
  // Yillik ustama marjasi (masalan, 24% yillik)
  const annualMargin = 0.24;
  const totalCost = principal * (1 + (annualMargin * (months / 12)));
  return Math.round(totalCost / months);
}

/**
 * Qidiruv so'zlarini mahsulotning barcha parametrlariga nisbatan solishtirish
 */
function matchSearch(product, query) {
  if (!query || query.trim() === '') return true;
  const q = query.toLowerCase().trim();

  // Nom, tavsif, brend, kategoriya
  if (product.name.toLowerCase().includes(q)) return true;
  if (product.brand && product.brand.toLowerCase().includes(q)) return true;
  if (product.description && product.description.toLowerCase().includes(q)) return true;
  if (product.category && product.category.toLowerCase().includes(q)) return true;
  if (product.subcategory && product.subcategory.toLowerCase().includes(q)) return true;

  // Texnik xususiyatlar (specs): cpu, gpu, ram, storage, monitor, etc.
  if (product.specs) {
    for (const key of Object.keys(product.specs)) {
      const val = product.specs[key];
      if (typeof val === 'string' && val.toLowerCase().includes(q)) {
        return true;
      }
    }
  }

  // Holat tekshiruvi (masalan, "yangi", "ishlatilgan", "b/u")
  if (q === 'yangi' && product.isNew) return true;
  if ((q === 'ishlatilgan' || q === 'b/u' || q === 'used') && !product.isNew) return true;
  if (q === 'kredit' && product.creditAvailable) return true;

  return false;
}

/**
 * Sayt havolasini nusxalash yoki Telegram orqali do'stlarga yuborish
 */
function shareSite() {
  const currentUrl = window.location.href;
  const shareText = "UzTech PC Market — Yangi va ishlatilgan kompyuterlar, noutbuklar va ehtiyot qismlar do'koni:";

  if (navigator.share) {
    navigator.share({
      title: 'UzTech PC Market',
      text: shareText,
      url: currentUrl
    }).catch(() => {});
  } else {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(tgUrl, '_blank');
  }
}

function copySiteLink() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl).then(() => {
    showToast("Havola (silka) nusxalandi! Do'stlaringizga yuborishingiz mumkin.", "success");
  }).catch(() => {
    prompt("Ushbu havolani nusxalab do'stlaringizga yuboring:", currentUrl);
  });
}
