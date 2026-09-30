// O'zbekistonda sotiladigan barcha GM (UzAuto Motors / Chevrolet) modellari
const gmCars = [
    {
        id: "cobalt",
        name: "Chevrolet Cobalt",
        subtitle: "Eng ommabop va tejamkor oilaviy sedan",
        category: "sedan",
        price: 156500000,
        priceFormatted: "156 500 000 so'm",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        engine: "1.5 L DOHC (106 ot kuchi)",
        transmission: "Avtomat (6-bosqich) / Mexanika",
        fuel: "Benzin (6.7 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Cobalt — O'zbekistonning eng ishonchli va keng sedanlaridan biri. Keng yukxona (545 litr), qulay salon, arzon ehtiyot qismlari va kam yoqilg'i sarfi bilan mashhur."
    },
    {
        id: "gentra",
        name: "Chevrolet Gentra (Lacetti)",
        subtitle: "Klassik qulaylik va xalq mehrini qozongan avtomobil",
        category: "sedan",
        price: 169000000,
        priceFormatted: "169 000 000 so'm",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        engine: "1.5 L (107 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin / Gazga mos (7.0 L / 100km)",
        year: "2024 - 2025",
        description: "Chevrolet Lacetti (Gentra) — O'zbekiston ko'chalarining haqiqiy afsonasi. Mustahkam osma tizimi, lyuk, qotishma disklar va yuqori darajadagi boshqaruv qulayligi."
    },
    {
        id: "onix",
        name: "Chevrolet Onix",
        subtitle: "Zamonaviy dizayn, turbo dvigatel va ilg'or texnologiya",
        category: "sedan",
        price: 188000000,
        priceFormatted: "188 000 000 so'm",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
        engine: "1.2 L Turbo (132 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin (5.9 L / 100km)",
        year: "2025 - 2026",
        description: "Yangi avlod Chevrolet Onix: Simsiz zaryadlash, kruiz-nazorat, ko'r zonalarni kuzatish, yarim avtomat parkovka va 5 yulduzli xavfsizlik."
    },
    {
        id: "tracker",
        name: "Chevrolet Tracker 2",
        subtitle: "Shahar va sayohatlar uchun zamonaviy krossover",
        category: "suv",
        price: 242000000,
        priceFormatted: "242 000 000 so'm",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        engine: "1.2 L Turbo (132 ot kuchi)",
        transmission: "Avtomat (6-bosqich)",
        fuel: "Benzin (6.5 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Tracker — Panorama lyuk, katta multimedia ekrani, zamonaviy LED faralar va baland klirens bilan har qanday yo'lda ishonchli."
    },
    {
        id: "damas",
        name: "Chevrolet Damas",
        subtitle: "Biznes va yo'lovchi tashishda tengsiz mikroven",
        category: "commercial",
        price: 98000000,
        priceFormatted: "98 000 000 so'm",
        image: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
        engine: "0.8 L (38 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin (6.0 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Damas — 7-8 o'rinli, O'zbekiston sharoitida o'zini to'liq oqlagan xalq avtomobili. Kam xarajat, yuqori daromadlilik va chidamlilik timsoli."
    },
    {
        id: "labo",
        name: "Chevrolet Labo",
        subtitle: "Kichik biznes uchun eng ishonchli yengil yuk mashinasi",
        category: "commercial",
        price: 96000000,
        priceFormatted: "96 000 000 so'm",
        image: "https://images.unsplash.com/photo-1586191582056-a4c330df32cf?auto=format&fit=crop&w=800&q=80",
        engine: "0.8 L (38 ot kuchi)",
        transmission: "Mexanika (5-bosqich)",
        fuel: "Benzin (6.2 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Labo — 550+ kg gacha yuk ko'tarish qobiliyatiga ega, shahar ichida tirbandliklarda chaqqon harakatlanuvchi qulay tijorat transporti."
    },
    {
        id: "malibu",
        name: "Chevrolet Malibu 2",
        subtitle: "Biznes-klass hashamati va kuchli 2.0 Turbo dvigatel",
        category: "premium",
        price: 418000000,
        priceFormatted: "418 000 000 so'm",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        engine: "2.0 L Turbo (253 ot kuchi)",
        transmission: "Avtomat (9-bosqich)",
        fuel: "Benzin (8.5 L / 100km)",
        year: "2025",
        description: "Chevrolet Malibu 2 — Oliy darajadagi qulaylik, charmdan qilingan hashamatli salon, shamollatiladigan va isitiladigan o'rindiqlar hamda dinamik tezlanish."
    },
    {
        id: "captiva",
        name: "Chevrolet Captiva 5",
        subtitle: "Katta oila uchun 7 o'rinli zamonaviy krossover",
        category: "suv",
        price: 335000000,
        priceFormatted: "335 000 000 so'm",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        engine: "1.5 L Turbo (147 ot kuchi)",
        transmission: "CVT Avtomat",
        fuel: "Benzin (7.5 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Captiva — Katta sig'imli 7 o'rindiqli salon, zamonaviy multimedia, 360 darajali kameralar va sayohatlar uchun keng imkoniyatlar."
    },
    {
        id: "equinox",
        name: "Chevrolet Equinox",
        subtitle: "Sport xarakteriga ega premium to'liq uzatmali krossover",
        category: "suv",
        price: 430000000,
        priceFormatted: "430 000 000 so'm",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
        engine: "2.0 L Turbo (237 ot kuchi) + AWD",
        transmission: "Avtomat (9-bosqich)",
        fuel: "Benzin (8.2 L / 100km)",
        year: "2025",
        description: "Chevrolet Equinox — AWD to'liq uzatma, aqlli xavfsizlik tizimlari, panorama tom va har qanday sharoitda barqaror dinamika."
    },
    {
        id: "traverse",
        name: "Chevrolet Traverse",
        subtitle: "Cheksiz qulaylikka ega to'liq o'lchamli premium SUV",
        category: "premium",
        price: 745000000,
        priceFormatted: "745 000 000 so'm",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        engine: "3.6 L V6 (318 ot kuchi) + AWD",
        transmission: "Avtomat (9-bosqich)",
        fuel: "Benzin (10.0 L / 100km)",
        year: "2025",
        description: "Chevrolet Traverse — 3 qator o'rindiq, keng bagaj, yuqori toifadagi xavfsizlik va uzoq masofalarga sayohatlar uchun eng qulay premium yo'ltanlamas."
    },
    {
        id: "tahoe",
        name: "Chevrolet Tahoe",
        subtitle: "Haqiqiy qudrat va nufuz timsoli bo'lgan flagman yo'ltanlamas",
        category: "premium",
        price: 1080000000,
        priceFormatted: "1 080 000 000 so'm",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        engine: "5.3 L V8 EcoTec3 (343 ot kuchi)",
        transmission: "Avtomat (10-bosqich) + 4x4",
        fuel: "Benzin (12.5 L / 100km)",
        year: "2025 - 2026",
        description: "Chevrolet Tahoe — V8 dvigatelning shiddati, ramali mustahkam konstruksiya, pnevmopodveska va tengsiz qulaylik bilan eng yuqori darajadagi GM avtomobili."
    }
];

// Telefon raqam
const CONTACT_PHONE = "+998 88 385 17 10";
const CONTACT_PHONE_RAW = "+998883851710";

// DOM elementlari
const carsGrid = document.getElementById("carsGrid");
const categoryTabs = document.getElementById("categoryTabs");
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

let currentCategory = "all";
let searchQuery = "";

// Raqamlarni so'm formatiga o'tkazish
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

// Avtomobillarni sahifada ko'rsatish
function renderCars() {
    carsGrid.innerHTML = "";

    const filtered = gmCars.filter(car => {
        const matchesCategory = currentCategory === "all" || car.category === currentCategory;
        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              car.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        carsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px;">
                <i class="fa-solid fa-car-tunnel" style="font-size: 48px; color: #94a3b8; margin-bottom: 15px;"></i>
                <h3>Hech qanday GM avtomobili topilmadi</h3>
                <p style="color: #64748b;">Qidiruv so'zini o'zgartirib ko'ring yoki boshqa toifani tanlang.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(car => {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
            <div class="car-image-box">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <span class="car-tag">${car.category === 'suv' ? 'Krossover' : car.category === 'commercial' ? 'Tijorat' : car.category === 'premium' ? 'Premium' : 'Sedan'}</span>
                <span class="car-badge-gm"><i class="fa-solid fa-certificate"></i> GM UZ</span>
            </div>
            <div class="car-body">
                <h3 class="car-title">${car.name}</h3>
                <p class="car-subtitle">${car.subtitle}</p>

                <div class="car-specs-grid">
                    <div class="spec-item">
                        <i class="fa-solid fa-gauge-high"></i>
                        <span>${car.engine.split('(')[0]}</span>
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
                        <span class="car-price-label">Narxi:</span>
                        <span class="car-price">${car.priceFormatted}</span>
                    </div>
                    <div class="car-buttons">
                        <button class="btn-detail" onclick="openCarModal('${car.id}')">
                            <i class="fa-solid fa-circle-info"></i> Batafsil
                        </button>
                        <a href="tel:${CONTACT_PHONE_RAW}" class="btn-order-call" title="Telefon qilish">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        carsGrid.appendChild(card);
    });
}

// Kategoriya filteri
categoryTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn")) {
        categoryTabs.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.getAttribute("data-filter");
        renderCars();
    }
});

function filterByCategory(cat) {
    currentCategory = cat;
    categoryTabs.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-filter") === cat) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    renderCars();
}

// Qidiruv maydoni
carSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderCars();
});

// Modalni ochish
function openCarModal(carId) {
    const car = gmCars.find(c => c.id === carId);
    if (!car) return;

    modalBody.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="modal-detail-img">
        <div class="modal-detail-body">
            <div class="modal-detail-header">
                <div>
                    <h2>${car.name}</h2>
                    <p style="color: #64748b;">${car.subtitle}</p>
                </div>
                <div class="modal-detail-price">${car.priceFormatted}</div>
            </div>

            <p style="margin-bottom: 20px; line-height: 1.7;">${car.description}</p>

            <table class="modal-specs-table">
                <tr>
                    <td>Dvigatel:</td>
                    <td><strong>${car.engine}</strong></td>
                </tr>
                <tr>
                    <td>Uzatmalar qutisi:</td>
                    <td><strong>${car.transmission}</strong></td>
                </tr>
                <tr>
                    <td>Yoqilg'i sarfi:</td>
                    <td><strong>${car.fuel}</strong></td>
                </tr>
                <tr>
                    <td>Ishlab chiqarilgan yili:</td>
                    <td><strong>${car.year}</strong></td>
                </tr>
                <tr>
                    <td>Kafolat:</td>
                    <td><strong>3 yil yoki 100 000 km rasmiy kafolat</strong></td>
                </tr>
            </table>

            <div class="modal-actions">
                <a href="tel:${CONTACT_PHONE_RAW}" class="btn btn-call btn-block">
                    <i class="fa-solid fa-phone"></i> Hoziroq qo'ng'iroq qilish: ${CONTACT_PHONE}
                </a>
                <button onclick="selectCarForCalc('${car.id}')" class="btn btn-secondary btn-block">
                    <i class="fa-solid fa-calculator"></i> Kreditni hisoblash
                </button>
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

// Kredit kalkulyatori sozlamalari
function initCalculator() {
    calcCarSelect.innerHTML = "";
    gmCars.forEach(car => {
        const option = document.createElement("option");
        option.value = car.id;
        option.textContent = `${car.name} (${car.priceFormatted})`;
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

    // Boshlang'ich to'lov
    const downPayment = (carPrice * percent) / 100;
    const loanAmount = carPrice - downPayment;

    // Yillik foiz stavkasi (taxminan 24% yillik)
    const annualRate = 0.24;
    const monthlyRate = annualRate / 12;

    // Oylik to'lov formulasi (Annuitet)
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
        userCarSelect.value = selectedCar.name.replace("Chevrolet ", "").split(" ")[0];
    }
    window.location.hash = "contact";
}

// Lead form submit
function handleLeadSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("userName").value;
    const phone = document.getElementById("userPhone").value;
    const car = document.getElementById("userCar").value;

    document.getElementById("leadForm").style.display = "none";
    document.getElementById("formSuccessMessage").style.display = "block";

    console.log("Yangi buyurtma:", { name, phone, car });
}

// Mobil menyu
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

// ESC tugmasi bosilganda modalni yopish
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Dastlabki ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
    renderCars();
    initCalculator();
});
