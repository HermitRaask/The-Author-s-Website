import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Book, WORK_FORMATS, migrateBooks } from "../data/books";
import { Calendar, Tag, Search, BookMarked } from "lucide-react";

export function AllWorks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

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

  const genres = [
    "all",
    ...Array.from(
      new Set(
        books.flatMap((book) => (book.genres ? book.genres : []))
      )
    ),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" ||
      (book.genres && book.genres.includes(selectedGenre));
    const matchesFormat =
      selectedFormat === "all" ||
      (book.workFormat && book.workFormat === selectedFormat);
    return matchesSearch && matchesGenre && matchesFormat;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => b.year - a.year);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4 text-neutral-900">Все работы</h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Всё то, что я решился выложить на суд общественности. Приятного чтения!
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Поиск книг..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedGenre === genre
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {genre === "all" ? "Все жанры" : genre}
              </button>
            ))}
          </div>

          {/* Format Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFormat("all")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedFormat === "all"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Все форматы
            </button>
            {WORK_FORMATS.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedFormat === format
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-neutral-600">
          Показано {sortedBooks.length} {sortedBooks.length === 1 ? "книга" : sortedBooks.length < 5 ? "книги" : "книг"}
        </div>

        {/* Books Grid */}
        {sortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-700">
                      <BookMarked className="w-3 h-3" />
                      {book.workFormat ?? "—"}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-700">
                      <Tag className="w-3 h-3" />
                      {book.genres?.join(", ")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                      <Calendar className="w-3 h-3" />
                      {book.year}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2 text-neutral-900">{book.title}</h3>
                  <p className="text-neutral-600 line-clamp-3">{book.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">Книги не найдены по вашему запросу.</p>
          </div>
        )}
      </div>
    </div>
  );
}