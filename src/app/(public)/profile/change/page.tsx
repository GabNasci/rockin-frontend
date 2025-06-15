"use client";

import { Button } from "@/components/ui/button";
import { ListProfiles } from "./_components/list-profiles";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import {
  useChangeProfile,
  useGetProfilesFromUser,
} from "@/models/profiles/useProfiles";
import { Loading } from "@/components/shared/loading";
import { useState } from "react";
import { useAuth } from "@/lib/contexts/auth.context";

export default function ChangeProfilePage() {
  useProtectedRoute();

  const { user } = useAuth(); // Perfil atual do usuário logado
  const { data: profiles, isLoading } = useGetProfilesFromUser();
  const [selectedProfileId, setSelectedProfileId] = useState(user?.id);

  const { mutate: changeProfile, isPending: isChanging } = useChangeProfile();

  if (isLoading) return <Loading />;
  if (!profiles) return <Loading />;

  const handleChangeProfile = () => {
    if (selectedProfileId && selectedProfileId !== user?.id) {
      changeProfile(selectedProfileId);
    }
  };

  const isButtonDisabled = selectedProfileId === user?.id;

  return (
    <div className="flex min-h-screen flex-col gap-4 items-center mt-[56px] pt-8 px-4">
      <ListProfiles
        profiles={profiles}
        currentProfileId={user?.id}
        selectedProfileId={selectedProfileId}
        onSelectProfile={setSelectedProfileId}
      />
      <Button
        className="w-full"
        disabled={isButtonDisabled || isChanging}
        onClick={handleChangeProfile}
      >
        {isChanging ? "Trocando..." : "Trocar Perfil"}
      </Button>
    </div>
  );
}
