import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function Icon({ children, size = 20, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15M14 6l6 6-6 6" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M7 7h10v10" />
    </Icon>
  );
}

export function Close(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 5 14 14M19 5 5 19" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7h18M3 17h18" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Icon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </Icon>
  );
}

export function AccountIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c.7-3.8 3.2-5.8 6.5-5.8s5.8 2 6.5 5.8" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  );
}

export function SwatchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m7 4 10 2-2.5 12L4.5 16 7 4Z" />
      <path d="m9 8 8 1.5M8 12l8 1.5" />
    </Icon>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 21V4M5 4h12l-2 4 2 4H5" />
      <path d="M5 12h10" />
    </Icon>
  );
}

export function DesignIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20 20 4M4 4h5v5H4V4ZM15 20h5v-5h-5v5Z" />
      <circle cx="12" cy="12" r="2.2" />
    </Icon>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 6h11v10H3V6ZM14 10h4l3 3v3h-7v-6Z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.4 2.4 4.7-5" />
    </Icon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function SatisfactionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      <path d="m9.5 12 1.7 1.7 3.4-3.7" />
    </Icon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </Icon>
  );
}

export function MeasureIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8.5 8.5 3 21 15.5 15.5 21 3 8.5Z" />
      <path d="m7 9 2 2M10 6l2 2M12 13l2 2M15 10l2 2" />
    </Icon>
  );
}

export function ConciergeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 6V4" />
      <path d="M9.5 18a2.5 2.5 0 0 1 5 0" />
    </Icon>
  );
}

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 19c.5-1.4.8-2.7 1.1-4.2.3-1.5.6-3 1-4.5M9.1 10.4c-.3-1.9 1.2-3.4 3-3.4 2.8 0 4.6 1.7 4.6 4.2 0 2.8-1.6 4.7-3.7 4.7-1 0-1.8-.7-1.6-1.8" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.5 21v-7h2.8l.5-3.2h-3.3V8.7c0-.9.3-1.6 1.7-1.6H18V4.2c-.4-.1-1.5-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.4v2.4H8v3.2h2.8v7h3.7Z" />
    </svg>
  );
}

export function SpinnerIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
    </svg>
  );
}
