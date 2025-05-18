import { getHandleByPathhname, getTitlePage, haveTitle } from "@/lib/utils";
import Image from "next/image";

export function MiddleHeader({ pathname }: { pathname: string }) {
  const isProfilePage = pathname.includes("/profile");
  console.log("isProfilePage", isProfilePage);
  console.log("pathname", pathname);
  console.log("haveTitle(pathname)", haveTitle(pathname));
  console.log("getHandleByPathhname(pathname)", getHandleByPathhname(pathname));
  if (isProfilePage)
    return <h1 className="font-bold">@{getHandleByPathhname(pathname)}</h1>;

  if (!isProfilePage && haveTitle(pathname))
    return <h1 className="font-bold text-xl">{getTitlePage(pathname)}</h1>;

  return (
    <Image src="/imgs/rockin-logo.svg" alt="Logo" width={150} height={150} />
  );
}
