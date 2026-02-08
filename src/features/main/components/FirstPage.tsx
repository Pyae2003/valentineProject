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
import { loginPath } from "@/constants/routes";
import Footer from "@/components/Footer";

type firstPageProp = {
  frameUrl  : string
}

const FirstPage = ({frameUrl} : firstPageProp) => {

  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* TEXT SIDE */}
          <div className="flex justify-center lg:justify-start">
            <Card className="w-full max-w-xl">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight text-center lg:text-left">
                  Happy Valentine&apos;s Day,
                  <br />
                  Kaung Ma Lay 💖
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="mt-4 text-slate-500 max-w-md mx-auto lg:mx-0 text-center lg:text-left leading-relaxed">
                  Having you by my side makes everything better.
                  Thank you for being you and for making me smile without even trying.
                  I’m lucky to call you mine 🤍
                  <br />
                  <span className="block mt-2">
                    I’m really thankful for you. You make my heart happy 🫶
                  </span>
                </p>
              </CardContent>

              <CardFooter className="mt-8 flex justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg w-full sm:w-auto px-10 transition"
                >
                  <Link href={loginPath}>Sign In</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* IMAGE SIDE */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <Image
                  src={frameUrl}
                  width={400}
                  height={300}
                  unoptimized
                  alt="Beautiful scenery"
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* LOVE MESSAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600 transition">
            <CardContent className="flex items-center gap-4 p-0">
              <span className="text-3xl">🌹</span>
              <p className="leading-relaxed">
                Happy 1 month and 4 days, my love ❤️
              </p>
            </CardContent>
          </Card>

          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600 transition">
            <CardContent className="flex items-center gap-4 p-0">
              <span className="text-3xl">🌸</span>
              <p className="leading-relaxed">
                Still smiling, still grateful, still choosing you every day.
              </p>
            </CardContent>
          </Card>

          <Card className="flex items-center p-6 shadow-lg text-white rounded-2xl bg-pink-500 hover:bg-pink-600 transition">
            <CardContent className="flex items-center gap-4 p-0">
              <span className="text-3xl">🌼</span>
              <p className="leading-relaxed">
                You’ve already become someone very important to me.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default FirstPage;
