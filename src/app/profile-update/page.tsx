import { loginPath, setupProfile } from '@/constants/routes'
import UpdatedProfilePage from '@/features/profile-setup/components/updatePage'
import { prisma } from '@/lib'
import { getSession } from '@/Utils/get-sessions'
import { redirect } from 'next/navigation'
export const dynamic = "force-dynamic";
const page = async () => {
    const session = await getSession()
    const userId = session?.user.id
  
    if (!userId) {
      redirect(loginPath);
    }
  
    const profile = await prisma.profile.findUnique({
      where: { userId : userId }
    });

    if(!profile){
        redirect(setupProfile);
    };

  return (
    <div >
        <UpdatedProfilePage {...profile}/>
    </div>
  )
}

export default page