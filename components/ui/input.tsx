"use client";

import { InputHTMLAttributes, useEffect } from "react";
import { useFormContext } from "@/components/ui/form";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: string;
}

export function Input({ name, className = "", ...props }: InputProps) {
  const { values, errors, touched, setValue, setTouched } = useFormContext();

  useEffect(() => {
    if (props.value !== undefined && props.value !== values[name]) {
      setValue(name, String(props.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasError = touched[name] && errors[name];
  const hasSuccess = touched[name] && !errors[name] && values[name];

  const borderClass = hasError
    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900"
    : hasSuccess
      ? "border-green-500 focus:border-green-500 focus:ring-green-200 dark:border-green-500 dark:focus:ring-green-900"
      : "border-zinc-300 focus:border-blue-500 focus:ring-blue-200 dark:border-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-900";

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        value={values[name] ?? ""}
        onChange={(e) => setValue(name, e.target.value)}
        onBlur={() => setTouched(name)}
        className={`
          w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900
          outline-none transition-all duration-150
          placeholder:text-zinc-400
          focus:ring-2
          disabled:cursor-not-allowed disabled:opacity-50
          dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500
          ${borderClass}
          ${className}
        `}
        {...props}
      />
      {hasError && (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-red-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
      {hasSuccess && (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
