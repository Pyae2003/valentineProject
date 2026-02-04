import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { loginPath } from "@/constants/routes";

const FirstPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10">
        <div className="flex items-center gird grid-cols-1 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
                  Happy Valentine&apos;s Day,
                  <br />
                  Kaung Ma Lay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4 text-slate-500 max-w-md pb-5">
                Having you by my side makes everything better. Thank you for being you and for making me smile without even trying. I’m lucky to call you mine. 🤍
                  I’m really thankful for you. You make my heart happy 🫶
                </div>
              </CardContent>
              <CardFooter className="my-10">
                <Button
                  className="bg-pink-500 rounded-full shadow-lg w-100 hover:bg-pink-600 transition"
                  size={"lg"}
                >
                  <Link href={loginPath}>Sign In</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className=" relative flex justify-center lg:justify-end">
          <Card>
            <CardContent>
              <div>
                <Image
                  src="/images/chittullay.jpg"
                  width={400}
                  height={300}
                  sizes="(max-width: 600px) 400px, 800px"
                  alt="Beautiful scenery"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600  transition">
            <CardContent className="flex items-center gap-4">
              <div className="text-3xl">🌹</div>
              <p>Happy 1 month and 4 days, my love ❤️</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600 transition">
            <CardContent className="flex items-center gap-4">
              <div className="text-3xl">🌸</div>
              <p>
                Still smiling, still grateful, still choosing you every day.
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600 transition">
            <CardContent className="flex items-center gap-4">
              <div className="text-3xl">🌼</div>
              <p>You’ve already become someone very important to me.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
