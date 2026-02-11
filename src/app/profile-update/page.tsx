import { loginPath, setupProfile } from '@/constants/routes'
import { getSingleData } from '@/features/profile-setup/actions/get-single'
import UpdatedProfilePage from '@/features/profile-setup/components/updatePage'
import { prisma } from '@/lib'
import { getSession } from '@/Utils/get-sessions'
import { redirect } from 'next/navigation'

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