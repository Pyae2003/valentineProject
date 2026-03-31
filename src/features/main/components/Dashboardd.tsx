import { allAudio } from "../../audios/actions/get-audioUrl";
import GlowingHeartConnection from "./GlowingHeartConnection";
import InputSongSearch from "./InputSongSearch";
import SongList from "./SongList";
import CountDown from "@/features/others/components/CountDown";
import ImageAndVideo from "./ImageAndVideo";
import Footer from "@/components/Footer";
import { getSession } from "@/Utils/get-sessions";
import { getCurrentDate } from "@/features/others/actions/getCurrentDate";


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
  const user = await getSession();
          const userAuthId = user?.user.id;
  
          if(!userAuthId){
              return;
          };
  
  const currentDate = await getCurrentDate(userAuthId);
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
         {songs && songs.length > 0 && <SongList songs={songs} />}
          <div className="my-5">
            {currentDate && <CountDown {...currentDate} />}
          </div>

          <ImageAndVideo soloUrl={soloUrl} coupleUrl={coupleUrl} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
