import DeleteSubmitButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ourPhotosPath } from "@/constants/routes";
import { deletePhoto } from "@/features/VideoAndImage/actions/delete-photo";
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

  const imageInfo = await SingleImage({ id });

  if (!imageInfo || !imageInfo.success) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-pink-500">
        This photo is no longer available 💔
      </div>
    );
  }

  const { title, description, name, url } = imageInfo as SingleReturn;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-100 h-auto mt-10  bg-pink-00">
        <CardContent>
          <div className="overflow-hidden rounded-xl">
            <Image
              src={url}
              width={400}
              height={300}
              unoptimized
              alt="Beautiful scenery"
              className="w-full h-80"
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
          <DeleteButton id={id}></DeleteButton>
        </CardFooter>
      </Card>
    </div>
  );
};

type deleteButtonProp = {
  id: string;
};

const DeleteButton = ({ id }: deleteButtonProp) => {
  return (
    <div>
      <form action={deletePhoto.bind(null, id)}>
        <DeleteSubmitButton />
      </form>
    </div>
  );
};

export default page;
