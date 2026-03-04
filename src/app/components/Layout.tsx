import { Link, Outlet, useLocation } from "react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "./LoginModal";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogin = (password: string) => {
    localStorage.setItem("isAdmin", "true");
    setLoginModalOpen(false);
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLoginModalOpen(true);
                }}
                className="hover:opacity-70 transition-opacity"
              >
                <BookOpen className="w-8 h-8 text-neutral-900" />
              </button>
              <span className="text-xl font-semibold text-neutral-900">Библиотека автора</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/") && location.pathname === "/"
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Главная
              </Link>
              <Link
                to="/latest"
                className={`transition-colors ${
                  isActive("/latest")
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Новые книги
              </Link>
              <Link
                to="/works"
                className={`transition-colors ${
                  isActive("/works")
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Все работы
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-1 ${
                    isActive("/") && location.pathname === "/"
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-600"
                  }`}
                >
                  Главная
                </Link>
                <Link
                  to="/latest"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-1 ${
                    isActive("/latest")
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-600"
                  }`}
                >
                  Новые книги
                </Link>
                <Link
                  to="/works"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-1 ${
                    isActive("/works")
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-600"
                  }`}
                >
                  Все работы
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-neutral-600">
            <p>© 2026 Библиотека автора. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}