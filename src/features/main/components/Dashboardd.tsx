import { toast } from "sonner";
import { allAudio } from "../../audios/actions/get-audioUrl";
import GlowingHeartConnection from "./GlowingHeartConnection";
import InputSongSearch from "./InputSongSearch";
import SongList from "./SongList";
import CountDown from "@/features/others/components/CountDown";
import ImageAndVideo from "./ImageAndVideo";
import Footer from "@/components/Footer";


type dashboardProps = {
  title: string,
  girlUrl : string,
  boyUrl : string,
  soloUrl : string,
  coupleUrl : string
};

export default async function Dashboardd({ title , girlUrl , boyUrl, soloUrl,coupleUrl}: dashboardProps) {
  const songs = await allAudio({ title });

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center pt-20">
      <h1 className="text-2xl font-bold text-pink-800 mb-5">
        Our Love Journey
      </h1>

      <GlowingHeartConnection
        leftName="Pyae Khant"
        rightName="Pyae Khant"
        boyUrl={boyUrl}
        girlUrl={girlUrl}
      />

      <div className="my-4">
        <InputSongSearch />
        <div className="mt-2 mb-5 w-200">
          {!!songs ? (
            <SongList songs={songs} />
          ) : (
            toast.warning("This Audio Not Found!", { position: "top-left" })
          )}
          <div className=" my-5">
            <CountDown />
          </div>
          <div>
            <ImageAndVideo soloUrl={soloUrl} coupleUrl={coupleUrl}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
