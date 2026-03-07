"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
  FormHTMLAttributes,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldError = string | undefined;
type FieldValues = Record<string, string>;
type FieldErrors = Record<string, FieldError>;
type FieldRules = Record<string, Rule[]>;

export interface Rule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message: string;
}

interface FormContextValue {
  values: FieldValues;
  errors: FieldErrors;
  setValue: (name: string, value: string) => void;
  registerRules: (name: string, rules: Rule[]) => void;
  touched: Record<string, boolean>;
  setTouched: (name: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used inside <Form>");
  return ctx;
}

// ─── Validation helper ────────────────────────────────────────────────────────

function validate(value: string, rules: Rule[]): FieldError {
  for (const rule of rules) {
    if (rule.required && !value.trim()) return rule.message;
    if (rule.min !== undefined && value.length < rule.min) return rule.message;
    if (rule.max !== undefined && value.length > rule.max) return rule.message;
    if (rule.pattern && !rule.pattern.test(value)) return rule.message;
  }
  return undefined;
}

// ─── Form ─────────────────────────────────────────────────────────────────────

interface FormProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onFinish" | "onFinishFailed"
> {
  onFinish?: (values: FieldValues) => void;
  onFinishFailed?: (errors: FieldErrors, values: FieldValues) => void;
  children: ReactNode;
  className?: string;
}

export function Form({
  onFinish,
  onFinishFailed,
  children,
  className = "",
  ...rest
}: FormProps) {
  const [values, setValues] = useState<FieldValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});

  // Store rules in a ref — registration never triggers a re-render
  const rulesRef = useRef<FieldRules>({});

  const setValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    const fieldRules = rulesRef.current[name] ?? [];
    const error = validate(value, fieldRules);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const registerRules = useCallback((name: string, rules: Rule[]) => {
    rulesRef.current[name] = rules;
  }, []);

  const setTouched = useCallback((name: string) => {
    setTouchedState((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const newErrors: FieldErrors = {};
    const newTouched: Record<string, boolean> = {};

    for (const [name, rules] of Object.entries(rulesRef.current)) {
      newTouched[name] = true;
      newErrors[name] = validate(values[name] ?? "", rules);
    }

    setErrors(newErrors);
    setTouchedState((prev) => ({ ...prev, ...newTouched }));

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      onFinishFailed?.(newErrors, values);
    } else {
      onFinish?.(values);
    }
  };

  return (
    <FormContext.Provider
      value={{ values, errors, setValue, registerRules, touched, setTouched }}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-5 ${className}`}
        noValidate
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// ─── Form.Item ────────────────────────────────────────────────────────────────

interface FormItemProps {
  label?: string;
  name: string;
  rules?: Rule[];
  children: ReactNode;
  className?: string;
}

function FormItem({
  label,
  name,
  rules = [],
  children,
  className = "",
}: FormItemProps) {
  const { errors, touched, registerRules } = useFormContext();

  // Register rules after mount — never during render
  useEffect(() => {
    registerRules(name, rules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const error = touched[name] ? errors[name] : undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
          {rules.some((r) => r.required) && (
            <span className="ml-0.5 text-red-500">*</span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
          <svg
            className="h-3 w-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

Form.Item = FormItem;
