import Image from "next/image";

export default function FormLogo() {
  return (
    <div className="flex justify-center py-16">
      <Image
        src="/imgs/rockin-red-logo.svg"
        alt="Logo Rockin"
        width={180}
        height={180}
      />
    </div>
  );
}
