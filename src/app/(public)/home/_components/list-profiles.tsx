import ProfileCard from "@/components/shared/profile_card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProfileResponse } from "@/models/auth/types";

type ListProfilesProps = {
  profiles: ProfileResponse[];
};

export default function ListProfiles({ profiles }: ListProfilesProps) {
  if (profiles.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 w-full px-8 pt-8 mb-12 md:px-40 lg:px-80">
      <div>
        <h3 className=" font-bold">Sugestões:</h3>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {profiles.map((profile) => (
            <CarouselItem
              key={profile.id}
              className="basis-auto grow-0 shrink-0 w-[140px]"
            >
              <ProfileCard profile={profile} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-54 left-0" />
        <CarouselNext className="absolute top-54 right-0" />
      </Carousel>
    </div>
  );
}
