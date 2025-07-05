"use client";

import { useState } from "react";

type PasswordInputProps = {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: "light" | "dark";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  id,
  name,
  placeholder = "Senha",
  required = true,
  disabled = false,
  variant = "light",
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const isDark = variant === "dark";

  return (
    <>
      <label
        htmlFor={id}
        className={`block font-medium text-sm ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      >
        {placeholder}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          {...(required ? { required } : {})}
          {...(disabled ? { disabled } : {})}
          onChange={onChange}
          autoComplete="current-password"
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] disabled:cursor-not-allowed text-gray-600 border-gray-300 placeholder-gray-400"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`text-lg focus:outline-none ${
              isDark
                ? "text-gray-300 hover:text-white focus:text-white"
                : "text-gray-600 hover:text-gray-700 focus:text-gray-700"
            }`}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
