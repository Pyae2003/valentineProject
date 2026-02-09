import DeleteSubmitButton from "@/components/DeleteButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboard } from "@/constants/routes"
import { Songlist } from "@/generated/prisma/client"
import Link from "next/link"
import { deletedAudio } from "../actions/deleted-audio"

type ShowAllAudioProps = {
    allAudio : Songlist[]
}
const ShowAllAudio = ({allAudio} :ShowAllAudioProps ) => {
  return (
    <div>
        {
            !!allAudio && (
                allAudio.map((audio) => (
                    <div key={audio.id}>
                        <Card>
                            <CardHeader>
                                <span className="text-muted-foreground"> Song Title : </span>
                                <CardTitle>{audio.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <span className="text-muted-foreground">Created At :</span>
                                    <p className="">{
                                    audio.createdAt.toLocaleDateString("en-GB",{
                                        day : "2-digit",
                                        month : "short",
                                        year : "numeric"
                                    })
                                    }</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                    <DeleteAndBackButton id={audio.id}/>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            )
        }
    </div>
  )
}

type deleteButtonProp = {
    id: string;
  };
  
  const DeleteAndBackButton = ({ id }: deleteButtonProp) => {
    return (
      <div>
        <div>
            <Button variant={"default"} className="bg-pink-400 hover:bg-pink-700">
                <Link href={dashboard}>
                    Back
                </Link>
            </Button>
        </div>
        <div>
        <form action={deletedAudio.bind(null, id)}>
          <DeleteSubmitButton />
        </form>
      </div>
      </div>
    );
  };

export default ShowAllAudio