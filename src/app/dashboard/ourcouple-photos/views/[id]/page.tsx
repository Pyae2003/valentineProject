import DeleteSubmitButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { loginPath, ourCouplePhotoPath } from "@/constants/routes";
import { deleteCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/delete-couplePhoto";
import { coupleSingleImage } from "@/features/VideoAndImage/couplephotos/actions/get-coupleSingle";
import { SingleReturn } from "@/types/singleReturnType";
import { getSession } from "@/Utils/get-sessions";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface viewsParams {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: viewsParams) => {
  const { id } = await params;

  const imageInfo = await coupleSingleImage({ id });

  const session = await getSession;

  if (!session) {
    redirect(loginPath);
  }

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
      {!!session && (
        <div>
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
              <Button
                variant={"default"}
                className="bg-pink-300 hover:bg-pink-700"
              >
                <Link href={ourCouplePhotoPath}>Back</Link>
              </Button>
              <DeleteButton id={id}></DeleteButton>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

type deleteButtonProp = {
  id: string;
};

const DeleteButton = ({ id }: deleteButtonProp) => {
  return (
    <div>
      <form action={deleteCouplePhoto.bind(null, id)}>
        <DeleteSubmitButton />
      </form>
    </div>
  );
};

export default page;
