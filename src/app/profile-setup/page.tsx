import { blindbox, dashboard, loginPath } from "@/constants/routes"
import SetUpPage from "@/features/profile-setup/components/SetUpPage"
import { prisma } from "@/lib"
import { getSession } from "@/Utils/get-sessions"
import { redirect } from "next/navigation"

const page =async () => {

  const session = await getSession()
    const userId = session?.user.id
  
    if (!userId) {
      redirect(loginPath)
    }
  
    const profile = await prisma.profile.findUnique({
      where: { userId : userId }
    });

    if(profile){
      redirect(dashboard);
    };
  return (
    <div>
       {
        !profile && <SetUpPage/>
       }
    </div>
  )
}

export default page