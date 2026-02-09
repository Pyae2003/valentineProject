import { getAllAudio } from "@/features/audios/actions/get-allaudio"
import ShowAllAudio from "@/features/audios/components/ShowAllAudio"

const page = async () => {
  const allAudio = await getAllAudio()

  if (!allAudio.success) {
    throw new Error("Audio Not Get From Server!")
  };

  const safeAudios = allAudio.audiosWithUrl.filter(
    (audio): audio is NonNullable<typeof audio> => audio !== null
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          🎶 Our Special Songs Library
        </h1>

        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          “Every song here tells a story, <br className="hidden sm:block" />
          every sound holds a memory.”
        </p>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <ShowAllAudio allAudio={safeAudios} />
      </section>
    </div>
  )
}

export default page
