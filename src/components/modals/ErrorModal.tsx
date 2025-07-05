"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <article className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Fechar</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 6l8 8M6 14L14 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-800">
            Ocorreu um erro
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] focus:outline-none"
          >
            OK
          </button>
        </div>
      </div>
    </article>,
    document.body
  );
}
