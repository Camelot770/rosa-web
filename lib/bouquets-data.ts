// Build-time fallback catalog, used only when the API is unreachable during
// `next build` (see lib/catalog.ts). Generated from the server's prisma/seed.ts
// with ids as seeded, in fetchBouquets() order. Do not edit by hand.

export type Collection = 'Соло' | 'Дуэт' | 'Квартет' | 'Оркестр';
export type CollectionEn = 'Solo' | 'Duet' | 'Quartet' | 'Orchestra';

export interface Bouquet {
  id: number;
  no: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  collection: Collection;
  collectionEn: CollectionEn;
  isHit: boolean;
  isNew: boolean;
  isFeatured?: boolean;
  customOrder?: boolean;
  images: string[];
}

export const BOUQUETS: Bouquet[] = [
  {
    "id": 5,
    "no": 1,
    "name": "Ритм",
    "description": "Стабилизированная композиция. Высота 25 см, диаметр 25 см.",
    "price": 4000,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-05.jpeg"
    ]
  },
  {
    "id": 23,
    "no": 2,
    "name": "Созвучие",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 20 см.",
    "price": 4500,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-23.jpeg"
    ]
  },
  {
    "id": 37,
    "no": 3,
    "name": "Полифония",
    "description": "Стабилизированная композиция. Высота 23 см, диаметр 26 см.",
    "price": 5000,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-37.jpeg"
    ]
  },
  {
    "id": 19,
    "no": 4,
    "name": "Ларго",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 6900,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-19.jpeg"
    ]
  },
  {
    "id": 9,
    "no": 5,
    "name": "Рапсодия",
    "description": "Стабилизированная композиция. Высота 30 см, диаметр 30 см.",
    "price": 7900,
    "oldPrice": null,
    "collection": "Оркестр",
    "collectionEn": "Orchestra",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-09.jpeg"
    ]
  },
  {
    "id": 30,
    "no": 6,
    "name": "Серенада",
    "description": "Стабилизированная композиция. Высота 30 см, диаметр 30 см.",
    "price": 9500,
    "oldPrice": null,
    "collection": "Оркестр",
    "collectionEn": "Orchestra",
    "isHit": true,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-30.jpeg"
    ]
  },
  {
    "id": 2,
    "no": 7,
    "name": "Ноктюрн",
    "description": "Стабилизированная композиция. Высота 15 см, диаметр 15 см.",
    "price": 1400,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-02.jpeg"
    ]
  },
  {
    "id": 1,
    "no": 8,
    "name": "Соната",
    "description": "Стабилизированная композиция. Высота 15 см, диаметр 15 см.",
    "price": 1600,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": true,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-01.jpeg"
    ]
  },
  {
    "id": 3,
    "no": 9,
    "name": "Нимфа",
    "description": "Стабилизированная композиция. Высота 10 см, диаметр 13 см.",
    "price": 1700,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-03.jpeg"
    ]
  },
  {
    "id": 4,
    "no": 10,
    "name": "Элегия",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 20 см.",
    "price": 2000,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-04.jpeg"
    ]
  },
  {
    "id": 31,
    "no": 11,
    "name": "Ля-минор",
    "description": "Стабилизированная композиция. Высота 18 см, диаметр 15 см.",
    "price": 2200,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-31.jpeg"
    ]
  },
  {
    "id": 32,
    "no": 12,
    "name": "Ля-мажор",
    "description": "Стабилизированная композиция. Высота 18 см, диаметр 15 см.",
    "price": 2200,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-32.jpeg"
    ]
  },
  {
    "id": 6,
    "no": 13,
    "name": "Шопен",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 24 см.",
    "price": 2500,
    "oldPrice": null,
    "collection": "Соло",
    "collectionEn": "Solo",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-06.jpeg"
    ]
  },
  {
    "id": 8,
    "no": 14,
    "name": "Мазурка",
    "description": "Стабилизированная композиция. Высота 17 см, диаметр 22 см.",
    "price": 2700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-08.jpeg"
    ]
  },
  {
    "id": 17,
    "no": 15,
    "name": "Сюита",
    "description": "Стабилизированная композиция. Высота 17 см, диаметр 17 см.",
    "price": 2700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-17.jpeg"
    ]
  },
  {
    "id": 18,
    "no": 16,
    "name": "Скрипка",
    "description": "Стабилизированная композиция. Высота 17 см, диаметр 17 см.",
    "price": 2700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-18.jpeg"
    ]
  },
  {
    "id": 27,
    "no": 17,
    "name": "Пастораль",
    "description": "Стабилизированная композиция. Высота 17 см, диаметр 17 см.",
    "price": 2700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": true,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-27.jpeg"
    ]
  },
  {
    "id": 7,
    "no": 18,
    "name": "Адажио",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 24 см.",
    "price": 3000,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-07.jpeg"
    ]
  },
  {
    "id": 36,
    "no": 19,
    "name": "Флейта",
    "description": "Стабилизированная композиция. Высота 21 см, диаметр 21 см.",
    "price": 3100,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-36.jpeg"
    ]
  },
  {
    "id": 16,
    "no": 20,
    "name": "Аккорд",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 20 см.",
    "price": 3300,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-16.jpeg"
    ]
  },
  {
    "id": 15,
    "no": 21,
    "name": "Штраус",
    "description": "Стабилизированная композиция. Высота 18 см, диаметр 18 см.",
    "price": 3500,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-15.jpeg"
    ]
  },
  {
    "id": 28,
    "no": 22,
    "name": "Легато",
    "description": "Стабилизированная композиция. Высота 23 см, диаметр 23 см.",
    "price": 3500,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-28.jpeg"
    ]
  },
  {
    "id": 26,
    "no": 23,
    "name": "Партитура",
    "description": "Стабилизированная композиция. Высота 25 см, диаметр 27 см.",
    "price": 3600,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-26.jpeg"
    ]
  },
  {
    "id": 21,
    "no": 24,
    "name": "Бетховен",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 20 см.",
    "price": 3700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-21.jpeg"
    ]
  },
  {
    "id": 22,
    "no": 25,
    "name": "Моцарт",
    "description": "Стабилизированная композиция. Высота 20 см, диаметр 20 см.",
    "price": 3700,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-22.jpeg"
    ]
  },
  {
    "id": 34,
    "no": 26,
    "name": "Каденция",
    "description": "Стабилизированная композиция. Высота 25 см, диаметр 20 см.",
    "price": 3900,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": true,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-34.jpeg"
    ]
  },
  {
    "id": 24,
    "no": 27,
    "name": "Мелодия",
    "description": "Стабилизированная композиция. Высота 23 см, диаметр 23 см.",
    "price": 4400,
    "oldPrice": null,
    "collection": "Дуэт",
    "collectionEn": "Duet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-24.jpeg"
    ]
  },
  {
    "id": 35,
    "no": 28,
    "name": "Арфа",
    "description": "Стабилизированная композиция. Высота 25 см, диаметр 27 см.",
    "price": 5000,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-35.jpeg"
    ]
  },
  {
    "id": 25,
    "no": 29,
    "name": "Дебюсси",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 5600,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-25.jpeg"
    ]
  },
  {
    "id": 29,
    "no": 30,
    "name": "Триоль",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 5600,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-29.jpeg"
    ]
  },
  {
    "id": 10,
    "no": 31,
    "name": "Аллегро",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 5900,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-10.jpeg"
    ]
  },
  {
    "id": 11,
    "no": 32,
    "name": "Граве",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 5900,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-11.jpeg"
    ]
  },
  {
    "id": 12,
    "no": 33,
    "name": "Романс",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 5900,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": true,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-12.jpeg"
    ]
  },
  {
    "id": 13,
    "no": 34,
    "name": "Литавра",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 40 см.",
    "price": 6300,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-13.jpeg"
    ]
  },
  {
    "id": 14,
    "no": 35,
    "name": "Клавир",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 40 см.",
    "price": 6300,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-14.jpeg"
    ]
  },
  {
    "id": 33,
    "no": 36,
    "name": "Фантазия",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 6300,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-33.jpeg"
    ]
  },
  {
    "id": 20,
    "no": 37,
    "name": "Гармония",
    "description": "Стабилизированная композиция. Высота 35 см, диаметр 35 см.",
    "price": 6800,
    "oldPrice": null,
    "collection": "Квартет",
    "collectionEn": "Quartet",
    "isHit": false,
    "isNew": false,
    "images": [
      "https://rosa-flowers-client.vercel.app/bouquets/bouquet-20.jpeg"
    ]
  }
];
