import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Book, migrateBooks } from "../data/books";

export function BookReader() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

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

  if (!book || !book.chapters || book.chapters.length === 0) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl mb-4 text-neutral-900">Главы не найдены</h1>
          <Link
            to={`/book/${id}`}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться к книге
          </Link>
        </div>
      </div>
    );
  }

  const currentChapterIndex = book.chapters.findIndex(
    (ch) => ch.id === parseInt(chapterId || "1")
  );
  const currentChapter = book.chapters[currentChapterIndex];

  if (!currentChapter) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl mb-4 text-neutral-900">Глава не найдена</h1>
          <Link
            to={`/book/${id}`}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться к книге
          </Link>
        </div>
      </div>
    );
  }

  const hasPrevious = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < book.chapters.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      navigate(`/book/${id}/read/${book.chapters![currentChapterIndex - 1].id}`);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      navigate(`/book/${id}/read/${book.chapters![currentChapterIndex + 1].id}`);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to={`/book/${id}`}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            К описанию книги
          </Link>
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>
              Глава {currentChapterIndex + 1} из {book.chapters.length}
            </span>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 sm:p-12 mb-8">
          <h1 className="text-3xl sm:text-4xl mb-8 text-neutral-900 pb-6 border-b border-neutral-200">
            {currentChapter.title}
          </h1>

          <div className="prose prose-lg prose-reader max-w-none text-neutral-700 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {currentChapter.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPrevious}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${hasPrevious
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Предыдущая глава
          </button>

          <button
            onClick={goToNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${hasNext
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
          >
            Следующая глава
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter List */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl mb-4 text-neutral-900">Все главы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {book.chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                to={`/book/${id}/read/${chapter.id}`}
                className={`px-4 py-2 rounded-lg transition-colors ${chapter.id === currentChapter.id
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                  }`}
              >
                {chapter.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
