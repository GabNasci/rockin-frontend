import MakePostButton from "@/components/shared/make_post_button";
import ProfileCard from "@/components/shared/profile_card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="">Home Page</h1>
      <Button>Click me</Button>
      <ProfileCard
        user={{
          name: "John Doe",
          specialities: ["Speciality 1", "Speciality 2"],
          image: "https://avatars.githubusercontent.com/u/10000?v=4",
          isSupporting: true,
        }}
      />
      <MakePostButton />
    </div>
  );
}
