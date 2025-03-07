import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white flex justify-center py-4 fixed top-0 left-0 right-0 z-50">
      <div>
        <Image
          src="/imgs/rockin-logo.svg"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>
    </header>
  );
}
