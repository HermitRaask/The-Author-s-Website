import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ILoveChisato") {
      onLogin(password);
      setPassword("");
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl mb-4 text-neutral-900">Вход в админ-панель</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Введите пароль"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}