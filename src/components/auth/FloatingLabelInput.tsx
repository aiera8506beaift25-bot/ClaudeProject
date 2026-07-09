import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onPasswordToggle?: (show: boolean) => void;
  passwordVisible?: boolean;
}

export const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      error,
      icon,
      showPasswordToggle,
      onPasswordToggle,
      passwordVisible,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(props.value);
    const shouldFloatLabel = isFocused || hasValue;

    return (
      <div className="relative mb-6">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={
              showPasswordToggle
                ? passwordVisible
                  ? 'text'
                  : 'password'
                : type
            }
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`w-full px-4 py-3 bg-[rgba(24,24,27,0.5)] border-2 rounded-lg transition-all duration-200 text-[#FAFAFA] placeholder-transparent ${
              icon ? 'pl-12' : 'pl-4'
            } ${showPasswordToggle ? 'pr-12' : 'pr-4'} ${
              error
                ? 'border-[#EF4444] focus:border-[#EF4444]'
                : 'border-[#27272A] focus:border-[#3B82F6]'
            }`}
            placeholder={label}
          />

          {/* Floating Label */}
          <motion.label
            className={`absolute left-4 ${icon ? 'left-12' : 'left-4'} pointer-events-none select-none font-medium transition-colors duration-200 ${
              shouldFloatLabel ? 'text-[#3B82F6]' : 'text-[#A1A1AA]'
            }`}
            animate={{
              y: shouldFloatLabel ? -28 : 0,
              scale: shouldFloatLabel ? 0.85 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>

          {/* Password Toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => onPasswordToggle?.(!passwordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth="2"
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-xs text-[#EF4444] mt-2 font-medium"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
