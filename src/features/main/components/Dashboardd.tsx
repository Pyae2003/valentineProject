import { toast } from "sonner";
import { allAudio } from "../../audios/actions/get-audioUrl";
import GlowingHeartConnection from "./GlowingHeartConnection";
import InputSongSearch from "./InputSongSearch";
import SongList from "./SongList";
import CountDown from "@/features/others/components/CountDown";
import ImageAndVideo from "./ImageAndVideo";
import Footer from "@/components/Footer";

type DashboardProps = {
  title: string;
  boyName : string;
  girlName : string;
  girlUrl: string;
  boyUrl: string;
  soloUrl: string;
  coupleUrl: string;
};

export default async function Dashboardd({
  title,
  boyName,
  girlName,
  girlUrl,
  boyUrl,
  soloUrl,
  coupleUrl,
}: DashboardProps) {
  const songs = await allAudio({ title });

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center pt-20 pb-32">
      <h1 className="text-2xl font-bold text-pink-800 mb-5">
        Our Love Journey
      </h1>

      <GlowingHeartConnection
        leftName={boyName}
        rightName={girlName}
        boyUrl={boyUrl}
        girlUrl={girlUrl}
      />

      <div className="my-4 w-full flex flex-col items-center">
        <InputSongSearch />

        <div className="mt-2 mb-5 w-full flex flex-col items-center">
          {songs && <SongList songs={songs} />}

          <div className="my-5">
            <CountDown />
          </div>

          <ImageAndVideo soloUrl={soloUrl} coupleUrl={coupleUrl} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
