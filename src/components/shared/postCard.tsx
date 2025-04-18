import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PostCard() {
  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Post Title</CardTitle>
        <CardDescription>Post Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Post Content</p>
      </CardContent>
      <CardFooter>
        <Button>Read more</Button>
      </CardFooter>
    </Card>
  );
}
