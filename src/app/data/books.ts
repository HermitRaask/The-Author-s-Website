import { chapterContents } from "./bookContents";

export const WORK_FORMATS = ["Роман", "Рассказ", "Сборник рассказов"] as const;
export type WorkFormat = (typeof WORK_FORMATS)[number];

export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  year: number;
  genres: string[];
  workFormat?: WorkFormat;
  coverImage: string;
  chapters?: Chapter[];
}

const getImageUrl = (path: string) => {
  return `${import.meta.env.BASE_URL}${path}`;
};

export const books: Book[] = [
  {
    id: 1,
    title: "Одержимый",
    description: "Небольшой рассказ/набросок о одержимом бойце, что попал в лапы корпоратам. Вот только кто кого поймал - ещё большой вопрос.",
    year: 2025,
    genres: ["Техномагия", "Киберпанк"],
    workFormat: "Рассказ",
    coverImage: getImageUrl('images/1.jpg'),
    chapters: [{ id: 1, title: "Одержимый", content: chapterContents["1-1"] }],
  },
  {
    id: 2,
    title: "Дар жизни",
    description: "Небольшой рассказ о нашем современнике, что получил шанс обмануть смерть. Но шанс - он не получка, не аванс, он выпадает только раз...",
    year: 2023,
    genres: ["Киберпанк"],
    workFormat: "Рассказ",
    coverImage: getImageUrl('images/2.jpg'),
    chapters: [{ id: 1, title: "Дар жизни", content: chapterContents["2-1"] }],
  },
  {
    id: 3,
    title: "Царство Кощеево",
    description: "Зимняя сказка о наивных людях, хитровыделанных кошках и гордых барсах. Следуй за Штормом!",
    year: 2022,
    genres: ["Сказка"],
    workFormat: "Роман",
    coverImage: getImageUrl('images/3.jpg'),
    chapters: [
      { id: 1, title: "День первый", content: chapterContents["3-1"] },
      { id: 2, title: "День второй", content: chapterContents["3-2"] },
      { id: 3, title: "День третий", content: chapterContents["3-3"] },
      { id: 1, title: "День четвёртый", content: chapterContents["3-4"] },
      { id: 2, title: "День пятый", content: chapterContents["3-5"] },
      { id: 3, title: "День шестой", content: chapterContents["3-6"] },
      { id: 1, title: "День седьмой", content: chapterContents["3-7"] },
      { id: 2, title: "День восьмой", content: chapterContents["3-8"] },
      { id: 3, title: "День девятый", content: chapterContents["3-9"] },
    ],
  },
  {
    id: 4,
    title: "Тест",
    description: "Тест Тест Тест.",
    year: 2023,
    genres: ["Хронофантастика"],
    workFormat: "Рассказ",
    coverImage: getImageUrl('images/4.jpg'),
    chapters: [
      {
        id: 1,
        title: "Глава 1",
        content: chapterContents["4-1"],
      },
    ],
  },
  {
    id: 5,
    title: "Тест",
    description: "Тест Тест Тест.",
    year: 2025,
    genres: ["Фэнтези"],
    workFormat: "Сборник рассказов",
    coverImage: getImageUrl('images/5.jpg'),
    chapters: [
      {
        id: 1,
        title: "Глава 1",
        content: chapterContents["5-1"],
      },
      {
        id: 2,
        title: "Глава 2",
        content: chapterContents["5-2"],
      },
    ],
  },
  {
    id: 6,
    title: "Тест",
    description: "Тест Тест Тест.",
    year: 2022,
    genres: ["Магическая академия"],
    workFormat: "Роман",
    coverImage: getImageUrl('images/6.jpg'),
    chapters: [
      { id: 1, title: "Пролог", content: chapterContents["6-1"] },
      { id: 2, title: "Глава 1", content: chapterContents["6-2"] },
      { id: 3, title: "Глава 2", content: chapterContents["6-3"] },
    ],
  },
];

/** Подставляет workFormat из текущего books.ts, если в загруженных данных его нет */
export function migrateBooks(booksList: Book[]): Book[] {
  return booksList.map((book) => {
    const fromSource = books.find((b) => b.id === book.id);
    return {
      ...book,
      workFormat: book.workFormat ?? fromSource?.workFormat ?? "Рассказ",
    };
  });
}
