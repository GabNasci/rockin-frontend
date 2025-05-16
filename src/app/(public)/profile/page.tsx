"use client";
import { Spinner } from "@/components/ui/spinner";
import { ProfileInfoCard } from "./_components/profile-info-card";
import { useAuth } from "@/lib/contexts/auth-context";

export default function Home() {
  const { user } = useAuth();

  if (!user) return <Spinner size={"medium"} className="text-primary" />;
  return (
    <div className="flex min-h-screen flex-col">
      <ProfileInfoCard user={user} />
    </div>
  );
}
