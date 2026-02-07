import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ourPhotosPath } from "@/constants/routes";
import { SingleImage } from "@/features/VideoAndImage/actions/get-single";
import { SingleReturn } from "@/types/singleReturnType";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface viewsParams {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: viewsParams) => {
  const { id } = await params;

  console.log(id);

  const imageInfo = await SingleImage({ id });

  const { title, description, name, url } = imageInfo as SingleReturn;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-80 h-100 mt-10  bg-pink-00">
        <CardContent>
          <div className="overflow-hidden rounded-xl">
            <Image
              src={url}
              width={300}
              height={200}
              unoptimized
              alt="Beautiful scenery"
              className="w-full h-auto"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white w-100 mt-5 shadow-2xl text-pink-500">
        <CardContent className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground text-sm ">Title : </p>
              {title}
            </div>
            <div className="flex space-x-2 ">
              <Star className="w-4 h-4 mt-1 mr-1 text-pink-700" /> {name}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm ">Description : </p>
            <h5>{description}</h5>
          </div>
        </CardContent>
        <CardFooter className="flex items-center space-x-3">
          <Button variant={"default"} className="bg-pink-300 hover:bg-pink-700">
            <Link href={ourPhotosPath}>Back</Link>
          </Button>
          <DeleteButton></DeleteButton>
        </CardFooter>
      </Card>
    </div>
  );
};

const DeleteButton = () => {
  return (
    <div>
      <form action="">
        <Button type="submit" variant={"destructive"} className="hover:bg-red-900">
          Delete
        </Button>
      </form>
    </div>
  );
};

export default page;
