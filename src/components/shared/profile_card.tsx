import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  user?: {
    name?: string;
    specialities?: string[];
    image?: string;
    isSupporting?: boolean;
  };
};

export default function ProfileCard({ user }: Props) {
  return (
    <Card className="w-[128px] p-2 rounded-md shadow-md gap-2">
      <CardHeader className="flex justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.image} alt={`Imagem de ${user?.name}`} />
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1 justify-center">
        <CardTitle className="truncate text-center w-full">
          {user?.name}
        </CardTitle>
        <CardDescription className="truncate text-center w-full">
          {user?.specialities?.join(", ")}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center w-full p-0">
        <Button
          variant={user?.isSupporting ? "outline" : "default"}
          className={`w-full cursor-pointer font-bold border-primary ${
            user?.isSupporting ? "text-primary" : null
          }`}
        >
          {user?.isSupporting ? "Apoiando" : "Apoiar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
