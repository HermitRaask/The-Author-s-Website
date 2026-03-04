import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Tag, BookOpenText, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Book, migrateBooks } from "../data/books";

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "contents">("description");

  useEffect(() => {
    const loadBook = () => {
      const savedBooks = localStorage.getItem("books");
      let books: Book[] = [];
      
      if (savedBooks) {
        books = migrateBooks(JSON.parse(savedBooks));
      } else {
        import("../data/books").then((module) => {
          books = module.books;
          const foundBook = books.find((b) => b.id === parseInt(id || "0"));
          setBook(foundBook || null);
        });
        return;
      }

      const foundBook = books.find((b) => b.id === parseInt(id || "0"));
      setBook(foundBook || null);
    };

    loadBook();
  }, [id]);

  if (!book) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl mb-4 text-neutral-900">Книга не найдена</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        {/* Book Content */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="md:flex">
            {/* Cover Image — ширина уменьшена на 10% (90% от 50% и 40%) */}
            <div className="md:w-[45%] lg:w-[36%]">
              <div className="aspect-[3/4] md:aspect-auto md:h-full bg-neutral-100">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:w-[55%] lg:w-[64%] p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full text-neutral-700">
                  <Tag className="w-4 h-4" />
                  {book.genres?.join(", ")}
                </span>
                <span className="inline-flex items-center gap-2 text-neutral-600">
                  <Calendar className="w-4 h-4" />
                  {book.year}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl mb-6 text-neutral-900">
                {book.title}
              </h1>

              {/* Read Button */}
              {book.chapters && book.chapters.length > 0 && (
                <Link
                  to={`/book/${id}/read/${book.chapters[0].id}`}
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors mb-8"
                >
                  <BookOpenText className="w-5 h-5" />
                  Читать
                </Link>
              )}

              {/* Tabs */}
              <div className="flex gap-4 border-b border-neutral-200 mb-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 px-2 transition-colors relative ${
                    activeTab === "description"
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Описание
                  {activeTab === "description" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("contents")}
                  className={`pb-3 px-2 transition-colors relative ${
                    activeTab === "contents"
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Содержание
                  {activeTab === "contents" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "description" ? (
                <>
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-neutral-600 leading-relaxed text-lg">
                      {book.description}
                    </p>
                  </div>

                  {/* Additional Info Section */}
                  <div className="pt-8 border-t border-neutral-200">
                    <h2 className="text-2xl mb-4 text-neutral-900">О книге</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-500 mb-1">Формат</p>
                        <p className="text-neutral-900">
                          {book.workFormat ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 mb-1">Жанры</p>
                        <p className="text-neutral-900">
                          {book.genres?.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 mb-1">Год издания</p>
                        <p className="text-neutral-900">{book.year}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  {book.chapters && book.chapters.length > 0 ? (
                    <div className="space-y-2">
                      {book.chapters.map((chapter) => (
                        <Link
                          key={chapter.id}
                          to={`/book/${id}/read/${chapter.id}`}
                          className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors group"
                        >
                          <List className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600" />
                          <span className="text-neutral-900 group-hover:text-neutral-900">
                            {chapter.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500">Главы пока не добавлены</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}