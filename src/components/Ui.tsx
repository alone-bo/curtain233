import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type ButtonVariant = "primary" | "secondary" | "onDark" | "quiet";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <button className={`button button--${variant} ${className}`.trim()} {...props}>
      <span>{children}</span>
    </button>
  );
}

export function TextLink({
  children,
  className = "",
  arrow = true,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  arrow?: boolean;
}) {
  return (
    <button className={`text-link ${className}`.trim()} {...props}>
      <span>{children}</span>
      {arrow && <ArrowRight size={15} aria-hidden="true" />}
    </button>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}

function BrandEmblem() {
  return (
    <span className="brand-emblem" aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="32" r="29.2" />
        <circle cx="32" cy="32" r="24.4" opacity="0.55" />
        <path d="M32 50c-4.8-8.2-7.2-16.2-6.1-24.2 3 1.8 5.4 5.8 6.1 11.6.7-5.8 3.1-9.8 6.1-11.6 1.1 8-1.3 16-6.1 24.2Z" />
        <path d="M32 50V16.5M32 50c-5.7-4.6-9.5-10-11.4-16.8M32 50c5.7-4.6 9.5-10 11.4-16.8M32 50c-3.4-6.4-4.6-12.6-3.7-18.8M32 50c3.4-6.4 4.6-12.6 3.7-18.8" />
        <path d="M22.5 50.8c3.1-1.1 6-2.8 9.5-5.6 3.5 2.8 6.4 4.5 9.5 5.6M26.5 14.3h11" opacity="0.8" />
        <circle cx="32" cy="11.2" r="1" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export function Logo({
  onClick,
  light = false,
  showEmblem = false,
  className = "",
}: {
  onClick: () => void;
  light?: boolean;
  showEmblem?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`brand${light ? " brand--light" : ""}${showEmblem ? " brand--crest" : ""} ${className}`.trim()}
      onClick={onClick}
      aria-label="REGAL DRAPES — return to homepage"
    >
      {showEmblem && <BrandEmblem />}
      <span className="brand-wordmark">
        REGAL DRAPES<sup>™</sup>
      </span>
    </button>
  );
}
