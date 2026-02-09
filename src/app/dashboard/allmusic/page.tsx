import { getAllAudio } from "@/features/audios/actions/get-allaudio"
import ShowAllAudio from "@/features/audios/components/ShowAllAudio";

const page = async () => {

    const allAudio = await getAllAudio();
    if(!allAudio.success){
        throw new Error("Audio Not Get From Server!")
    };

  return (
    <div>
        <ShowAllAudio allAudio={allAudio.allAudio}/>
    </div>
  )
}

export default page