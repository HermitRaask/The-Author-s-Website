import { Link } from "react-router";
import { ArrowRight, BookOpen, Feather, FileText, Tag, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Book, migrateBooks } from "../data/books";

export function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(migrateBooks(JSON.parse(savedBooks)));
    } else {
      import("../data/books").then((module) => {
        setBooks(module.books);
      });
    }
  }, []);

  const FEATURED_BOOK_IDS = [1, 3, 2];
  const latestBooks = books.filter((book) => FEATURED_BOOK_IDS.includes(book.id));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-100 to-neutral-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-full mb-6">
              <Feather className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-neutral-900">
              Добро пожаловать в мою маленькую библиотеку
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed">
              Чувствуйте себя как дома, но не забывайте, что в гостях
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl mb-2 text-neutral-900">Избранные произведения</h2>
            </div>
            <Link
              to="/latest"
              className="hidden sm:inline-flex items-center gap-2 text-neutral-900 hover:gap-3 transition-all"
            >
              Смотреть все
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full">
                      <FileText className="w-4 h-4" />
                      {book.workFormat ?? "—"}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full">
                      <Tag className="w-4 h-4" />
                      {book.genres?.join(", ")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {book.year}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2 text-neutral-900">{book.title}</h3>
                  <p className="text-neutral-600 line-clamp-3">{book.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/latest"
            className="sm:hidden flex items-center justify-center gap-2 text-neutral-900 mt-8 hover:gap-3 transition-all"
          >
            Смотреть все
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-neutral-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-neutral-900 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl mb-6 text-neutral-900">О моём «творчестве»</h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Я не очень люблю делиться тем, что написал. Уж не знаю отчего, но мысль показать свои наброски
            кому-то возникает примерно раз в никогда. Но если ты - да, именно ты - зашёл на эту страничку...
            Спасибо. Большое и человеческое. Ведь ты один из тех, благодаря кому это маленькое хобби ещё живёт.
          </p>
        </div>
      </section>
    </div>
  );
}
