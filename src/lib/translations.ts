export interface RoomTranslation {
  name: string;
  description: string;
  fullDescription: string;
  price: string;
  guests: string;
  bedType: string;
  features: string[];
  amenities: string[];
}

export interface ExperienceTranslation {
  title: string;
  description: string;
}

export interface TranslationSchema {
  nav: {
    philosophy: string;
    rooms: string;
    experiences: string;
    gallery: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    scroll: string;
  };
  philosophy: {
    overline: string;
    title: string;
    p1: string;
    p2: string;
  };
  rooms: {
    overline: string;
    title: string;
    detailsBtn: string;
    perNight: string;
    items: {
      [key: string]: RoomTranslation;
    };
  };
  experiences: {
    overline: string;
    title: string;
    detailsBtn: string;
    items: {
      [key: string]: ExperienceTranslation;
    };
  };
  gallery: {
    overline: string;
    title: string;
    subtitle: string;
    lightbox: {
      category: string;
      image: string;
      of: string;
    };
  };
  booking: {
    overline: string;
    title: string;
    steps: {
      dates: string;
      room: string;
      details: string;
      confirmation: string;
    };
    form: {
      checkIn: string;
      checkOut: string;
      adults: string;
      children: string;
      guestLabel: string;
      guestLabel2To4: string;
      guestLabelMany: string;
      childLabel: string;
      childLabel2To4: string;
      childLabelMany: string;
      findRooms: string;
      checking: string;
      back: string;
      continue: string;
      nightLabel: string;
      nightLabel2To4: string;
      nightLabelMany: string;
      forNight: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      submitting: string;
      submitBtn: string;
      total: string;
    };
    confirm: {
      title: string;
      text: string;
      newBooking: string;
    };
    alternativeCta: string;
  };
  contacts: {
    overline: string;
    title: string;
    addressTitle: string;
    addressDetail: string;
    phoneTitle: string;
    phoneDetail: string;
    phoneSubtitle: string;
    emailTitle: string;
    emailDetail: string;
    emailSubtitle: string;
    messengersTitle: string;
    hoursTitle: string;
    checkIn: string;
    checkOut: string;
    reception: string;
    mapCoords: string;
    mapLocation: string;
    mapBtn: string;
  };
  footer: {
    desc: string;
    contacts: string;
    social: string;
    copyright: string;
    privacy: string;
    terms: string;
    brandSub: string;
    brandAddr: string;
  };
  roomModal: {
    close: string;
    about: string;
    amenities: string;
    features: string;
    managerNotice: string;
  };
}

export const translations: Record<'uk' | 'en' | 'ru', TranslationSchema> = {
  uk: {
    nav: {
      philosophy: "Філософія",
      rooms: "Номери",
      experiences: "Враження",
      gallery: "Галерея",
      contact: "Контакти",
      book: "Забронювати",
    },
    hero: {
      title: "Тихіше.",
      subtitle: "Місце, де час зупиняється. Преміальний релакс-парк у серці природи.",
      cta: "Обрати дати",
      scroll: "Гортайте вниз",
    },
    philosophy: {
      overline: "Філософія",
      title: "Розкіш у тиші",
      p1: "Ми створили місце, де можна зупинитися. Вдалині від міського шуму, сповіщень та нескінченної гонки. Тут час тече інакше — розмірено, спокійно, усвідомлено.",
      p2: "Кожен елемент нашого простору створений із турботою про ваш комфорт. Природа, архітектура, інтер'єр — усе працює на одну мету: подарувати вам відчуття глибокого спокою.",
    },
    rooms: {
      overline: "Розміщення",
      title: "Будинки та номери",
      detailsBtn: "Детальніше",
      perNight: "за ніч",
      items: {
        '1': {
          name: "Forest Villa",
          description: "Окремий будинок у лісі з панорамними вікнами",
          fullDescription: "Forest Villa — це усамітнений простір у самому серці лісу. Панорамні вікна від підлоги до стелі відкривають вид на вікові дерева, створюючи відчуття єдності з природою. Простора тераса ідеально підходить для ранкової кави або вечірнього келиха вина. Інтер'єр виконаний у стилі сучасного мінімалізму з використанням натуральних матеріалів.",
          price: "від 25 000 грн / ніч",
          guests: "2 гостей",
          bedType: "King Size",
          features: ["Панорамні вікна", "Вид на ліс", "Окремий вхід", "Звукоізоляція"],
          amenities: ["Безкоштовний WiFi", "Камін", "Тераса", "Міні-бар", "Кондиціонер", "Фен", "Халати та капці"],
        },
        '2': {
          name: "Lake Suite",
          description: "Люкс із видом на озеро",
          fullDescription: "Lake Suite — це розкішний люкс із захоплюючим видом на озеро. Простора кімната із зонованим простором, власна джакузі на балконі та преміальне оздоблення створюють атмосферу виняткового комфорту. Ідеальний вибір для романтичного відпочинку або невеликої сімейної подорожі.",
          price: "від 35 000 грн / ніч",
          guests: "2-4 гостей",
          bedType: "King Size + Диван",
          features: ["Вид на озеро", "Балкон із джакузі", "Зонований простір", "Преміальне оздоблення"],
          amenities: ["Безкоштовний WiFi", "Джакузі", "Балкон", "Міні-бар", "Доступ у SPA", "Кондиціонер", "Фен", "Халати та капці", "Кавомашина"],
        },
        '3': {
          name: "Royal Estate",
          description: "Преміальний будинок для великої компанії",
          fullDescription: "Royal Estate — це максимальний рівень розкоші та комфорту. Двоповерховий будинок із двома спальнями, просторою вітальнею, повністю обладнаною кухнею та власною SPA-зоною. Великий камін, панорамні тераси та приватне розташування роблять цей вибір ідеальним для особливих подій.",
          price: "від 55 000 грн / ніч",
          guests: "до 6 гостей",
          bedType: "2x King Size + Диван",
          features: ["Двоповерховий будинок", "Приватне розташування", "Власна SPA-зона", "Панорамні тераси", "Два санвузли"],
          amenities: ["Безкоштовний WiFi", "Камін", "Тераса", "Джакузі", "Кухня", "Доступ у SPA", "Кондиціонер", "Фен", "Халати та капці", "Кавомашина", "Винна шафа"],
        },
      },
    },
    experiences: {
      overline: "Враження",
      title: "Все для вашого відпочинку",
      detailsBtn: "Детальніше",
      items: {
        'spa': {
          title: "SPA & Wellness",
          description: "Процедури відновлення, масаж, сауна та хамам в атмосфері абсолютної гармонії.",
        },
        'restaurant': {
          title: "Ресторан",
          description: "Авторська кухня від шеф-кухаря, локальні фермерські продукти та бездоганний сервіс.",
        },
        'activities': {
          title: "Активності",
          description: "Йога на природі, піші та велопрогулянки, риболовля та сезонні розваги.",
        },
        'events': {
          title: "Події",
          description: "Проведення приватних заходів, весіль та корпоративних подій унікальної локації.",
        },
      },
    },
    gallery: {
      overline: "Галерея",
      title: "Атмосфера в деталях",
      subtitle: "Кожен куточок нашого комплексу створений з увагою до деталей. Пориньте в атмосферу спокою.",
      lightbox: {
        category: "Категорія",
        image: "Фото",
        of: "з",
      },
    },
    booking: {
      overline: "Бронювання",
      title: "Оберіть дати вашого візиту",
      steps: {
        dates: "Дати",
        room: "Номер",
        details: "Дані",
        confirmation: "Підтвердження",
      },
      form: {
        checkIn: "Дата заїзду",
        checkOut: "Дата виїзду",
        adults: "Дорослі",
        children: "Діти",
        guestLabel: "гість",
        guestLabel2To4: "гості",
        guestLabelMany: "гостей",
        childLabel: "дитина",
        childLabel2To4: "дитини",
        childLabelMany: "дітей",
        findRooms: "Знайти номери",
        checking: "Пошук...",
        back: "Назад",
        continue: "Продовжити",
        nightLabel: "ніч",
        nightLabel2To4: "ночі",
        nightLabelMany: "ночей",
        forNight: "за ніч",
        fullName: "ПІБ",
        fullNamePlaceholder: "Шевченко Тарас Григорович",
        email: "Email",
        emailPlaceholder: "your@email.com",
        phone: "Телефон",
        phonePlaceholder: "+380 (__) ___-__-__",
        submitting: "Надсилання...",
        submitBtn: "Забронювати",
        total: "Всього",
      },
      confirm: {
        title: "Бронювання підтверджено",
        text: "Ми надіслали підтвердження на {email}. Наш менеджер зв'яжеться з вами протягом 30 хвилин.",
        newBooking: "Нове бронювання",
      },
      alternativeCta: "Або зв'яжіться з нашою консьєрж-службою",
    },
    contacts: {
      overline: "Контакти",
      title: "Знайдіть нас",
      addressTitle: "Адреса",
      addressDetail: "Київська область, Обухівський район, смт Козин, вул. Лісова, 1",
      phoneTitle: "Телефон",
      phoneDetail: "+380 (44) 000-00-00",
      phoneSubtitle: "Цілодобово, без вихідних",
      emailTitle: "Email",
      emailDetail: "info@relaxpark.ua",
      emailSubtitle: "Відповідь протягом 2 годин",
      messengersTitle: "Месенджери",
      hoursTitle: "Режим роботи",
      checkIn: "Заїзд",
      checkOut: "Виїзд",
      reception: "Цілодобова реєстрація",
      mapCoords: "50.251° N, 30.638° E",
      mapLocation: "25 км від Києва по Новообухівському шосе",
      mapBtn: "Відкрити в навігаторі",
    },
    footer: {
      desc: "Місце, де час зупиняється. Преміальний релакс-парк для тих, хто цінує тишу, приватність та бездоганний сервіс.",
      contacts: "Контакти",
      social: "Соцмережі",
      copyright: "Усі права захищені.",
      privacy: "Політика конфіденційності",
      terms: "Публічна оферта",
      brandSub: "Заміський комплекс «Relax Park»",
      brandAddr: "Київська область, Обухівський район, смт Козин",
    },
    roomModal: {
      close: "Закрити",
      about: "Про номер",
      amenities: "Зручності",
      features: "Особливості",
      managerNotice: "Менеджер зв'яжеться з вами протягом 30 хвилин",
    },
  },
  en: {
    nav: {
      philosophy: "Philosophy",
      rooms: "Rooms",
      experiences: "Experiences",
      gallery: "Gallery",
      contact: "Contacts",
      book: "Book Now",
    },
    hero: {
      title: "Silence.",
      subtitle: "A place where time stands still. A premium relax park in the heart of nature.",
      cta: "Choose dates",
      scroll: "Scroll down",
    },
    philosophy: {
      overline: "Philosophy",
      title: "Luxury in Silence",
      p1: "We have created a place where you can pause. Away from city noise, notifications, and the endless race. Here time flows differently — measured, calm, mindful.",
      p2: "Every element of our space is created with care for your comfort. Nature, architecture, interior — everything works towards one goal: to give you a sense of deep peace.",
    },
    rooms: {
      overline: "Accommodation",
      title: "Houses & Rooms",
      detailsBtn: "Read More",
      perNight: "per night",
      items: {
        '1': {
          name: "Forest Villa",
          description: "Detached villa in the forest with panoramic windows",
          fullDescription: "Forest Villa is a secluded sanctuary in the heart of the forest. Floor-to-ceiling panoramic windows look out onto ancient trees, creating a deep connection with nature. A spacious terrace is ideal for morning coffee or an evening glass of wine. The interior is designed in a style of modern minimalism using natural materials.",
          price: "from 25 000 UAH / night",
          guests: "2 guests",
          bedType: "King Size",
          features: ["Panoramic windows", "Forest view", "Private entrance", "Soundproofing"],
          amenities: ["Free WiFi", "Fireplace", "Terrace", "Mini bar", "Air conditioning", "Hairdryer", "Bathrobes & slippers"],
        },
        '2': {
          name: "Lake Suite",
          description: "Luxury suite with a lake view",
          fullDescription: "Lake Suite is a luxurious suite offering breath-taking views over the lake. A spacious room with zoned living space, a private jacuzzi on the balcony, and premium finishes create an atmosphere of exceptional comfort. The perfect choice for a romantic getaway or a small family trip.",
          price: "from 35 000 UAH / night",
          guests: "2-4 guests",
          bedType: "King Size + Sofa",
          features: ["Lake view", "Balcony with jacuzzi", "Zoned living space", "Premium finishes"],
          amenities: ["Free WiFi", "Jacuzzi", "Balcony", "Mini bar", "SPA access", "Air conditioning", "Hairdryer", "Bathrobes & slippers", "Coffee machine"],
        },
        '3': {
          name: "Royal Estate",
          description: "Premium house for large groups",
          fullDescription: "Royal Estate offers the ultimate level of luxury and comfort. A two-story villa with two bedrooms, a spacious living room, a fully equipped kitchen, and a private SPA area. A large fireplace, panoramic terraces, and a private location make this choice perfect for special occasions.",
          price: "from 55 000 UAH / night",
          guests: "up to 6 guests",
          bedType: "2x King Size + Sofa",
          features: ["Two-story villa", "Private location", "Private SPA zone", "Panoramic terraces", "Two bathrooms"],
          amenities: ["Free WiFi", "Fireplace", "Terrace", "Jacuzzi", "Kitchen", "SPA access", "Air conditioning", "Hairdryer", "Bathrobes & slippers", "Coffee machine", "Wine fridge"],
        },
      },
    },
    experiences: {
      overline: "Experiences",
      title: "Everything for your relaxation",
      detailsBtn: "Read More",
      items: {
        'spa': {
          title: "SPA & Wellness",
          description: "Restorative procedures, massage, sauna, and hammam in an atmosphere of absolute harmony.",
        },
        'restaurant': {
          title: "Restaurant",
          description: "Author's cuisine from the chef, local organic products, and impeccable service.",
        },
        'activities': {
          title: "Activities",
          description: "Yoga in nature, hiking, cycling, fishing, and seasonal entertainment.",
        },
        'events': {
          title: "Events",
          description: "Private events, weddings, and corporate celebrations in a unique location.",
        },
      },
    },
    gallery: {
      overline: "Gallery",
      title: "Atmosphere in Details",
      subtitle: "Every corner of our resort is created with attention to detail. Immerse yourself in the atmosphere of tranquility.",
      lightbox: {
        category: "Category",
        image: "Photo",
        of: "of",
      },
    },
    booking: {
      overline: "Booking",
      title: "Choose the dates of your visit",
      steps: {
        dates: "Dates",
        room: "Room",
        details: "Details",
        confirmation: "Confirmation",
      },
      form: {
        checkIn: "Check-in date",
        checkOut: "Check-out date",
        adults: "Adults",
        children: "Children",
        guestLabel: "guest",
        guestLabel2To4: "guests",
        guestLabelMany: "guests",
        childLabel: "child",
        childLabel2To4: "children",
        childLabelMany: "children",
        findRooms: "Find rooms",
        checking: "Checking...",
        back: "Back",
        continue: "Continue",
        nightLabel: "night",
        nightLabel2To4: "nights",
        nightLabelMany: "nights",
        forNight: "per night",
        fullName: "Full Name",
        fullNamePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "your@email.com",
        phone: "Phone",
        phonePlaceholder: "+380 (__) ___-__-__",
        submitting: "Submitting...",
        submitBtn: "Book Now",
        total: "Total",
      },
      confirm: {
        title: "Booking confirmed",
        text: "We have sent a confirmation to {email}. Our manager will contact you within 30 minutes.",
        newBooking: "New Booking",
      },
      alternativeCta: "Or contact our concierge service",
    },
    contacts: {
      overline: "Contacts",
      title: "Find Us",
      addressTitle: "Address",
      addressDetail: "Kyiv Region, Obukhiv District, Kozyn, Lisova St, 1",
      phoneTitle: "Phone",
      phoneDetail: "+380 (44) 000-00-00",
      phoneSubtitle: "24/7, no days off",
      emailTitle: "Email",
      emailDetail: "info@relaxpark.ua",
      emailSubtitle: "Response within 2 hours",
      messengersTitle: "Messengers",
      hoursTitle: "Working Hours",
      checkIn: "Check-in",
      checkOut: "Check-out",
      reception: "24-hour reception",
      mapCoords: "50.251° N, 30.638° E",
      mapLocation: "25 km from Kyiv via Novoobukhivske Highway",
      mapBtn: "Open in Navigator",
    },
    footer: {
      desc: "A place where time stands still. A premium relax park for those who value silence, privacy, and impeccable service.",
      contacts: "Contacts",
      social: "Social",
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      brandSub: "Suburban Resort «Relax Park»",
      brandAddr: "Kyiv Region, Obukhiv District, Kozyn",
    },
    roomModal: {
      close: "Close",
      about: "About Room",
      amenities: "Amenities",
      features: "Features",
      managerNotice: "Manager will contact you within 30 minutes",
    },
  },
  ru: {
    nav: {
      philosophy: "Философия",
      rooms: "Номера",
      experiences: "Впечатления",
      gallery: "Галерея",
      contact: "Контакты",
      book: "Забронировать",
    },
    hero: {
      title: "Тише.",
      subtitle: "Место, где время останавливается. Премиальный релакс-парк в сердце природы.",
      cta: "Выбрать даты",
      scroll: "Листайте вниз",
    },
    philosophy: {
      overline: "Философия",
      title: "Роскошь в тишине",
      p1: "Мы создали место, где можно остановиться. Вдали от городского шума, уведомлений и бесконечной гонки. Здесь время течет иначе — размеренно, спокойно, осознанно.",
      p2: "Каждый элемент нашего пространства создан с заботой о вашем комфорте. Природа, архитектура, интерьер — всё работает на одну цель: подарить вам ощущение глубокого покоя.",
    },
    rooms: {
      overline: "Размещение",
      title: "Дома и номера",
      detailsBtn: "Подробнее",
      perNight: "за ночь",
      items: {
        '1': {
          name: "Forest Villa",
          description: "Отдельный дом в лесу с панорамными окнами",
          fullDescription: "Forest Villa — это уединенное пространство в сердце леса. Панорамные окна от пола до потолка открывают вид на вековые деревья, создавая ощущение единства с природой. Просторная терраса идеально подходит для утреннего кофе или вечернего бокала вина. Интерьер выполнен в стиле современного минимализма с использованием натуральных материалов.",
          price: "от 25 000 грн / ночь",
          guests: "2 гостя",
          bedType: "King Size",
          features: ["Панорамные окна", "Вид на лес", "Отдельный вход", "Звукоизоляция"],
          amenities: ["Бесплатный WiFi", "Камин", "Терраса", "Мини-бар", "Кондиционер", "Фен", "Халаты и тапочки"],
        },
        '2': {
          name: "Lake Suite",
          description: "Люкс с видом на озеро",
          fullDescription: "Lake Suite — это роскошный люкс с захватывающими видами на озеро. Просторная комната с зонированным пространством, собственная джакузи на балконе и премиальная отделка создают атмосферу исключительного комфорту. Идеальный выбор для романтического отдыха или небольшого семейного путешествия.",
          price: "от 35 000 грн / ночь",
          guests: "2-4 гостя",
          bedType: "King Size + Диван",
          features: ["Вид на озеро", "Балкон с джакузи", "Зонированное пространство", "Премиальная отделка"],
          amenities: ["Бесплатный WiFi", "Джакузи", "Балкон", "Мини-бар", "Доступ в SPA", "Кондиционер", "Фен", "Халаты и тапочки", "Кофемашина"],
        },
        '3': {
          name: "Royal Estate",
          description: "Премиальный дом для большой компании",
          fullDescription: "Royal Estate — это максимальный уровень роскоши и комфорта. Двухэтажный дом с двумя спальнями, просторной гостиной, полностью оборудованной кухней и собственной SPA-зоной. Большой камин, панорамные террасы и приватное расположение делают этот выбор идеальным для особенных случаев.",
          price: "от 55 000 грн / ночь",
          guests: "до 6 гостей",
          bedType: "2x King Size + Диван",
          features: ["Двухэтажный дом", "Приватное расположение", "Собственная SPA-зона", "Панорамные террасы", "Два санузла"],
          amenities: ["Бесплатный WiFi", "Камин", "Терраса", "Джакузи", "Кухня", "Доступ в SPA", "Кондиционер", "Фен", "Халаты и тапочки", "Кофемашина", "Винный шкаф"],
        },
      },
    },
    experiences: {
      overline: "Впечатления",
      title: "Всё для вашего отдыха",
      detailsBtn: "Подробнее",
      items: {
        'spa': {
          title: "SPA & Wellness",
          description: "Восстанавливающие процедуры, массаж, сауна и хаммам в атмосфере абсолютной гармонии.",
        },
        'restaurant': {
          title: "Ресторан",
          description: "Авторская кухня от шеф-повара, локальные фермерские продукты и безупречный сервис.",
        },
        'activities': {
          title: "Активности",
          description: "Йога на природе, пешие прогулки, велопрогулки, рыбалка и сезонные развлечения.",
        },
        'events': {
          title: "События",
          description: "Проведение частных мероприятий, свадеб и корпоративных событий в уникальной локации.",
        },
      },
    },
    gallery: {
      overline: "Галерея",
      title: "Атмосфера в деталях",
      subtitle: "Каждый уголок нашего комплекса создан с вниманием к деталям. Погрузитесь в атмосферу спокойствия.",
      lightbox: {
        category: "Категория",
        image: "Фото",
        of: "из",
      },
    },
    booking: {
      overline: "Бронирование",
      title: "Выберите даты вашего визита",
      steps: {
        dates: "Даты",
        room: "Номер",
        details: "Данные",
        confirmation: "Подтверждение",
      },
      form: {
        checkIn: "Дата заезда",
        checkOut: "Дата выезда",
        adults: "Взрослые",
        children: "Дети",
        guestLabel: "гость",
        guestLabel2To4: "гостя",
        guestLabelMany: "гостей",
        childLabel: "ребёнок",
        childLabel2To4: "ребёнка",
        childLabelMany: "детей",
        findRooms: "Найти номера",
        checking: "Поиск...",
        back: "Назад",
        continue: "Продолжить",
        nightLabel: "ночь",
        nightLabel2To4: "ночи",
        nightLabelMany: "ночей",
        forNight: "за ночь",
        fullName: "ФИО",
        fullNamePlaceholder: "Иванов Иван Иванович",
        email: "Email",
        emailPlaceholder: "your@email.com",
        phone: "Телефон",
        phonePlaceholder: "+380 (__) ___-__-__",
        submitting: "Отправка...",
        submitBtn: "Забронировать",
        total: "Итого",
      },
      confirm: {
        title: "Бронирование подтверждено",
        text: "Мы отправили подтверждение на {email}. Наш менеджер свяжется с вами в течение 30 минут.",
        newBooking: "Новое бронирование",
      },
      alternativeCta: "Или свяжитесь с нашим консьерж-сервисом",
    },
    contacts: {
      overline: "Контакты",
      title: "Найдите нас",
      addressTitle: "Адрес",
      addressDetail: "Киевская область, Обуховский район, пгт Козин, ул. Лесная, 1",
      phoneTitle: "Телефон",
      phoneDetail: "+380 (44) 000-00-00",
      phoneSubtitle: "Круглосуточно, без выходных",
      emailTitle: "Email",
      emailDetail: "info@relaxpark.ua",
      emailSubtitle: "Ответ в течение 2 часов",
      messengersTitle: "Мессенджеры",
      hoursTitle: "Режим работы",
      checkIn: "Заезд",
      checkOut: "Выезд",
      reception: "Круглосуточная регистрация",
      mapCoords: "50.251° N, 30.638° E",
      mapLocation: "25 км от Киева по Новообуховскому шоссе",
      mapBtn: "Открыть в навигаторе",
    },
    footer: {
      desc: "Место, где время останавливается. Премиальный релакс-парк для тех, кто ценит тишину, приватность и безупречный сервис.",
      contacts: "Контакты",
      social: "Соцсети",
      copyright: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Договор оферты",
      brandSub: "Загородный комплекс «Relax Park»",
      brandAddr: "Киевская область, Обуховский район, пгт Козин",
    },
    roomModal: {
      close: "Закрыть",
      about: "О номере",
      amenities: "Удобства",
      features: "Особенности",
      managerNotice: "Менеджер свяжется с вами в течение 30 минут",
    },
  },
};
