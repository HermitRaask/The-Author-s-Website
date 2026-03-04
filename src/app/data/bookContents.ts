import book1chapter1 from "../books/1/1.md?raw";
import book2chapter1 from "../books/2/1.md?raw";
import book3chapter1 from "../books/3/1.md?raw";
import book3chapter1 from "../books/3/2.md?raw";
import book3chapter1 from "../books/3/3.md?raw";
import book3chapter1 from "../books/3/4.md?raw";
import book3chapter1 from "../books/3/5.md?raw";
import book3chapter1 from "../books/3/6.md?raw";
import book3chapter1 from "../books/3/7.md?raw";
import book3chapter1 from "../books/3/8.md?raw";
import book3chapter1 from "../books/3/9.md?raw";
import book4chapter1 from "../books/4/1.md?raw";
import book4chapter2 from "../books/4/2.md?raw";
import book5chapter1 from "../books/5/1.md?raw";
import book5chapter2 from "../books/5/2.md?raw";
import book6chapter1 from "../books/6/1.md?raw";
import book6chapter2 from "../books/6/2.md?raw";
import book6chapter3 from "../books/6/3.md?raw";

export const chapterContents: Record<string, string> = {
  // bookId-chapterId: content из Markdown-файлов
  "1-1": book1chapter1,

  "2-1": book2chapter1,

  "3-1": book3chapter1,
  "3-2": book3chapter2,
  "3-3": book3chapter3,
  "3-4": book3chapter4,
  "3-5": book3chapter5,
  "3-6": book3chapter6,
  "3-7": book3chapter7,
  "3-8": book3chapter8,
  "3-9": book3chapter9,

  "4-1": book4chapter1,
  "4-2": book4chapter2,

  "5-1": book5chapter1,
  "5-2": book5chapter2,

  "6-1": book6chapter1,
  "6-2": book6chapter2,
  "6-3": book6chapter3,
};