type SearchIconProps = {
  className?: string;
  size?: number;
};

export default function SearchIcon({ className, size = 24 }: SearchIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7609 17.7609L25 25M20.6035 10.8349C20.6035 16.2666 16.2151 20.6698 10.8018 20.6698C5.3884 20.6698 1 16.2666 1 10.8349C1 5.40324 5.3884 1 10.8018 1C16.2151 1 20.6035 5.40324 20.6035 10.8349Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
