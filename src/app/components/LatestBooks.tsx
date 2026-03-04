import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Book, migrateBooks } from "../data/books";
import { Calendar, Tag, FileText } from "lucide-react";

export function LatestBooks() {
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

  const latestBooks = [...books].sort((a, b) => b.year - a.year).slice(0, 4);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
                  <h1 className="text-4xl sm:text-5xl mb-4 text-neutral-900">Последние выложенные работы</h1>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {latestBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/2 aspect-[3/4] md:aspect-auto overflow-hidden bg-neutral-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-start">
                  <h2 className="text-2xl sm:text-3xl mb-3 text-neutral-900">
                    {book.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {book.description.length > 134
                      ? `${book.description.slice(0, 134)}...`
                      : book.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-700">
                      <FileText className="w-4 h-4" />
                      {book.workFormat ?? "—"}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-700">
                      <Tag className="w-4 h-4" />
                      {book.genres?.join(", ")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      {book.year}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-neutral-100 rounded-xl p-8">
          <h3 className="text-2xl mb-3 text-neutral-900">Исследуйте больше</h3>
          <p className="text-neutral-600 mb-6">
            Хотите увидеть полную коллекцию моих работ?
          </p>
          <Link
            to="/works"
            className="inline-flex items-center justify-center bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Посмотреть все работы
          </Link>
        </div>
      </div>
    </div>
  );
}