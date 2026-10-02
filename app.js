// O'zbekiston bozoridagi real GM mashinalari (Yangi, Yurilgan, Urilgan/Kraskasi bor)
const gmCars = [
    {
        id: "cobalt-yangi",
        name: "Chevrolet Cobalt (4-pozitsiya Style AT)",
        subtitle: "Yangi (0 km), salondan chiqqan, to'liq jihozlangan",
        condition: "yangi",
        conditionText: "🟢 Yangi (0 km)",
        hasCredit: true,
        price: 156500000,
        priceUsd: "$12 200",
        priceFormatted: "156 500 000 so'm",
        image: "images/cobalt.jpg",
        mileage: "0 km (Salondan)",
        damageInfo: "Top-toza, zavod kraska, 100% kafolat",
        engine: "1.5 L DOHC (106 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin (6.7 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Cobalt 4-pozitsiya Style yangi avtomobil. Konditsioner, ABS, isitiladigan o'rindiqlar, yangi dizayndagi disklar. Kreditga 20% boshlang'ich to'lov bilan beriladi."
    },
    {
        id: "cobalt-yurilgan",
        name: "Chevrolet Cobalt (2-pozitsiya)",
        subtitle: "Yurilgan, holati juda yaxshi, tejamkor va toza",
        condition: "yurilgan",
        conditionText: "🔵 Yurilgan (Ikkinchi qo'l)",
        hasCredit: true,
        price: 118000000,
        priceUsd: "$9 200",
        priceFormatted: "118 000 000 so'm",
        image: "images/cobalt.jpg",
        mileage: "68 000 km",
        damageInfo: "Kraskasi toza, petnosi yo'q, moylari yangi almashtirilgan",
        engine: "1.5 L (106 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin / Gaz (Propan o'rnatilgan)",
        year: "2021",
        description: "Cobalt 2-pozitsiya. Bir qo'l haydalgan, taksida yurmagan, motor va xodovoy qismlari soatday ishlaydi. Naqdga yoki kreditga beriladi."
    },
    {
        id: "cobalt-urilgan",
        name: "Chevrolet Cobalt (Kraskasi bor - Arzon)",
        subtitle: "Hamyonbop variant, yengil turtilgan, ichiga o'tmagan",
        condition: "urilgan",
        conditionText: "🟠 Kraskasi bor / Urilgan (Arzon)",
        hasCredit: true,
        price: 95000000,
        priceUsd: "$7 400",
        priceFormatted: "95 000 000 so'm",
        image: "images/cobalt.jpg",
        mileage: "94 000 km",
        damageInfo: "O'ng old krilo va kapot uchi kraska qilingan, suyagi butun, radiator butun",
        engine: "1.5 L (106 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin / Metan (4-avlod)",
        year: "2019",
        description: "Arzon narxda Cobalt qidirayotganlar uchun! Kichik turtilish bo'lgan, kraskasi qilingan, suyagi va lanjeronlari butun. Haydashga 100% tayyor. Bo'lib to'lash yoki kreditga ham kelishiladi."
    },
    {
        id: "gentra-yangi",
        name: "Chevrolet Gentra (Lacetti 3-pozitsiya CDX)",
        subtitle: "Ideal holatda, lyuk, ABS, magnitafon, qotishma disklar",
        condition: "yangi",
        conditionText: "🟢 Yangi kabi (Minimal probeg)",
        hasCredit: true,
        price: 172000000,
        priceUsd: "$13 400",
        priceFormatted: "172 000 000 so'm",
        image: "images/gentra.jpg",
        mileage: "14 000 km",
        damageInfo: "Top-toza zavod kraska, chizig'i ham yo'q",
        engine: "1.5 L DOHC (107 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin (7.0 L / 100km)",
        year: "2024",
        description: "Chevrolet Gentra Elegant Plus. Qora salon, lyuk, orqa kamera, yangi balonlar qo'yilgan. Kreditga rasmiylashtirib beriladi."
    },
    {
        id: "gentra-urilgan",
        name: "Chevrolet Gentra (Kraskasi bor / Urilgan - Arzon)",
        subtitle: "Bozor narxidan ancha arzon, motor va karobkasi a'lo",
        condition: "urilgan",
        conditionText: "🟠 Kraskasi bor / Urilgan (Arzon)",
        hasCredit: true,
        price: 112000000,
        priceUsd: "$8 700",
        priceFormatted: "112 000 000 so'm",
        image: "images/gentra.jpg",
        mileage: "135 000 km",
        damageInfo: "Oldi o'ng qismi urilib tuzatilgan, detallari yangi original qo'yilgan",
        engine: "1.5 L (107 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin / Gaz (Metan)",
        year: "2018",
        description: "Hamyonbop Gentra avtomat. Yengil avariya bo'lgan, ustalar tomonidan sifatli tiklangan. Hozirda hech qanday xarajati yo'q, minib ketishga tayyor."
    },
    {
        id: "damas-yangi",
        name: "Chevrolet Damas D2 (Deluxe)",
        subtitle: "Yangi (0 km), yo'lovchi tashish va biznes uchun",
        condition: "yangi",
        conditionText: "🟢 Yangi (0 km)",
        hasCredit: true,
        price: 98000000,
        priceUsd: "$7 650",
        priceFormatted: "98 000 000 so'm",
        image: "images/damas.jpg",
        mileage: "0 km (Salondan)",
        damageInfo: "Yangi, kafolati bor",
        engine: "0.8 L (38 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin (6.0 L / 100km)",
        year: "2025 - 2026",
        description: "Yangi Chevrolet Damas Deluxe. 7-8 o'rinli, pechka va xodovoy mukammal. Kreditga boshlang'ich 20 million so'm to'lov bilan beriladi."
    },
    {
        id: "damas-yurilgan",
        name: "Chevrolet Damas (Yurilgan / Tirikchilikbop)",
        subtitle: "Yurilgan, tayyor gaz balloni bilan, daromad keltiruvchi",
        condition: "yurilgan",
        conditionText: "🔵 Yurilgan (Ikkinchi qo'l)",
        hasCredit: true,
        price: 68000000,
        priceUsd: "$5 300",
        priceFormatted: "68 000 000 so'm",
        image: "images/damas.jpg",
        mileage: "115 000 km",
        damageInfo: "Et-betida mayda kraskasi bor, qattiq urilmagan, suyagi butun",
        engine: "0.8 L (38 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Metan gaz (65 talik ballon)",
        year: "2020",
        description: "Tirikchilik va kirakashlik uchun tayyor Damas. Gaz balloni ruxsatnomasi bilan, motori moy yemaydi, salon chexollari yangi."
    },
    {
        id: "labo-yangi",
        name: "Chevrolet Labo (Bortli yuk mashinasi)",
        subtitle: "Yangi (0 km), kichik biznes uchun tengsiz yuk tashuvchi",
        condition: "yangi",
        conditionText: "🟢 Yangi (0 km)",
        hasCredit: true,
        price: 96000000,
        priceUsd: "$7 500",
        priceFormatted: "96 000 000 so'm",
        image: "images/labo.jpg",
        mileage: "0 km (Salondan)",
        damageInfo: "Zavod holatida, yangi",
        engine: "0.8 L (38 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin (6.2 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Labo yangi bortli yuk mashinasi. 550 kg yuk ko'tarish, qulay bort va kam yoqilg'i sarfi. Kreditga rasmiylashtiriladi."
    },
    {
        id: "nexia3-yurilgan",
        name: "Chevrolet Nexia 3 (Ravon R3 AT)",
        subtitle: "Yurilgan, toza holatda, shahar uchun eng qulay sedan",
        condition: "yurilgan",
        conditionText: "🔵 Yurilgan (Ikkinchi qo'l)",
        hasCredit: true,
        price: 114000000,
        priceUsd: "$8 900",
        priceFormatted: "114 000 000 so'm",
        image: "images/nexia3.jpg",
        mileage: "58 000 km",
        damageInfo: "Oldi bamper bo'yalgan, qolgan hamma joyi zavod kraska",
        engine: "1.5 L (106 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin / Gaz (Propan)",
        year: "2021",
        description: "Nexia 3 4-pozitsiya avtomat. Shahar ichida chaqqon va yumshoq yuradi. Salon toza, chexol-polik qilingan, kreditga ham beriladi."
    },
    {
        id: "nexia2-arzon",
        name: "Daewoo Nexia 2 (DOHC 1.6)",
        subtitle: "Xalqona klassik Nexia — hamyonbop narxda",
        condition: "yurilgan",
        conditionText: "🔵 Yurilgan (Arzon narx)",
        hasCredit: true,
        price: 58000000,
        priceUsd: "$4 500",
        priceFormatted: "58 000 000 so'm",
        image: "images/nexia2.jpg",
        mileage: "185 000 km",
        damageInfo: "Orqa krilo va eshikda kraskasi bor, suyaklari butun",
        engine: "1.6 L DOHC (109 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin / Metan (100 talik gaz)",
        year: "2013",
        description: "Daewoo Nexia 2 DOHC motor. Xodovoylari qilingan, balonlari yangi, pechkasi yaxshi isitadi. Naqd yoki variantga kelishiladi."
    },
    {
        id: "spark-yurilgan",
        name: "Chevrolet Spark (4-pozitsiya AT)",
        subtitle: "Ayollar va yoshlar uchun ideal ixcham xetchbek",
        condition: "yurilgan",
        conditionText: "🔵 Yurilgan (Ikkinchi qo'l)",
        hasCredit: true,
        price: 98000000,
        priceUsd: "$7 650",
        priceFormatted: "98 000 000 so'm",
        image: "images/spark.jpg",
        mileage: "62 000 km",
        damageInfo: "Toza, kraskasi yo'q, uy-ish haydalgan",
        engine: "1.25 L (85 ot kuchi)",
        transmission: "Avtomat (4-bosqich)",
        fuel: "Benzin (6.0 L / 100km)",
        year: "2020",
        description: "Spark 4-pozitsiya avtomat. Konditsioner muzdek, audio sistema, parktronik bor. Kreditga yoki naqdga beriladi."
    },
    {
        id: "matiz-arzon",
        name: "Daewoo Matiz (Best - Arzon variant)",
        subtitle: "Minimal xarajat, juda tejamkor va arzon shahar mashinasi",
        condition: "urilgan",
        conditionText: "🟠 Kraskasi bor / Arzon variant",
        hasCredit: false,
        price: 39000000,
        priceUsd: "$3 000",
        priceFormatted: "39 000 000 so'm",
        image: "images/matiz.jpg",
        mileage: "170 000 km",
        damageInfo: "Kuzovda mayda chiziq va kraskalari bor, motori yangi qilingan",
        engine: "0.8 L (52 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin (5.0 L / 100km)",
        year: "2014",
        description: "Matiz — arzon va tejamkor mashina xohlovchilar uchun. Tirbandliklarda qulay, benzinni umuman yemaydi, 39 million so'mga tayyor miniladigan mashina!"
    }
];

// Telefon raqam
const CONTACT_PHONE = "+998 88 385 17 10";
const CONTACT_PHONE_RAW = "+998883851710";
const SITE_LIVE_URL = "https://akobirluqmonjonov-jpg.github.io/dustlarlarlarlar/";

// DOM elementlari
const carsGrid = document.getElementById("carsGrid");
const statusTabs = document.getElementById("statusTabs");
const carSearch = document.getElementById("carSearch");
const calcCarSelect = document.getElementById("calcCarSelect");
const calcCarPriceDisplay = document.getElementById("calcCarPriceDisplay");
const initialPercent = document.getElementById("initialPercent");
const initialPercentDisplay = document.getElementById("initialPercentDisplay");
const loanTerm = document.getElementById("loanTerm");
const loanTermDisplay = document.getElementById("loanTermDisplay");
const downPaymentAmount = document.getElementById("downPaymentAmount");
const monthlyPaymentAmount = document.getElementById("monthlyPaymentAmount");
const carModal = document.getElementById("carModal");
const modalBody = document.getElementById("modalBody");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

let currentFilter = "all";
let searchQuery = "";

// Sayt linkini nusxalash funksiyasi
function copySiteLink() {
    navigator.clipboard.writeText(SITE_LIVE_URL).then(() => {
        alert("✅ Sayt havolasi nusxalandi! Do'stlaringizga Telegram orqali yuborishingiz mumkin:\n" + SITE_LIVE_URL);
    }).catch(err => {
        prompt("Sayt havolasini nusxalang:", SITE_LIVE_URL);
    });
}

function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

// Mashinalarni render qilish
function renderCars() {
    carsGrid.innerHTML = "";

    const filtered = gmCars.filter(car => {
        let matchesFilter = true;
        if (currentFilter === "yangi") matchesFilter = car.condition === "yangi";
        else if (currentFilter === "yurilgan") matchesFilter = car.condition === "yurilgan";
        else if (currentFilter === "urilgan") matchesFilter = car.condition === "urilgan";
        else if (currentFilter === "kredit") matchesFilter = car.hasCredit === true;

        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              car.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              car.damageInfo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        carsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px;">
                <i class="fa-solid fa-car-tunnel" style="font-size: 48px; color: #94a3b8; margin-bottom: 15px;"></i>
                <h3>Bunday GM avtomobili topilmadi</h3>
                <p style="color: #64748b;">Qidiruv so'zini o'zgartiring yoki boshqa toifani tanlang.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(car => {
        const card = document.createElement("div");
        card.className = "car-card";
        
        let conditionBadgeClass = "badge-new";
        if (car.condition === "yurilgan") conditionBadgeClass = "badge-used";
        if (car.condition === "urilgan") conditionBadgeClass = "badge-damaged";

        card.innerHTML = `
            <div class="car-image-box">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <span class="car-condition-badge ${conditionBadgeClass}">${car.conditionText}</span>
                ${car.hasCredit ? '<span class="car-credit-badge"><i class="fa-solid fa-credit-card"></i> Kredit bor</span>' : ''}
            </div>
            <div class="car-body">
                <div class="car-header-row">
                    <h3 class="car-title">${car.name}</h3>
                </div>
                <p class="car-subtitle">${car.subtitle}</p>

                <div class="car-damage-box">
                    <i class="fa-solid fa-circle-info"></i>
                    <span><strong>Holati:</strong> ${car.damageInfo}</span>
                </div>

                <div class="car-specs-grid">
                    <div class="spec-item">
                        <i class="fa-solid fa-road"></i>
                        <span>${car.mileage}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-gear"></i>
                        <span>${car.transmission.split('/')[0]}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-gas-pump"></i>
                        <span>${car.fuel.split('(')[0]}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-calendar"></i>
                        <span>${car.year}</span>
                    </div>
                </div>

                <div class="car-footer">
                    <div class="car-price-box">
                        <span class="car-price-label">Narxi (${car.priceUsd}):</span>
                        <span class="car-price">${car.priceFormatted}</span>
                    </div>
                    <div class="car-buttons">
                        <button class="btn-detail" onclick="openCarModal('${car.id}')">
                            <i class="fa-solid fa-circle-info"></i> Batafsil
                        </button>
                        <a href="tel:${CONTACT_PHONE_RAW}" class="btn-order-call" title="Qo'ng'iroq qilish: +998 88 385 17 10">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        carsGrid.appendChild(card);
    });
}

// Filtr tablari
statusTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn")) {
        statusTabs.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.getAttribute("data-filter");
        renderCars();
    }
});

// Qidiruv
carSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderCars();
});

// Modal
function openCarModal(carId) {
    const car = gmCars.find(c => c.id === carId);
    if (!car) return;

    modalBody.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="modal-detail-img">
        <div class="modal-detail-body">
            <div class="modal-detail-header">
                <div>
                    <h2>${car.name}</h2>
                    <p style="color: #64748b; margin-top: 4px;">${car.subtitle}</p>
                </div>
                <div>
                    <div class="modal-detail-price">${car.priceFormatted}</div>
                    <span style="color: #059669; font-weight: 700; font-size: 14px;">Bozor narxi: ${car.priceUsd}</span>
                </div>
            </div>

            <div style="background: #f8fafc; border-left: 4px solid #c8963e; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
                <strong>Kuzov va kraska holati:</strong>
                <p style="color: #1e293b; margin: 4px 0 0;">${car.damageInfo}</p>
            </div>

            <p style="margin-bottom: 20px; line-height: 1.7;">${car.description}</p>

            <table class="modal-specs-table">
                <tr>
                    <td>Holati:</td>
                    <td><strong>${car.conditionText}</strong></td>
                </tr>
                <tr>
                    <td>Bosib o'tgan yo'li (Probeg):</td>
                    <td><strong>${car.mileage}</strong></td>
                </tr>
                <tr>
                    <td>Kreditga beriladimi:</td>
                    <td><strong>${car.hasCredit ? '✅ Ha, kreditga beriladi (20% boshlang\'ich)' : '❌ Faqat naqd yoki bo\'lib to\'lash'}</strong></td>
                </tr>
                <tr>
                    <td>Dvigatel:</td>
                    <td><strong>${car.engine}</strong></td>
                </tr>
                <tr>
                    <td>Uzatmalar qutisi:</td>
                    <td><strong>${car.transmission}</strong></td>
                </tr>
                <tr>
                    <td>Yoqilg'i:</td>
                    <td><strong>${car.fuel}</strong></td>
                </tr>
                <tr>
                    <td>Yili:</td>
                    <td><strong>${car.year}</strong></td>
                </tr>
            </table>

            <div class="modal-actions">
                <a href="tel:${CONTACT_PHONE_RAW}" class="btn btn-call btn-block">
                    <i class="fa-solid fa-phone"></i> Hoziroq qo'ng'iroq qilish: ${CONTACT_PHONE}
                </a>
                ${car.hasCredit ? `<button onclick="selectCarForCalc('${car.id}')" class="btn btn-secondary btn-block">
                    <i class="fa-solid fa-calculator"></i> Kreditni hisoblash
                </button>` : ''}
            </div>
        </div>
    `;

    carModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    carModal.classList.remove("active");
    document.body.style.overflow = "auto";
}

function selectCarForCalc(carId) {
    closeModal();
    calcCarSelect.value = carId;
    updateCalculator();
    window.location.hash = "calculator";
}

// Kredit kalkulyatori
function initCalculator() {
    calcCarSelect.innerHTML = "";
    gmCars.filter(c => c.hasCredit).forEach(car => {
        const option = document.createElement("option");
        option.value = car.id;
        option.textContent = `${car.name} — ${car.priceFormatted} (${car.conditionText})`;
        calcCarSelect.appendChild(option);
    });

    calcCarSelect.addEventListener("change", updateCalculator);
    initialPercent.addEventListener("input", updateCalculator);
    loanTerm.addEventListener("input", updateCalculator);

    updateCalculator();
}

function updateCalculator() {
    const selectedCar = gmCars.find(c => c.id === calcCarSelect.value) || gmCars[0];
    const carPrice = selectedCar.price;
    const percent = parseInt(initialPercent.value);
    const months = parseInt(loanTerm.value);

    const downPayment = (carPrice * percent) / 100;
    const loanAmount = carPrice - downPayment;

    const annualRate = 0.24;
    const monthlyRate = annualRate / 12;

    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    calcCarPriceDisplay.textContent = formatMoney(carPrice);
    initialPercentDisplay.textContent = `${percent}%`;
    loanTermDisplay.textContent = `${months} oy (${months / 12} yil)`;

    downPaymentAmount.textContent = formatMoney(Math.round(downPayment));
    monthlyPaymentAmount.textContent = formatMoney(Math.round(monthlyPayment));
}

function orderLoanCall() {
    const selectedCar = gmCars.find(c => c.id === calcCarSelect.value) || gmCars[0];
    const userCarSelect = document.getElementById("userCar");
    if (userCarSelect) {
        userCarSelect.value = selectedCar.name;
    }
    window.location.hash = "contact";
}

function handleLeadSubmit(event) {
    event.preventDefault();
    document.getElementById("leadForm").style.display = "none";
    document.getElementById("formSuccessMessage").style.display = "block";
}

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderCars();
    initCalculator();
});
