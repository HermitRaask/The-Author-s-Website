import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import { Book, WORK_FORMATS, migrateBooks, type WorkFormat } from "../data/books";

export function AdminPanel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    genres: [] as string[],
    workFormat: "Рассказ" as WorkFormat,
    coverImage: "",
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      const migrated = migrateBooks(JSON.parse(savedBooks));
      setBooks(migrated);
      localStorage.setItem("books", JSON.stringify(migrated));
    } else {
      // Загружаем начальные книги из модуля
      import("../data/books").then((module) => {
        setBooks(module.books);
        localStorage.setItem("books", JSON.stringify(module.books));
      });
    }
  };

  const saveBooks = (updatedBooks: Book[]) => {
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBook) {
      // Редактирование существующей книги
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id
          ? { ...editingBook, ...formData }
          : book
      );
      saveBooks(updatedBooks);
    } else {
      // Добавление новой книги
      const newBook: Book = {
        id: Math.max(...books.map((b) => b.id), 0) + 1,
        ...formData,
      };
      saveBooks([...books, newBook]);
    }

    resetForm();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      description: book.description,
      year: book.year,
      genres: book.genres || [],
      workFormat: book.workFormat ?? "Рассказ",
      coverImage: book.coverImage,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту книгу?")) {
      const updatedBooks = books.filter((book) => book.id !== id);
      saveBooks(updatedBooks);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      genres: [],
      workFormat: "Рассказ",
      coverImage: "",
    });
    setEditingBook(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-neutral-900">Админ-панель</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Выйти
          </button>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-neutral-900">
              {editingBook ? "Редактировать книгу" : "Добавить новую книгу"}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-neutral-600 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Название
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Жанры (через запятую)
                </label>
                <input
                  type="text"
                  required
                  value={formData.genres.join(", ")}
                  onChange={(e) => {
                    const value = e.target.value;
                    const genresArray = value
                      .split(",")
                      .map((g) => g.trim())
                      .filter(Boolean);
                    setFormData({ ...formData, genres: genresArray });
                  }}
                  placeholder="Например: Киберпанк, Тёмное фэнтези"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Год
                </label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Формат
                </label>
                <select
                  value={formData.workFormat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workFormat: e.target.value as WorkFormat,
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  {WORK_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Обложка книги
                </label>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 text-sm text-neutral-700">
                      <Upload className="w-4 h-4" />
                      <span>Выбрать файл</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onload = () => {
                            const result = reader.result;
                            if (typeof result === "string") {
                              setFormData((prev) => ({
                                ...prev,
                                coverImage: result,
                              }));
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <p className="mt-1 text-xs text-neutral-500">
                      Поддерживаются любые изображения; файл будет сохранён в localStorage в виде data URL.
                    </p>
                  </div>

                  {formData.coverImage && (
                    <div className="w-16 h-24 rounded overflow-hidden border border-neutral-200 bg-neutral-100">
                      <img
                        src={formData.coverImage}
                        alt="Предпросмотр обложки"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-neutral-700">
                Описание
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              {editingBook ? (
                <>
                  <Edit2 className="w-4 h-4" />
                  Сохранить изменения
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Добавить книгу
                </>
              )}
            </button>
          </form>
        </div>

        {/* Books List */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-2xl mb-6 text-neutral-900">Все книги ({books.length})</h2>
          
          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg text-neutral-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {book.workFormat ?? "—"} • {book.genres?.join(", ")} • {book.year}
                  </p>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {book.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="h-fit p-2 text-neutral-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="h-fit p-2 text-neutral-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
