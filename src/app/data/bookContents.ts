import book1chapter1 from "../books/1/1.md?raw";
import book2chapter1 from "../books/2/1.md?raw";
import book3chapter1 from "../books/3/1.md?raw";
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

  "4-1": book4chapter1,
  "4-2": book4chapter2,

  "5-1": book5chapter1,
  "5-2": book5chapter2,

  "6-1": book6chapter1,
  "6-2": book6chapter2,
  "6-3": book6chapter3,
};