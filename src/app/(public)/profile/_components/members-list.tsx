import Loader from "@/components/shared/loader";
import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/auth.context";
import { Member } from "@/models/profiles/types";
import { usePathname, useRouter } from "next/navigation";

type MembersListProps = {
  members: Member[];
  isLoading: boolean;
  openDialog: () => void;
};

export function MembersList({
  members,
  isLoading,
  openDialog,
}: MembersListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const isUserProfilePage = pathname === `/profile/${user?.handle}`;

  return (
    <Card className="flex w-full gap-2 border-0 rounded-none shadow-none">
      <CardHeader className="font-bold">Membros da banda:</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {members && members?.length > 0 ? (
          members.map((member) => (
            <ProfileHorizontalCard
              key={member.id}
              className="cursor-pointer hover:bg-gray-100"
              profile={member}
              onClick={() => router.push(`/profile/${member.handle}`)}
            />
          ))
        ) : isLoading ? (
          <Loader className="w-10 h-10" />
        ) : (
          <p className="text-gray-400 flex justify-center w-full">
            Sem membros
          </p>
        )}
        {isUserProfilePage && (
          <Button
            variant="outline"
            className="border-primary text-primary font-bold bg-white"
            onClick={openDialog}
          >
            Editar membros
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
