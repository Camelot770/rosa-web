// Single source of truth for studio contact info.
// Mirrors what's published on https://розацветов.рф/

export const CONTACTS = {
  phone: '+7 960 048 39 96',
  phoneHref: 'tel:+79600483996',
  phoneAlt: '+7 917 876 59 58',
  phoneAltHref: 'tel:+79178765958',
  email: 'rozacvetov@list.ru',
  emailHref: 'mailto:rozacvetov@list.ru',
  whatsapp: 'https://wa.me/79178765958',
  telegram: 'https://t.me/Elenaeilat',
  max: 'https://max.ru/id165510704999_bot',
  // Non-breaking spaces so the schedule doesn't wrap as "9:00\n— 21:00".
  schedule: 'Без выходных · 9:00 — 21:00',
  city: 'Казань · Татарстан',
  pickupAddressShort: 'д. Званка, ул. Приозерная, 58',
  pickupAddressFull:
    '422772, Республика Татарстан, Пестречинский район, д. Званка, ул. Приозерная, 58',
  patentNumber: '№ 2 698 058',
  patentNote: 'технология стабилизации',
  trademarkNumber: 'товарный знак «Роза Цветов» в Роспатенте',
} as const;
