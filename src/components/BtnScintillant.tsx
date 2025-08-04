'use client';
import React from 'react';

type ShimmerButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  text?: string;
  disabled?: boolean;
};

export default function ShimmerButton({
  onClick,
  loading = false,
  text = "Envoyer",
  disabled = false,
}: ShimmerButtonProps) {
  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 50%, #850df7, transparent 100%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-1 font-semibold text-pink-500 dark:text-pink-400 bg-base-100 rounded-full transition-colors duration-300">
          {loading ? "Envoi..." : text}
        </span>
      </button>
    </div>
  );
}
