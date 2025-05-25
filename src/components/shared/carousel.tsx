import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Media } from "@/models/posts/types";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

type MediaCarouselProps = {
  medias: Media[] | undefined;
};

export function MediaCarousel({ medias }: MediaCarouselProps) {
  if (medias === undefined) return null;
  if (medias.length === 0) {
    return null;
  }
  if (medias.length === 1) {
    return (
      <div className="p-1">
        <Image
          src={getImageUrl(medias[0].url)}
          alt="Imagem do post"
          width={400}
          height={400}
          className="border-1 rounded-md border-gray-300"
        />
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {medias.map((media, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            <div className="p-1">
              <Image
                src={getImageUrl(media.url)}
                alt="Imagem do post"
                width={400}
                height={400}
                className="border-1 rounded-md border-gray-300"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
