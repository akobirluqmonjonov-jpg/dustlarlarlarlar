/**
 * UzTech PC Market - Boshlang'ich mahsulotlar ma'lumotlar bazasi (Seed Database)
 * Barcha mahsulotlar real texnik parametrlar, holat va O'zbekiston bozoridagi narxlar bilan kiritilgan.
 */

const INITIAL_PRODUCTS = [
  // ================= 1. YANGI KOMPYUTERLAR (Desktop PCs) =================
  {
    id: "pc-new-1",
    name: "HyperPC Pro Gaming RTX 4060",
    category: "yangi-kompyuterlar",
    subcategory: "gaming-pc",
    brand: "HyperPC",
    condition: "yangi",
    conditionText: "Yangi (Qutida, muhrlangan)",
    isNew: true,
    priceUZS: 11800000,
    priceRUB: 84200,
    oldPriceUZS: 13200000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 1150000,
    stock: 5,
    warranty: "24 oy rasmiy kafolat",
    rating: 4.9,
    reviewsCount: 18,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i5-13400F (10 yadro, 4.6 GHz)",
      ram: "16 GB DDR4 3200MHz Kingston Fury",
      storage: "1 TB M.2 NVMe SSD Kingston",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      motherboard: "MSI B760M-P DDR4",
      powerSupply: "DeepCool 650W 80+ Bronze",
      cooler: "DeepCool AG400 ARGB",
      case: "2E Gaming Turbo RGB Case (4x Kuller)",
      monitor: "Alohida sotiladi (Keltirilmagan)"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Og'ir zamonaviy o'yinlar (Cyberpunk 2077, CS2, Dota 2, Warzone) va 3D modellashtirish / rendering uchun mo'ljallangan qudratli yangi o'yin kompyuteri. Barcha qismlar yangi qutilarda, 2 yil to'liq kafolat bilan beriladi."
  },
  {
    id: "pc-new-2",
    name: "Ultra Gaming Monster RTX 4070 Ti Super",
    category: "yangi-kompyuterlar",
    subcategory: "gaming-pc",
    brand: "Custom ROG",
    condition: "yangi",
    conditionText: "Yangi (Premium yig'uv)",
    isNew: true,
    priceUZS: 24500000,
    priceRUB: 175000,
    oldPriceUZS: 27000000,
    discountPercent: 9,
    creditAvailable: true,
    monthlyPaymentUZS: 2380000,
    stock: 3,
    warranty: "36 oy rasmiy kafolat",
    rating: 5.0,
    reviewsCount: 12,
    isPopular: true,
    isBestSeller: false,
    specs: {
      cpu: "Intel Core i7-14700KF (20 yadro, 5.6 GHz)",
      ram: "32 GB DDR5 6000MHz Corsair Vengeance RGB",
      storage: "2 TB Samsung 990 Pro PCIe 4.0 NVMe",
      gpu: "Palit GeForce RTX 4070 Ti Super 16GB GamingPro",
      motherboard: "ASUS ROG STRIX Z790-F GAMING WIFI",
      powerSupply: "Corsair RM850x 850W 80+ Gold To'liq Modulli",
      cooler: "NZXT Kraken Elite 360 RGB Suyuqlik sovutgichi",
      case: "Lian Li O11 Dynamic EVO Oq",
      monitor: "Alohida sotiladi"
    },
    images: [
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "4K formatdagi o'yinlar, professional video montaj (Premiere, DaVinci Resolve) va arxitektura loyihalari uchun eng yuqori darajadagi flagman kompyuter."
  },
  {
    id: "pc-new-3",
    name: "Office Pro Core i5 Komplekt (Monitor bilan)",
    category: "yangi-kompyuterlar",
    subcategory: "office-pc",
    brand: "UzTech",
    condition: "yangi",
    conditionText: "Yangi komplekt",
    isNew: true,
    priceUZS: 4800000,
    priceRUB: 34200,
    oldPriceUZS: 5400000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 470000,
    stock: 15,
    warranty: "12 oy kafolat",
    rating: 4.8,
    reviewsCount: 34,
    isPopular: false,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i5-12400 (6 yadro, 4.4 GHz UHD 730)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      gpu: "Intel UHD Graphics 730 (Integratsiyalangan)",
      motherboard: "H610M Ultra M.2",
      powerSupply: "450W Eco Power",
      cooler: "Intel Original Cooler",
      case: "Klassik Office Qora Korpus",
      monitor: "24 dyuym IPS Full HD 75Hz monitor kiritilgan!"
    },
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ofis, 1C hisob-kitob, o'qish, dasturlash va kundalik vazifalar uchun tayyor to'liq komplekt: Monitor, blok, klaviatura va sichqoncha sovg'a qilinadi."
  },
  {
    id: "pc-new-4",
    name: "AMD Ryzen 5 7500X + RX 7600 Gaming PC",
    category: "yangi-kompyuterlar",
    subcategory: "gaming-pc",
    brand: "AMD Red Line",
    condition: "yangi",
    conditionText: "Yangi (DDR5 platforma)",
    isNew: true,
    priceUZS: 10500000,
    priceRUB: 75000,
    oldPriceUZS: 11900000,
    discountPercent: 12,
    creditAvailable: true,
    monthlyPaymentUZS: 1020000,
    stock: 7,
    warranty: "24 oy kafolat",
    rating: 4.9,
    reviewsCount: 15,
    isPopular: true,
    isBestSeller: false,
    specs: {
      cpu: "AMD Ryzen 5 7500F (6 yadro, 12 potok, 5.0 GHz)",
      ram: "16 GB DDR5 5600MHz Kingston Fury Beast",
      storage: "1 TB M.2 Gen4 SSD",
      gpu: "AMD Radeon RX 7600 8GB GDDR6",
      motherboard: "ASRock B650M-HDV/M.2",
      powerSupply: "600W 80+ Bronze AeroCool",
      cooler: "DeepCool Gammaxx AG400",
      case: "DarkFlash DLM21 Mesh Black",
      monitor: "Alohida sotiladi"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Yangi avlod DDR5 AM5 platformasidagi zamonaviy va tejamkor o'yin kompyuteri. Kelajakda protsessorni bemalol kuchaytirish imkoniyatiga ega."
  },

  // ================= 2. ISHLATILGAN KOMPYUTERLAR (Used Desktop PCs) =================
  {
    id: "pc-used-1",
    name: "Ishlatilgan Gaming PC GTX 1660 Super",
    category: "ishlatilgan-kompyuterlar",
    subcategory: "gaming-pc-used",
    brand: "Custom Build",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - A holat (A'lo darajada)",
    usageCondition: "9/10 holat, tirnalishlar yo'q, yangi termopasta surtilgan",
    testingStatus: "FurMark (1 soat) va AIDA64 stress testlaridan 100% muvaffaqiyatli o'tgan",
    isNew: false,
    priceUZS: 5200000,
    priceRUB: 37100,
    oldPriceUZS: 6000000,
    discountPercent: 13,
    creditAvailable: true,
    monthlyPaymentUZS: 510000,
    stock: 2,
    warranty: "3 oy kafolat + 3 kun tekshirish muddati",
    rating: 4.7,
    reviewsCount: 22,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i5-10400F (6 yadro, 4.3 GHz)",
      ram: "16 GB DDR4 2666MHz Crucial",
      storage: "256 GB SSD + 1 TB HDD Seagate BarraCuda",
      gpu: "NVIDIA GeForce GTX 1660 Super 6GB GDDR6 (Plombasi joyida)",
      motherboard: "Gigabyte H410M S2H",
      powerSupply: "500W DeepCool DN500",
      cooler: "Tower Cooler 3x Copper Pipes",
      case: "RGB Shaffof shishali korpus",
      monitor: "Yo'q"
    },
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "B/U (ishlatilgan) o'yin kompyuteri. GTA 5, PUBG, CS2, FIFA 24 kabi o'yinlarni yuqori FPS bilan ko'taradi. Texnik mutaxassislarimiz tomonidan to'liq tekshirilib, changdan tozalangan va yangi Arctic MX-4 termopastasi qo'yilgan."
  },
  {
    id: "pc-used-2",
    name: "Dell OptiPlex 7070 SFF Biznes PC",
    category: "ishlatilgan-kompyuterlar",
    subcategory: "office-pc-used",
    brand: "Dell",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - Amerika (A+ holat)",
    usageCondition: "Ofisda kam ishlatilgan, original zavod holati",
    testingStatus: "Dell Hardware Diagnostics to'liq testdan o'tgan, nosozliklar yo'q",
    isNew: false,
    priceUZS: 3100000,
    priceRUB: 22100,
    oldPriceUZS: 3500000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 300000,
    stock: 6,
    warranty: "6 oy do'kon kafolati",
    rating: 4.8,
    reviewsCount: 19,
    isPopular: false,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i7-9700 (8 yadro, 4.7 GHz)",
      ram: "16 GB DDR4 (32GB gacha kengaytirish mumkin)",
      storage: "512 GB M.2 NVMe SSD",
      gpu: "Intel UHD Graphics 630",
      motherboard: "Dell Original Q370",
      powerSupply: "Dell Original 260W 80+ Platinum",
      cooler: "Dell Silent Copper Cooler",
      case: "Small Form Factor (SFF) ixcham korpus",
      monitor: "Kiritilmagan"
    },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Amerikadan keltirilgan original Dell OptiPlex ixcham kompyuteri. Ofis, hisobxona, do'kon kassalari va dasturchilar uchun juda sokin, chidamli va ishonchli."
  },
  {
    id: "pc-used-3",
    name: "Ishlatilgan RTX 3070 8GB Powerful PC",
    category: "ishlatilgan-kompyuterlar",
    subcategory: "gaming-pc-used",
    brand: "Gigabyte AORUS",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - Zo'r holatda",
    usageCondition: "Faqat uyda shaxsiy o'yinlar uchun ishlatilgan, mayning qilinmagan",
    testingStatus: "3DMark TimeSpy, Furmark harorat 68C dan oshmaydi",
    isNew: false,
    priceUZS: 9900000,
    priceRUB: 70700,
    oldPriceUZS: 11500000,
    discountPercent: 14,
    creditAvailable: true,
    monthlyPaymentUZS: 960000,
    stock: 1,
    warranty: "3 oy kafolat",
    rating: 4.9,
    reviewsCount: 8,
    isPopular: true,
    isBestSeller: false,
    specs: {
      cpu: "AMD Ryzen 7 5700X (8 yadro, 16 potok)",
      ram: "32 GB DDR4 3600MHz Kingston Fury (2x16)",
      storage: "1 TB M.2 NVMe SSD Crucial P3",
      gpu: "Gigabyte GeForce RTX 3070 Gaming OC 8GB",
      motherboard: "B550 AORUS Elite V2",
      powerSupply: "750W Cougar 80+ Gold",
      cooler: "DeepCool AK500 Digital",
      case: "Zalman i3 Neo Black",
      monitor: "Mavjud emas"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Mayningda ishlatilmagan, uydagi shaxsiy kompyuter. 2K sifatdagi barcha o'yinlarni maksimal nastroykada o'ynash uchun tayyor quvvat."
  },

  // ================= 3. NOUTBUKLAR (Laptops - Yangi va Ishlatilgan) =================
  {
    id: "lap-new-1",
    name: "ASUS TUF Gaming A15 FA507N",
    category: "noutbuklar",
    subcategory: "yangi-noutbuklar",
    brand: "ASUS",
    condition: "yangi",
    conditionText: "Yangi (Zavod qutisida)",
    isNew: true,
    priceUZS: 12400000,
    priceRUB: 88500,
    oldPriceUZS: 13800000,
    discountPercent: 10,
    creditAvailable: true,
    monthlyPaymentUZS: 1200000,
    stock: 8,
    warranty: "12 oy rasmiy servis kafolati",
    rating: 4.9,
    reviewsCount: 42,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "AMD Ryzen 7 7735HS (8 yadro, 4.75 GHz)",
      ram: "16 GB DDR5 4800MHz",
      storage: "512 GB PCIe 4.0 NVMe SSD",
      gpu: "NVIDIA GeForce RTX 4050 6GB GDDR6 (140W TGP)",
      screenSize: "15.6 dyuym Full HD 144Hz IPS darajali",
      battery: "90Wh (6-8 soatgacha avtonom ish)",
      weight: "2.20 kg",
      os: "Windows 11 Home litsenziyali"
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Eng so'nggi avlod harbiy standartga mos (MIL-STD-810H) mustahkam o'yin noutbuki. 144Hz silliq ekran, kuchli RTX 4050 videokarta va uzoqqa yetuvchi 90Vt batareya."
  },
  {
    id: "lap-new-2",
    name: "Lenovo IdeaPad Slim 3 15IAH8",
    category: "noutbuklar",
    subcategory: "yangi-noutbuklar",
    brand: "Lenovo",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 6200000,
    priceRUB: 44200,
    oldPriceUZS: 6900000,
    discountPercent: 10,
    creditAvailable: true,
    monthlyPaymentUZS: 605000,
    stock: 12,
    warranty: "12 oy kafolat",
    rating: 4.8,
    reviewsCount: 29,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i5-12450H (8 yadro, 4.4 GHz)",
      ram: "16 GB LPDDR5 4800MHz",
      storage: "512 GB M.2 NVMe SSD",
      gpu: "Intel UHD Graphics",
      screenSize: "15.6 dyuym IPS FHD (1920x1080) 300 nit",
      battery: "47Wh tez quvvatlash (Rapid Charge)",
      weight: "1.62 kg",
      os: "FreeDOS / Windows 11 o'rnatib beriladi"
    },
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544731612-de2938bab863?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Talabalar, dasturlash va ofis xodimlari uchun eng ommabop yengil va tezkor noutbuk. Kuchli H-seriyadagi Core i5 protsessori barcha dasturlarni soniyalarda ochadi."
  },
  {
    id: "lap-new-3",
    name: "Apple MacBook Air 13 M2 (2023) 8/256 Midnight",
    category: "noutbuklar",
    subcategory: "yangi-noutbuklar",
    brand: "Apple",
    condition: "yangi",
    conditionText: "Yangi (Original Apple Global)",
    isNew: true,
    priceUZS: 12900000,
    priceRUB: 92100,
    oldPriceUZS: 14200000,
    discountPercent: 9,
    creditAvailable: true,
    monthlyPaymentUZS: 1250000,
    stock: 9,
    warranty: "1 yil Apple rasmiy xalqaro kafolati",
    rating: 5.0,
    reviewsCount: 57,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "Apple M2 chip (8 yadro CPU, 8 yadro GPU)",
      ram: "8 GB Unified Memory",
      storage: "256 GB Superfast SSD",
      gpu: "Apple 8-core GPU",
      screenSize: "13.6 dyuym Liquid Retina Display 500 nit True Tone",
      battery: "18 soatgacha batareya quvvati",
      weight: "1.24 kg",
      os: "macOS Sonoma"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Mashhur MacBook Air M2. Qalinligi atigi 1.13 sm, 18 soat zaryadsiz ishlaydi, jim (fanless) sovutish tizimi va tengsiz Liquid Retina displey."
  },
  {
    id: "lap-used-1",
    name: "Lenovo ThinkPad T480 (AQSHdan keltirilgan)",
    category: "noutbuklar",
    subcategory: "ishlatilgan-noutbuklar",
    brand: "Lenovo",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - A+ (Ideal holatda)",
    usageCondition: "Korpusda tirnalishlar deyarli yo'q, klaviaturasi yangi, ikkita batareyali",
    testingStatus: "Klaviatura, ekran, barcha portlar va batareyalar 100% testdan o'tgan (Batareya salomatligi: 92%)",
    isNew: false,
    priceUZS: 3200000,
    priceRUB: 22800,
    oldPriceUZS: 3800000,
    discountPercent: 15,
    creditAvailable: true,
    monthlyPaymentUZS: 310000,
    stock: 5,
    warranty: "3 oy kafolat",
    rating: 4.8,
    reviewsCount: 31,
    isPopular: true,
    isBestSeller: true,
    specs: {
      cpu: "Intel Core i5-8350U (4 yadro, 8 potok, 3.6 GHz)",
      ram: "16 GB DDR4",
      storage: "256 GB NVMe SSD",
      gpu: "Intel UHD Graphics 620",
      screenSize: "14.0 dyuym Full HD IPS motoviy",
      battery: "Ikkita batareya (4-6 soat bemalol yetadi)",
      weight: "1.6 kg",
      os: "Windows 10 Pro litsenziya"
    },
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Afsonaviy afrika harbiy sinovlaridan o'tgan Lenovo ThinkPad T480. Dasturlash, diagnostika, ofis ishlari uchun eng qulay klaviatura va ishonchli temir korpus."
  },
  {
    id: "lap-used-2",
    name: "HP EliteBook 840 G7 Biznes Ultrabook",
    category: "noutbuklar",
    subcategory: "ishlatilgan-noutbuklar",
    brand: "HP",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - A holat",
    usageCondition: "Alyuminiy korpus, juda toza saqlangan, xorijiy kompaniya lizingidan",
    testingStatus: "HP PC Hardware Diagnostics to'liq testdan o'tgan, batareya 88%",
    isNew: false,
    priceUZS: 4600000,
    priceRUB: 32800,
    oldPriceUZS: 5200000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 450000,
    stock: 4,
    warranty: "3 oy kafolat",
    rating: 4.8,
    reviewsCount: 14,
    isPopular: false,
    isBestSeller: false,
    specs: {
      cpu: "Intel Core i5-10310U (vPro, 4.4 GHz)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB M.2 NVMe SSD",
      gpu: "Intel UHD Graphics",
      screenSize: "14.0 dyuym Full HD IPS ingichka ramka",
      battery: "53Wh (5 soatgacha)",
      weight: "1.33 kg",
      os: "Windows 11 Pro litsenziyali"
    },
    images: [
      "https://images.unsplash.com/photo-1544731612-de2938bab863?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Yupqa premium alyuminiy korpusli HP EliteBook biznes noutbuki. Bang & Olufsen dinamiklari va yuzni taniydigan IR kamera bilan jihozlangan."
  },
  {
    id: "lap-used-3",
    name: "Dell Latitude 5420 Core i7-1185G7",
    category: "noutbuklar",
    subcategory: "ishlatilgan-noutbuklar",
    brand: "Dell",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - Zo'r holat",
    usageCondition: "Amerika korporativ lizingidan, deyarli yangidek",
    testingStatus: "100% barcha funksiyalari tekshirilgan, batareya quvvati 90%",
    isNew: false,
    priceUZS: 5100000,
    priceRUB: 36400,
    oldPriceUZS: 5800000,
    discountPercent: 12,
    creditAvailable: true,
    monthlyPaymentUZS: 500000,
    stock: 3,
    warranty: "3 oy kafolat",
    rating: 4.9,
    reviewsCount: 16,
    isPopular: true,
    isBestSeller: false,
    specs: {
      cpu: "Intel Core i7-1185G7 (4 yadro, 8 potok, 4.8 GHz)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      gpu: "Intel Iris Xe Graphics (G7 96EUs)",
      screenSize: "14.0 dyuym FHD Anti-glare",
      battery: "63Wh (6 soatgacha)",
      weight: "1.4 kg",
      os: "Windows 11 Pro"
    },
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Kuchli 11-avlod Core i7 protsessoriga ega Dell noutbuki. Yengil, ko'p dasturlarni bir vaqtda qotmasdan ishlatish uchun ideal."
  },

  // ================= 4. AKSESSUARLAR (Accessories) =================
  {
    id: "acc-1",
    name: "Redragon K552 Kumara RGB Mexanik Klaviatura",
    category: "aksessuarlar",
    subcategory: "gaming-keyboard",
    brand: "Redragon",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 450000,
    priceRUB: 3200,
    oldPriceUZS: 520000,
    discountPercent: 13,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 25,
    warranty: "6 oy kafolat",
    rating: 4.8,
    reviewsCount: 68,
    isPopular: true,
    isBestSeller: true,
    specs: {
      type: "Mexanik klaviatura (Tenkeyless)",
      switches: "Outemu Red / Blue svitchlar",
      backlight: "RGB 18 xil yoritish rejimi",
      connection: "USB oltinlangan kabel",
      compatibility: "Windows, Mac, Linux"
    },
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Kiber-sportchilar va geymerlar tanlovi. Ixcham metall asosli korpus, tezkor bosiluvchi mexanik svitchlar va to'liq RGB yoritish."
  },
  {
    id: "acc-2",
    name: "Logitech G102 Lightsync Gaming Mouse",
    category: "aksessuarlar",
    subcategory: "gaming-mouse",
    brand: "Logitech",
    condition: "yangi",
    conditionText: "Yangi (Original)",
    isNew: true,
    priceUZS: 280000,
    priceRUB: 2000,
    oldPriceUZS: 330000,
    discountPercent: 15,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 40,
    warranty: "12 oy rasmiy kafolat",
    rating: 4.9,
    reviewsCount: 110,
    isPopular: true,
    isBestSeller: true,
    specs: {
      sensor: "Gaming Grade Sensor 8000 DPI",
      buttons: "6 ta dasturlanadigan tugma",
      backlight: "Lightsync RGB 16.8M rang",
      weight: "85 g ultra yengil",
      cable: "2.1 metr yumshoq kabel"
    },
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "O'zbekistondagi eng ko'p sotilgan o'yin sichqonchasi. Aniq sensor, ergonomik qulay shakl va Logitech G HUB dasturi orqali moslanuvchi RGB."
  },
  {
    id: "acc-3",
    name: "AOC 27G2SP 27\" IPS 165Hz Gaming Monitor",
    category: "aksessuarlar",
    subcategory: "monitor",
    brand: "AOC",
    condition: "yangi",
    conditionText: "Yangi (Qutida)",
    isNew: true,
    priceUZS: 2750000,
    priceRUB: 19600,
    oldPriceUZS: 3100000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 270000,
    stock: 8,
    warranty: "12 oy rasmiy kafolat",
    rating: 4.9,
    reviewsCount: 35,
    isPopular: true,
    isBestSeller: true,
    specs: {
      screenSize: "27 dyuym (68.6 sm)",
      panelType: "IPS 1ms MPRT javob berish vaqti",
      refreshRate: "165 Hz FreeSync Premium",
      resolution: "Full HD (1920x1080)",
      ports: "2x HDMI 1.4, 1x DisplayPort 1.2, VGA",
      stand: "Balandligi, egilishi va vertikal aylanishi (Pivot) sozlanadi"
    },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "165Hz tezkor chastota va yorqin ranglarni uzatuvchi IPS panel. Har qanday o'yinda raqiblaringizdan ustunlik beradi."
  },
  {
    id: "acc-4",
    name: "HyperX Cloud II Gaming Headset (Red)",
    category: "aksessuarlar",
    subcategory: "naushnik",
    brand: "HyperX",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 1150000,
    priceRUB: 8200,
    oldPriceUZS: 1300000,
    discountPercent: 11,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 14,
    warranty: "12 oy kafolat",
    rating: 5.0,
    reviewsCount: 45,
    isPopular: true,
    isBestSeller: true,
    specs: {
      sound: "Virtual 7.1 Surround Sound",
      drivers: "53 mm neodim dinamiklar",
      microphone: "Shovqinni bostiruvchi yechiladigan mikrofon",
      frame: "Alyuminiy mustahkam korpus",
      pads: "Xotirali ko'pik (Memory foam) quloqchinlar"
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Afsonaviy qulaylik va kristalldek toza 7.1 fazoviy ovoz. Dushman qadam tovushlarini eng mayda detaligacha eshitish imkoni."
  },
  {
    id: "acc-5",
    name: "Fifine T669 Kondensator USB Mikrofon Komplekt",
    category: "aksessuarlar",
    subcategory: "mikrofon",
    brand: "Fifine",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 650000,
    priceRUB: 4600,
    oldPriceUZS: 750000,
    discountPercent: 13,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 18,
    warranty: "6 oy kafolat",
    rating: 4.8,
    reviewsCount: 29,
    isPopular: false,
    isBestSeller: false,
    specs: {
      polarPattern: "Kardioid yo'nalishli",
      connection: "USB Plug and Play (drayversiz)",
      frequency: "20Hz - 20kHz",
      accessories: "Panteograf (qo'l), pop-filtr, o'rgimchak ushlagich va stoyka komplektda"
    },
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Strim, YouTube, podkast va Zoom darslari uchun to'liq studiya komplekti. Hech qanday qo'shimcha audio karta talab qilinmaydi."
  },
  {
    id: "acc-6",
    name: "Logitech C922 Pro Stream Full HD Veb-kamera",
    category: "aksessuarlar",
    subcategory: "webcam",
    brand: "Logitech",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 1200000,
    priceRUB: 8500,
    oldPriceUZS: 1350000,
    discountPercent: 11,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 9,
    warranty: "12 oy kafolat",
    rating: 4.7,
    reviewsCount: 19,
    isPopular: false,
    isBestSeller: false,
    specs: {
      resolution: "1080p 30fps yoki 720p 60fps",
      autofocus: "Tezkor avtofokus va yorug'likni to'g'rilash",
      audio: "2 ta stereo mikrofon",
      stand: "Stol shtativi komplektda mavjud"
    },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Professional strimerlar va masofaviy ishlovchilar uchun sifatli 1080p Full HD veb-kamera. Avtomatik yorug'lik tuzatish tizimi mavjud."
  },
  {
    id: "acc-7",
    name: "SteelSeries QcK Heavy XXL Gaming Kovrik (900x400mm)",
    category: "aksessuarlar",
    subcategory: "mouse-pad",
    brand: "SteelSeries",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 220000,
    priceRUB: 1570,
    oldPriceUZS: 260000,
    discountPercent: 15,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 35,
    warranty: "1 oy kafolat",
    rating: 4.9,
    reviewsCount: 52,
    isPopular: false,
    isBestSeller: true,
    specs: {
      dimensions: "900 x 400 x 4 mm",
      material: "Mikro-to'qimali maxsus mato + sirpanmaydigan rezina",
      edges: "Tiklangan (stitched) chetlar"
    },
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Katta o'lchamdagi qalin geymer gilamchasi. Sichqoncha va klaviatura birga sig'adi, harakatlanish juda silliq va aniq."
  },
  {
    id: "acc-8",
    name: "Baseus 8-in-1 Type-C Multifunksional USB Hub",
    category: "aksessuarlar",
    subcategory: "usb-hub",
    brand: "Baseus",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 420000,
    priceRUB: 3000,
    oldPriceUZS: 490000,
    discountPercent: 14,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 20,
    warranty: "6 oy kafolat",
    rating: 4.8,
    reviewsCount: 38,
    isPopular: false,
    isBestSeller: true,
    specs: {
      ports: "4K HDMI, 3x USB 3.0, 100W PD Type-C, RJ45 Gigabit Ethernet, SD/TF kartrider",
      material: "Metall alyuminiy korpus",
      compatibility: "MacBook, iPad, Type-C noutbuklar"
    },
    images: [
      "https://images.unsplash.com/photo-1544731612-de2938bab863?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Noutbukingiz uchun barcha kerakli portlar bir joyda. 4K monitor ulash, tezkor internet va 100Vt tez quvvatlashni qo'llab-quvvatlaydi."
  },

  // ================= 5. KOMPYUTER DETALLARI (Components - Yangi va Ishlatilgan) =================
  {
    id: "comp-new-1",
    name: "Intel Core i5-13400F Protsessor (Box)",
    category: "kompyuter-detallari",
    subcategory: "cpu",
    brand: "Intel",
    condition: "yangi",
    conditionText: "Yangi (Original Box)",
    isNew: true,
    priceUZS: 2400000,
    priceRUB: 17100,
    oldPriceUZS: 2700000,
    discountPercent: 11,
    creditAvailable: true,
    monthlyPaymentUZS: 235000,
    stock: 14,
    warranty: "36 oy kafolat",
    rating: 4.9,
    reviewsCount: 45,
    isPopular: true,
    isBestSeller: true,
    specs: {
      socket: "LGA1700",
      cores: "10 yadro (6 Performance + 4 Efficient)",
      threads: "16 potok",
      baseClock: "2.5 GHz (Max Turbo 4.6 GHz)",
      cache: "20 MB Intel Smart Cache",
      tdp: "65W (Max 148W)",
      ramSupport: "DDR4 3200MHz va DDR5 4800MHz"
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "13-avlod eng yaxshi narx va unumdorlik muvozanatiga ega Intel protsessori. Barcha zamonaviy videokartalarni o'yinlarda 100% ochib beradi."
  },
  {
    id: "comp-new-2",
    name: "AMD Ryzen 5 7600 (AM5) Protsessor",
    category: "kompyuter-detallari",
    subcategory: "cpu",
    brand: "AMD",
    condition: "yangi",
    conditionText: "Yangi (Box)",
    isNew: true,
    priceUZS: 2550000,
    priceRUB: 18200,
    oldPriceUZS: 2900000,
    discountPercent: 12,
    creditAvailable: true,
    monthlyPaymentUZS: 250000,
    stock: 10,
    warranty: "36 oy kafolat",
    rating: 4.9,
    reviewsCount: 27,
    isPopular: true,
    isBestSeller: false,
    specs: {
      socket: "AM5 (Zen 4)",
      cores: "6 yadro / 12 potok",
      boostClock: "5.1 GHz gacha",
      cache: "32 MB L3 Cache",
      graphics: "Integratsiyalangan AMD Radeon Graphics mavjud"
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "AM5 soketidagi zamonaviy DDR5 protsessor. Integratsiyalangan videokartasi borligi tufayli vaqtinchalik diskret kartasiz ham ishlaydi."
  },
  {
    id: "comp-used-1",
    name: "Ishlatilgan MSI GeForce GTX 1660 Super Ventus XS 6GB",
    category: "kompyuter-detallari",
    subcategory: "gpu",
    brand: "MSI",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - A holat (Plombasi buzilmagan)",
    usageCondition: "Uy kompyuteridan olingan, 100% original, mayning ko'rmagan",
    testingStatus: "Furmark stress testida 15 daqiqa: 67 daraja, ventilyatorlari shovqinsiz ishlaydi",
    isNew: false,
    priceUZS: 1850000,
    priceRUB: 13200,
    oldPriceUZS: 2200000,
    discountPercent: 15,
    creditAvailable: true,
    monthlyPaymentUZS: 180000,
    stock: 3,
    warranty: "1 oy to'liq do'kon kafolati",
    rating: 4.7,
    reviewsCount: 39,
    isPopular: true,
    isBestSeller: true,
    specs: {
      memory: "6 GB GDDR6 (192-bit)",
      interface: "PCIe 3.0 x16",
      ports: "3x DisplayPort 1.4, 1x HDMI 2.0b",
      powerConnector: "1x 8-pin (tavsiya etilgan blok 450W)"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Byudjetli o'yin kompyuterlari uchun eng ishonchli videokarta. 100% sinovdan o'tkazilgan, zavod plombasi ustida saqlangan."
  },
  {
    id: "comp-used-2",
    name: "Ishlatilgan Palit RTX 3060 Dual 12GB GDDR6",
    category: "kompyuter-detallari",
    subcategory: "gpu",
    brand: "Palit",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - Zo'r holat",
    usageCondition: "Chiroyli saqlangan, haroratlari me'yorda",
    testingStatus: "Superposition va Furmark testlari: harorat 71C, xotira xatolarisiz",
    isNew: false,
    priceUZS: 3200000,
    priceRUB: 22800,
    oldPriceUZS: 3700000,
    discountPercent: 13,
    creditAvailable: true,
    monthlyPaymentUZS: 310000,
    stock: 2,
    warranty: "2 oy kafolat",
    rating: 4.8,
    reviewsCount: 22,
    isPopular: true,
    isBestSeller: true,
    specs: {
      memory: "12 GB GDDR6 (Katta xotira neyrotarmoqlar va 3D uchun juda qulay)",
      interface: "PCIe 4.0 x16",
      rtCores: "2-avlod RT yadrolari va DLSS qo'llab-quvvatlaydi"
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "12GB xotirasi bilan nafaqat o'yinlarda, balki Stable Diffusion va AI dasturlarda ishlash uchun ham ideal variant."
  },
  {
    id: "comp-new-3",
    name: "Kingston Fury Beast 32GB (2x16GB) DDR4 3200MHz",
    category: "kompyuter-detallari",
    subcategory: "ram",
    brand: "Kingston",
    condition: "yangi",
    conditionText: "Yangi (Blisterda)",
    isNew: true,
    priceUZS: 890000,
    priceRUB: 6350,
    oldPriceUZS: 1050000,
    discountPercent: 15,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 28,
    warranty: "36 oy kafolat",
    rating: 5.0,
    reviewsCount: 74,
    isPopular: true,
    isBestSeller: true,
    specs: {
      capacity: "32 GB (2 ta 16 GB modul)",
      frequency: "3200 MHz CL16",
      heatSpreader: "Qora alyuminiy radiator",
      xmp: "Intel XMP 2.0 qo'llab-quvvatlash"
    },
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Kompyuteringiz tezligini oshirish uchun eng ishonchli ikki kanalli tezkor xotira (RAM) to'plami."
  },
  {
    id: "comp-used-3",
    name: "Ishlatilgan DDR4 8GB 2666MHz Samsung Original",
    category: "kompyuter-detallari",
    subcategory: "ram",
    brand: "Samsung",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - 100% sog'lom",
    usageCondition: "Brendli kompyuterdan yechib olingan, chip nuqsonlari yo'q",
    testingStatus: "MemTest86 dasturida xatosiz 4 pass o'tgan",
    isNew: false,
    priceUZS: 170000,
    priceRUB: 1200,
    oldPriceUZS: 220000,
    discountPercent: 22,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 15,
    warranty: "1 oy kafolat",
    rating: 4.7,
    reviewsCount: 41,
    isPopular: false,
    isBestSeller: true,
    specs: {
      capacity: "8 GB",
      type: "DDR4 2666V UDIMM",
      chip: "Original Samsung chiplar"
    },
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Samsung original DDR4 xotira moduli. Har qanday ona plataga tushadi va barqaror ishlaydi."
  },
  {
    id: "comp-new-4",
    name: "Samsung 980 Pro 1TB NVMe M.2 SSD PCIe 4.0",
    category: "kompyuter-detallari",
    subcategory: "ssd",
    brand: "Samsung",
    condition: "yangi",
    conditionText: "Yangi (Zavod plombasi)",
    isNew: true,
    priceUZS: 1250000,
    priceRUB: 8900,
    oldPriceUZS: 1450000,
    discountPercent: 13,
    creditAvailable: true,
    monthlyPaymentUZS: 122000,
    stock: 22,
    warranty: "60 oy (5 yil) kafolat",
    rating: 5.0,
    reviewsCount: 88,
    isPopular: true,
    isBestSeller: true,
    specs: {
      speed: "O'qish: 7000 MB/s, Yozish: 5000 MB/s",
      formFactor: "M.2 2280 NVMe 1.3c",
      tbw: "600 TBW chidamlilik resursi",
      controller: "Samsung Elpis Controller"
    },
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dunyodagi eng mashhur va ishonchli yuqori tezlikdagi SSD. Kompyuteringiz va o'yinlar ko'z ochib yumguncha ishga tushadi."
  },
  {
    id: "comp-used-4",
    name: "Ishlatilgan HDD 1TB Western Digital Blue 7200RPM",
    category: "kompyuter-detallari",
    subcategory: "hdd",
    brand: "Western Digital",
    condition: "ishlatilgan",
    conditionText: "Ishlatilgan - Smart 100% Ideal",
    usageCondition: "Sokin ishlaydi, begona chertish tovushlari yo'q",
    testingStatus: "Hard Disk Sentinel dasturida Performance 100%, Health 100%, Bad-sektor 0 ta",
    isNew: false,
    priceUZS: 280000,
    priceRUB: 2000,
    oldPriceUZS: 360000,
    discountPercent: 22,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 9,
    warranty: "1 oy kafolat",
    rating: 4.6,
    reviewsCount: 19,
    isPopular: false,
    isBestSeller: false,
    specs: {
      capacity: "1000 GB (1 TB)",
      speed: "7200 RPM, 64 MB Kesh",
      interface: "SATA III 6Gb/s"
    },
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Katta hajmdagi fayllar, filmlar va arxivlar saqlash uchun 100% sog'lom sinovdan o'tgan qattiq disk."
  },
  {
    id: "comp-new-5",
    name: "DeepCool PK650D 650W 80 Plus Bronze Quvvat Bloki",
    category: "kompyuter-detallari",
    subcategory: "power-supply",
    brand: "DeepCool",
    condition: "yangi",
    conditionText: "Yangi",
    isNew: true,
    priceUZS: 680000,
    priceRUB: 4850,
    oldPriceUZS: 780000,
    discountPercent: 12,
    creditAvailable: false,
    monthlyPaymentUZS: 0,
    stock: 16,
    warranty: "24 oy kafolat",
    rating: 4.8,
    reviewsCount: 33,
    isPopular: false,
    isBestSeller: true,
    specs: {
      power: "650W uzluksiz quvvat",
      certificate: "80 PLUS Bronze (85% samaradorlik)",
      protections: "OPP, OVP, SCP, OTP, OCP to'liq himoya tizimi",
      fan: "120 mm sokin gidrodinamik kuller"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Kompyuteringiz qismlarini elektr tebranishlaridan himoya qiluvchi sifatli va sokin quvvat ta'minoti bloki."
  }
];

// O'zbekiston viloyatlari (Checkout va yetkazib berish uchun)
const UZBEKISTAN_REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Farg'ona viloyati",
  "Andijon viloyati",
  "Namangan viloyati",
  "Buxoro viloyati",
  "Xorazm viloyati",
  "Qashqadaryo viloyati",
  "Surxondaryo viloyati",
  "Jizzax viloyati",
  "Sirdaryo viloyati",
  "Navoiy viloyati",
  "Qoraqalpog'iston Respublikasi"
];

// Boshlang'ich test buyurtmalar (Admin panelda ko'rsatish uchun)
const INITIAL_ORDERS = [
  {
    id: "UZ-10824",
    customerName: "Farrux Zokirov",
    phone: "+998 90 123 45 67",
    region: "Toshkent shahri",
    city: "Yunusobod tumani",
    address: "Amir Temur ko'chasi 45-uy",
    paymentType: "karta",
    paymentLabel: "Karta orqali",
    status: "Tayyorlanmoqda",
    date: "2026-09-24 14:30",
    totalUZS: 12400000,
    items: [
      {
        id: "lap-new-1",
        name: "ASUS TUF Gaming A15 FA507N",
        priceUZS: 12400000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80"
      }
    ],
    comment: "Kuryer kelishidan 30 daqiqa oldin telefon qilsin."
  },
  {
    id: "UZ-10825",
    customerName: "Jamshid Aliyev",
    phone: "+998 93 987 65 43",
    region: "Samarqand viloyati",
    city: "Samarqand shahar",
    address: "Registon ko'chasi 12",
    paymentType: "yetkazib-berishda",
    paymentLabel: "Yetkazib berishda to'lov",
    status: "Yetkazilmoqda",
    date: "2026-09-25 10:15",
    totalUZS: 5480000,
    items: [
      {
        id: "pc-used-1",
        name: "Ishlatilgan Gaming PC GTX 1660 Super",
        priceUZS: 5200000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "acc-2",
        name: "Logitech G102 Lightsync Gaming Mouse",
        priceUZS: 280000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80"
      }
    ],
    comment: "Iltimos yaxshilab qadoqlansin."
  },
  {
    id: "UZ-10826",
    customerName: "Sardorbek Rahimov",
    phone: "+998 97 555 12 34",
    region: "Farg'ona viloyati",
    city: "Qo'qon shahri",
    address: "Mustaqillik ko'chasi 8",
    paymentType: "kredit",
    paymentLabel: "Kreditga",
    status: "Yangi",
    date: "2026-09-25 13:40",
    totalUZS: 11800000,
    items: [
      {
        id: "pc-new-1",
        name: "HyperPC Pro Gaming RTX 4060",
        priceUZS: 11800000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80"
      }
    ],
    comment: "12 oylik kreditga olish uchun ariza topshirganman."
  }
];

// Boshlang'ich test kredit arizalari
const INITIAL_CREDIT_APPLICATIONS = [
  {
    id: "CR-501",
    customerName: "Dilshod Karimov",
    phone: "+998 94 444 88 99",
    productName: "HyperPC Pro Gaming RTX 4060",
    productId: "pc-new-1",
    initialPayment: 2000000,
    termMonths: 12,
    monthlyPaymentEstimate: 980000,
    status: "Ko'rib chiqilmoqda",
    date: "2026-09-25 11:20",
    comment: "Pasport va plastik karta aylanmasi mavjud."
  }
];

// O'zbekistondagi kompyuterlar bozori va sotuviga oid dolzarb yangiliklar
const NEWS_ARTICLES = [
  {
    id: "news-1",
    title: "2026-yilda O'zbekistonda o'yin kompyuterini yig'ish qanchaga tushadi? (RTX 4060 vs RTX 4070)",
    date: "25-Sentyabr, 2026",
    tag: "Bozor Narxlari & Tahlil",
    tagColor: "#2563EB",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    summary: "Toshkent va Malika bozoridagi joriy narxlar tahlili: 1080p, 2K va 4K o'yinlar uchun maqbul konfiguratsiyalar hamda so'mdagi hisob-kitoblar.",
    content: `
      <p>Bugungi kunda O'zbekiston kompyuter bozorida grafik kartalar va protsessorlar narxi barqarorlashdi. CS2, Cyberpunk 2077, Dota 2 va GTA 5 kabi o'yinlarni yuqori FPS bilan o'ynash uchun quyidagi ikki xil variant tavsiya etiladi:</p>
      <br>
      <h4>1. Optimal Gaming Yig'uv (10-12 mln so'm):</h4>
      <p>Intel Core i5-13400F yoki Ryzen 5 7500F, 16GB DDR4/DDR5 xotira, 1TB NVMe SSD va <strong>NVIDIA GeForce RTX 4060 8GB</strong> videokartasi. Bu yig'uv barcha o'yinlarni Full HD 1080p da 100+ FPS bilan bemalol ko'taradi.</p>
      <br>
      <h4>2. Flagman 2K/4K Gaming Yig'uv (20-25 mln so'm):</h4>
      <p>Intel Core i7-14700KF, 32GB DDR5 6000MHz, RTX 4070 Ti Super 16GB va suyuqlik sovutgichi. Ushbu kompyuter nafaqat maksimal o'yinlar, balki og'ir 3D rendering va professional montaj uchun ham mo'ljallangan.</p>
      <br>
      <p>UzTech do'konimizda barcha yangi kompyuterlar 24 oylik rasmiy kafolat bilan taqdim etiladi.</p>
    `
  },
  {
    id: "news-2",
    title: "Ishlatilgan (B/U) kompyuter va videokartalarni sotib olishda 5 ta oltin qoida",
    date: "22-Sentyabr, 2026",
    tag: "Mutaxassis Maslahati",
    tagColor: "#D97706",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    summary: "Mayningda qizib ketgan videokartalar, qayta qizdirilgan chiplar va SSD xotira salomatligini aniqlash bo'yicha amaliy qo'llanma.",
    content: `
      <p>Ishlatilgan kompyuter yoki qismlar yangisiga nisbatan 40-50% arzonroq turadi. Lekin pulingiz havoga uchmasligi uchun quyidagi sinovlarni o'tkazish shart:</p>
      <br>
      <ul>
        <li><strong>1. FurMark Stress-Test:</strong> Videokartani 15-20 daqiqa yuklama ostida tekshiring. Harorat 75 darajadan oshmasligi va ekranda qora nuqtalar (artefakt) chiqmasligi kerak.</li>
        <li><strong>2. CrystalDiskInfo / Hard Disk Sentinel:</strong> SSD va HDD disklarning 'Health' (salomatlik) holati kamida 95-100% bo'lishi lozim.</li>
        <li><strong>3. AIDA64 va CPU-Z:</strong> Protsessor chastotasi pasayib ketmasligi (trottling bo'lmasligi) tekshiriladi.</li>
        <li><strong>4. Zavod plombasi:</strong> Videokarta orqasidagi zavod plombasi butunligi uning ilgari ta'mirlanmaganidan darak beradi.</li>
        <li><strong>5. Do'kon kafolati:</strong> Ishlatilgan texnika olganda kamida 1 oydan 3 oygacha rasmiy tekshirish kafolati beruvchi ishonchli do'konlarni tanlang.</li>
      </ul>
      <br>
      <p>UzTech PC Market mutaxassislari har bir ishlatilgan kompyuterni sotuvga qo'yishdan oldin 100% tekshirib, yangi termopasta bilan ta'minlaydi.</p>
    `
  },
  {
    id: "news-3",
    title: "O'zbekistonda muddatli to'lov (kreditga) kompyuter olish shartlari osonlashdi",
    date: "18-Sentyabr, 2026",
    tag: "Kredit & Moliya",
    tagColor: "#7C3AED",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    summary: "Boshlang'ich to'lovsiz, ortiqcha hujjatlarsiz, faqatgina pasport va karta aylanmasi orqali 3 oydan 24 oygacha qulay kreditga ega bo'lish.",
    content: `
      <p>Endilikda o'qish, ish yoki o'yin uchun kerak bo'lgan sifatli kompyuter va noutbuklarni birdaniga katta pul to'lamasdan, bo'lib to'lashga xarid qilish mumkin.</p>
      <br>
      <h4>Kredit olish talablari:</h4>
      <ul>
        <li>O'zbekiston Respublikasi fuqarolik pasporti yoki ID-karta;</li>
        <li>Oxirgi 6 oylik rasmiy daromad yoki muntazam aylanmaga ega plastik karta;</li>
        <li>18 yoshdan yuqori bo'lish.</li>
      </ul>
      <br>
      <p>Saytimizdagi <strong>Kredit Kalkulyatori</strong> orqali oylik to'lovni oldindan bilib olib, onlayn ariza qoldirishingiz mumkin. Arizalar 15 daqiqada ko'rib chiqiladi.</p>
    `
  },
  {
    id: "news-4",
    title: "IT dasturchilar, dizaynerlar va talabalar uchun 2026-yilgi eng zo'r noutbuklar",
    date: "14-Sentyabr, 2026",
    tag: "Noutbuklar",
    tagColor: "#059669",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    summary: "Lenovo ThinkPad, HP EliteBook hamda Apple MacBook Air modellari o'rtasidagi batafsil taqqoslash va amaliy tavsiyalar.",
    content: `
      <p>Noutbuk tanlashda eng muhim uchta jihat: protsessor quvvati, ekran sifati (IPS panel, ko'zni charchatmaslik) va batareya chidamliligi hisoblanadi.</p>
      <br>
      <h4>Biz tavsiya etadigan yetakchi modellar:</h4>
      <ul>
        <li><strong>Apple MacBook Air M2 (13.6 dyuym):</strong> 18 soatlik batareya, yengil vazn (1.24 kg) va ajoyib Retina ekran. Frontend, dizayn va mobil dasturchilar uchun eng qulay tanlov.</li>
        <li><strong>Lenovo ThinkPad T480 (B/U):</strong> Byudjetli va chidamli. Qulay klaviatura, ikkita batareya va oson kengaytiriluvchi 16GB RAM.</li>
        <li><strong>ASUS TUF Gaming A15:</strong> 3D modellashtirish, arxitektura va o'yinlar uchun RTX 4050 videokartali kuchli statsionar noutbuk.</li>
      </ul>
    `
  }
];

