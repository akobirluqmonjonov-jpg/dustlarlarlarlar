// Bildirishnoma va Do'kon sozlamalari
// Telefon: +998 88 385 17 10

const STORE_CONFIG = {
  ownerPhone: "+998 88 385 17 10",
  ownerPhoneRaw: "998883851710",
  storeName: "MENS LUXURY - Erkaklar Kiyimlari",
  
  // Telegram Bot orqali to'g'ridan-to'g'ri SMS/Xabar yuborish sozlamalari (Ixtiyoriy):
  botToken: localStorage.getItem("store_bot_token") || "",
  chatId: localStorage.getItem("store_chat_id") || ""
};

/**
 * Buyurtma matnini chiroyli formatda shakllantirish
 */
function generateOrderMessage(orderData) {
  const date = new Date().toLocaleString("uz-UZ");
  
  let itemsText = "";
  orderData.items.forEach((item, index) => {
    itemsText += `\n${index + 1}. <b>${item.name}</b>\n   ├ O'lchami: <code>${item.selectedSize}</code>\n   ├ Soni: ${item.quantity} dona\n   └ Narxi: ${formatPrice(item.price * item.quantity)}`;
  });

  const message = `🛍 <b>YANGI BUYURTMA KELIB TUSHDI!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 <b>Mijoz:</b> ${orderData.customerName}\n` +
    `📞 <b>Telefon:</b> ${orderData.customerPhone}\n` +
    `📍 <b>Manzil:</b> ${orderData.customerAddress || "Keltirilmagan"}\n` +
    `📝 <b>Izoh:</b> ${orderData.customerNote || "Mavjud emas"}\n` +
    `📅 <b>Vaqt:</b> ${date}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📦 <b>Buyurtma tarkibi:</b>${itemsText}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 <b>JAMI TO'LOV:</b> <b>${formatPrice(orderData.totalAmount)}</b>\n` +
    `🚚 <b>Yetkazib berish:</b> O'zbekiston bo'ylab\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `✨ <i>MENS LUXURY onlayn do'koni orqali qabul qilindi</i>`;

  return message;
}

/**
 * Buyurtmani yuborish (Telegram bot orqali fon rejimida)
 */
async function sendOrderNotification(orderData) {
  const htmlMessage = generateOrderMessage(orderData);
  let botSent = false;

  // Agar Bot Token va Chat ID kiritilgan bo'lsa, avtomatik ravishda bot orqali sizga xabar boradi
  if (STORE_CONFIG.botToken && STORE_CONFIG.chatId) {
    try {
      const url = `https://api.telegram.org/bot${STORE_CONFIG.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: STORE_CONFIG.chatId,
          text: htmlMessage,
          parse_mode: "HTML"
        })
      });
      const data = await response.json();
      if (data.ok) {
        botSent = true;
      }
    } catch (e) {
      console.warn("Bildirishnoma yuborishda xatolik:", e);
    }
  }

  return {
    botSent
  };
}
