"use client";
import { getHandleByPathhname, getTitlePage, haveTitle } from "@/lib/utils";
import { useGetProfileByHandle } from "@/models/profiles/useProfiles";
import Image from "next/image";
import { Loading } from "./loading";
import UserAvatar from "./user_avatar";
import { useAuth } from "@/lib/contexts/auth.context";
import { useRouter } from "next/navigation";

export function MiddleHeader({ pathname }: { pathname: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const isMessagePage = pathname.includes("/messages/");
  const { data: profile } = useGetProfileByHandle(
    getHandleByPathhname(pathname),
    isMessagePage,
  );
  const isProfilePage = pathname.includes(`/profile/${user?.handle}`);

  const goToHome = () => {
    router.push("/home");
  };

  if (!profile && isMessagePage) return <Loading />;

  if (isMessagePage)
    return (
      <div className="flex items-center gap-2">
        <UserAvatar
          className="w-7 h-7"
          avatar={profile?.avatar === undefined ? null : profile?.avatar}
        />
        <h1 className="font-bold">{profile?.name}</h1>
      </div>
    );

  if (isProfilePage)
    return <h1 className="font-bold">@{getHandleByPathhname(pathname)}</h1>;

  if (!isProfilePage && haveTitle(pathname))
    return <h1 className="font-bold text-xl">{getTitlePage(pathname)}</h1>;

  return (
    <Image
      onClick={goToHome}
      className="cursor-pointer"
      src="/imgs/rockin-logo.svg"
      alt="Logo"
      width={150}
      height={150}
    />
  );
}
