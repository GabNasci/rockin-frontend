type FeedIconProps = {
  className?: string;
  size?: number;
};

export default function FeedIcon({ className, size = 32 }: FeedIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3333 22L17.3333 18L10.6666 18L10.6666 22L17.3333 22Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6666 12.6665L22.6666 8.6665L10.6666 8.6665L10.6666 12.6665L22.6666 12.6665Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6666 4H10.6666C7.35292 4 4.66663 6.68629 4.66663 10V22C4.66663 25.3137 7.35292 28 10.6666 28H22.6666C25.9803 28 28.6666 25.3137 28.6666 22V10C28.6666 6.68629 25.9803 4 22.6666 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
