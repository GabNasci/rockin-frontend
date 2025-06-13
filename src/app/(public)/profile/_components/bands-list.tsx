"use client";

import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/auth.context";
import { Band } from "@/models/bands/types";
import { usePathname, useRouter } from "next/navigation";

type BandsListProps = {
  bands: Band[];
};

export function BandsList({ bands }: BandsListProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isUserProfilePage = pathname === `/profile/${user?.handle}`;

  return (
    <Card className="flex w-full gap-2 border-0 rounded-none shadow-none">
      <CardHeader className="font-bold">Bandas:</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {bands?.length > 0 ? (
          bands?.map((band) => (
            <ProfileHorizontalCard
              key={band.id}
              className="cursor-pointer hover:bg-gray-100"
              profile={band.profile}
              onClick={() => router.push(`/profile/${band.profile.handle}`)}
            />
          ))
        ) : (
          <p className="text-gray-400 flex justify-center w-full">Sem bandas</p>
        )}
        {isUserProfilePage && (
          <Button
            variant="outline"
            className="border-primary text-primary font-bold bg-white"
          >
            Criar banda
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
