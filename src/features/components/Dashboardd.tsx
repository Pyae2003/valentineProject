import { toast } from "sonner";
import { allAudio } from "../actions/audios/get-audioUrl";
import GlowingHeartConnection from "./GlowingHeartConnection";
import InputSongSearch from "./miniFetaures/InputSongSearch";
import SongList from "./miniFetaures/SongList";
import CountDown from "./miniFetaures/CountDown";

type dashboardProps = {
  title: string;
};

export default async function Dashboardd({ title }: dashboardProps) {
  const songs = await allAudio({ title });

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center pt-20">
      <h1 className="text-2xl font-bold text-pink-800 mb-5">
        Our Love Journey
      </h1>

      <GlowingHeartConnection
        leftImg="/images/chittullay.jpg"
        leftName="Pyae Khant"
        rightImg="/images/chittullay.jpg"
        rightName="Pyae Khant"
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
        </div>
      </div>
    </div>
  );
}
