type HomeIconProps = {
  className?: string;
  size?: number;
  active?: boolean;
};

export default function HomeIcon({ className, size = 24 }: HomeIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size + 2}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.84444 25C2.2735 25 1 23.6927 1 22.0801V10.3438C1 9.45675 1.39279 8.61782 2.06753 8.06369L9.88975 1.63985C10.9286 0.786718 12.4047 0.786717 13.4436 1.63985L21.2658 8.06369C21.9405 8.61782 22.3333 9.45675 22.3333 10.3438V22.0801C22.3333 23.6927 21.0598 25 19.4889 25H3.84444Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
