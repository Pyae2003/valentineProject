import ShowAllAudio from "@/features/audios/components/ShowAllAudio"

const Loading = () => {
  return (
    <div className="p-6">
      <ShowAllAudio allAudio={[]} isLoading />
    </div>
  )
}

export default Loading
